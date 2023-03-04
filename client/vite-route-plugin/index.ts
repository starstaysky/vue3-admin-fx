import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/dev/login',
    method: 'post',
    response: () => {
      return ResultSuccess(user)
    }
  }
] as MockMethod[]
