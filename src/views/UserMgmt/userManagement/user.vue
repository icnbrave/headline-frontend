<template>
  <div id="users" >
    <el-form :inline="true" :model="listQuery" ref="listQuery" class="demo-form-inline">
      <div class="div">
        <el-form-item label="登录名" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="登录名" v-model="listQuery.q_userName"> </el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="姓名" v-model="listQuery.q_fullName"> </el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px" class="filter-item" placeholder="手机号" v-model="listQuery.q_primaryPhone"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </div>
      <div class="div">
        <el-button class="filter-item" type="primary" @click="handleFilter">查询</el-button>
        <el-button class="filter-item" style="margin-center: 10px" @click="handleCreate" type="primary">新增用户</el-button>
      </div>
    </el-form>

    <user-list :tableData="userList" :params="userListParam" style="margin-top: 15px" 
      @listenDeleteEvent="userDeleteEvent" @listenEditEvent="userEditEvent">
    </user-list>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <user-edit :tableData="userList" :userDetailData="subUserData" :user="userForm" :isAddFlag="addFlag" :userAccStatusSelect="userAccStatusOptions" :tableDataContact="subUserContact"
      :contactTypeSelect="contactTypeOptions" :departmentSelect="departmentOptions" @gridDeleteEvent="userDeleteEvent" @gridEditEvent="userEditEvent"> </user-edit>
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
import userList from './component/userList.vue'
import userEdit from './component/userEdit.vue'
import {
  getUserListByPage,
  getUserDetail,
  deleteUser,
  getUserStatusOptions,
  getDepartmentOptions,
  getContactTypeOptions
} from '@/views/UserMgmt/userManagement/apis'

export default {
  data () {
    return {
      userList: undefined,
      userListParam: undefined,
      total: 0,
      dialogFormVisible: false,
      subUserData: undefined,
      subUserContact: undefined,
      dialogStatus: undefined,
      addFlag: false,
      userForm: {
        fullName: undefined,
        userName: undefined,
        position: undefined,
        departmentUuid: undefined,
        primaryPhone: undefined,
        idenNum: undefined,
        password: undefined,
        checkPass: undefined,
        primaryEmail: undefined,
        effectiveDate: undefined,
        expiryDate: undefined,
        userAccStatus: undefined
      },
      listQuery: {
        page: 1,
        limit: 10,
        q_userName: '',
        q_fullName: '',
        q_primaryPhone: ''
      },
      formLabelWidth: '120px',
      dictData: {
        userStatusDict: 'USER_ACC_STATUS',
        departmentDict: 'DEPARTMENT',
        contactTypeDict: 'CONTACT_TYPE'
      },
      userAccStatusOptions: undefined,
      contactTypeOptions: undefined,
      departmentOptions: undefined
    }
  },
  components: {
    userList,
    userEdit
  },
  mounted () {
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData () {
      getUserListByPage(this.listQuery)
        .then(
          function (result) {
            this.userListParam = [{
              title: '用户名',
              prop: 'userName'
            }, {
              title: '姓名',
              prop: 'fullName'
            }, {
              title: '职务',
              prop: 'position'
            }, {
              title: '部门',
              prop: 'departmentUuid'
            }, {
              title: '手机号',
              prop: 'primaryPhone'
            }, {
              title: '身份证号码',
              prop: 'idenNum'
            }]
            console.log('get data by page')
            this.userList = result.baseUserVoList
            this.total = result.pageCount
          }.bind(this)
        )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      // 获取部门信息
      getDepartmentOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<departmentOptions:' + result)
              this.departmentOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      // 获取用户状态信息
      getUserStatusOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<userStatusOptions:' + result)
              this.userAccStatusOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            console.log(error)
          }
        )
      // 获取联系类型下拉框信息
      getContactTypeOptions(this.dictData)
        .then(
            function (result) {
              console.log('<<<<<getContactTypeOptions:' + result)
              this.contactTypeOptions = result
            }.bind(this)
          )
        .catch(
          function (error) {
            this.loading2 = false
            console.log(error)
          }.bind(this)
        )
    },
    // 初始新增用户信息
    initUserInfo () {
      this.userForm = {
        fullName: undefined,
        userName: undefined,
        position: undefined,
        departmentUuid: undefined,
        primaryPhone: undefined,
        idenNum: undefined,
        password: undefined,
        checkPass: undefined,
        primaryEmail: undefined,
        effectiveDate: undefined,
        expiryDate: undefined,
        userAccStatus: undefined,
        uuid: undefined
      }
    },
    // 重置搜选宽内容
    resetForm: function () {
      this.listQuery = {
        'page': 1,
        'limit': 10,
        'q_userName': '',
        'q_fullName': '',
        'q_primaryPhone': ''
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
      this.initUserInfo()  // 调用初始信息
      this.dialogStatus = '创建用户'
      this.dialogFormVisible = true
      this.addFlag = false
    },
    userDeleteEvent (row) {
      var data = this.userList[row]
      this.$confirm("确定要删除'" + data.userName + "'?', '提示'", {
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
    // 删除用户实体
    delete (uuid, row) {
      console.log('删除操作:' + uuid)
      deleteUser(uuid)
        .then(
          function (result) {
            console.log(uuid)
            this.userList.splice(row, 1)
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
    userEditEvent (data) {
      console.log('user：编辑了第' + data.userName + '行')
      getUserDetail(data.uuid)
        .then(
          function (result) {
            this.subUserData = result.baseUser  // 用户基本信息
            this.userForm = {
              fullName: data.fullName,
              userName: data.userName,
              position: data.position,
              departmentUuid: data.departmentUuid,
              primaryPhone: data.primaryPhone,
              idenNum: data.idenNum,
              password: data.password,
              checkPass: data.password,
              primaryEmail: data.primaryEmail,
              effectiveDate: data.effectiveDate,
              expiryDate: data.expiryDate,
              userAccStatus: data.userAccStatus,
              uuid: data.uuid
            }
            // 联系方式
            this.subUserContact = result.contactVoList
            // 用户组
            // 关联角色
            this.dialogStatus = '编辑用户'
            this.dialogFormVisible = true
            this.addFlag = true
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
