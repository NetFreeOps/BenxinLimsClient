<template>
    <div>
        <t-card title="岗位管理">
            <template #actions>
                <t-button theme="primary" @click="getpostList" shape="circle">
                    <template #icon>

                        <RefreshIcon />
                    </template>
                </t-button>
                <t-button theme="primary" @click="addpost">添加新岗位</t-button>

            </template>
            <t-table :columns="columns" row-key="id" :data="postList">
                <template #operation="{ row }">
                    <t-button theme="primary" variant="text" @click="showModal(row, 'post')">编辑</t-button>
                    <t-button theme="primary" variant="text" @click="showModal(row, 'userpost')">编辑人员</t-button>
                    <t-popconfirm theme="danger" content="删除前确认" @confirm="deletepost(row)">
                        <t-button theme="danger" variant="text">删除</t-button>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-card>
        <t-dialog v-model:visible="postModal" @confirm="updatepost" header="配置编辑器" width="800">
            <t-form>
                <t-form-item label="岗位名称" name="name">
                    <t-input v-model="postItem.postName" />
                </t-form-item>
                <t-form-item label="岗位代码" name="code">
                    <t-input v-model="postItem.postCode" />
                </t-form-item>
                <t-form-item label="描述信息" name="aliasName">
                    <t-input v-model="postItem.description" />
                </t-form-item>
                <t-form-item label="状态" name="active">
                    <t-switch v-model="postItem.active" :custom-value="[1, 0]" />
                </t-form-item>
            </t-form>
        </t-dialog>
        <t-dialog v-model:visible="userModal" header="用户选择器" width="1200" @confirm="updateUserPost">
            <userSelect v-model:selected-user-list="selectedUserLData" ref="userBuild"></userSelect>
        </t-dialog>
        <!-- 岗位用户列表 -->
        <t-dialog v-model:visible="userPostModal" :header="postItem.postName" @confirm="hideModal('userpost')"
            @cancel="showModal('', 'user')" cancelBtn="添加用户">
            <div style="max-height: 300px;">
                <t-list>
                    <t-list-item v-for="(item, index) in userpostList" :key="index">
                        <template #content>
                            {{ item.userId }}-{{ item.userName }}
                        </template>
                        <template #action>
                            <t-button theme="danger" variant="text" @click="deleteUserPost(item)">删除</t-button>
                        </template>
                    </t-list-item>
                </t-list>
            </div>

        </t-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAPI } from '@/axios-utils';
import { PostApi } from '@/api-services'
import { MessagePlugin, Tag } from 'tdesign-vue-next';
import userSelect from '@/components/user-select/index.vue';

const postModal = ref(false)
const userModal = ref(false)
const userPostModal = ref(false)
const postList = ref([{ id: -1, postName: '', code: '', postCode: '', description: '', active: 1 }])
const userpostList = ref([])
const postItem = ref({ id: -1, postName: '', code: '', postCode: '', description: '', active: 1 })
const AddpostItem = ref({ postName: '', code: '', postCode: '', description: '', active: 1 })
const selectedUserLData = ref([])
const userBuild = ref(null)

const columns = [{ title: 'ID', colKey: 'id', width: 100 }
    , { title: '岗位名称', colKey: 'postName' }
    , { title: '岗位代码', colKey: 'postCode' }
    , { title: '描述信息', colKey: 'description' }
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
    getpostList();
})
/* 获取岗位列表 */
const getpostList = async () => {
    getAPI(PostApi).apiPostPostslistGet().then(res => {
        console.log(res.data.data)
        postList.value = res.data.data
    })
}
/* 添加一个新岗位 */
const addpost = async () => {
    getAPI(PostApi).apiPostPostPost(AddpostItem.value).then(res => {
        MessagePlugin.success('添加成功')
        postModal.value = false
        getpostList()
    })
}
/* 更新岗位信息 */
const updatepost = async () => {
    getAPI(PostApi).apiPostPostPut(postItem.value).then(res => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('更新成功')
        }
        getpostList();
        hideModal('post')
    })
}
/* 删除岗位信息 */
const deletepost = async (row) => {
    getAPI(PostApi).apiPostPostDelete(row).then(res => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('删除成功')
        }
        getpostList();
    })
}
/* 获取岗位-人员信息 */
const getUserPost = async (row) => {
    getAPI(PostApi).apiPostUserbypostGet('-1', row.postName).then(res => {
        userpostList.value = res.data.data
    })
}
/* 添加岗位-人员信息 */
const updateUserPost = async () => {
    console.warn(selectedUserLData.value)
    const tmp = {
        userId: selectedUserLData.value[0].userId,
        userName: selectedUserLData.value[0].userName,
        postId: postItem.value.postCode,
        postName: postItem.value.postName
    }
    getAPI(PostApi).apiPostUserpostPost(tmp).then(res => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('添加成功');
        } else {
            MessagePlugin.error(res.data.errors);
        }
    }).finally(() => {
        userModal.value = false
        getUserPost(postItem.value)
        showModal(postItem.value, 'userpost')
    })

}
/* 删除岗位-人员信息 */
const deleteUserPost = async (row) => {
    getAPI(PostApi).apiPostDelete(row).then(res => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('删除成功')
        }
        getUserPost(postItem.value)
    })
}
/* 显示弹窗 */
const showModal = (row, res) => {
    switch (res) {
        case 'post':
            postModal.value = true
            postItem.value = row
            console.warn(postItem.value)
            break;
        case 'user':
            // postItem.value = row
            userModal.value = true
            userBuild.value.init()
            break;
        case 'userpost':
            getUserPost(row);
            postItem.value = row
            userPostModal.value = true
        default:
            break;
    }

}
/* 隐藏弹窗 */
const hideModal = async (res) => {
    switch (res) {
        case 'post':
            postModal.value = false
            break;
        case 'user':
            userModal.value = false
            break;
        case 'userpost':
            userPostModal.value = false
        default:
            break;
    }
}

</script>