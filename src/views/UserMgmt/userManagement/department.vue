<template>
  <div>
    <div class="app-container" calendar-list-container>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="部门列表" name="0"></el-tab-pane>
        <el-tab-pane label="部门树形结构" name="1"></el-tab-pane>
      </el-tabs>
      <div v-show="showGrid == true">
        <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                    placeholder="部门名称"></el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">
            添加
          </el-button>
        </div>
        <grid-list :editable="true" :deletable="true" :tableData="departmentList" :params="departmentListParam" style="margin-top: 15px" @listenToDeleteEvent="departmentDeleteEvent" @listenToEditEvent="departmentEditEvent"></grid-list>
        <div class="pagination-container">
          <el-pagination :page-sizes="[10,20,30, 50]" layout="total, sizes, prev, pager, next, jumper"
                         :total="total"></el-pagination>
        </div>
      </div>
      <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
        <department-edit :departmentDetailData="subDepartmentData" :form="departmentForm" @gridDeleteEvent="departmentDeleteEvent" @gridEditEvent="departmentEditEvent"> </department-edit>
      </el-dialog>
    </div>
    <div v-show="showGrid == false">
      <el-row>
        <el-col :span="8" style='margin-top:15px;'>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-tree style='margin-top:10px;'
                   class="filter-tree"
                   :data="treeData"
                   node-key="id"
                   :highlight-current="treeHighlight"
                   :filter-node-method="filterNode"
                   ref="menuTree"
                   @node-click="handleNodeClick"
                   default-expand-all
          >
          </el-tree>
          <div style="margin-top: 30px" v-show="showSubGrid==true">
            <el-button class="filter-item" @click="handleTreeCreate" type="primary">
              添加
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleTreeDelete" type="primary">
              删除
            </el-button>
          </div>
        </el-col>
        <el-col :span="16" style='margin-top:15px;' v-show="showSubGrid==true">
          <el-card class="box-card" style='margin-left:10px;'>
            <department-edit :departmentDetailData="subDepartmentData" :form="departmentForm" @gridDeleteEvent="departmentDeleteEvent" @gridEditEvent="departmentEditEvent"> </department-edit>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import gridList from './component/gridList.vue'
  import departmentEdit from './component/departmentEdit.vue'
  import {getDepartmentList, getTreeData, getDepartmentDetail} from '@/views/UserMgmt/userManagement/apis'
  export default {
    name: 'department',
    data () {
      return {
        departmentList: undefined,
        departmentListParam: [{
          title: '部门名称',
          prop: 'name'
        }, {
          title: '部门类别',
          prop: 'type'
        }, {
          title: '上级部门',
          prop: 'superior'
        }, {
          title: '用户类型',
          prop: 'userType'
        }, {
          title: '下级部门',
          prop: 'subordinate'
        }, {
          title: '直属员工',
          prop: 'member'
        }],
        total: 0,
        dialogFormVisible: false,
        showGrid: true,
        showSubGrid: false,
        activeName: '0',
        departmentForm: {
          code: undefined,
          type: undefined,
          description: undefined
        },
        treeData: undefined,
        treeHighlight: true,
        subDepartmentData: undefined,
        filterText: '',
        gridListTableData: undefined,
        dialogStatus: undefined
      }
    },
    components: {
      gridList,
      departmentEdit
    },
    methods: {
      loadData () {
        getDepartmentList()
          .then(
            function (result) {
              this.departmentList = result.departmentList
              this.total = result.departmentList.length
              console.log('部门：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
        getTreeData()
          .then(
            function (result) {
              this.treeData = result.treeData
              console.log('部门树形数据：' + JSON.stringify(result))
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleFilter () {
      },
      handleCreate () {
        this.dialogStatus = '创建部门'
        getDepartmentDetail()
      .then(
            function (result) {
              this.subDepartmentData = []
              this.departmentForm.code = undefined
              this.departmentForm.type = undefined
              this.departmentForm.description = undefined
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
        this.dialogFormVisible = true
      },
      handleTabClick (tab, event) {
        this.showGrid = (tab.name === '0')
        // this.showSubGrid = (tab.name === '0')
        console.log('*******************************************' + tab, event)
      },
      handleNodeClick (data) {
        console.log('node data : *******************************************' + data.label)
        this.showSubGrid = true
        getDepartmentDetail()
          .then(
            function (result) {
              this.subDepartmentData = result.departmentDetailList
              this.departmentForm.code = result.code
              this.departmentForm.type = result.type
              this.departmentForm.description = result.desc
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log(error)
            }
          )
      },
      handleTreeCreate () {
        this.subDepartmentData = []
      },
      handleTreeSave () {
      },
      handleTreeDelete () {
        this.showSubGrid = false
        this.treeHighlight = false
      },
      departmentDeleteEvent (data) {
        console.log('department：删除了第' + data.name + '行')
      },
      departmentEditEvent (data) {
        console.log('department：编辑了第' + data.name + '行')
        this.dialogFormVisible = this.showGrid
        getDepartmentDetail()
            .then(
              function (result) {
                this.subDepartmentData = result.departmentDetailList
                this.departmentForm.code = result.code
                this.departmentForm.type = result.type
                this.departmentForm.description = result.desc
                this.dialogStatus = '编辑部门'
              }.bind(this)
            )
            .catch(
              function (error) {
                console.log(error)
              }
            )
      }
    },
    created () {
      this.loadData()
    },
    watch: {
      filterText (val) {
        this.$refs.menuTree.filter(val)
      }
    }
  }
</script>

<!— Add “scoped” attribute to limit CSS to this component only —>
<style scoped>
</style>