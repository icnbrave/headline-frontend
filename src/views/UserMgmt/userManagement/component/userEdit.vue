<template>
  <div>
    <el-tabs v-model='subActiveName' @tab-click='handleSubTabClick' >
      <el-tab-pane label="用户概要" name="0" ></el-tab-pane>
      <el-tab-pane label="联系方式" name="1" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="用户组" name="2" v-if="isAddFlag"></el-tab-pane>
      <el-tab-pane label="关联角色" name="3" v-if="isAddFlag"></el-tab-pane>
    </el-tabs>
    <el-form ref='user' v-show='gridUser' label-width='100px' :inline="true" :rules="rules" :model="user">
      <el-form-item label="登录名" :label-width="formLabelWidth" prop="userName">
        <el-input v-model="user.userName" auto-complete="off" placeholder="请输入登录名"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="fullName">
        <el-input v-model="user.fullName" auto-complete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
        <el-input type="password" v-model="user.checkPass" auto-complete="off" placeholder="再次输入密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="primaryPhone">
        <el-input v-model="user.primaryPhone" auto-complete="off" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idenNum">
        <el-input v-model="user.idenNum" auto-complete="off" placeholder="请输入有效身份证号码"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件" :label-width="formLabelWidth" prop="primaryEmail">
        <el-input v-model="user.primaryEmail" auto-complete="off" placeholder="请输入有效电子邮件"></el-input>
      </el-form-item>
      <el-form-item label="部门" :label-width="formLabelWidth" prop="departmentUuid">
        <el-select class="filter-item" v-model="user.departmentUuid" placeholder="请选择">
          <el-option v-for="department in departmentSelect" :key="department.code" :label="department.label" :value="department.code"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职务" :label-width="formLabelWidth" >
        <el-input v-model="user.position" auto-complete="off" placeholder="请输入职务名称"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="userAccStatus">
        <el-select class="filter-item" v-model="user.userAccStatus" placeholder="请选择">
          <el-option v-for="userStatus in userAccStatusSelect" :key="userStatus.code" :label="userStatus.label" :value="userStatus.label"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生效日期" :label-width="formLabelWidth">
        <el-date-picker
          v-model="user.effectiveDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptionsStart">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="失效日期" :label-width="formLabelWidth">
        <el-date-picker
          v-model="user.expiryDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptionsEnd">
        </el-date-picker>
      </el-form-item>
      <div class="dialog-footer" align="center">
          <el-button @click="dialogFormVisible = false">返 回</el-button>
          <el-button v-if="isAddFlag" type="primary" @click="update('user')">保 存</el-button>
          <el-button v-else type="primary" @click="create('user')">保 存</el-button>
      </div>
    </el-form>
    <div v-show="gridContact">
      <contact-list :contactDetailData="tableDataContact" :contactTypeOptionsProp="contactTypeSelect"></contact-list>
    </div>
    <div v-show="gridUserGroup">
      <grid-list :editable='false' @listenToDeleteEvent='gridDeleteEvent' :tableData='gridTableData' :params='gridParams' style='margin-top: 20px'></grid-list>
    </div>
  </div>
