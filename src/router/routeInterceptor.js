import router from './index'
import { getToken } from '@/utils/cookie'

const whiteList = []

router.beforeEach((to, from, next) => {
  if (getToken() && getToken() !== undefined) {
    //  判断是否有token
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      //  TODO 重定向
      next()
    }
  }
})
