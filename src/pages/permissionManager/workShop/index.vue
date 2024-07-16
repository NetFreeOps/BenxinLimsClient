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
                    <t-button theme="primary" variant="text" @click="showModal(row, 'workShop')">编辑</t-button>
                    <t-button theme="danger" variant="text" @click="deleteWorkShop(row)">删除</t-button>
                </template>
            </t-table>
        </t-card>
        <t-dialog v-model:visible="workShopModal" @confirm="updateWorkShop" header="配置编辑器" width="800">
            <t-form>
                <t-form-item label="公司名称" name="name">
                    <t-input v-model="workShopItem.name" />
                </t-form-item>
                <t-form-item label="公司编码" name="code">
                    <t-input v-model="workShopItem.code" />
                </t-form-item>
                <t-form-item label="公司别名" name="aliasName">
                    <t-input v-model="workShopItem.aliasName" />
                </t-form-item>
                <t-form-item label="状态" name="active">
                    <t-switch v-model="workShopItem.active" :custom-value="[1, 0]" />
                </t-form-item>
            </t-form>
        </t-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAPI } from '@/axios-utils';
import { SysworkshopApi } from '@/api-services'
import { MessagePlugin, Tag } from 'tdesign-vue-next'

const workShopModal = ref(false)
const workShopList = ref([{ id: -1, name: '', code: '', aliasName: '', active: 1 }])
const workShopItem = ref({ id: -1, name: '', code: '', aliasName: '', active: 1 })
const AddWorkShopItem = ref({ name: '', code: '', aliasName: '', active: 1 })

const columns = [{ title: 'ID', colKey: 'id', width: 100 }
    , { title: '公司名称', colKey: 'name' }
    , { title: '公司编码', colKey: 'code' }
    , { title: '公司别名', colKey: 'aliasName' }
    , {
    title: '状态', colKey: 'active', cell: (h, { row }) => {
        //  return h('t-switch', row.active == 1 ? '启用' : '禁用')
        return h(Tag, {
            theme: row.active == 1 ? 'success' : 'danger',
        }, () => row.active == 1 ? '启用' : '禁用')

    }
}
    , { title: '操作', colKey: 'operation' }
]

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
/* 更新公司信息 */
const updateWorkShop = async () => {
    getAPI(SysworkshopApi).apiSysworkshopWrokshopPut(workShopItem.value).then(res => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('更新成功')
        }
        getWorkShopList();
        hideModal('workShop')
    })
}
/* 显示弹窗 */
const showModal = (row, res) => {
    switch (res) {
        case 'workShop':
            workShopModal.value = true
            workShopItem.value = row
            console.warn(workShopItem.value)
            break;

        default:
            break;
    }

}
/* 隐藏弹窗 */
const hideModal = (res) => {
    switch (res) {
        case 'workShop':
            workShopModal.value = false
            break;

        default:
            break;
    }
}

</script>