</template>
<script>
import contactList from './contact.vue'
import gridList from './gridList.vue'
import {
  createUser,
  updateUser,
  checkUserName
} from '@/views/UserMgmt/userManagement/apis'
export default {
  props: {
    isAddFlag: false,
    userAccStatusSelect: undefined,
    contactTypeSelect: undefined,
    departmentSelect: undefined,
    tableDataContact: undefined,
    tableData: undefined,
    userDetailData: undefined,
    user: {
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
    }
  },
  components: {
    contactList,
    gridList
  },
  watch: {
    userDetailData (val) {
      console.log('watch: userDetailData!!!!!!!!!!!!!!!!')
      console.log(val)
      this.subActiveName = '0'
      this.gridUser = true
      this.gridContact = false
      this.gridUserGroup = false
    }
  },
  data () {
    let that = this
    // 密码校验是否一致
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 用户名的唯一性
    var validateUserName = (rule, value, callback) => {
      this.validate(value)
      if (this.userNameFlag) {
        this.userNameFlag = false   // 校验用户名存在之后,再将userNameFlag值还原初始值 fasle
        callback(new Error('用户名已存在!'))
      } else {
        callback()
      }
    }
    // 身份证有效验证
    var validateIdenNum = (rule, value, callback) => {
      // 15位
      var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/
      // 18位
      var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (value.length === 15) {
        if (!isIDCard1.test(value)) {
          callback(new Error('15位身份证号码无效!'))
        } else {
          callback()
        }
      } else {
        if (value === '') {
          callback()
        } else if (!isIDCard2.test(value)) {
          callback(new Error('18位身份证号码无效!'))
        } else {
          callback()
        }
      }
    }
    return {
      subActiveName: '0',
      formLabelWidth: '120px',
      gridUser: true,
      gridContact: false,
      gridUserGroup: false,
      // 生效日期选择
      pickerOptionsStart: {
        disabledDate (time) {
          return time.getTime() < new Date() - 3600 * 1000 * 24
        }
      },
      // 失效日期选择
      pickerOptionsEnd: {
        disabledDate (time) {
          return time.getTime() < new Date(that.user.effectiveDate).getTime() + 3600 * 1000 * 24
        }
      },
      rules: {
        departmentUuid: [
          { required: true, message: '请选择部门', trigger: 'blur,change' }
        ],
        userAccStatus: [
          { required: true, message: '请选择账户状态', trigger: 'blur,change' }
        ],
        fullName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 64 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 32 个字符' },
          { pattern: /^[A-Za-z0-9]+$/, message: '登录只能为字母和数字' },
          { validator: validateUserName }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 25, message: '长度在 6 到 32 个字符' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass }
        ],
        idenNum: [
          { message: '请输入有效的身份证号码', trigger: 'change' },
          { validator: validateIdenNum }
        ],
        primaryEmail: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
        primaryPhone: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: '请输入中国国内的手机号码'
          }
        ]
      }
    }
  },
  methods: {
    handleSubTabClick (tab, event) {
      if (tab.name === '0') {
        this.gridUser = true
        this.gridContact = false
      } else if (tab.name === '1') {
        this.gridContact = true
        this.gridUser = false
      } else if (tab.name === '2') {
        this.gridContact = false
        this.gridUser = false
        this.gridUserGroup = true
      }
    },
    create (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          createUser(this.user)
            .then(() => {
              this.dialogFormVisible = false
              this.userDetailData.splice(0, 0, {
                fullName: this.user.fullName,
                userName: this.user.userName,
                position: this.user.position,
                departmentUuid: this.user.departmentUuid,
                primaryPhone: this.user.primaryPhone,
                idenNum: this.user.idenNum,
                primaryEmail: this.user.primaryEmail,
                uuid: this.user.uuid,
                effectiveDate: this.user.effectiveDate,
                expiryDate: this.user.expiryDate,
                userAccStatus: this.user.userAccStatus
              })
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
              this.tableData.splice(0, 0, {
                fullName: this.user.fullName,
                userName: this.user.userName,
                position: this.user.position,
                departmentUuid: this.user.departmentUuid,
                primaryPhone: this.user.primaryPhone,
                idenNum: this.user.idenNum,
                primaryEmail: this.user.primaryEmail,
                uuid: this.user.uuid,
                effectiveDate: this.user.effectiveDate,
                expiryDate: this.user.expiryDate,
                userAccStatus: this.user.userAccStatus
              })
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
    // 校验登陆名的唯一性
    validate (userName) {
      checkUserName(userName)
        .then(
          function (result) {
            console.log('<<<<<userNameFlag:' + result)
            this.userNameFlag = result
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
