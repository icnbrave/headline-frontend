import Axios from '@/assets/js/AxiosPlugin'

let contextPath = '/scp-usermgmtcomponent'
// 接口地址
const BASE_PATH = '/scp-devicemgmtcomponent/register/'

export const getUserGroupList = () => {
  return Axios.get(contextPath + '/usermgmt/usergroup/list'
  ).then(res => res.data)
}
// 获取添加用户组select数据
export const addUserGroupList = () => {
  return Axios.get(contextPath + '/addUserGroupList'
  ).then(res => res.data)
}

// 保存添加用户组数据
export const saveUserGroupList = () => {
  return Axios.get(contextPath + '/saveUserGroupList'
  ).then(res => res.data)
}

export const getTreeData = () => {
  return Axios.get(contextPath + '/getTreeData'
  ).then(res => res.data)
}

export const getUserGroupDetail = () => {
  return Axios.get(contextPath + '/getUserGroupDetail'
  ).then(res => res.data)
}

export const getDepartmentList = () => {
  return Axios.get(contextPath + '/getDepartmentList'
  ).then(res => res.data)
}
// 获取添加部门select数据
export const addDepartmentList = () => {
  return Axios.get(contextPath + '/addDepartmentList'
  ).then(res => res.data)
}

// 保存添加部门数据
export const saveDepartmentList = () => {
  return Axios.get(contextPath + '/saveDepartmentList'
  ).then(res => res.data)
}

export const getDepartmentTreeData = () => {
  return Axios.get(contextPath + '/getDepartmentTreeData'
  ).then(res => res.data)
}

export const getDepartmentDetail = () => {
  return Axios.get(contextPath + '/getDepartmentDetail'
  ).then(res => res.data)
}

// -----------------  角色接口 ----------------
// 查询角色
export const getRoleList = () => {
  return Axios.get(contextPath + '/usermgmt/role/list'
  ).then(res => res.data)
}

// 查询角色关联用户组
export const getRoleUserGroup = () => {
  return Axios.get(contextPath + '/usermgmt/role/userGroup'
  ).then(res => res.data)
}

// 查询角色关联用户
export const getRoleUser = () => {
  return Axios.get(contextPath + '/usermgmt/role/user'
  ).then(res => res.data)
}

// 查询角色资源权限
export const getRoleResource = () => {
  return Axios.get(contextPath + '/usermgmt/role/resource'
  ).then(res => res.data)
}

// -----------------  用户接口 ----------------
// 新增用户
export const createUser = (data) => {
  return Axios.post(contextPath + '/usermgmt/user/createUser', data
  ).then(res => res.data)
}
// 删除用户信息
export const deleteUser = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/user/deleteUser?uuid=' + uuid
  ).then(res => res.data)
}
// 修改用户信息
export const updateUser = (data) => {
  return Axios.post(contextPath + '/usermgmt/user/update', data
  ).then(res => res.data)
}
// 根据用户唯一标识UUID查询用户情报
export const getUserDetail = (uuid) => {
  console.log('<<<<<uuid:' + uuid)
  return Axios.get(contextPath + '/usermgmt/user/get?uuid=' + uuid
  ).then(res => res.data)
}
// 查询用户列表信息
export const getUserListByPage = (listQuery) => {
  console.log('<<<<<q_userName:' + listQuery.q_userName)
  console.log('<<<<<q_fullName:' + listQuery.q_fullName)
  console.log('<<<<<q_primaryPhone:' + listQuery.q_primaryPhone)
  console.log('<<<<<listQuery.page:' + listQuery.page)
  console.log('<<<<<listQuery.limit:' + listQuery.limit)
  return Axios.get(contextPath + '/usermgmt/user/list?currentPage=' + listQuery.page + '&pageSize=' + listQuery.limit
  // '&userName=' + listQuery.q_userName + '&fullName=' + listQuery.q_fullName + '&primaryPhone=' + listQuery.q_primaryPhone
  ).then(res => res.data)
}
// 校验用户名是否唯一
export const checkUserName = (userName) => {
  return Axios.post(contextPath + '/usermgmt/user/checkUserName?userName=' + userName
  ).then(res => res.data)
}
// 获取部门下拉框
export const getDepartmentOptions = (dictData) => {
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=' + dictData.departmentDict
  ).then(res => res.data)
}
// 获取用户状态下拉框
export const getUserStatusOptions = (dictData) => {
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=' + dictData.userStatusDict
  ).then(res => res.data)
}
// 删除联系方式信息
export const deleteUserContact = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/user/deleteUserContact?uuid=' + uuid
  ).then(res => res.data)
}
// 新增联系方式
export const createUserContact = (data) => {
  return Axios.post(contextPath + '/usermgmt/user/createUserContact', data
  ).then(res => res.data)
}
// 获取用户联系方式下拉框信息
export const getContactTypeOptions = (dictData) => {
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=' + dictData.contactTypeDict
  ).then(res => res.data)
}
// -----------------------------资源相关接口-------------------------
// 查询资源列表信息
export const getResourceListByPage = (listQuery) => {
  console.log('<<<<<q_resourceType:' + listQuery.q_resourceType)
  console.log('<<<<<q_resourceName:' + listQuery.q_resourceName)
  console.log('<<<<<q_logicalAddress:' + listQuery.q_logicalAddress)
  console.log('<<<<<listQuery.page:' + listQuery.page)
  console.log('<<<<<listQuery.limit:' + listQuery.limit)
  return Axios.get(contextPath + '/usermgmt/resource/list?currentPage=' + listQuery.page + '&pageSize=' + listQuery.limit
  // '&userName=' + listQuery.q_userName + '&fullName=' + listQuery.q_fullName + '&primaryPhone=' + listQuery.q_primaryPhone
  ).then(res => res.data)
}
// 新增资源
export const createResource = (data) => {
  return Axios.post(contextPath + '/usermgmt/resource/create', data
  ).then(res => res.data)
}
// 删除资源信息
export const deleteResource = (uuid) => {
  return Axios.post(contextPath + '/usermgmt/resource/delete?uuid=' + uuid
  ).then(res => res.data)
}
// 修改资源信息
export const updateResource = (data) => {
  return Axios.post(contextPath + '/usermgmt/resource/update', data
  ).then(res => res.data)
}
// 根据资源唯一标识UUID查询资源情报
export const getResourceDetail = (uuid) => {
  console.log('<<<<<uuid:' + uuid)
  return Axios.get(contextPath + '/usermgmt/resource/get?uuid=' + uuid
  ).then(res => res.data)
}
// 获取资源类型下拉框信息
export const getResourceTypeOptions = (dictData) => {
  return Axios.get(contextPath + '/usermgmt/maindata/getDictData?dictType=' + dictData.resourceTypeDict
  ).then(res => res.data)
}
// 获取主设备类型
export const getDeviceTypeOptions = (params) => {
  return Axios.get(BASE_PATH + 'getDeviceTypeList'
  ).then(res => res.data)
}
// 获取厂商编码
export const getProviderCodeTypeOptions = () => {
  return Axios.get(BASE_PATH + 'getProviderList'
  ).then(res => res.data)
}
