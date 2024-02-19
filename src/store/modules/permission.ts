import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import router, { asyncRouterList } from '@/router';
import { store } from '@/store';

/**
 * 过滤权限路由
 * @param routes 路由列表
 * @param roles 权限列表
 * @returns {accessedRouters: Array<RouteRecordRaw>, removeRoutes: Array<RouteRecordRaw>}
 */
function filterPermissionsRouters(routes: Array<RouteRecordRaw>, roles: Array<unknown>) {
  const res = [];
  const removeRoutes = [];
  routes.forEach((route) => {
    const children = [];
    route.children?.forEach((childRouter) => {
      const roleCode = childRouter.meta?.roleCode || childRouter.name;
      if (roles.indexOf(roleCode) !== -1) {
        children.push(childRouter);
      } else {
        removeRoutes.push(childRouter);
      }
    });
    if (children.length > 0) {
      route.children = children;
      res.push(route);
    }
  });
  return { accessedRouters: res, removeRoutes };
}

/**
 * 使用pinia定义权限存储
 */
export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login'],
    routers: [],
    removeRoutes: [],
  }),
  actions: {
    /**
     * 初始化路由
     * @param roles 权限列表
     */
    async initRoutes(roles: Array<unknown>) {
      let accessedRouters = [];

      let removeRoutes = [];
      // // 特殊token
      // if (roles.includes('all')) {
      //   accessedRouters = asyncRouterList;
      // } else {
      //   const res = filterPermissionsRouters(asyncRouterList, roles);
      //   accessedRouters = res.accessedRouters;
      //   removeRoutes = res.removeRoutes;
      // }

      accessedRouters = asyncRouterList;

      this.routers = accessedRouters;
      this.removeRoutes = removeRoutes;

      removeRoutes.forEach((item: RouteRecordRaw) => {
        if (router.hasRoute(item.name)) {
          router.removeRoute(item.name);
        }
      });
    },
    /**
     * 恢复路由
     */
    async restore() {
      this.removeRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item);
      });
    },
  },
});

/**
 * 获取权限存储
 * @returns {usePermissionStore}
 */
export function getPermissionStore() {
  return usePermissionStore(store);
}