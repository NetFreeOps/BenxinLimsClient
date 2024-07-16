<template>
    <div style="display: flex;justify-content: space-around;">
        <div style="width: 20%;">
            <t-card title="公司列表">
                <template #actions>
                    <t-button theme="primary" @click="addGroup">添加部门</t-button>
                </template>
                <t-radio-group class="flex flex-col flex-start pt-n5" @change="changeListSelect">
                    <t-radio :value="item.name" v-for="(item, index) in workShopList" :key="index" :allow-uncheck="true"
                        class="py-5" style="width: 100%;">
                        {{ item.name }}
                    </t-radio>
                </t-radio-group>

            </t-card>
        </div>
        <div style="width: 75%;">
            <t-table :columns="columns" :data="groupList" row-key="id">
                <template #operation="{ row }">
                    <div v-if="row.deleted != 1">
                        <t-button theme="primary" variant="text" @click="showModal(row, 'group')">编辑</t-button>
                        <t-button theme="danger" variant="text" @click="deleteGroup(row)">删除</t-button>
                    </div>
                    <div v-if="row.deleted == 1">
                        <t-button theme="danger">部门已删除</t-button>

                    </div>

                </template>
            </t-table>
        </div>
        <t-dialog v-model:visible="groupMoal" @confirm="updateGroup" header="部门编辑器" width="800">
            <t-form>
                <t-form-item label="ID" name="id">
                    <t-input v-model="groupItem.id" disabled />
                </t-form-item>
                <t-form-item label="部门名称" name="name">
                    <t-input v-model="groupItem.name" />
                </t-form-item>
                <t-form-item label="部门编码" name="code">
                    <t-input v-model="groupItem.code" />
                </t-form-item>
                <t-form-item label="部门别名" name="aliasName">
                    <t-input v-model="groupItem.aliasName" />
                </t-form-item>
                <t-form-item label="所属公司" name="workShop">
                    <t-select v-model="groupItem.workShop" :options="workShopOptions" />
                </t-form-item>
                <t-form-item label="状态" name="active">
                    <t-switch v-model="groupItem.active" :custom-value="[1, 0]" />
                </t-form-item>
                <t-form-item label="是否为末端部门" name="isEnd">
                    <t-switch v-model="groupItem.isEnd" :custom-value="[1, 0]" />
                </t-form-item>
            </t-form>
        </t-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getAPI } from '@/axios-utils';
import { SysworkshopApi, SysgroupApi } from '@/api-services';
import { MessagePlugin, Tag } from 'tdesign-vue-next';
const workShopList = ref([{ id: -1, name: '', code: '', aliasName: '', active: 1, deleted: 0 }])
const workShopOptions = ref([])
const groupList = ref([])
const groupItem = ref({ id: -1, parentId: 0, name: '', code: '', aliasName: '', workShop: '', isEnd: 0, active: 1, deleted: '0' })
const AddGroupItem = ref({ parentId: 0, name: '', code: '', aliasName: '', workShop: '', isEnd: 0, active: 1 })
const selectedWorkShop = ref("")

const groupMoal = ref(false)

const columns = [{ title: 'ID', colKey: 'id', width: 100 },
{ title: '上级部门ID', colKey: 'parentId' },
{ title: '部门名称', colKey: 'name' },
{ title: '部门编码', colKey: 'code' },
{ title: '部门别名', colKey: 'aliasName' },
{ title: '所属公司', colKey: 'workShop' },
{
    title: '是否末级', colKey: 'isEnd', width: 100, cell: (h, { row }) => {
        //  return h('t-switch', row.active == 1 ? '启用' : '禁用')
        return h(Tag, {
            theme: row.isEnd == 1 ? 'success' : 'danger',
        }, () => row.isEnd == 1 ? '是' : '否')
    }
},
{
    title: '状态', colKey: 'active', width: 100, cell: (h, { row }) => {
        //  return h('t-switch', row.active == 1 ? '启用' : '禁用')
        return h(Tag, {
            theme: row.active == 1 ? 'success' : 'danger',
        }, () => row.active == 1 ? '启用' : '禁用')
    }
}, {
    title: '操作', colKey: 'operation', width: 200
}
]

onMounted(() => {
    getWorkShopList()
    getGroupList()
})
/* 获取公司列表 */
const getWorkShopList = async () => {
    getAPI(SysworkshopApi).apiSysworkshopWrokshoplistGet().then((res) => {
        workShopList.value = res.data.data
        workShopOptions.value = res.data.data.map((item) => {
            return { label: item.name, value: item.name }
        })
    })
}
/* 获取部门列表 */
const getGroupList = async () => {
    getAPI(SysgroupApi).apiSysgroupGrouplistGet("", "", "", selectedWorkShop.value).then((res) => {
        groupList.value = res.data.data

    })
}
/* 添加新部门 */
const addGroup = async () => {
    // 将当前选中的公司添加到部门
    AddGroupItem.value.workShop = selectedWorkShop.value
    getAPI(SysgroupApi).apiSysgroupGroupPost(AddGroupItem.value).then((res) => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('添加成功')
        }
        getGroupList()
    })
}
/* 更新部门信息 */
const updateGroup = async () => {
    getAPI(SysgroupApi).apiSysgroupGroupPut(groupItem.value).then((res) => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('更新成功')
        }
        getGroupList()
        hideModal('group')
    })
}
/* 删除部门信息 */
const deleteGroup = async (row) => {
    getAPI(SysgroupApi).apiSysgroupGroupIdDelete(row.id).then((res) => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success("已删除")
        }
    })
}
/* 公司选择变更 */
const changeListSelect = (val) => {
    console.log(val)
    selectedWorkShop.value = val
    getGroupList()
}
/* 显示弹窗 */
const showModal = (row, res) => {
    switch (res) {
        case 'group':
            groupItem.value = row
            groupMoal.value = true
            break;

        default:
            break;
    }
}
/* 隐藏弹窗  */
const hideModal = (res) => {
    switch (res) {
        case 'group':
            groupMoal.value = false
            break;

        default:
            break;
    }
}
</script>