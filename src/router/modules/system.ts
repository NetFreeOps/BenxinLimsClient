import { LogoutIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue'; import components from '@/locales/lang/en_US/components';
'@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/workflow',
    component: Layout,
    redirect: '/workflow/',
    name: 'workflow',
    meta: { title: '工作流', icon: shallowRef(LogoutIcon) },
    children: [
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/pages/workflow/edit.vue'),
        meta: { title: '编辑' },
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/pages/workflow/index.vue'),
        meta: { title: '工作流' },
      }]

  },
  {
    path: '/systemManager',
    component: Layout,
    redirect: '/systemManager/analysis',
    name: 'systemManager',
    meta: { title: '系统管理', icon: shallowRef(LogoutIcon) },
    children: [
      {
        path: 'configCenter',
        name: 'configCenter',
        conponent: () => import('@/pages/systemManager/configCenter/index.vue'),
        meta: { title: '配置中心' }
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: () => import('@/pages/systemManager/analysis/index.vue'),
        meta: { title: '分析管理' },
      },
      {
        path: 'testlist',
        name: 'testlist',
        component: () => import('@/pages/systemManager/testList/index.vue'),
        meta: { title: '检测单管理' }
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/pages/systemManager/product/index.vue'),
        meta: { title: '产品管理' },
      },
      {
        path: 'processunit',
        name: 'processunit',
        component: () => import('@/pages/systemManager/processUnit/index.vue'),
        meta: { title: '装置管理' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/pages/systemManager/list/index.vue'),
        meta: { title: '列表管理' }
      }

    ],
  },
];
