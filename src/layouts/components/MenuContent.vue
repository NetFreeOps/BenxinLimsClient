<template>
  <div>
    <template v-for="item in list" :key="item.path">
      <template v-if="!item.children || !item.children.length || item.meta?.single">
        <t-menu-item v-if="getHref(item)" :name="item.path" :value="getPath(item)" @click="openHref(getHref(item)[0])">
          <template #icon>
            <t-icon v-if="beIcon(item)" :name="item.icon" />
            <component :is="beRender(item).render" v-else-if="beRender(item).can" class="t-icon" />
          </template>
          {{ item.title }}
        </t-menu-item>
        <t-menu-item v-else :name="item.path" :value="getPath(item)" :to="item.path">
          <template #icon>
            <t-icon v-if="beIcon(item)" :name="item.icon" />
            <component :is="beRender(item).render" v-else-if="beRender(item).can" class="t-icon" />
          </template>
          {{ item.title }}
        </t-menu-item>
      </template>
      <t-submenu v-else :name="item.path" :value="item.path" :title="item.title">
        <template #icon>
          <t-icon v-if="beIcon(item)" :name="item.icon" />
          <component :is="beRender(item).render" v-else-if="beRender(item).can" class="t-icon" />
        </template>
        <menu-content v-if="item.children" :nav-data="item.children" />
      </t-submenu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import isObject from 'lodash/isObject';
import type { MenuRoute } from '@/types/interface';
import { getActive } from '@/router';

// 定义props
const props = defineProps({
  navData: {
    type: Array as PropType<MenuRoute[]>,
    default: () => [],
  },
});

// 定义computed
const active = computed(() => getActive());
const list = computed(() => {
  const { navData } = props;
  return getMenuList(navData);
});

type ListItemType = MenuRoute & { icon?: string };

// 获取菜单列表
const getMenuList = (list: MenuRoute[], basePath?: string): ListItemType[] => {
  if (!list) {
    return [];
  }
  // 如果meta中有orderNo则按照从小到大排序
  list.sort((a, b) => {
    return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
  });
  return list
    .map((item) => {
      const path = basePath && !item.path.includes(basePath) ? `${basePath}/${item.path}` : item.path;
      return {
        path,
        title: item.meta?.title,
        icon: item.meta?.icon || '',
        children: getMenuList(item.children, path),
        meta: item.meta,
        redirect: item.redirect,
      };
    })
    .filter((item) => item.meta && item.meta.hidden !== true);
};

// 获取链接
const getHref = (item: MenuRoute) => {
  const { frameSrc, frameBlank } = item.meta;
  if (frameSrc && frameBlank) {
    return frameSrc.match(/(http|https):\/\/([\w.]+\/?)\S*/);
  }
  return null;
};

// 获取路径
const getPath = (item) => {
  if (active.value.startsWith(item.path)) {
    return active.value;
  }
  return item.meta?.single ? item.redirect : item.path;
};

// 判断是否为图标
const beIcon = (item: MenuRoute) => {
  return item.icon && typeof item.icon === 'string';
};

// 判断是否为渲染
const beRender = (item: MenuRoute) => {
  if (isObject(item.icon) && typeof item.icon.render === 'function') {
    return {
      can: true,
      render: item.icon.render,
    };
  }
  return {
    can: false,
    render: null,
  };
};

// 打开链接
const openHref = (url: string) => {
  window.open(url);
};
</script>

<style lang="less" scoped></style>
