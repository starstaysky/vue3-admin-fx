# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

# 初始化项目

## LIST

- 二次封装 [axios](https://github.com/axios/axios)
  - 封装 httpRequest 对象：
    - 1 支持实例化多个 axios；
    - 2 config 动态配置；
      - 动态配置拦截器
        - beforeRequestHook 请求发出前勾子（统一 config 格式）
        - requestInterceptor 请求拦截器（请求前对 config 进行处理，如给 header 添加 token）
        - requestCatchInterceptor 请求错误拦截器
        - responseInterceptor 响应拦截器
        - requestCatchInterceptor 响应错误拦截器
        - requestHook 请求成功勾子 （统一 response 格式）
      - 动态配置 token
      - 请求 loading 全局配置
      - 接口级别 mock， 修改 vite-plugin-mock 插件 TODO
    - 3 typescript 支持;
    - 4 登录处理;
    - 5 支持多环境配置;
    - 6 特点：支持 get | post | request | postForm，接口级别勾子函数
- 添加 src 别名"/@/"
- client 端支持 typescript
- 接入 MOCK [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock)

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
      prodEnabled: isBuild
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
  import { MockMethod } from "vite-plugin-mock";
  import { menu, user } from "./data"
  import { ResultSuccess } from "./_utils";

  export default [
      {
          url: "/dev/login",
          method: "get",
          response:()=> {
             return ResultSuccess(user)
          }
      }
  ] as MockMethod[]
  ```

- 初始化 store TODO
- 初始化 router TODO
- 导航守卫 TODO
- 登录 TODO
- 菜单 TODO
- 全局错误处理 TODO
- env 环境配置[vite](https://vitejs.bootcss.com/guide/env-and-mode.html#env-variables)

  > 1 环境变量文件

  - .env base 环境变量配置
  - .env.[string] 不同环境配置 --mode 匹配 (vite --mode production)

  > 2 环境变量处理

  - 原理：通过读取 process.env，并挂其上

  - loadEnv: 方法获取格式化的环境变量

    ```js
    /**
     * @param mode --mode对应的值 production， development
     * @param root .env对应的目录
     * @description 根据.env读取字符串，完成环境变量拼接
     */
    const env = loadEnv(mode, root)
    /**
     * @param envConf loadEnv返回的proces.env
     * @description 对env进行处理，如boolean，获取到的为string类型，转换为正确类型。
     */
    export function wrapperEnv(envConf: Recordable): ViteEnv {
      const ret: any = {}

      for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, "\n")
        realName =
          realName === "true" ? true : realName === "false" ? false : realName

        if (envName === "VITE_PORT") {
          realName = Number(realName)
        }
        if (envName === "VITE_PROXY" && realName) {
          try {
            realName = JSON.parse(realName.replace(/"/g, """))
          } catch (error) {
            realName = ""
          }
        }
        ret[envName] = realName
        if (typeof realName === "string") {
          process.env[envName] = realName
        } else if (typeof realName === "object") {
          process.env[envName] = JSON.stringify(realName)
        }
      }
      return ret
    }
    ```

  - client 端获取（tip: 为了防止所有 env 中的变量都被前端获取，vite 做了一层拦截，可配置 envPrefix，默认 VITE\_）
    - import.meta.env 挂载环境变量
    - vite.config.ts/envPrefix 可配置自定义的环境变量前缀

- 规范

  - [prettier](https://www.prettier.cn/docs/option-philosophy.html)

    - 如何安装

      - 这个项目包含 sever 和 client 两个目录，所以配置在根目录下

      ```
      yarn add prettier lint-staged husky --dev
      ```

    - vscode 集成

      - 安装 Prettier - Code formatter VSC 插件
      - setting.json

        ```
        "editor.defaultFormatter": "esbenp.prettier-vscode"
        ```

    - prettier config

      - .prettierrc (本项目)

        ```
        semi（分号）: false
        singleQuote（单引号）: true
        printWidth: 80
        trailingComma: "none"
        arrowParens: "avoid"
        ```

      - .prettierignore

        ```
        /dist/\*

        .local
        .output.js
        /node_modules/\*\*

        **/\*.svg
        **/\*.sh
        /public/\*

        ```

    - prettier 相关命令

      ```
         prettier -c filename 判断是否格式化
         prettier --write . 格式化全部
         prettier --write 格式化ignore外
      ```

    - 为什么用 prettier
      - 基本的格式化，而不是解决 bug，其他交给 linters

  - lint-staged
  - [eslint](http://eslint.cn/)

    - 接入
      ```
       yarn add eslint --dev
       eslint --init
       touch .eslintrc
      ```
    - [vs prettier](https://www.prettier.cn/docs/related-projects.html)
      防止冲突
      ```
       yarn add eslint-config-prettier --dev
      ```
    - 配置

      - eslint.config.js

        ```json
        {
          "env": {
            "browser": true,
            "node": true,
            "es6": true
          },
          "extends": [
            "plugin:vue/vue3-recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:prettier/recommended"
          ],
          "parser": "vue-eslint-parser",
          "parserOptions": {
            "parser": "@typescript-eslint/parser",
            "ecmaVersion": 2020,
            "sourceType": "module"
          },
          "rules": {}
        }
        ```

    - 集成 vscode

      - elsint 插件

      - setting.json 配置

      ```json
      {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "files.autoSave": "afterDelay",
        "files.autoSaveDelay": 200,
        "eslint.alwaysShowStatus": true,
        "vetur.validation.template": false,
        "vetur.useWorkspaceDependencies": true,
        "liveServer.settings.donotShowInfoMsg": true,
        "editor.formatOnSave": true,
        "window.zoomLevel": 1,
        "eslint.format.enable": true,
        "vetur.format.defaultFormatter.js": "vscode-typescript",
        "vetur.format.options.useTabs": true,
        "vetur.format.scriptInitialIndent": true,
        "vetur.validation.script": false
      }
      ```

  - husky
  - stylelint

    - 安装
      stylelint.config.js

      ```js
      module.exports = {
        root: true,
        plugins: ['stylelint-order'],
        extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
        customSyntax: 'postcss-html',
        rules: {
          'function-no-unknown': null,
          'selector-class-pattern': null,
          'selector-pseudo-class-no-unknown': [
            true,
            {
              ignorePseudoClasses: ['global']
            }
          ],
          'selector-pseudo-element-no-unknown': [
            true,
            {
              ignorePseudoElements: ['v-deep']
            }
          ],
          'at-rule-no-unknown': [
            true,
            {
              ignoreAtRules: [
                'tailwind',
                'apply',
                'variants',
                'responsive',
                'screen',
                'function',
                'if',
                'each',
                'include',
                'mixin'
              ]
            }
          ],
          'no-empty-source': null,
          'string-quotes': null,
          'named-grid-areas-no-invalid': null,
          'unicode-bom': 'never',
          'no-descending-specificity': null,
          'font-family-no-missing-generic-family-keyword': null,
          'declaration-colon-space-after': 'always-single-line',
          'declaration-colon-space-before': 'never',
          // 'declaration-block-trailing-semicolon': 'always',
          'rule-empty-line-before': [
            'always',
            {
              ignore: ['after-comment', 'first-nested']
            }
          ],
          'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
          'order/order': [
            [
              'dollar-variables',
              'custom-properties',
              'at-rules',
              'declarations',
              {
                type: 'at-rule',
                name: 'supports'
              },
              {
                type: 'at-rule',
                name: 'media'
              },
              'rules'
            ],
            { severity: 'warning' }
          ]
        },
        ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
        overrides: [
          {
            files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
            extends: ['stylelint-config-recommended'],
            rules: {
              'keyframes-name-pattern': null,
              'selector-pseudo-class-no-unknown': [
                true,
                {
                  ignorePseudoClasses: ['deep', 'global']
                }
              ],
              'selector-pseudo-element-no-unknown': [
                true,
                {
                  ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
                }
              ]
            }
          },
          {
            files: ['*.less', '**/*.less'],
            customSyntax: 'postcss-less',
            extends: [
              'stylelint-config-standard',
              'stylelint-config-recommended-vue'
            ]
          }
        ]
      }
      ```

    - husky 配置

      ```
      "lint:stylelint": "stylelint --cache --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/"

      ```

  - commit 规范

## 功能模块
