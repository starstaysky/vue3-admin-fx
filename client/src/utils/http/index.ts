import { AxiosRequestConfig } from 'axios'
import HttpRequest from './core'
import { AxiosInterceptors, CustomConfig, RequestEnum } from './type'
import { deepMerge, isString, joinTimestamp } from '/@/utils/common/index'
import { clone } from 'lodash-es';
/**
 * @description 默认配置
 */ 
const DEFAULT_CONFIG: AxiosRequestConfig = {
    baseURL: `${import.meta.env.VITE_BASE_URL}dev/`,
    timeout: 10000
}
/**
 * @description 基本配置
 */ 
const baseConfig: CustomConfig = {
    widthToken: true,
}
function getToken() {
    return 'fuxing' // TODO
}
/**
 * @description 请求拦截器
 */ 
function requestInterceptor(config: CustomConfig): CustomConfig {
    // 全局loading
    if(config.loading) {
      // TODO loading弹窗
    }
    // 拼接token
    const token = getToken()
    if(config.widthToken && token) {
       (config as Recordable).headers.Authorization = token
    }    
    return config    
}
/**
 * @description 响应拦截器
 */ 
function responseInterceptor(response: CustomConfig) {
    return response 
}
/**
 * @description 请求错误拦截器
 */ 
function requestCatchInterceptor(config: CustomConfig) {
    return config 
}
/**
 * @description 响应错误拦截器
 */ 
function responseCatchInterceptor(response: CustomConfig) {
    return response 
}

// 请求前对config进行处理 处理url，请求参数格式等
function beforeRequestHook(config: CustomConfig): CustomConfig {
    //....get请求添加时间戳
    const {url = '', params = {}, timeStamp = true} = config
    // get请求是否加入时间戳，避免强缓存
    if(config.method?.toUpperCase() === RequestEnum.GET && timeStamp) {
        if(!isString(params)) {
          config.params = Object.assign(params || {}, joinTimestamp(timeStamp, false));
        } else {
            config.url = `${url}params${joinTimestamp(timeStamp, false)}`
            config.params = undefined;
        }
    } 
    return config
}
// 处理返回数据的hook，如code码提示error优化等
function responseHook() {
    //....来处理loading弹窗
}


const interceptors: AxiosInterceptors = {
    beforeRequestHook,
    requestInterceptor,
    responseInterceptor,
    requestCatchInterceptor,
    responseCatchInterceptor,
    responseHook,
}
/**
 * @description 请求实例
 */ 
const createHttpRequest = function(opt = {}) {
    const config: any = deepMerge({
        interceptors: clone(interceptors),
       ...DEFAULT_CONFIG,
       ...baseConfig
    }, opt)
    return new HttpRequest(config)
}

/**
 * @description service实例
 */ 
export const service = createHttpRequest()
