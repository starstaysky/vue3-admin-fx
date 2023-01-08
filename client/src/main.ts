import { createApp } from 'vue'
import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)
  // 初始化注册store
  // 初始化路由
  // 导航守卫
  // 注册全局组件
  // 配置全局错误处理
  // 实力挂载
  app.mount('#app')
}

bootstrap()