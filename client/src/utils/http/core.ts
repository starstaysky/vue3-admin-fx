import axios, {AxiosRequestConfig, AxiosInstance, AxiosPromise, AxiosResponse } from 'axios'


class HttpRequest {
    instance!: AxiosInstance;
    config: AxiosRequestConfig;
    constructor(config: AxiosRequestConfig) {
        this.config = config
        this.init()
    }
    init(): void {
        // 创建实例
        this.instance = axios.create(this.config)
        this.setIntercdeptor()
    }
    get(url: string, config: AxiosRequestConfig): AxiosPromise | Promise<any>{
        return this.instance? this.instance.get(url, config) : Promise.resolve()
    }
    setIntercdeptor(): void {
        this.instance.interceptors.request.use(function (config) {
            // Do something before request is sent
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          })
        this.instance.interceptors.response.use(function (response: AxiosResponse) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
          }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
          });
    }
}

export default HttpRequest