<template>
    <div style="display: flex;justify-content: space-around;">
        <div style="width:30%">
            <t-card title="部门列表">
                <t-tree :data="groupList" pand-all="true" :line="true" :expandMutex="true" checkable checkStrictly
                    :keys="{ value: 'name', label: 'name', children: 'children' }" @click="treeSelectGroup"></t-tree>
            </t-card>
        </div>
        <div style="width:65%">
            <t-card title="用户信息">

                <t-table :columns="columns" :data="userList" row-key="id" :pagination="pageQuery" @change="pageChange"
                    :selected-row-keys="selectedRowKeys" @select-change="tableSelectChange">
                </t-table>
            </t-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { getAPI } from '@/axios-utils';
import { SysuserApi, SysgroupApi } from '@/api-services';
import { flatToTree } from '@/utils/common'

const props = defineProps({
    selectdUserList: { type: Array, default: () => [] },
})

const columns = [
    { colKey: 'row-select', type: 'multiple' },
    { title: '序号', colKey: 'id', width: 100 },
    { title: '用户名', colKey: 'userName' },
    { title: '用户组', colKey: 'userGroup' },
    { title: '用户类型', colKey: 'userType' },
    { title: '状态', colKey: 'status' },
]
const selectedRowKeys = ref([])
const userQuery = ref({
    userId: '',
    userName: '',
    userGroup: '',
    userType: '',
    lastLoginIp: '',
    status: ''

})
const pageQuery = ref({
    defaultPageSize: 10,//pagesize
    total: 100,
    defaultCurrent: 1,//pageindex

})
const groupList = ref([])

const userList = ref([{
    avatar: null,
    changeTime: null,
    changeUser: null,
    createTime: null,
    createUser: null,
    dataId: null,
    deleted: null,
    id: 100,
    lastLoginIp: null,
    lastLoginTime: null,
    password: null,
    sso: null,
    status: "1",
    userGroup: "default",
    userId: "",
    userName: "",
    userType: ""
}]);

// onMounted(() => {
//     getSysUserAndSetUI();
//     getGroupList();

// });
const init = () => {
    console.warn('子组件初始化')
    getSysUserAndSetUI();
    getGroupList();
}
/* 获取部门列表 */
const getGroupList = async () => {
    const sysgroupApi = getAPI(SysgroupApi);
    await sysgroupApi.apiSysgroupGrouplistGet().then((res) => {
        // console.log(res.data.data);
        groupList.value = flatToTree(res.data.data, 'id', 'parentId', 'children')
        console.log(groupList.value)
        // groupList.value = res.data.data;
    });
};
/* 表格选中 */
const tableSelectChange = (res) => {

}

/* 选中部门-tree发生变化激活 */
const treeSelectGroup = (res) => {
    console.log(res.node.value, res.node.checked)
    // 暂定只能获取一个部门
    if (!res.node.checked) {
        userQuery.value.userGroup = res.node.value
    }
    else {
        userQuery.value.userGroup = ''
    }
    // userQuery.value.userGroup = res.node.value;
    getSysUserAndSetUI()
}

/* 获取用户列表-仅获取 */
const getSysUser = async () => {
    const nowDate = new Date();
    const sysuserApi = getAPI(SysuserApi);
    const apiresult = await sysuserApi.apiSysuserUserlistGet(userQuery.value.userId, userQuery.value.userName, userQuery.value.userGroup, userQuery.value.userType, "", userQuery.value.lastLoginIp, nowDate, userQuery.value.status, pageQuery.value.defaultCurrent, pageQuery.value.defaultPageSize)
    return apiresult;

};
/* 获取用户列表-赋值 */
const getSysUserAndSetUI = async () => {
    const res = getSysUser();
    res.then((res) => {

        userList.value = res.data.data.pageData;
        pageQuery.value.total = res.data.data.total;
        pageQuery.value.defaultCurrent = res.data.data.pageIndex;
        pageQuery.value.defaultPageSize = res.data.data.pageSize;
    });

}

/* 分页查询 */
const pageChange = async (page) => {
    console.log(page.pagination);
    pageQuery.value.defaultCurrent = page.pagination.current;
    pageQuery.value.defaultPageSize = page.pagination.pageSize;
    getSysUserAndSetUI();
};

defineExpose({ init })

</script>