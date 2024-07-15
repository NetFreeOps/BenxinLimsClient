<template>
    <div>
        <t-card title="公司管理">
            <template #actions>
                <t-button theme="primary" @click="getWorkShopList" shape="circle">
                    <template #icon>

                        <RefreshIcon />
                    </template>
                </t-button>
                <t-button theme="primary" @click="addWorkShop">添加公司</t-button>

            </template>
            <t-table :columns="columns" row-key="id" :data="workShopList">
                <template #operation="{ row }">
                    <t-button theme="primary" variant="text" @click="showWorkShopModal(row)">编辑</t-button>
                    <t-button theme="danger" variant="text" @click="deleteWorkShop(row)">删除</t-button>
                </template>
            </t-table>
        </t-card>
        <t-dialog v-model:visible="workShopModal" @confirm="updateConfig" header="配置编辑器" width="800">
        </t-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAPI } from '@/axios-utils';
import { SysworkshopApi } from '@/api-services'
import { MessagePlugin } from 'tdesign-vue-next'

const workShopModal = ref(false)
const workShopList = ref([{ id: -1, name: '', code: '', aliasName: '', active: 1 }])
const workShopItem = ref({ id: -1, name: '', code: '', aliasName: '', active: 1 })
const AddWorkShopItem = ref({ name: '', code: '', aliasName: '', active: 1 })


onMounted(() => {
    getWorkShopList();
})
/* 获取公司列表 */
const getWorkShopList = async () => {
    getAPI(SysworkshopApi).apiSysworkshopWrokshoplistGet().then(res => {
        console.log(res.data.data)
        workShopList.value = res.data.data
    })
}
/* 添加一个新公司 */
const addWorkShop = async () => {
    getAPI(SysworkshopApi).apiSysworkshopWrokshopPost(AddWorkShopItem.value).then(res => {
        MessagePlugin.success('添加成功')
        workShopModal.value = false
        getWorkShopList()
    })
}

</script>