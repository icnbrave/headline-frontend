import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
// const BASE_PATH = process.env.API_URL

let contextPath = '/daren/headline'
export const getOneHeadline = headlinePk => {
  return Axios.get(contextPath + '/get?headlinePk=' + headlinePk).then(res => res.data)
}
export const splitHeadlinesAndReturn = data => {
  return Axios.post(contextPath + '/split').then(res => res.data)
}
export const constructHeadlinesAndReturn = data => {
  return Axios.post(contextPath + '/construct', data).then(res => res.data)
}
export const getHeadlinesByPage = data => {
  return Axios.post(contextPath + '/queryPageData', data).then(res => res.data)
}
export const softItemDelete = headlinePk => {
  return Axios.get(contextPath + '/softdelete?headlinePk=' + headlinePk).then(res => res.data)
}
export const batchDelete = headlinePks => {
  return Axios.post(contextPath + '/batchdelete', headlinePks).then(res => res.data)
}
export const updateHeadline = data => {
  return Axios.post(contextPath + '/update', data).then(res => res.data)
}

export const exportAndDownloadHeadlines = data => {
  return Axios.post(contextPath + '/export', data).then(res => {
    let blob = new Blob([res.data], {type: 'Files'})
    let filename = 'export.txt'
    if (navigator.appVersion.toString().indexOf('.NET') > 0) {
      window.navigator.msSaveBlob(blob, filename)
    } else {
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    return res.data
  })
}
