
<template>
  <div>
     <div>
      <el-row>
        <el-col :span="8" style='margin-top:15px;'>
          <grid-list 
            :editable="true" 
            :deletable="true"
            :tableData="roleList" 
            :params="roleListParam" 
            style="margin-top: 15px"
            @listenToClickEvent="rowSelectEvent"
          ></grid-list>
          <!-- <div style="margin-top: 30px" v-show="showSubGrid==true"> -->
          <div style="margin-top: 30px">
            <el-button class="filter-item" @click="handleRowCreate" type="primary">
              添加
            </el-button>
          </div>
        </el-col>
        <el-col :span="16" style='margin-top:15px;'>
          <el-card class="box-card" style='margin-left:10px; margin-top:15px'>
            <role-edit @listenToDeleteEvent='gridDeleteEvent' @listenToEditEvent='gridEditEvent' :tableData='gridTableData' :params='gridParams' :editable='false' :deletable='true' style='margin-top: 20px'></role-edit>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import gridList from './component/gridList.vue'
  import userGroupEdit from './component/userGroupEdit.vue'
  import departmentEdit from './component/departmentEdit.vue'
  import roleEdit from './component/roleEdit.vue'
  import {getRoleList, getUserGroupList, getUserGroupDetail} from '@/views/UserMgmt/userManagement/apis'
  export default {
    name: 'role',
    data () {
      return {
        roleList: undefined,
        roleListParam: [{
          title: '角色名称',
          prop: 'name'
        }, {
          title: '角色说明',
          prop: 'desc'
        }]
      }
    },
    components: {
      gridList,
      userGroupEdit,
      departmentEdit,
      roleEdit
    },
    created () {
      this.loadData()
    },
    methods: {
      loadData () {
        getRoleList()
          .then(
            function (result) {
              this.roleList = result.roleList
              console.log('角色：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
        getUserGroupList()
          .then(
            function (result) {
              this.userGroupListParam = [{
                title: '用户组名称',
                prop: 'name'
              }, {
                title: '上级用户组',
                prop: 'superior'
              }, {
                title: '用户类型',
                prop: 'type'
              }, {
                title: '下级用户组',
                prop: 'subordinate'
              }, {
                title: '直属用户',
                prop: 'directlyUnder'
              }]
              this.userGroupList = result.userGroupList
              this.total = result.userGroupList.length
              console.log('用户组：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      handleCreate () {
        this.dialogStatus = '创建用户组'
        getUserGroupDetail()
      .then(
            function (result) {
              this.subUserGroupData = []
              this.userGroupForm.code = undefined
              this.userGroupForm.type = undefined
              this.userGroupForm.description = undefined
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
        this.dialogFormVisible = true
      },
      rowSelectEvent (row) {
        console.log(row[0])
      },
      handleRowClick (data) {
        console.log('node data : *******************************************' + data.label)
        this.showSubGrid = true
      },
      handleRowDelete () {
        this.showSubGrid = false
        this.rowHighlight = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
