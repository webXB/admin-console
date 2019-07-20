/**
 * Created by wangxuanbo on 2019/7/19.
 */

/**
 * 深复制
 * @param source
 * @returns {*}
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj = Array.isArray(source) ? [] : {}
  Object.keys(source).map(item => {
    if (source[item] && typeof item === 'object') {
      targetObj[item] = deepClone(source[item])
    } else {
      targetObj[item] = source[item]
    }
  })
  return targetObj
}
