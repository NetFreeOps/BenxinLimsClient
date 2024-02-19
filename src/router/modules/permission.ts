import Layout from '@/layouts/index.vue';
import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/permissionManager',
    component: Layout,
    redirect: '/permissionManager/analysis',
    name: 'permissionManager',
    meta: { title: '权限管理', icon: DashboardIcon },
    children: [
      {
        path: 'analysis',
        name: 'analysis',
        component: () => import('@/pages/permissionManager/user/index.vue'),
        meta: { title: '用户管理' },
      },
     
    ],
  },
];
