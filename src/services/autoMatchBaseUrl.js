/**
 * Created by wangxuanbo on 2019/7/19.
 */

export default function autoMatchBaseUrl (prefix) {
  let baseUrl = ''
  switch (prefix) {
    default:
      baseUrl = window.LOCAL_CONFIG.API_HOME
  }
  return `${baseUrl}`
}
