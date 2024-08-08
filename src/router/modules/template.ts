import { LogoutIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue'; import components from '@/locales/lang/en_US/components';
'@/assets/assets-slide-dashboard.svg';

export default [
    {
        path: '/templateManager',
        component: Layout,
        redirect: '/templateManager/loginsample',
        name: 'templateManager',
        meta: { title: '模板管理', icon: shallowRef(LogoutIcon) },
        children: [
            {
                path: 'loginsample',
                name: 'loginsample',
                component: () => import('@/pages/templateManager/loginsample/index.vue'),
                meta: { title: '样品登记模板' }
            },

        ],
    },
];
