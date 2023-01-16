import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { createVitePlugins } from './build/vite/plugin'
import { wrapperEnv } from './build/utils'
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const isBuild = command === 'build'
  const viteEnv = wrapperEnv(env)
  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/'
        }
      ]
    },
    server: {
      // Load proxy configuration from .env
      proxy: {
        '/dev': 'http://localhost:3002/'
      }
    }
  }
}
