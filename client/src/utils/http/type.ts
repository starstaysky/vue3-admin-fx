import { AxiosRequestConfig } from 'axios'

/**
 * 后端返回数据格式 
 */
export interface ResultType<T = any> {
    /**
     * 数据
     */
    data: T;
    /**
     * 是否成功
     */
    success: boolean;
    /**
     * code
     */
    code: number;
    /**
     * 提示信息
     */
    message: number
}
/**
 * 拦截器类型
 */
type IInterceptorFn<V = any>= ((value: V) => V | Promise<V>) | null;

/**
 * 拦截器相关（请求前后拦截和数据处理）
 */
export interface AxiosInterceptors {
    /**
     * 请求前勾子
     */
    beforeRequestHook?: IInterceptorFn;
    /**
     * 请求拦截器
     */
    requestInterceptor?: IInterceptorFn;
    /**
     * 请求错误拦截器
     */
    requestCatchInterceptor?: IInterceptorFn;
    /**
     * 相应拦截器
     */
    responseInterceptor?: IInterceptorFn;
    /**
     * 相应错误拦截器
     */
    responseCatchInterceptor?: IInterceptorFn;
    /**
     * 请求后勾子
     */
    responseHook?: IInterceptorFn
}

/**
 * 自定义requestconfig
 */
export interface CustomConfig extends AxiosRequestConfig {
    /**
     * 是否携带token
     */
    widthToken?: boolean;
    /**
     * 是否展示loading
     */
    loading?: boolean;
    /**
     * 拦截器做数据拼接和请求拦截
     */
    interceptors?: AxiosInterceptors,
    /**
     * get请求是否加入时间戳
     */
    timeStamp?: boolean,
    /**
     * post请求是否formData格式
     */    
    formData?: boolean
}

export enum RequestEnum {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELET = 'DELETE'
}