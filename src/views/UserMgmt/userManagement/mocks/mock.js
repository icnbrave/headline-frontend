import Mock from 'mockjs'

let contextPath = '/scp-usermgmtcomponent'

Mock.mock(contextPath + '/usermgmt/usergroup/list', function () {
  console.log('mock getUserGroupList')
  return {
    'pageCount': 0,
    'userGroupList': [
      {
        name: '安保部小队长1',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }, {
        name: '安保部小队长1',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      }
    ]
  }
})

Mock.mock(contextPath + '/addUserGroupList', function () {
  console.log('mock addUserGroupList')
  return {
    'pageCount': 0,
    'userGroupList': [
      {
        name: '安保部小队长3',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }, {
        name: '安保部小队长4',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      },
      {
        name: '安保部小队长5',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }, {
        name: '安保部小队长6',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      }
    ]
  }
})

// 保存添加用户组数据
Mock.mock(contextPath + '/saveUserGroupList', function () {
  console.log('mock saveUserGroupList')
  return {
    'userGroupList': [
      {
        name: '安保部小队长10',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }
    ]
  }
})

Mock.mock(contextPath + '/getTreeData', function () {
  console.log('mock getTreeData')
  return {
    name: '安保部小队长',
    superior: ['安保部员工', '公司高管', '设备维修'],
    treeData: [{
      id: 1,
      label: '物业全体员工',
      children: [{
        id: 4,
        label: '公司高管'
      }, {
        id: 1,
        label: '设备维修'
      }, {
        id: 2,
        label: '安保部员工',
        children: [{
          id: 5,
          label: '一期安保中队'
        }, {
          id: 6,
          label: '二期安保中队'
        }, {
          id: 7,
          label: '安保中队长'
        }, {
          id: 8,
          label: '安保小队长'
        }]
      }]
    }]
  }
})

Mock.mock(contextPath + '/getUserGroupDetail', function () {
  console.log('mock getUserGroupDetail')
  return {
    code: '0000001',
    type: ['type1', 'type2', 'type3'],
    desc: '用户组描述',
    userDetailList: [[{
      name: '安保部小队长9',
      superior: '安保部员工1',
      type: '物业员工1',
      subordinate: '下级用户组',
      directlyUnder: '胡斐'
    }, {
      name: '安保部小队长1',
      superior: '安保部员工1',
      type: '物业员工1',
      subordinate: '下级用户组',
      directlyUnder: '苗人凤'
    }], [{
      name: '张三',
      username: 'zhangsan',
      job: '安保部长',
      department: '安保部',
      phonenumber: '13333333333',
      id: '1238972937981237'
    }, {
      name: '张三2',
      username: 'zhangsan2',
      job: '安保部长2',
      department: '安保部2',
      phonenumber: '13333333333',
      id: '1238972937981237'
    }], [{
      role: '安保员',
      member: '安保部员工',
      desc: '我是安保员'
    }, {
      role: '安保负责人',
      member: '安保小队长，安保部领导',
      desc: '我是安保负责人'
    }]
    ]
  }
})

Mock.mock(contextPath + '/getDepartmentList', function () {
  console.log('mock getDepartmentList')
  return {
    'pageCount': 0,
    'departmentList': [
      {
        name: '安保部小队长1',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        member: '胡斐',
        userType: 'userType1'
      }, {
        name: '安保部小队长1',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        member: '苗人凤',
        userType: 'userType1'
      }
    ]
  }
})

Mock.mock(contextPath + '/addDepartmentList', function () {
  console.log('mock addDepartmentList')
  return {
    'pageCount': 0,
    'departmentList': [
      {
        name: '安保部小队长3',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }, {
        name: '安保部小队长4',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      },
      {
        name: '安保部小队长5',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }, {
        name: '安保部小队长6',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤'
      }
    ]
  }
})

// 保存添加用户组数据
Mock.mock(contextPath + '/saveDepartmentList', function () {
  console.log('mock saveDepartmentList')
  return {
    'departmentList': [
      {
        name: '安保部小队长10',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐'
      }
    ]
  }
})

Mock.mock(contextPath + '/getDepartmentTreeData', function () {
  console.log('mock getDepartmentTreeData')
  return {
    name: '安保部',
    superior: ['安保部员工', '公司高管', '设备维修'],
    treeData: [{
      id: 1,
      label: '物业全体员工',
      children: [{
        id: 4,
        label: '公司高管'
      }, {
        id: 1,
        label: '设备维修'
      }, {
        id: 2,
        label: '安保部员工',
        children: [{
          id: 5,
          label: '一期安保中队'
        }, {
          id: 6,
          label: '二期安保中队'
        }, {
          id: 7,
          label: '安保中队长'
        }, {
          id: 8,
          label: '安保小队长'
        }]
      }]
    }]
  }
})

