<template>
  <div>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick'>
      <el-tab-pane label='角色概要' name='0'></el-tab-pane>
      <el-tab-pane label='关联角色组' name='1' @click="getRoleUserGroupList"></el-tab-pane>
      <el-tab-pane label='关联角色' name='2'></el-tab-pane>
      <el-tab-pane label='资源权限' name='3'></el-tab-pane>
    </el-tabs>
    <el-form  ref='form' v-show="showSummary"  label-width='100px' :inline='true' :model='form'>
      <el-form-item label='角色名称' prop='name'>
        <el-input type="text" placeholder='请输入角色名称'></el-input>
      </el-form-item>
      <el-form-item label='角色说明' prop='desc' style=" display: block">
        <el-input type="textarea" v-model='form.code' style="width:600px"></el-input>
      </el-form-item>
      <el-button class='filter-item' style='margin-left: 30px; display: block' @click='handleSave' type='primary'>
              保存
      </el-button>
    </el-form>
    <div>
      <!-- <el-select v-model='selectedName' @visible-change='getDepartmentList' @change='boxSelected' :placeholder='tabPlaceholder' style='margin-left: 30px'>
        <el-option
          v-for='(item, index) in addDepartmentList'
          :key='index'
          :label='item.name'
          :value='item.name'>
        </el-option>
      </el-select> -->

      <grid-list @listenToDeleteEvent='gridDeleteEvent' @listenToEditEvent='gridEditEvent' :tableData='gridTableData' :params='gridParams' :editable='false' :deletable='true' style='margin-top: 20px'></grid-list>
    </div>
  </div>
</template>

<script>
import gridList from './gridList.vue'
import {
  addDepartmentList,
  saveDepartmentList,
  getRoleUserGroup
} from '@/views/UserMgmt/userManagement/apis'

export default {
  props: {
    departmentDetailData: undefined,
    roleDetailData: undefined
  },
  components: {
    gridList
  },
  methods: {
    getRoleUserGroupList () {
      getRoleUserGroup()
        .then(
          function (result) {
            this.getRoleUserGroup = result.getRoleUserGroup
            console.log('get role user group success!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    getDepartmentList () {
      addDepartmentList()
        .then(
          function (result) {
            this.addDepartmentList = result.departmentList
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    boxSelected () {
      saveDepartmentList()
        .then(
          function (result) {
            this.gridTableData = result.departmentList
            //              this.gridTableData.push(result.userGroupList)
            this.selectedName = ''
            this.tabPlaceholder = '添加' + this.tabTitle
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
        })
    },
    handleSubTabClick (tab, event) {
      this.gridParams = this.gridListParams[tab.name - 1]
      this.gridTableData = this.departmentDetailData[tab.name - 1]
      this.tabTitle = this.textMap[tab.name]
      this.showSummary = tab.name === '0'
      this.showUserGroup = tab.name === '1'
      this.showUser = tab.name === '2'
      this.showResource = tab.name === '3'
      this.tabPlaceholder = '添加' + this.tabTitle
      console.log('用户组详细信息 参数：' + JSON.stringify(this.gridListParam))
      console.log('用户组详细信息 数据：' + JSON.stringify(this.gridListTableData))
    },
    gridDeleteEvent (data) {
      console.log('departmentGroupEdit：删除了第' + data + '行')
      this.$emit('gridDeleteEvent', data)
    },
    gridEditEvent (data) {
      console.log('departmentGroupEdit：编辑了第' + data + '行')
      this.$emit('gridEditEvent', data)
    }
  },
  watch: {
    departmentDetailData (val) {
      console.log('watch: departmentDetailData!!!!!!!!!!!!!!!!')
      console.log(val)
      this.gridTableData = val[0]
      this.gridParams = this.gridListParams[0]
      this.subActiveName = '0'
    }
  },
  data () {
    return {
      showSummary: true,
      showUserGroup: false,
      showUser: false,
      showResource: false,
      // tabTitle: '角色概要',
      // textMap: {
      //   '0': '部门概要',
      //   '1': '直属部门',
      //   '2': '直属用户'
      // },
      tabPlaceholder: '添加直属部门',
      selectedName: null,
      adddepartmentList: undefined,
      subActiveName: '0',
      gridParams: undefined,
      gridTableData: undefined,
      gridListParams: [
        [
          {
            title: '用户组名称',
            prop: 'name'
          },
          {
            title: '上级用户组',
            prop: 'superior'
          },
          {
            title: '下级用户组',
            prop: 'subordinate'
          },
          {
            title: '直属用户',
            prop: 'directlyUnder'
          }
        ],
        [
          {
            title: '姓名',
            prop: 'name'
          },
          {
            title: '用户名',
            prop: 'userName'
          },
          {
            title: '职务',
            prop: 'position'
          },
          {
            title: '部门',
            prop: 'department'
          },
          {
            title: '手机号',
            prop: 'mobileNum'
          },
          {
            title: '身份证号码',
            prop: 'idenNum'
          }
        ],
        [
          {
            title: '资源类别',
            prop: 'category'
          },
          {
            title: '资源名称',
            prop: 'name'
          },
          {
            title: '安装位置',
            prop: 'location'
          },
          {
            title: '操作类型',
            prop: 'operationType'
          },
          {
            title: '权限类型',
            prop: 'authorityType'
          },
          {
            title: '许可',
            prop: 'permission'
          },
          {
            title: '逻辑地址',
            prop: 'logicalAddress'
          },
          {
            title: 'URL',
            prop: 'url'
          }
        ]
      ],
      form: {
        departmentname: undefined,
        name: undefined,
        sex: undefined,
        password: undefined,
        description: undefined
      }
    }
  }
}
</script>

<style scoped>

</style>