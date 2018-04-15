<template>
  <div id="resourcesEdit">
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick' >
      <el-tab-pane label="资源概要" name="0" ></el-tab-pane>
      <el-tab-pane label="拥有该资源权限的角色" name="1" v-if="isAddFlag"></el-tab-pane>
    </el-tabs>
    <el-form ref='resource' v-show='gridResource' label-width='100px' :inline="true">
      <el-form-item label="资源类别" :label-width="formLabelWidth">
        <el-select class="filter-item" v-model="resource.resourceType" placeholder="请选择" @change="handleChange">
          <el-option v-for="resourceType in resourceTypeSelect" :key="resourceType.code" :label="resourceType.label" :value="resourceType.code"> </el-option>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="resource.resourceName" auto-complete="off" placeholder="请输入资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源URL" :label-width="formLabelWidth">
          <el-input v-model="resource.resourceUrl" auto-complete="off" placeholder="请输入资源URL"></el-input>
        </el-form-item>
      </div>
      <div v-if="_resourceType === '1'">
        <el-form-item label="应用程序" :label-width="formLabelWidth">
          <el-input v-model="resource.serviceId" auto-complete="off" placeholder="请选择应用程序"></el-input>
        </el-form-item>
      </div>
      <div v-if="_resourceType === '2'">
        <el-form-item label="应用程序" :label-width="formLabelWidth">
          <el-input v-model="resource.serviceId" auto-complete="off" placeholder="请选择应用程序"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select class="filter-item" v-model="resource.parentResourceUuid" placeholder="请选择">
            <el-option v-for="menuCode in menuCodeSelect" :key="menuCode.code" :label="menuCode.label" :value="menuCode.code"> </el-option>
          </el-select>
        </el-form-item>
        <div class="dialog-footer">
          <el-form-item label="菜单代码" :label-width="formLabelWidth">
            <el-input v-model="resource.serviceId" auto-complete="off" placeholder="请输入菜单代码"></el-input>
          </el-form-item>
          <el-button plain @click="_selectMenuTree">从菜单树选择</el-button>
        </div>
        <el-dialog
          title="选择菜单"
          :visible.sync="showMenuDialog"
          :modal="false"
          :modal-append-to-body="true"
          width="40%">
          <el-tree :data="menuTreeData" :props="defaultProps" node-key="id" ref="tree" highlight-current></el-tree>
          <div class="buttons">
            <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="resetChecked">清空</el-button>
          </div>
        </el-dialog>
      </div>
      <div v-if="_resourceType === '3'">
        <el-form-item label="应用服务代码" :label-width="formLabelWidth">
          <el-input v-model="resource.serviceId" auto-complete="off" placeholder="请输入应用服务代码"></el-input>
        </el-form-item>
      </div>
      <div class="grid-content bg-purple" v-if="_resourceType === '4'">
        <el-form-item label="组织名称" :label-width="formLabelWidth">
          <el-input v-model="resource.houseOrgCode" auto-complete="off" placeholder="请选择组织名称" :disabled="true"></el-input>
        </el-form-item>
        <div class="dialog-footer">
          <el-button plain @click="_selectOrgani">选择组织</el-button>
        </div>
        <el-dialog
          title="选择组织"
          :visible.sync="showDialog"
          :modal="false"
          :modal-append-to-body="true"
          width="40%">
          <org-tree @changeDialogStatus="_changeSatus" ref="orgTree"></org-tree>
        </el-dialog>
      </div>
      <div v-if="_resourceType === '4'">
        <el-form-item label="设备类型" :label-width="formLabelWidth">
            <el-select class="filter-item" v-model="resource.deviceType" placeholder="请选择">
              <el-option v-for="deviceType in deviceTypeSelect" :key="deviceType.value" :label="deviceType.label" :value="deviceType.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备供应商" :label-width="formLabelWidth">
            <el-select class="filter-item" v-model="resource.providerCode" placeholder="请选择">
              <el-option v-for="providerCodeType in providerCodeTypeSelect" :key="providerCodeType.value" :label="providerCodeType.label" :value="providerCodeType.value"> </el-option>
            </el-select>
          </el-form-item>
      </div>
      <div v-if="_resourceType === '5'">
        <el-form-item label="设备代码" :label-width="formLabelWidth" >
          <el-input v-model="resource.deviceCode" auto-complete="off" placeholder="请输入设备代码"></el-input>
        </el-form-item>
        <el-form-item label="逻辑地址" :label-width="formLabelWidth" >
          <el-input v-model="resource.logicalAddress" auto-complete="off" placeholder="请输入逻辑地址"></el-input>
        </el-form-item>
      </div>
      <div class="dialog-footer" align="center">
          <el-button @click="dialogFormVisible = false">返 回</el-button>
          <el-button v-if="isAddFlag" type="primary" @click="update('resource')">保 存2</el-button>
          <el-button v-else type="primary" @click="create('resource')">保 存1</el-button>
      </div>
    </el-form>
    <!-- <div v-show="gridContact">
      <contact-list :contactDetailData="tableDataContact" :contactTypeOptionsProp="contactTypeSelect"></contact-list>
    </div> -->
  </div>
