import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import routes from './routes.js'
import { clearAuthSession, getAuthToken, getAuthUser } from '../utils/auth.js'
import { getDashboardPath } from '../utils/roles.js'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: to =>
      to.hash ? { el: to.hash, behavior: 'smooth' } : { left: 0, top: 0 },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE)
  })

  Router.beforeEach(to => {
    const token = getAuthToken()
    const user = token ? getAuthUser() : null
    const isAuthenticated = Boolean(
      token && user && getDashboardPath(user.role) !== '/login'
    )

    if (token && !isAuthenticated) {
      clearAuthSession()
    }

    if (to.meta.requiresAuth && !isAuthenticated) {
      return {
        path: '/login',
        query: { redirect: to.fullPath }
      }
    }

    if (to.meta.guestOnly && isAuthenticated) {
      return getDashboardPath(user?.role)
    }

    if (to.path === '/' && isAuthenticated) {
      return getDashboardPath(user?.role)
    }

    if (to.meta.roles && !to.meta.roles.includes(user?.role)) {
      return user?.role ? getDashboardPath(user.role) : '/login'
    }

    return true
  })

  return Router
})
