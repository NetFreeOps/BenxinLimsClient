<template>
  <l-side-nav v-if="settingStore.showSidebar" :show-logo="settingStore.showSidebarLogo" :layout="settingStore.layout"
    :is-fixed="settingStore.isSidebarFixed" :menu="sideMenu" :theme="settingStore.displayMode"
    :is-compact="settingStore.isSidebarCompact" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePermissionStore, useSettingStore } from '@/store';
import LSideNav from './SideNav.vue';

// 使用路由钩子函数获取当前路由
const route = useRoute();

// 使用store获取权限存储
const permissionStore = usePermissionStore();

// 使用store获取设置存储
const settingStore = useSettingStore();

// 将权限存储中的菜单路由转换为响应式对象
const { routers: menuRouters } = storeToRefs(permissionStore);

// 计算属性，用于获取侧边栏菜单
const sideMenu = computed(() => {
  // 获取设置存储中的布局和分隔菜单配置
  const { layout, splitMenu } = settingStore;

  // 复制菜单路由数组
  let newMenuRouters = menuRouters.value;

  // 如果布局为'mix'且分隔菜单配置为true，则对菜单路由进行处理
  if (layout === 'mix' && splitMenu) {
    // 遍历菜单路由数组
    newMenuRouters.forEach((menu) => {
      // 如果当前路由路径以菜单路由路径开头，则将子菜单路径与父菜单路径拼接
      if (route.path.indexOf(menu.path) === 0) {
        newMenuRouters = menu.children.map((subMenu) => ({ ...subMenu, path: `${menu.path}/${subMenu.path}` }));
      }
    });
  }

  // 返回处理后的菜单路由数组
  return newMenuRouters;
});
</script>
