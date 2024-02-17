<template>
  <t-layout :class="`${prefix}-layout`">
    <t-tabs v-if="settingStore.isUseTabsRouter" theme="card" :class="`${prefix}-layout-tabs-nav`" :value="$route.path"
      :style="{ position: 'sticky', top: 0, width: '100%' }" @change="handleChangeCurrentTab" @remove="handleRemove">
      <t-tab-panel v-for="(routeItem, index) in tabRouters" :key="`${routeItem.path}_${index}`" :value="routeItem.path"
        :removable="!routeItem.isHome">
        <template #label>
          <t-dropdown trigger="context-menu" :min-column-width="128" :popup-props="{
            overlayClassName: 'route-tabs-dropdown',
            onVisibleChange: (visible, ctx) => handleTabMenuClick(visible, ctx, routeItem.path),
            visible: activeTabPath === routeItem.path,
          }">
            <template v-if="!routeItem.isHome">
              {{ routeItem.title }}
            </template>
            <t-icon v-else name="home" />
            <template #dropdown>
              <t-dropdown-menu>
                <t-dropdown-item @click="() => handleRefresh(routeItem, index)">
                  <t-icon name="refresh" />
                  刷新
                </t-dropdown-item>
                <t-dropdown-item v-if="index > 1" @click="() => handleCloseAhead(routeItem.path, index)">
                  <t-icon name="arrow-left" />
                  关闭左侧
                </t-dropdown-item>
                <t-dropdown-item v-if="index < tabRouters.length - 1"
                  @click="() => handleCloseBehind(routeItem.path, index)">
                  <t-icon name="arrow-right" />
                  关闭右侧
                </t-dropdown-item>
                <t-dropdown-item v-if="tabRouters.length > 2" @click="() => handleCloseOther(routeItem.path, index)">
                  <t-icon name="close-circle" />
                  关闭其它
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
          </t-dropdown>
        </template>
      </t-tab-panel>
    </t-tabs>
    <t-content :class="`${prefix}-content-layout`">
      <l-breadcrumb v-if="settingStore.showBreadcrumb" />
      <l-content />
    </t-content>
    <t-footer v-if="settingStore.showFooter" :class="`${prefix}-footer-layout`">
      <l-footer />
    </t-footer>
  </t-layout>
</template>

<script setup lang="ts">
import { nextTick, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSettingStore, useTabsRouterStore } from '@/store';
import { prefix } from '@/config/global';
import type { TRouterInfo } from '@/types/interface';

import LContent from './Content.vue';
import LBreadcrumb from './Breadcrumb.vue';
import LFooter from './Footer.vue';

// 获取当前路由
const route = useRoute();
// 获取当前路由
const router = useRouter();

// 获取设置存储
const settingStore = useSettingStore();
// 获取标签路由存储
const tabsRouterStore = useTabsRouterStore();
// 获取标签路由列表
const tabRouters = computed(() => tabsRouterStore.tabRouters.filter((route) => route.isAlive || route.isHome));
// 获取当前激活的标签路径
const activeTabPath = ref('');

// 处理当前标签路径改变事件
const handleChangeCurrentTab = (path: string) => {
  // 获取标签路由列表
  const { tabRouters } = tabsRouterStore;
  // 根据路径找到对应的路由
  const route = tabRouters.find((i) => i.path === path);
  // 跳转到指定路由
  router.push({ path, query: route.query });
};

// 处理删除标签路由事件
const handleRemove = ({ value: path, index }) => {
  // 获取标签路由列表
  const { tabRouters } = tabsRouterStore;
  // 获取下一个路由
  const nextRouter = tabRouters[index + 1] || tabRouters[index - 1];

  // 删除当前标签路由
  tabsRouterStore.subtractCurrentTabRouter({ path, routeIdx: index });
  // 如果当前路径等于删除的路径，则跳转到下一个路由
  if (path === route.path) router.push({ path: nextRouter.path, query: nextRouter.query });
};

// 处理刷新标签路由事件
const handleRefresh = (route: TRouterInfo, routeIdx: number) => {
  // 切换标签路由的激活状态
  tabsRouterStore.toggleTabRouterAlive(routeIdx);
  // 刷新标签路由
  nextTick(() => {
    tabsRouterStore.toggleTabRouterAlive(routeIdx);
    router.replace({ path: route.path, query: route.query });
  });
  // 清空当前激活的标签路径
  activeTabPath.value = null;
};

// 处理关闭左侧标签路由事件
const handleCloseAhead = (path: string, routeIdx: number) => {
  // 删除标签路由列表中的指定路由
  tabsRouterStore.subtractTabRouterAhead({ path, routeIdx });

  // 处理非当前路由操作的副作用
  handleOperationEffect('ahead', routeIdx);
};

// 处理关闭右侧标签路由事件
const handleCloseBehind = (path: string, routeIdx: number) => {
  // 删除标签路由列表中的指定路由
  tabsRouterStore.subtractTabRouterBehind({ path, routeIdx });

  // 处理非当前路由操作的副作用
  handleOperationEffect('behind', routeIdx);
};

// 处理关闭其他标签路由事件
const handleCloseOther = (path: string, routeIdx: number) => {
  // 删除标签路由列表中的指定路由
  tabsRouterStore.subtractTabRouterOther({ path, routeIdx });

  // 处理非当前路由操作的副作用
  handleOperationEffect('other', routeIdx);
};

// 处理非当前路由操作的副作用
const handleOperationEffect = (type: 'other' | 'ahead' | 'behind', routeIndex: number) => {
  // 获取当前路径
  const currentPath = router.currentRoute.value.path;
  // 获取标签路由列表
  const { tabRouters } = tabsRouterStore;

  // 获取当前路由的索引
  const currentIdx = tabRouters.findIndex((i) => i.path === currentPath);
  // 存在三种情况需要刷新当前路由
  // 点击非当前路由的关闭其他、点击非当前路由的关闭左侧且当前路由小于触发路由、点击非当前路由的关闭右侧且当前路由大于触发路由
  const needRefreshRouter =
    (type === 'other' && currentIdx !== routeIndex) ||
    (type === 'ahead' && currentIdx < routeIndex) ||
    (type === 'behind' && currentIdx === -1);
  if (needRefreshRouter) {
    // 获取下一个路由的索引
    const nextRouteIdx = type === 'behind' ? tabRouters.length - 1 : 1;
    // 获取下一个路由
    const nextRouter = tabRouters[nextRouteIdx];
    // 跳转到下一个路由
    router.push({ path: nextRouter.path, query: nextRouter.query });
  }

  // 清空当前激活的标签路径
  activeTabPath.value = null;
};

// 处理标签菜单点击事件
const handleTabMenuClick = (visible: boolean, ctx, path: string) => {
  if (ctx.trigger === 'document') activeTabPath.value = null;
  if (visible) activeTabPath.value = path;
};
</script>
