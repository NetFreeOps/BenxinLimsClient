<template>
    <div style="display: flex;justify-content: space-around;">
        <div style="width:30%">

            <t-card title="部门列表">
                <!-- <t-form style="border-bottom: 1px solid #ebebeb;">
                    <t-form-item label="是否包含子级">
                        <t-switch v-model="inSub"></t-switch>
                    </t-form-item>
                </t-form> -->
                <t-tree :data="groupList" pand-all="true" :line="true" :expandMutex="true" checkable checkStrictly
                    :keys="{ value: 'name', label: 'name', children: 'children' }" @click="treeSelectGroup"></t-tree>
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
                        <!-- <t-button variant="text" theme="primary" @click="showModal(row, 'post')">分配岗位</t-button> -->
                        <t-button variant="text" theme="primary" @click="showModal(row, 'user')">分配角色</t-button>

                    </template>
                </t-table>
            </t-card>

        </div>
        <t-dialog v-model:visible="userEditModal" header="用户编辑器" @confirm="updateUser" width="800">
            <div style="display: flex;justify-content: space-around;">
                <t-card title="基础信息">
                    <t-form style="max-height: 600px;width:500px; overflow-y: auto;">
                        <t-form-item label="用户编号：" name="userId">
                            <t-input v-model="userItem.userId" />
                        </t-form-item>
                        <t-form-item label="用户名：" name="userName">
                            <t-input v-model="userItem.userName" />
                        </t-form-item>
                        <t-form-item label="部门" name="userGroup">
                            <!-- <t-input v-model="userItem.userGroup" /> -->
                            <t-tree-select :data="groupList" v-model="userItem.userGroup"
                                :keys="treeKeys"></t-tree-select>
                        </t-form-item>
                        <t-form-item label="用户岗位：" name="userType">
                            <t-select v-model="userItem.userType" :options="postOptions"></t-select>
                            <!-- <t-input v-model="userItem.userType" /> -->
                        </t-form-item>
                        <t-form-item label="状态：" name="status">
                            <t-select v-model="userItem.status" :options="userTypeList" />
                        </t-form-item>
                        <!-- <t-form-item>
                            <t-button>保存</t-button>
                        </t-form-item> -->
                    </t-form>
                </t-card>
                <!-- <t-card title="扩展信息">
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
                            <t-select v-model="userItem.userType" :options="postOptions"></t-select>
                        </t-form-item>
                        <t-form-item label="状态：" name="status">
                            <t-select v-model="userItem.status" :options="userTypeList" />
                        </t-form-item>
                      
                    </t-form>
                </t-card> -->
            </div>

        </t-dialog>
        <t-dialog v-model:visible="groupSelectModal" header="部门选择器" @confirm="addUserGroup">
            <group-select ref="groupBuild" v-model:selected-group="selectedGroup"
                v-model:selected-status="groupSelectModal"></group-select>
        </t-dialog>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAPI } from '@/axios-utils';
import { SysuserApi, ListApi, SysgroupApi, SysUserGroupEntry, PostApi } from '@/api-services';
import { MessagePlugin } from 'tdesign-vue-next';
import { flatToTree, extractNames } from '@/utils/common'
import groupSelect from '@/components/group-select/index.vue'


const columns = [
    { title: '序号', colKey: 'id', width: 100 },
    { title: '用户名', colKey: 'userName' },
    { title: '用户组', colKey: 'userGroup' },
    { title: '用户类型', colKey: 'userType' },
    { title: '状态', colKey: 'status' },
    { title: '操作', colKey: 'operation', width: 300 }
]
const treeKeys = ref({ value: 'name', label: 'name', children: 'children' })

