/**
 * Created by wangxuanbo on 2019/7/19.
 */
import Cookies from 'js-cookie'

const TOKEN = 'SESSION'

export function getToken () {
  return Cookies.get(TOKEN)
}

export function setToken (token) {
  return Cookies.set(TOKEN, token)
}

export function removeToken () {
  Cookies.remove(TOKEN)
}
