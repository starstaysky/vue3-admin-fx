import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configMockPlugin } from './mock'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv
  const plugin: (PluginOption | PluginOption[])[] = [vue()]
  // vite-plugin-mock
  VITE_USE_MOCK && plugin.push(configMockPlugin(isBuild))
  return plugin
}
