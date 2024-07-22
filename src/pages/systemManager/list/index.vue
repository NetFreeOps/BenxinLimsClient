<template>
    <div style="display: flex; justify-content: space-around;">
        <div style="width: 20%;">
            <t-card header="列表类型">
                <t-radio-group class="flex flex-col" v-model="queryParams.listType" @change="changeListType">
                    <t-radio :value="item.value" v-for="(item, index) in LIST_TYPE" :key="index" :allow-uncheck="true"
                        class="py-10">
                        {{ item.value }}
                    </t-radio>
                </t-radio-group>
            </t-card>
        </div>
        <div style="width: 75%;">
            <t-card>
                <t-space class="flex flex-end">
                    <t-button @click="showModal('add')">新增</t-button>
                </t-space>
            </t-card>
            <t-card>
                <t-table :columns="columns" :data="tableData" :pagination="pagination" row-key="id">
                    <template #operation="{ row }">
                        <t-button theme="primary" variant="text" @click="() => handleEdit(row)">编辑列表</t-button>
                        <t-button theme="primary" variant="text" @click="() => handleEditItem(row)">编辑列表项</t-button>
                        <t-popconfirm theme="danger" content="删除前确认" @confirm="() => deleteList(row)">
                            <t-button theme="danger" variant="text">删除</t-button>
                        </t-popconfirm>
                    </template>
                </t-table>
            </t-card>
        </div>
        <!-- 新增列表弹窗 -->
        <t-dialog v-model:visible="addListModal" header="新增列表" @ok="addList" @cancel="hideModal('add')"
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
        <t-dialog v-model:visible="editListModal" header="编辑列表" :draggable="true" ok="editList"
            @cancel="hideModal('edit')" @confirm="editList">
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
        <!-- 编辑列表项弹窗 -->
        <t-dialog v-model:visible="editListItemModal" header="编辑列表项" @ok="editListItem" @cancel="hideModal('editItem')"
            @confirm="editListItem" width="1000">
            <t-space class="pb-10">
                <t-button @click="showModal('addItem')">新增</t-button>
            </t-space>
            <t-table :columns="itemColumns" drag-sort="row" :data="listItemData" @drag-sort="orderListItem" row-key="id"
                max-height="500">
                <template #operation="{ row }">
                    <t-popconfirm theme="danger" content="删除前确认" @confirm="deltetListItem(row)">
                        <t-button theme="danger" variant="text">删除</t-button>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-dialog>
        <!-- 新增列表项弹窗 -->
        <t-dialog v-model:visible="addListItemModal" header="新增列表项" @ok="addListItem" @cancel="hideModal('addItem')"
            @confirm="addListItem">
            <t-form>
                <t-form-item label="名称">
                    <t-input v-model="addListItemData.name" placeholder="请输入名称" />
                </t-form-item>
                <t-form-item label="值">
                    <t-input v-model="addListItemData.value" placeholder="请输入值" />
                </t-form-item>
                <t-form-item label="排序">
                    <t-input v-model="addListItemData.order" placeholder="请输入排序" />
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
    { title: '操作', colKey: 'operation', width: 300 }
];

const itemColumns = [
    { title: '序号', colKey: 'id', width: 100 },
    { title: '名称', colKey: 'name' },
    { title: '值', colKey: 'value' },
    { title: '排序', colKey: 'order' },
    { title: '操作', colKey: 'operation', width: 100 }
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
const editListItemModal = ref(false);
const addListItemModal = ref(false);
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
const selectedList = ref({
    id: -1,
    name: '',
    listType: '',
    description: ''
});
const listItemData = ref([{
    id: -1,
    listId: -1,
    name: '',
    value: '',
    order: -1
}])
const addListItemData = ref({
    listId: -1,
    name: '',
    value: '',
    order: -1
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
    if (type === 'editItem') {
        editListItemModal.value = true;
    }
    if (type === 'addItem') {
        addListItemModal.value = true;
        addListItemData.value.listId = selectedList.value.id;
        addListItemData.value.order = 999
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
    if (type === 'editItem') {
        editListItemModal.value = false;
    }
    if (type === 'addItem') {
        addListItemModal.value = false;
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

/* 处理编辑列表项弹窗赋值 */
const handleEditItem = (row) => {
    // 当前选定列表赋值
    selectedList.value = row;
    // 获取列表项
    const listApi = getAPI(ListApi);
    listApi.apiListListitemIdGet(row.id).then((res) => {
        console.log(res);
        const limsListItems = res.data.data
        const mappedItems = limsListItems.map(item => ({
            id: item.id ?? -1, // 如果 item.id 可能为 undefined，请提供默认值或者使用其他方式处理
            listId: item.listId,
            name: item.name,
            value: item.value,
            order: item.order
        }));
        // 按照order排序
        mappedItems.sort((a, b) => a.order - b.order);
        listItemData.value = mappedItems
        showModal('editItem');
    });
}
/* 重载列表项 */
const reloadListItem = async () => {
    const listApi = getAPI(ListApi);
    listApi.apiListListitemIdGet(selectedList.value.id).then((res) => {
        console.log(res);
        const limsListItems = res.data.data
        const mappedItems = limsListItems.map(item => ({
            id: item.id ?? -1, // 如果 item.id 可能为 undefined，请提供默认值或者使用其他方式处理
            listId: item.listId,
            name: item.name,
            value: item.value,
            order: item.order
        }));
        // 按照order排序
        mappedItems.sort((a, b) => a.order - b.order);
        listItemData.value = mappedItems
        // showModal('editItem');
    });
}
/* 编辑列表项 */
const editListItem = async () => {
    hideModal('editItem');
    getList();
};
/* 添加列表项 */
const addListItem = async () => {
    const listApi = getAPI(ListApi);
    const res = await listApi.apiListListitemPost(addListItemData.value);
    console.log(res);
    hideModal('addItem');
    // const listApi = getAPI(ListApi);
    reloadListItem();
};
/* 删除列表项 */
const deltetListItem = async (row) => {
    const listApi = getAPI(ListApi);
    const res = await listApi.apiListListitemIdDelete(row.id);
    console.log(row);
    reloadListItem();
};
/* 列表项排序 */
const orderListItem = async (row) => {
    // console.warn(row.newData);
    updateListItem(row.newData);
};
/* 更新列表项 */
const updateListItem = async (row) => {
    const listApi = getAPI(ListApi);
    // 遍历列表项数组，循环更新
    for (let i = 0; i < row.length; i++) {

        const item = row[i];
        item.order = i + 1;
        console.warn(row[i])
        const res = await listApi.apiListListitemPut(item);
    }
    reloadListItem();
};
</script>