import axios, {AxiosInstance, AxiosResponse } from 'axios'
import { CustomConfig, ResultType } from './type'

/**
 * @description:  axios module
 */
class HttpRequest {
    private instance!: AxiosInstance;
    private config: CustomConfig;

    constructor(config: CustomConfig) {
        this.config = config
        this.init()
    }

    private init(): void {
        // 创建实例
        this.instance = axios.create(this.config)
        this.setupInterceptors()
    }

    /**
     * @description: Interceptor configuration 拦截器配置
     */
    private setupInterceptors(): void {
      const { interceptors = {}} = this.config
      const {
        requestInterceptor, 
        responseInterceptor,
        requestCatchInterceptor,
        responseCatchInterceptor 
      } = interceptors

      if(requestInterceptor) {
        this.instance.interceptors.request.use(requestInterceptor, undefined)
      }
      if(requestCatchInterceptor) {
        this.instance.interceptors.request.use(undefined, requestCatchInterceptor)
      }
      if(responseInterceptor) {
        this.instance.interceptors.response.use(requestInterceptor, undefined)
      }
      if(responseCatchInterceptor) {
        this.instance.interceptors.response.use(undefined, responseCatchInterceptor)
      }
    }

    get<T = any>(url: string, config: CustomConfig): Promise<T> {
        return this.instance.request({url, method: 'GET', ...config})
    }

    post<T = any>(config: CustomConfig = {}): Promise<T> {
      return this.request({url: config.url, method: 'POST', ...config})
    }

    postForm<T = any>(config: CustomConfig = {}): Promise<T> {
      return this.request({formData: true, ...config})
    }
    
    request<T = any>(config: CustomConfig): Promise<T> {
      this.config = Object.assign(this.config, config)
      const { interceptors = {}, formData } = this.config
      const {
        beforeRequestHook, 
        responseHook
      } = interceptors
      if(beforeRequestHook) beforeRequestHook(this.config)
        return new Promise((resolve, reject)=> {
          let request = formData 
                        ? this.instance.postForm<any, AxiosResponse<ResultType>>(this.config.url as any, {data: this.config.data}, config) 
                        : this.instance.request<any, AxiosResponse<ResultType>>(config)
          request.then((data: AxiosResponse<ResultType>)=> {
            // 自定义返回数据
            if(responseHook) {
              try{
                const ret = responseHook(data)
                resolve(ret)
              } catch(err){
                reject(err)
              }
              return
            }
            resolve(data as unknown as Promise<T>)
         }).catch((e)=> {
            reject(e)
         })
        })
    }
}

export default HttpRequest