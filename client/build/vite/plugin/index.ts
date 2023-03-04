import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configMockPlugin } from './mock'
import Pages from 'vite-plugin-pages'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv
  const plugin: (PluginOption | PluginOption[])[] = [vue()]
  // vite-plugin-mock
  VITE_USE_MOCK && plugin.push(configMockPlugin(isBuild))
  // vite-plugin-pages
  plugin.push(
    Pages({ pagesDir: 'src/views', exclude: ['**/components/*.vue'] })
  )
  return plugin
}
