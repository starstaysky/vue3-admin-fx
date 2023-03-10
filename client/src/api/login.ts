import request from '/@/utils/http/index'

enum Api {
    Login = '/login',
    Logout = '/logout',
    GetUserInfo = '/getUserInfo',
    GetPermCode = '/getPermCode',
    TestRetry = '/testRetry',
  }
export function isLogin() {
    return request.get(Api.Login, {})
}