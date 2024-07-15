<template>
  <t-config-provider :global-config="getComponentsLocale">
    <router-view :key="locale" :class="[mode]" />
  </t-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useLocale } from '@/locales/useLocale';
import { useSettingStore } from '@/store';
import { MessagePlugin } from 'tdesign-vue-next';

const store = useSettingStore();

const mode = computed(() => {
  return store.displayMode;
});
onMounted(() => {

});
var configString = window.localStorage.getItem('configList')

if (configString) {
  console.warn('configList', configString)
  var configList = JSON.parse(configString)
  configList.forEach((item: any) => {
    if (item.configField === 'page_title') {
      document.title = item.configValue
    }

  })
}


const { getComponentsLocale, locale } = useLocale();
</script>

<style lang="less" scoped>
#nprogress .bar {
  background: var(--td-brand-color) !important;
}
</style>
