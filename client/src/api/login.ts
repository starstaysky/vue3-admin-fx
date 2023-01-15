import { service } from '../utils/http/index'
import { getLoginModel } from '/@/api/model/loginModel'

enum Api {
  /**
   * 登录 
   */
  Login = '/dev/login'
}
export function isLogin() {
    return service.postForm<getLoginModel>({url: Api.Login,data: {a: 1, b: 1}})
}