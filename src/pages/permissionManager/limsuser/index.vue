<template>
    <div style="display: flex;justify-content: space-around;">
        <div style="width:30%">
            <t-card title="部门列表">
                <t-tree></t-tree>
            </t-card>
        </div>
        <div style="width:65%">
            <t-card title="用户信息">
                <t-space class="flex flex-end">
                    <t-button @click="addUser">添加新用户</t-button>
                </t-space>
                <t-table :columns="columns" :data="userList" row-key="id">
                    <template #operation="{ row }">
                        <t-button variant="text" theme="primary" @click="showModal(row, 'user')">编辑</t-button>
                        <t-button variant="text" theme="primary" @click="showModal(row, 'user')">分配部门</t-button>
                        <t-button variant="text" theme="primary" @click="showModal(row, 'user')">分配角色</t-button>

                    </template>
                </t-table>
            </t-card>

        </div>
        <t-dialog v-model:visible="userEditModal" header="用户编辑器" @confirm="updateUser" width="1200">
            <div style="display: flex;justify-content: space-around;">
                <t-card title="基础信息">
                    <t-form style="max-height: 600px;width:500px; overflow-y: auto;">
                        <t-form-item label="用户编号：" name="userId">
                            <t-input v-model="userItem.userId" />
                        </t-form-item>
                        <t-form-item label="用户名：" name="userName">
                            <t-input v-model="userItem.userName" />
                        </t-form-item>
                        <t-form-item label="用户组：" name="userGroup">
                            <t-input v-model="userItem.userGroup" />
                        </t-form-item>
                        <t-form-item label="用户岗位：" name="userType">
                            <t-input v-model="userItem.userType" />
                        </t-form-item>
                        <t-form-item label="状态：" name="status">
                            <t-select v-model="userItem.status" :options="userTypeList" />
                        </t-form-item>
                        <!-- <t-form-item>
                            <t-button>保存</t-button>
                        </t-form-item> -->
                    </t-form>
                </t-card>
                <t-card title="扩展信息">
                    <t-form style="max-height: 600px;width:500px; overflow-y: auto;">
                        <t-form-item label="用户编号：" name="userId">
                            <t-input v-model="userItem.userId" />
                        </t-form-item>
                        <t-form-item label="用户名：" name="userName">
                            <t-input v-model="userItem.userName" />
                        </t-form-item>
                        <t-form-item label="用户组：" name="userGroup">
                            <t-input v-model="userItem.userGroup" />
                        </t-form-item>
                        <t-form-item label="用户岗位：" name="userType">
                            <t-input v-model="userItem.userType" />
                        </t-form-item>
                        <t-form-item label="状态：" name="status">
                            <t-select v-model="userItem.status" :options="userTypeList" />
                        </t-form-item>
                        <!-- <t-form-item>
                            <t-button>保存</t-button>
                        </t-form-item> -->
                    </t-form>
                </t-card>
            </div>

        </t-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAPI } from '@/axios-utils';
import { SysuserApi, ListApi, SysgroupApi } from '@/api-services';
import { MessagePlugin } from 'tdesign-vue-next';

const columns = [
    { title: '序号', colKey: 'id', width: 100 },
    { title: '用户名', colKey: 'userName' },
    { title: '用户组', colKey: 'userGroup' },
    { title: '用户类型', colKey: 'userType' },
    { title: '状态', colKey: 'status' },
    { title: '操作', colKey: 'operation', width: 300 }
]
const userEditModal = ref(false);
const userQuery = {
    userId: '',
    userName: '',
    userGroup: '',
    userType: '',
    lastLoginIp: '',
    status: ''

}
const pageQuery = {
    pageIndex: 1,
    pageSize: 10,
    total: 0
}

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
const userItem = ref({
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
})
const AddUserItem = ref({
    avatar: null,
    changeTime: null,
    changeUser: null,
    createTime: null,
    createUser: null,
    dataId: null,
    deleted: null,
    lastLoginIp: null,
    lastLoginTime: null,
    password: null,
    sso: null,
    status: "1",
    userGroup: "default",
    userId: "",
    userName: "",
    userType: ""
})
const userTypeList = ref([{}])

onMounted(() => {
    getSysUser();
    getUserTypeList();
});
/* 获取用户列表 */
const getUserTypeList = async () => {
    const listApi = getAPI(ListApi);
    listApi.apiListListitembylistnameListnameGet("用户状态").then((res) => {
        userTypeList.value = res.data.data.map((item) => {
            return {
                label: item.name,
                value: item.value
            }
        })
    });
}
/* 获取用户列表 */
const getSysUser = async () => {
    const nowDate = new Date();
    const sysuserApi = getAPI(SysuserApi);
    await sysuserApi.apiSysuserUserlistGet(userQuery.userId, userQuery.userName, userQuery.userGroup, userQuery.userType, "", userQuery.lastLoginIp, nowDate, userQuery.status, pageQuery.pageIndex, pageQuery.pageSize).then((res) => {
        console.log(res.data.data.pageData);
        userList.value = res.data.data.pageData;
        pageQuery.total = res.data.data.total;
        pageQuery.pageIndex = res.data.data.pageIndex;
        pageQuery.pageSize = res.data.data.pageSize;
    });

};
/* 更新用户信息 */
const updateUser = async () => {
    const sysuserApi = getAPI(SysuserApi);
    await sysuserApi.apiSysuserUserPut(userItem.value).then((res) => {
        console.log(res.data.data);
        if (res.data.data == '更新成功') {
            MessagePlugin.success('更新成功');
        }

        hideModal('user');
        getSysUser();
    });
};
/* 添加新用户 */
const addUser = async () => {
    const sysuserApi = getAPI(SysuserApi);
    await sysuserApi.apiSysuserUserPost(AddUserItem.value).then((res) => {
        console.log(res.data.data);
        if (res.data.data == '添加成功') {
            MessagePlugin.success('添加成功');
        }

        hideModal('user');
        getSysUser();
    })
}
/* 显示弹窗 */
const showModal = (row, type) => {
    switch (type) {
        case 'user':
            userEditModal.value = true;
            userItem.value = row;
            break;

        default:
            break;
    }

};
/* 隐藏弹窗 */
const hideModal = (type) => {
    switch (type) {
        case 'user':
            userEditModal.value = false;
            break;

        default:
            break;
    }
};
</script>