Mock.mock(contextPath + '/getDepartmentDetail', function () {
  console.log('mock getDepartmentDetail')
  return {
    code: '0000001',
    type: ['type1', 'type2', 'type3'],
    desc: '用户组描述',
    departmentDetailList: [[{
      name: '安保部小队长9',
      superior: '安保部员工1',
      type: '物业员工1',
      subordinate: '下级用户组',
      member: '胡斐',
      userType: 'userType1'
    }, {
      name: '安保部小队长1',
      superior: '安保部员工1',
      type: '物业员工1',
      subordinate: '下级用户组',
      member: '苗人凤',
      userType: 'userType1'
    }], [{
      name: '张三',
      username: 'zhangsan',
      job: '安保部长',
      department: '安保部',
      phoneNumber: '13333333333',
      id: '1238972937981237'
    }, {
      name: '张三2',
      username: 'zhangsan2',
      job: '安保部长2',
      department: '安保部2',
      phoneNumber: '13333333333',
      id: '1238972937981237'
    }]
    ]
  }
})
// 查询角色
Mock.mock(contextPath + '/usermgmt/role/list', function () {
  console.log('mock getRoleList')
  return {
    'pageCount': 0,
    'roleList': [
      {
        name: '安保员',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '胡斐',
        desc: '保安部员工'
      }, {
        name: '安保负责人',
        superior: '安保部员工1',
        type: '物业员工1',
        subordinate: '下级用户组',
        directlyUnder: '苗人凤',
        desc: '安保部门的各级负责人'
      }
    ]
  }
})
// 查询角色关联用户组
Mock.mock(contextPath + '/usermgmt/role/userGroup', function () {
  console.log('mock getRoleUserGroup')
  return {
    'pageCount': 0,
    'roleList': [
      {
        name: '一期安保部小队长',
        superior: '安保部小队长',
        subordinate: '',
        directlyUnder: '胡斐'
      }, {
        name: '二期安保部小队长',
        superior: '安保部小队长',
        subordinate: '',
        directlyUnder: '苗人凤'
      }
    ]
  }
})
// 查询角色关联用户
Mock.mock(contextPath + '/usermgmt/role/user', function () {
  console.log('mock getRoleUser')
  return {
    'pageCount': 0,
    'roleList': [
      {
        name: '张三',
        userName: 'zhangsan',
        position: '安保部长',
        department: '安保部',
        mobileNum: '15801580158',
        idenNum: '110109198710129988',
        directlyUnder: '胡斐'
      }
    ]
  }
})
// 查询角色资源权限
Mock.mock(contextPath + '/usermgmt/role/resource', function () {
  console.log('mock getRoleResource')
  return {
    'pageCount': 0,
    'roleList': [
      {
        category: '应用程序',
        name: '设备管理',
        location: '',
        operationType: '访问',
        authorityType: '可叠加继承',
        permission: '是',
        logicalAddress: '192.168.2.15',
        URL: 'device.hdzc.com.cn'
      }
    ]
  }
})
// 查询用户
Mock.mock(contextPath + '/usermgmt/user/list?currentPage=1&pageSize=10', function () {
  console.log('mock query user')
  return {
    'pageCount': 2,
    'baseUserVoList': [{
      'uuid': 'uuid001',
      'userName': 'admin001',
      'password': '123456',
      'fullName': '张三',
      'departmentUuid': '1',
      'position': '送水',
      'userAccStatus': '1',
      'idenNum': '430522198808276060',
      'primaryPhone': '15813801922',
      'primaryEmail': '11@qq.com',
      'effectiveDate': '2017-12-22',
      'expiryDate': '2018-12-22'
    }, {
      'uuid': 'uuid002',
      'userName': 'admin002',
      'password': '123456',
      'fullName': '李四',
      'departmentUuid': '2',
      'position': '值夜班',
      'userAccStatus': '2',
      'idenNum': '430522198808276060',
      'primaryPhone': '15813801922',
      'primaryEmail': '11@qq.com',
      'effectiveDate': '2017-12-22',
      'expiryDate': '2018-12-22'
    }]
  }
})
// 添加用户
Mock.mock(contextPath + '/usermgmt/user/createUser', function () {
  console.log('mock create user')
  return {
  }
})
// 删除用户
Mock.mock(contextPath + '/usermgmt/user/deleteUser?uuid=uuid001', function () {
  console.log('mock delete user')
  return {
  }
})
// 修改用户
Mock.mock(contextPath + '/usermgmt/user/update', function () {
  console.log('mock update user')
  return {
  }
})
// 检查用户的唯一性
Mock.mock(contextPath + '/usermgmt/user/checkUserName?userName=admin004', function () {
  console.log('mock check userName')
  return {
    'userNameFlag': false
  }
})
// 获取部门信息
Mock.mock(contextPath + '/usermgmt/maindata/getDictData?dictType=DEPARTMENT', function () {
  console.log('mock get detpartment')
  return {
    departmentOptions: [{
      code: '1',
      label: '安保部'
    }, {
      code: '2',
      label: '维修部'
    }]
  }
})
// 获取用户状态信息
Mock.mock(contextPath + '/usermgmt/maindata/getDictData?dictType=USER_ACC_STATUS', function () {
  console.log('mock get userStatus')
  return {
    userAccStatusOptions: [{
      code: '1',
      label: '正常'
    }, {
      code: '2',
      label: '暂停使用'
    }, {
      code: '3',
      label: '已删除'
    }]
  }
})
// 根据用户唯一标识UUID查询用户情报
Mock.mock(contextPath + '/usermgmt/user/get?uuid=uuid001', function () {
  console.log('mock get data')
  return {
    baseUser: {
      uuid: 'uuid001',
      userName: 'admin001',
      password: '123456',
      fullName: '张三',
      departmentUuid: '1',
      position: '送水',
      idenNum: '430522198808276060',
      effectiveDate: '2018-12-22',
      expiryDate: '2019-12-22',
      userAccStatus: '0',
      primaryPhone: '13882254210',
      primaryEmail: '12345@qq.com'
    },
    contactVoList: [
      {
        uuid: 'test001',
        userUuid: 'uuid001',
        contactType: '1',
        contactTypeName: '手机',
        userContact: '13882254210'
      },
      {
        uuid: 'test002',
        userUuid: 'uuid001',
        contactType: '2',
        contactTypeName: '电邮',
        userContact: '123422225@qq.com'
      }]
  }
})
// 删除联系方式
Mock.mock(contextPath + '/usermgmt/user/deleteUserContact?uuid=test001', function () {
  console.log('mock delete contact')
  return {
  }
})
// 添加联系方式
Mock.mock(contextPath + '/usermgmt/user/createUserContact', function () {
  console.log('mock add contact')
  return {
  }
})
// 获取用户联系方式下拉框信息
Mock.mock(contextPath + '/usermgmt/maindata/getDictData?dictType=CONTACT_TYPE', function () {
  console.log('mock get contactTypeOptions')
  return {
    contactTypeOptions: [{
      code: '1',
      label: '手机'
    }, {
      code: '2',
      label: '电邮'
    }, {
      code: '3',
      label: '办公电话'
    }]
  }
})
// --------------------资源模块数据--------------------
// 查询资源
Mock.mock(contextPath + '/usermgmt/resource/list?currentPage=1&pageSize=10', function () {
  console.log('mock query resource')
  return {
  }
})
// 添加资源
Mock.mock(contextPath + '/usermgmt/resource/create', function () {
  console.log('mock create resource')
  return {
  }
})
// 删除资源
Mock.mock(contextPath + '/usermgmt/resource/delete?uuid=uuid001', function () {
  console.log('mock delete resource')
  return {
  }
})
// 修改资源
Mock.mock(contextPath + '/usermgmt/resource/update', function () {
  console.log('mock update resource')
  return {
  }
})
// 获取资源类型下拉框信息
Mock.mock(contextPath + '/usermgmt/maindata/getDictData?dictType=RESOURCE_TYPE', function () {
  console.log('mock get resourceTypeOptions')
  return {
    resourceTypeOptions: [{
      code: '1',
      label: '程序'
    }, {
      code: '2',
      label: '菜单'
    }, {
      code: '3',
      label: '服务'
    }, {
      code: '4',
      label: '设备组'
    }, {
      code: '5',
      label: '设备'
    }]
  }
})
// 根据资源唯一标识UUID查询用户情报
Mock.mock(contextPath + '/usermgmt/resource/get?uuid=uuid001', function () {
  console.log('mock get data')
  return {
  }
})
