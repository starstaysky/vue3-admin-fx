// 初始化pinia
import { createPinia } from 'pinia'
import type { App } from 'vue'

function setupStore(app: App<Element>) {
  return app.use(createPinia())
}

export default setupStore
