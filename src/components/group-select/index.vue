<template>
    <!-- <t-tree :data="groupList" pand-all="true" :line="true" :expandMutex="true" checkStrictly
        :keys="{ value: 'name', label: 'name', children: 'children' }" @click="treeSelectGroup"></t-tree> -->
    <t-tree-select :data="groupList" :keys="treeKeys" v-model="selectedValue" value-type="object"
        @change="treeSelectGroup"></t-tree-select>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getAPI } from '@/axios-utils';
import { SysgroupApi } from '@/api-services';
import { flatToTree } from '@/utils/common'
const groupList = ref([])
/* 通用组件-部门选择器
@param selectedGroup 选中部门
@return label: 部门名称, value: 部门code
 */
const props = defineProps({
    selectedGroup: { type: Object, default: {} },
})
const treeKeys = ref({ value: 'code', label: 'name', children: 'children' })
const emit = defineEmits(['update:selectedGroup'])
const init = async () => {
    console.log('init')
    getAPI(SysgroupApi).apiSysgroupGrouplistGet().then((res) => {
        groupList.value = flatToTree(res.data.data, 'id', 'parentId', 'children')

    })
}
const selectedValue = ref({})
/* 选中部门 */
const treeSelectGroup = (res) => {
    console.warn('子组件', res)
    emit('update:selectedGroup', res)

}

defineExpose({ init })

</script>