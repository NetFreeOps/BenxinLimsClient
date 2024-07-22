import { LogoutIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/permissionManager',
    component: Layout,
    redirect: '/permissionManager/analysis',
    name: 'permissionManager',
    meta: { title: '权限管理', icon: shallowRef(LogoutIcon) },
    children: [
      {
        path: 'workShop',
        name: 'workShop',
        component: () => import('@/pages/permissionManager/workShop/index.vue'),
        meta: { title: '公司管理' }
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('@/pages/permissionManager/group/index.vue'),
        meta: { title: '部门管理' },
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/pages/permissionManager/role/index.vue'),
        meta: { title: '角色管理' },
      },
      {
        path: 'limsuser',
        name: 'limsuser',
        component: () => import('@/pages/permissionManager/limsuser/index.vue'),
        meta: { title: '用户管理' },
      },

    ],
  },
];
