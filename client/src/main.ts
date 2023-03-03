import { createApp } from 'vue'
import App from './App.vue'
import pinia from '/@/stores'

async function bootstrap() {
  const app = createApp(App)
  // 初始化注册store
  app.use(pinia)
  // 初始化路由
  // 导航守卫
  // 注册全局组件
  // 配置全局错误处理
  // 实力挂载
  app.mount('#app')

  return app
}

bootstrap()
