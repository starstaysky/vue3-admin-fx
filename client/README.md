# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

-   [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## 初始化项目

### TODO LIST

-   二次封装 axios
    -   类封装 httpRequest 对象：1 支持实例化多个 axios；2 config 可动态配置；3 动态配置拦截器；4 typescript 支持 5 登录处理 6 支持多环境配置
-   添加 src 别名"/@/"
-   client 端支持 typescript
-   接入 MOCK

    > 1. .evn VITE_USE_MOCK 根据环境配置 mock 开关，优先级高于 viteMockServe 的 localEnabled， prodEnabled 配置。开发环境可关闭后，使用代理服务。
    > 2. build/vite/plugin/mock.ts

    ```js
    /**
     * 使用vite-plugin-mock插件，viteMockServe函数添加配置
     */
    import { viteMockServe } from 'vite-plugin-mock'

    export function configMockPlugin(isBuild: boolean) {
        return viteMockServe({
            ignore: /^\_/, //忽略目录
            mockPath: 'mock',
            localEnabled: !isBuild, // 是否启用mock
            prodEnabled: isBuild,
        })
    }
    ```

    > 3.  mock

    ```js
    /**
      * index目录   定义每一次请求相关数据：reques:url,method...和response
      * data目录    定义数据
      * utils目录   定义返回数据处理函数等工具方法
      */
    import { MockMethod } from 'vite-plugin-mock';
    import { menu, user } from './data'
    import { ResultSuccess } from './_utils';

    export default [
        {
            url: '/dev/login',
            method: 'get',
            response:()=> {
               return ResultSuccess(user)
            }
        }
    ] as MockMethod[]
    ```

-   初始化 store
-   初始化 router
-   登录（导航守卫）
-   菜单
-   全局错误处理
