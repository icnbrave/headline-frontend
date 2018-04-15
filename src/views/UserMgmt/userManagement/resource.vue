<template>
  <div id="resources">
    <el-form :inline="true" :model="listQuery" ref="listQuery" class="demo-form-inline">
      <div class="div">
        <el-form-item label="资源类别" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="请选择" v-model="listQuery.q_resourceType"> </el-input>
        </el-form-item>
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="资源名称" v-model="listQuery.q_resourceName"> </el-input>
        </el-form-item>
        <el-form-item label="逻辑地址" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="逻辑地址" v-model="listQuery.q_logicalAddress"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('listQuery')">重置</el-button>
        </el-form-item>
      </div>
      <div class="div">
        <el-button class="filter-item" type="primary" @click="handleFilter">查询</el-button>
        <el-button class="filter-item" style="margin-center: 10px" @click="handleCreate" type="primary">新增资源</el-button>
      </div>
    </el-form>

    <resource-list :tableData="resourceList" :params="resourceListParam" style="margin-top: 15px" 
      @listenDeleteEvent="resourceDeleteEvent" @listenEditEvent="resourceEditEvent">
    </resource-list>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <resource-edit :tableData="resourceList" :resourceDetailData="subResourceData" :resource="resourceForm" @gridDeleteEvent="resourceDeleteEvent" @gridEditEvent="resourceEditEvent"
      :resourceTypeSelect="resourceTypeOptions" :deviceTypeSelect="deviceTypeOptions" :providerCodeTypeSelect="providerCodeTypeOptions"> </resource-edit>
    </el-dialog>

    <div class="block">
        <div class="r_page">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="listQuery.page"
              :page-sizes="[10, 20, 50]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
.block {
  margin-top: 20px;
  width: 100%
}
.div {
    margin-bottom: 10px
}
.div .r_div{
    margin-bottom: 5px
}
.block .r_btn {
  float: left;
  width: 90px
}
.block .r_page {
  float: right
}
</style>
<script type="text/javascript">
import resourceList from './component/resourceList.vue'
import resourceEdit from './component/resourceEdit.vue'
import {
  getResourceListByPage,
  getResourceDetail,
  deleteResource,
  getResourceTypeOptions,
  getDeviceTypeOptions,
  getProviderCodeTypeOptions
} from '@/views/UserMgmt/userManagement/apis'

