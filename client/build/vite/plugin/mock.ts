import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild: boolean){
    return viteMockServe({
        ignore: /^\_/,
        mockPath: "mock",
        localEnabled: !isBuild,
        prodEnabled: isBuild
    })
}