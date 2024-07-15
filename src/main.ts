/* eslint-disable simple-import-sort/imports */
import TDesign from 'tdesign-vue-next';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './store';
import i18n from './locales';

import 'tdesign-vue-next/es/style/index.css';
import '@/style/index.less';
import '@/style/tmweb.css'
import './permission';
import { RefreshIcon } from 'tdesign-icons-vue-next'


const app = createApp(App);



app.use(TDesign);
app.use(store);
app.use(router);
app.use(i18n);
/* 全局注册组件 */
app.component('RefreshIcon', RefreshIcon);
app.config.errorHandler = (err, vm, info) => {
    console.error('Global error handler:', err, info);
};
app.config.warnHandler = (msg, vm, trace) => {
    console.warn('Global warn handler:', msg, trace);
};

app.mount('#app');