const userEditModal = ref(false);
const groupSelectModal = ref(false);
const selectedGroup = ref({ label: '', value: '' })
const groupBuild = ref(null)
const inSub = ref(false)
const userQuery = ref({
    userId: '',
    userName: '',
    userGroup: '',
    userType: '',
    lastLoginIp: '',
    status: ''

})
const pageQuery = ref({
    pageIndex: 1,
    pageSize: 10,
    total: 0
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
const usergroup = ref<SysUserGroupEntry>({})
const postOptions = ref([])
onMounted(() => {
    getSysUserAndSetUI();
    getUserTypeList();
    getGroupList();
    getPostList();
});
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
/* 获取岗位列表 */
const getPostList = async () => {
    getAPI(PostApi).apiPostPostslistGet().then((res) => {
        // console.log(res.data.data);
        postOptions.value = res.data.data.map((item) => {
            return {
                label: item.postName,
                value: item.postName
            }
        })
    });
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

    // console.log(res.node)
    // // 初始化分页
    // pageQuery.value.pageIndex = 1;
    // pageQuery.value.pageSize = 10;
    // const names = extractNames(res.node.data);
    // if (!inSub.value) {
    //     userQuery.value.userGroup = res.node.value;
    //     getSysUserAndSetUI()
    //     return
    // }

    // userList.value = []
    // // 遍历names,获取用户列表
    // names.forEach((name) => {
    //     userQuery.value.userGroup = res.node.value;
    //     const tmp = getSysUser();
    //     tmp.then((res) => {
    //         // userListArray.push(res.data.data.pageData)
    //         if (res.data.data.pageData.length > 0) {
    //             userList.value.push(res.data.data.pageData)

    //         }

    //     })
    // })



}
/* 获取用户状态列表 */
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
/* 获取用户列表-仅获取 */
const getSysUser = async () => {
    const nowDate = new Date();
    const sysuserApi = getAPI(SysuserApi);
    const apiresult = await sysuserApi.apiSysuserUserlistGet(userQuery.value.userId, userQuery.value.userName, userQuery.value.userGroup, userQuery.value.userType, "", userQuery.value.lastLoginIp, nowDate, userQuery.value.status, pageQuery.value.pageIndex, pageQuery.value.pageSize)
    return apiresult;
    // .then((res) => {
    //     console.log(res.data.data.pageData);
    //     userList.value = res.data.data.pageData;
    //     pageQuery.total = res.data.data.total;
    //     pageQuery.pageIndex = res.data.data.pageIndex;
    //     pageQuery.pageSize = res.data.data.pageSize;
    // });

};
/* 获取用户列表-赋值 */
const getSysUserAndSetUI = async () => {
    const res = getSysUser();
    res.then((res) => {
        // console.log(res.data.data.pageData);
        userList.value = res.data.data.pageData;
        pageQuery.value.total = res.data.data.total;
        pageQuery.value.pageIndex = res.data.data.pageIndex;
        pageQuery.value.pageSize = res.data.data.pageSize;
    });


}

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
/* 添加用户部门记录 */
const addUserGroup = async () => {
    usergroup.value.userId = userItem.value.userId;
    usergroup.value.userName = userItem.value.userName;
    usergroup.value.groupId = selectedGroup.value.value;
    usergroup.value.groupName = selectedGroup.value.label;
    console.log(selectedGroup.value)
    if (selectedGroup.value.value == '' || selectedGroup.value.label == '') {
        MessagePlugin.error('请选择部门');
        return
    }

    const sysuserApi = getAPI(SysuserApi);
    await sysuserApi.apiSysuserUsergroupPost(usergroup.value).then((res) => {
        console.log(res.data.data);
        if (res.data.data == '添加成功') {
            MessagePlugin.success('添加成功');
        }
        else {
            MessagePlugin.error(res.data.data);
        }

        hideModal('group');
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
        case 'group':
            groupSelectModal.value = true;
            userItem.value = row;
            selectedGroup.value = {
                label: '',
                value: ''
            }
            groupBuild.value.init()
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
        case 'group':
            groupSelectModal.value = false;
            break;
        default:
            break;
    }
};

</script>