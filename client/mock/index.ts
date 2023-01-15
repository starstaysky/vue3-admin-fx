import { MockMethod } from 'vite-plugin-mock';
import { menu, user } from './data'
import { ResultSuccess } from './_utils';

export default [
    {
        url: '/dev/login',
        method: 'post',
        response:()=> {
           return ResultSuccess(user)
        }
    }
] as MockMethod[]