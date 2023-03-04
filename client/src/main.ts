import { createApp } from 'vue'
import App from './App.vue'
import setupStore from '/@/stores'
import setupRouter from '/@/router'

async function bootstrap() {
  const app = createApp(App)
  // 初始化注册store
  setupStore(app)
  // 配置路由
  setupRouter(app)
  // 导航守卫
  // 注册全局组件
  // 配置全局错误处理
  // 实力挂载
  app.mount('#app')

  return app
}

bootstrap()
