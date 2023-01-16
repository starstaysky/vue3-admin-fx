declare interface ViteEnv {
  /**
   ** 请求base api
   */
  VITE_BASE_URL: string
  /**
   ** 是否开启mock
   **/
  VITE_USE_MOCK: boolean
}

declare type Recordable<T = any> = Record<string, T>
