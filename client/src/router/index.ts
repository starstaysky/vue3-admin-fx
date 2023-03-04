// 设置路由
import { createRouter, createWebHistory } from 'vue-router'
// import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  // 应该添加到路由的初始路由列表。
  routes,
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
const setupRouter = function (app: App<Element>) {
  app.use(router)
}

export default setupRouter
