<template>
    <div></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { getAPI } from '@/axios-utils';
import { PostApi } from '@/api-services'

onMounted(() => {

})
/* 获取所有岗位 */
const getPostList = async () => {
    getAPI(PostApi).apiPostPostbyuserGet
}
</script>