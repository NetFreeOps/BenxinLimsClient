import Layout from '@/layouts/index.vue';
import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/workflow',
    component: Layout,
    redirect: '/workflow/',
    name: 'workflow',
    meta: { title: '工作流', icon: DashboardIcon },
    children: [
        {
            path:'workflows',
            name:'workflows',
            component: () => import('@/pages/wokrflow/index.vue'),
            meta: { title: '我的工作台' },
          }
     
    ],
  },
];
