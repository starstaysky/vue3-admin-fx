import { cloneDeep } from 'lodash-es'
const toString = Object.prototype.toString

// 深拷贝
export function deepMerge<T>(src: any = {}, target: any = {}): T {
  let key: string
  const res = cloneDeep(src)
  for (key in res) {
    res[key] = isObject(res[key])
      ? deepMerge(res[key], target[key])
      : (res[key] = target[key])
  }
  return res
}
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {}
  }
  const now = new Date().getTime()
  if (restful) {
    return `?_t=${now}`
  }
  return { _t: now }
}