</template>
<script>
import {
  createUser,
  updateUser
} from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    isAddFlag: false,
    tableData: undefined,
    resourceDetailData: undefined,
    resource: {
      resourceType: undefined,       // 资源类别
      resourceName: undefined,       // 资源名称
      resourceUrl: undefined,        // 资源URL
      appCode: undefined,            // 程序代码
      serviceId: undefined,          // 服务代码
      menuCode: undefined,           // 菜单
      parentResourceUuid: undefined, // 上一级菜单
      deviceCode: undefined,         // 设备代码
      deviceType: undefined,         // 设备类型
      providerCode: undefined,       // 供应商
      houseOrgCode: undefined,       // 设备组织 (位置)
      logicalAddress: undefined,     // 逻辑地址 (IP地址)
      uuid: undefined                // 表主键
    },
    resourceTypeSelect: undefined,
    deviceTypeSelect: undefined,
    providerCodeTypeSelect: undefined
  },
  watch: {
    resourceDetailData (val) {
      console.log('watch: resourceDetailData!!!!!!!!!!!!!!!!')
      console.log(val)
      this.subActiveName = '0'
      this.gridResource = true
    }
  },
  data () {
    return {
      subActiveName: '0',
      formLabelWidth: '120px',
      gridResource: true,
      _resourceType: undefined,
      selectedVaue: {},
      showDialog: false,
      showMenuDialog: false,
      expandedKeys: undefined,
      menuCodeSelect: undefined,
      menuTreeData: undefined,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleSubTabClick (tab, event) {
      if (tab.name === '0') {
        this.gridResource = true
      } else {
        this.gridResource = false
      }
    },
    handleChange: function () {
      console.log(this.resource.resourceType)
      let resourceType = this.resource.resourceType
      if (resourceType === '1') {
        this._resourceType = resourceType
      } else if (resourceType === '2') {
        this._resourceType = resourceType
      } else if (resourceType === '3') {
        this._resourceType = resourceType
      } else if (resourceType === '4') {
        this._resourceType = resourceType
      } else {
        this._resourceType = resourceType
      }
    },
    create (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          createUser(this.user)
            .then(() => {
              this.dialogFormVisible = false
             // this.loadData();
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
        } else {
          return false
        }
      })
    },
    update (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateUser(this.user)
            .then(() => {
              this.dialogFormVisible = false
               // 删除
              this.tableData.splice(this.updateUserRow, 1)
              // 添加
             // this.loadData();
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                duration: 2000
              })
            })
        } else {
          return false
        }
      })
    },
    _changeSatus (selectedVaue) {
      this.showDialog = false
      this.selectedVaue = selectedVaue
      this.resource.houseOrgCode = selectedVaue.orgName
      // this.resource.orgId = selectedVaue.orgId
      // alert('----ok----')
    },
    _selectOrgani () {
      this.showDialog = true
    },
    _selectMenuTree () {
      this.showMenuDialog = true
    },
    getCheckedNodes () {
      console.log(this.$refs.tree.getCheckedNodes())
    }
  }
}
</script>
<style>

  div.item-container{
    display: flex;
  }

  div.action-container{
    padding-left: 30px;
    margin-bottom: 10px;
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    display: flex;
    border-radius: 4px;
    min-height: 36px;
  }
</style>
