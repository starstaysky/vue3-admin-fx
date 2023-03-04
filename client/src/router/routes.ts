import type { RouteRecordRaw } from 'vue-router'
// @ts-ignore
import route from '~pages'

const NOT_FOUND_PAGE = [
  {
    name: 'NotFound',
    path: '/404',
    component: () => import('/@/views/NotFound/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const routes: RouteRecordRaw[] = [...route, ...NOT_FOUND_PAGE]
console.log(routes)

export default routes
