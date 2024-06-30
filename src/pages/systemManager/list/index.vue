<template>
    <div style="display: flex; justify-content: space-around;">
        <div style="width: 10%;">
            <t-card header="列表类型">
                <t-radio-group class="flex flex-col" v-model="queryParams.listType" @change="changeListType">
                    <t-radio :value="item.value" v-for="(item, index) in LIST_TYPE" :key="index" :allow-uncheck="true"
                        class="py-10">
                        {{ item.value }}
                    </t-radio>
                </t-radio-group>
            </t-card>
        </div>
        <div style="width: 85%;">
            <t-card>
                <t-space class="flex flex-end">
                    <t-button @click="showModal('add')">新增</t-button>
                </t-space>
            </t-card>
            <t-card>
                <t-table :columns="columns" :data="tableData" :pagination="pagination" row-key="id">
                    <template #operation="{ row }">
                        <t-button theme="primary" variant="text" @click="() => handleEdit(row)">编辑</t-button> |
                        <t-button theme="primary" variant="text" @click="() => deleteList(row)">删除</t-button>
                    </template>
                </t-table>
            </t-card>
        </div>
        <!-- 新增列表弹窗 -->
        <t-dialog v-model:visible="addListModal" title="新增列表" @ok="addList" @cancel="hideModal('add')"
            @confirm="addList">
            <!-- 表单内容 -->
            <t-form>
                <t-form-item label="名称">
                    <t-input v-model="addModalData.name" placeholder="请输入名称" />
                </t-form-item>
                <t-form-item label="描述">
                    <t-input v-model="addModalData.description" placeholder="请输入描述" />
                </t-form-item>
                <t-form-item label="类型">
                    <t-select v-model="addModalData.listType" placeholder="请选择列表类型">
                        <t-option v-for="(item, index) in LIST_TYPE" :key="index" :value="item.value">
                            {{ item.value }}
                        </t-option>
                    </t-select>
                </t-form-item>
            </t-form>
        </t-dialog>
        <!-- 编辑列表弹窗 -->
        <t-dialog v-model:visible="editListModal" title="编辑列表" @ok="editList" @cancel="hideModal('edit')"
            @confirm="editList">
            <t-form>
                <t-form-item label="名称">
                    <t-input v-model="editModalData.name" placeholder="请输入名称" />
                </t-form-item>
                <t-form-item label="描述">
                    <t-input v-model="editModalData.description" placeholder="请输入描述" />
                </t-form-item>
                <t-form-item label="类型">
                    <t-select v-model="editModalData.listType" placeholder="请选择列表类型">
                        <t-option v-for="(item, index) in LIST_TYPE" :key="index" :value="item.value">
                            {{ item.value }}
                        </t-option>
                    </t-select>
                </t-form-item>
            </t-form>
        </t-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAPI } from '@/axios-utils';
import { ListApi } from '@/api-services';
import { LIST_TYPE } from '@/utils/route/constant';

onMounted(() => {
    getList();
});

const columns = [
    { title: '序号', colKey: 'id', width: 100 },
    { title: '名称', colKey: 'name' },
    { title: '类型', colKey: 'listType' },
    { title: '描述', colKey: 'description' },
    { title: '操作', colKey: 'operation', width: 200 }
];

const tableData = ref([{ id: -1, name: '', listType: '', description: '' }]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });
const queryParams = ref({
    name: '',
    description: '',
    listType: '',
    groupName: '',
    pageIndex: 1,
    pageSize: 10,
    total: 0
});
const addListModal = ref(false);
const editListModal = ref(false);
const addModalData = ref({
    name: '',
    listType: '',
    description: ''
})
const editModalData = ref({
    id: -1,
    name: '',
    listType: '',
    description: ''
})

/* 单选框变化时，切换查询条件 */
const changeListType = (value) => {
    queryParams.value.listType = value;
    getList();
};

/* 加载列表，默认加载全部 */
const getList = async () => {
    const listApi = getAPI(ListApi);
    const res = await listApi.apiListListGet(
        -1,
        queryParams.value.name,
        queryParams.value.description,
        queryParams.value.listType,
        queryParams.value.groupName,
        queryParams.value.pageIndex,
        queryParams.value.pageSize,
        queryParams.value.total
    );

    tableData.value = res.data.data.pageData;
    pagination.value.total = res.data.data.total;
    pagination.value.current = res.data.data.pageIndex;
    pagination.value.pageSize = res.data.data.pageSize;
};

/* 显示弹窗 */
const showModal = (type) => {
    if (type === 'add') {
        addListModal.value = true;
    }
    if (type === 'edit') {
        editListModal.value = true;
    }
};
/* 隐藏弹窗 */
const hideModal = (type) => {
    if (type === 'add') {
        addListModal.value = false;
    }
    if (type === 'edit') {
        editListModal.value = false;
    }
};

/* 添加列表 */
const addList = async () => {
    const listApi = getAPI(ListApi);
    const res = await listApi.apiListListPost(addModalData.value);
    console.log(res);
    hideModal('add');
    getList();
};
/* 处理编辑弹窗赋值 */
const handleEdit = (row) => {
    // 深拷贝赋值
    editModalData.value = JSON.parse(JSON.stringify(row));
    showModal('edit');
};
/* 编辑列表 */
const editList = async () => {
    const listApi = getAPI(ListApi);
    const res = await listApi.apiListListPut(editModalData.value);
    console.log(res);
    hideModal('edit');
    getList();
};

/* 删除列表 */
const deleteList = async (row) => {
    const listApi = getAPI(ListApi);
    const res = await listApi.apiListListIdDelete(row.id);
    console.log(row);
    getList();
};
</script>