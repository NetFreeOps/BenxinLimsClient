import { useRoute, createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import uniq from 'lodash/uniq';

// 自动导入modules文件夹下所有ts文件
//const modules = import.meta.globEager('./modules/**/*.ts');

const permission = import.meta.globEager('./modules/permission.ts');
const system = import.meta.globEager('./modules/system.ts');
const  base = import.meta.globEager('./modules/base.ts');
const components = import.meta.globEager('./modules/components.ts');
const iframe = import.meta.globEager('./modules/iframe.ts');
const others = import.meta.globEager('./modules/others.ts');

const modules = {
  ...permission,
  ...system,
  ...base,
  ...components,
  ...iframe,
  ...others,
};

console.warn('modules', modules);
//debugger;

// 路由暂存
const routeModuleList: Array<RouteRecordRaw> = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// 关于单层路由，meta 中设置 { single: true } 即可为单层路由，{ hidden: true } 即可在侧边栏隐藏该路由

// 存放动态路由
export const asyncRouterList: Array<RouteRecordRaw> = [...routeModuleList];

// 存放固定的路由
const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/dashboard/base',
  },
  {
    path: '/:w+',
    name: '404Page',
    redirect: '/result/404',
  },
];

export const allRoutes = [...defaultRouterList, ...asyncRouterList];

export const getRoutesExpanded = () => {
  const expandedRoutes = [];

  allRoutes.forEach((item) => {
    if (item.meta && item.meta.expanded) {
      expandedRoutes.push(item.path);
    }
    if (item.children && item.children.length > 0) {
      item.children
        .filter((child) => child.meta && child.meta.expanded)
        .forEach((child: RouteRecordRaw) => {
          expandedRoutes.push(item.path);
          expandedRoutes.push(`${item.path}/${child.path}`);
        });
    }
  });
  return uniq(expandedRoutes);
};

export const getActive = (maxLevel = 5): string => {
  const route = useRoute();
  if (!route) { // 防止 route 未定义或为 null
    return '';
  }
  if (!route.path) {
    return '';
  }
  return route.path
    .split('/')
    .filter((_item: string, index: number) => index <= maxLevel && index > 0)
    .map((item: string) => `/${item}`)
    .join('');
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
