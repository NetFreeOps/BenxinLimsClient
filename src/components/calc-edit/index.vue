<template>
    <div class="edit-content">
        <t-space class="flex-end">
            <t-button>添加计算变量</t-button>
        </t-space>
        <t-table :columns="columns" :data="calcParamsList" row-key="id"></t-table>
        {{ editItem }}
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
const props = defineProps({

    editItem: {
        type: Object,
        default: () => ({})
    }
});
const columns = [{ title: 'id', colKey: 'ID', width: 100 },
{ title: '名称', colKey: 'name' },
{ title: '值', colKey: 'value' },
{ title: '类型', colKey: 'type' }]
const calcParamsList = ref([{ id: -1, name: '', value: '', type: '' }]);
</script>
<style>
.edit-content {
    width: 100%;
    height: 500px
}
</style>