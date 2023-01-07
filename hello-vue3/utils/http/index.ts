import { AxiosRequestConfig } from 'axios'
import HttpRequest from './core'

const DEFAULT_CONFIG: AxiosRequestConfig = {
    baseURL: 'http://localhost:8080/',
    timeout: 10000
}

export default new HttpRequest(DEFAULT_CONFIG)