/**
 * Created by wangxuanbo on 2019/7/19.
 */

import Axios from './_axios'
import urls from './RESTFULLURL'

const FUNS = {}

Object.keys(urls).forEach((key) => {
  FUNS[key] = (options = {}) => Axios(urls[key], options)
})

export default FUNS
