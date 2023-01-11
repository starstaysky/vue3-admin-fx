import axios, {AxiosRequestConfig, AxiosInstance, AxiosPromise, AxiosResponse } from 'axios'

/**
 * @description:  axios module
 */
class HttpRequest {
    private instance!: AxiosInstance;
    private config: AxiosRequestConfig;

    constructor(config: AxiosRequestConfig) {
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
      this.instance.interceptors.request.use(function (config) {
          return config;
        }, function (error) {
          return Promise.reject(error);
        })
      this.instance.interceptors.response.use(function (response: AxiosResponse) {
          const { data } = response
          if(data?.success) return data
          return Promise.reject(data)
        }, function (error) {
          return Promise.reject(error);
        });
    }

    get<T = any>(url: string, config: AxiosRequestConfig): Promise<T>{
        return this.instance.request({url, method: 'GET', ...config})
    }

    post<T = any>(url: string, config: AxiosRequestConfig): Promise<T>{
      return this.instance.request({url, method: 'POST', ...config})
    }

    request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.instance.request(config)
    }
}

export default HttpRequest