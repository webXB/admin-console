/**
 * Created by wangxuanbo on 2019/7/19.
 */
import axios from 'axios'
import Qs from 'qs'
import autoMatchBaseUrl from './autoMatchBaseUrl'

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // TODO 根据后台特定返回码设置用户响应回调
  return response
}, function (error) {
  return Promise.reject(error)
})

function checkStatus (response) {
  if (response) {
    const status = response.status
    if (status === 200 || status === 304 || status === 400) {
      return response
    } else {
      let errorInfo = ''
      switch (status) {
        case -1:
          errorInfo = '远程服务响应失败,请稍后重试'
          break
        case 500:
          errorInfo = '500：访问服务失败'
          break
        case 404:
          errorInfo = '404：资源不存在'
          break
        case 501:
          errorInfo = '501：未实现'
          break
        case 502:
          errorInfo = '502：无效网关'
          break
        case 401:
          errorInfo = '访问令牌无效或已过期'
          break
      }
      return {
        status,
        msg: errorInfo
      }
    }
  }
}

function checkCode (res) {
  const data = res && res.data
  return data
}

export default function _Axios (url, {
  method = 'post',
  timeout = 10000,
  prefix = '',
  data = {},
  headers = {},
  dataType = 'json',
  withCredentials = true
}) {
  const baseURL = autoMatchBaseUrl(prefix)

  headers = Object.assign({
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }, headers)
  const defaultConfig = {
    baseURL,
    url,
    method,
    params: data,
    timeout,
    data,
    headers,
    response: dataType,
    withCredentials
  }
  method === 'get' ? delete defaultConfig.data : delete defaultConfig.params
  const contentType = headers['Content-Type']
  defaultConfig.data['timestamp'] = +new Date()
  if (typeof contentType !== 'undefined') {
    if (contentType.includes('multipart')) {
      //  multipart/form-data
      defaultConfig.data = data
    } else if (contentType.includes('json')) {
      //  application/json
      // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
      defaultConfig.data = JSON.stringify(data)
    } else {
      //  application/x-www-form-unlencoded
      // 服务器收到的raw body(原始数据) name=homeway&key=nokey
      defaultConfig.data = Qs.stringify(data)
    }
  }
  return axios(defaultConfig)
    .then((response) => {
      return checkStatus(response)
    })
    .then((res) => {
      return checkCode(res)
    })
}
