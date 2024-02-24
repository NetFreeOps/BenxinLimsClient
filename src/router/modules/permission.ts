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
        path: 'post',
        name: 'post',
        component: () => import('@/pages/permissionManager/post/index.vue'),
        meta: { title: '岗位管理' },
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: () => import('@/pages/permissionManager/user/index.vue'),
        meta: { title: '用户管理' },
      },
     
    
     
    ],
  },
];