export default {
  data () {
    return {
      resourceList: undefined,
      resourceListParam: undefined,
      total: 0,
      dialogFormVisible: false,
      subResourceData: undefined,
      dialogStatus: undefined,
      resourceForm: {
        resourceType: undefined,       // 资源类别
        resourceName: undefined,       // 资源名称
        resourceUrl: undefined,        // 资源URL
        appCode: undefined,            // 程序代码
        serviceId: undefined,          // 服务代码
        menuCode: undefined,           // 菜单
        deviceCode: undefined,         // 设备代码
        deviceType: undefined,         // 设备类型
        providerCode: undefined,       // 供应商
        houseOrgCode: undefined,      // 设备组织 (位置)
        logicalAddress: undefined,     // 逻辑地址 (IP地址)
        uuid: undefined                 // 表主键
      },
      dictData: {
        resourceTypeDict: 'RESOURCE_TYPE'
      },
      listQuery: {
        page: 1,
        limit: 10,
        q_resourceType: '',
        q_resourceName: '',
        q_logicalAddress: ''
      },
      formLabelWidth: '120px',
      resourceTypeOptions: undefined,
      deviceTypeOptions: undefined,
      providerCodeTypeOptions: undefined
    }
  },
  components: {
    resourceList,
    resourceEdit
  },
  mounted () {
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData () {
      getResourceListByPage(this.listQuery)
        .then(
          function (result) {
            this.resourceListParam = [{
              title: '资源名称',
              prop: 'resourceName'
            }, {
              title: '程序',
              prop: 'appCode'
            }, {
              title: '菜单',
              prop: 'menuCode'
            }, {
              title: '服务',
              prop: 'serviceId'
            }, {
              title: '安装位置',
              prop: 'installAddress'
            }, {
              title: '设备类型',
              prop: 'deviceType'
            }, {
              title: '供应商',
              prop: 'providerName'
            }, {
              title: '已授权角色',
              prop: 'authorizedRole'
            }, {
              title: '逻辑地址',
              prop: 'logicalAddress'
            }, {
              title: 'URL',
              prop: 'resourceUrl'
            }]
            console.log('get data by page')
            this.resourceList = result.baseUserVoList
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      // 获取资源类型下拉框信息
      getResourceTypeOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<resourceTypeOptions:' + result)
              this.resourceTypeOptions = result.resourceTypeOptions
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
        // 获取设备类型下拉框信息
      getDeviceTypeOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<deviceCategoryList:' + result)
              var deviceTypeList = [{
                value: '',
                label: ''
              }]
              for (let i = 0; i < result.deviceCategoryList.length; i++) {
                deviceTypeList.push({
                  value: result.deviceCategoryList[i].typeDesc,
                  label: result.deviceCategoryList[i].typeDesc
                })
              }
              this.deviceTypeOptions = deviceTypeList
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
        // 获取设备供应商下拉框信息
      getProviderCodeTypeOptions(this.dictData)
        .then(
            function (result) {
              console.log('厂商编码：' + JSON.stringify(result))
              // this.providerList = result.providerList
              var providerCodeList = [{
                value: '',
                label: ''
              }]
              for (let i = 0; i < result.providerList.length; i++) {
                providerCodeList.push({
                  value: result.providerList[i].providerCode,
                  label: result.providerList[i].providerCode
                })
              }
              this.providerCodeTypeOptions = providerCodeList
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    // 初始新增用户信息
    initResourceInfo () {
      this.resourceForm = {
        resourceType: undefined,       // 资源类别
        resourceName: undefined,       // 资源名称
        resourceUrl: undefined,        // 资源URL
        appCode: undefined,            // 程序代码
        serviceId: undefined,          // 服务代码
        menuCode: undefined,           // 菜单
        deviceCode: undefined,         // 设备代码
        deviceType: undefined,         // 设备类型
        providerCode: undefined,       // 供应商
        houseOrgCode: undefined,      // 设备组织(位置)
        logicalAddress: undefined,     // 逻辑地址(IP地址)
        uuid: undefined                 // 表主键
      }
    },
    // 重置搜选宽内容
    resetForm: function () {
      this.listQuery = {
        'page': 1,
        'limit': 10,
        'q_resourceType': '',
        'q_resourceName': '',
        'q_logicalAddress': ''
      }
    },
    // 改变分页大小
    handleSizeChange (val) {
      this.listQuery.limit = val
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.loadData()
    },
    handleFilter () {
      this.loadData()
    },
    // 新增用户
    handleCreate () {
      this.initResourceInfo()  // 调用初始信息
      this.dialogStatus = '创建资源'
      this.dialogFormVisible = true
    },
    resourceDeleteEvent (row) {
      var data = this.resourceList[row]
      this.$confirm("确定要删除'" + data.resourceName + "'?', '提示'", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('删除操作')
          this.delete(data.uuid, row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除资源实体
    delete (uuid, row) {
      console.log('删除操作:' + uuid)
      deleteResource(uuid)
        .then(
          function (result) {
            console.log(uuid)
            this.resourceList.splice(row, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    },
    resourceEditEvent (data) {
      console.log('resource：编辑了第' + data.resourceName + '行')
      getResourceDetail(data.uuid)
        .then(
          function (result) {
            // 返回的接口信息
            // this.subResourceData
            this.dialogStatus = '编辑资源'
            this.dialogFormVisible = true
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
    }
  }
}
</script>
