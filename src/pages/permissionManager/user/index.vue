<template>
    <div style="display: flex;justify-content:space-around;">
        <div style="width:20%">
            <TCard>
                <TTree @click="treeClick" :data="treeData" :hover="true" :keys="treeConfig" line activable></TTree>
            </TCard>
        </div>
        <div style="width: 75%;">
            <!-- 查找区域 -->
            <TCard class="mb-20">
                <TSpace>

                    <TForm layout="inline">

                        <TFormItem label="用户ID">
                            <TInput v-model="formData.userId" placeholder="用户ID"></TInput>
                        </TFormItem>

                        <TFormItem label="用户名称">
                            <TInput v-model="formData.userName" placehoder="用户昵称"></TInput>
                        </TFormItem>

                    </TForm>


                    <TRow>
                        <TButton @click="SearchUser()">查找</TButton>
                    </TRow>
                </TSpace>
            </TCard>
            <!-- 功能区域 -->
            <TCard class="flex flex-end">
                <TSpace>
                    <TButton theme="primary" @click="add">新增</TButton>
                    <TButton theme="primary" @click="bindUser">处理绑定申请</TButton>

                </TSpace>

            </TCard>
            <!-- 表格区域 -->
            <TCard>
                <TTable row-key="id" :columns="columns" :data="tableData" :selected-row-keys="selectedRowKeys"
                    :pagination="pageInit" @select-change="rehandleSelectChange" @page-change="pageQuery">

                    <template #op-column>
                        <p>操作</p>
                    </template>
                    <template #op="slotProps">
                        <a class="link" @click="edit(slotProps)">编辑</a>
                        <a class="link" @click="del(slotProps)">删除</a>

                    </template>
                </TTable>
            </TCard>
            <!-- <user-add :visible="showDialog"></user-add> -->
            <!-- <userAdd v-model:visible="showDialog"></userAdd>
            <userEdit v-model:visible="showEdit" :edit-data="rowData"></userEdit>
            <userBind v-model:visible="showBind" :edit-date="rowData" ref="refbind"></userBind> -->
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, watch, reactive } from "vue";
import { toTreeData } from '@/utils/common';
import { getAPI } from '@/aixos-utils';
import { SysuserApi, SysgroupsApi } from '@/api-services';
import { DialogPlugin, Tag } from "tdesign-vue-next";
// import userEdit from "./userEdit.vue";
// import userAdd from "./userAdd.vue";
// import userBind from "./userBind.vue";

const INITIAL_DATA = {
    userName: '',
    userId: ''
}

const data = reactive({
    formData: { ...INITIAL_DATA },
    tableData: [],
    selectedRowKeys: [],
});
// 分页数据
const pageInit = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
});
// 查询参数
const searchParams = reactive({

    PageIndex: 1,
    pageSize: 10,
});
const treeConfig = reactive({ value: 'id', label: 'groupname' })
const treeData: any = ref([]);
const selectedGroupId = ref(-1);
const showDialog = ref(false);
const showEdit = ref(false);
const showBind = ref(false);
const refbind = ref(null);
const formData = ref({ ...INITIAL_DATA });

const rowData = ref({});

const columns = [
    {
        colKey: "row-select",
        type: "single",
        // 允许单选(Radio)取消行选中
        checkProps: { allowUncheck: true },
        width: 50,
    },
    { colKey: "id", title: "序号", width: 100 },

    { colKey: "userId", title: "用户ID" },
    { colKey: "userName", title: "用户名称" },
    { colKey: "nickName", title: "用户昵称" },
    {
        colKey: "useType",
        title: "用户类型",
        width: 100,
        cell: (h, { row }) => {
            return h(Tag, { theme: row.useType == '0' ? "success" : row.useType == '1' ? 'primary' : 'danger' },
                row.useType == '0' ? "管理员" : row.useType == '1' ? '实验室用户' : '其他用户'
            );
        }
    },
    {
        colKey: "status",
        title: "状态",
        width: 100,
        cell: (h, { row }) => {
            return h(Tag, { theme: row.status == '1' ? "success" : "danger" }, row.status == '1' ? "启用" : "禁用")
        }
    },

    {
        colKey: "op",
        width: 200,
        title: "op-column",
        cell: "op",
    }

];



const tableData: any = ref([{
    id: 0,
    userId: 0,
    userName: "",
    nickName: "",
}]);

onMounted(() => {
    initData();
    initTreeData();

});
watch(showDialog, () => {
    console.warn('监听改变', showDialog.value)
    if (showDialog.value === false) {
        initData();
    }
})

watch(showEdit, () => {
    console.warn('监听改变', showEdit.value)
    if (showEdit.value === false) {
        initData();
    }
})

const initData = async () => {
    if (selectedGroupId.value == -1) {
        getAPI(SysuserApi).labSysuserUsersbyconditionGet(formData.value.userId, formData.value.userName, "", -1, -1, searchParams.PageIndex, searchParams.pageSize).then((res) => {
            tableData.value = res.data.data.pageData;
            pageInit.total = res.data.data.total;
            pageInit.current = res.data.data.pageIndex;
            pageInit.pageSize = res.data.data.pageSize;
            console.warn(tableData)
        }).catch((err) => {
            console.warn(err)
        })
    }
    else {
        getAPI(SysgroupsApi).labSysgroupsUsersbygroupidGroupidGet(selectedGroupId.value).then((res) => {
            tableData.value = res.data.data;
            pageInit.total = res.data.data.length;
            pageInit.current = 1;
            pageInit.pageSize = 10;
            console.warn(tableData)
        }).catch((err) => {
            console.warn(err)
        })
    }


}
// 初始化树状数据
const initTreeData = async () => {
    getAPI(SysgroupsApi).labSysgroupsAllgroupsGet().then((res: any) => {
        //将平级数据转换为树形数据
        treeData.value = toTreeData(res.data.data, 'groupcode', 'pid', 'children');
        console.warn(treeData.value)
    })
}
const SearchUser = async () => {
    searchParams.PageIndex = 1;
    //initData();
    getAPI(SysuserApi).labSysuserUsersbyconditionGet(formData.value.userId, formData.value.userName, "", -1, -1, searchParams.PageIndex, searchParams.pageSize).then((res) => {
        tableData.value = res.data.data.pageData;
        pageInit.total = res.data.data.total;
        pageInit.current = res.data.data.pageIndex;
        pageInit.pageSize = res.data.data.pageSize;
        console.warn(tableData)
    }).catch((err) => {
        console.warn(err)
    })
}


// 分页查询
const pageQuery = async (e) => {
    console.log(e.current);
    searchParams.PageIndex = e.current;
    initData();
};
const treeClick = async (res) => {
    console.warn(res.node)
    if (!res.node.actived) {
        selectedGroupId.value = res.node.value;
    }
    else {
        selectedGroupId.value = -1;
    }
    initData();
}
const add = async () => {
    console.warn("新增")
    showDialog.value = showDialog.value ? false : true;

}
const bindUser = async () => {
    console.warn("绑定用户")
    refbind.value.initData();
    showBind.value = showBind.value ? false : true;
}

const del = async ({ row }) => {
    const { id } = row;
    // showConfirm.value = showConfirm.value ? false : true;
    const alertDia = DialogPlugin.alert({
        header: '删除前确认',
        body: '你确定要删除该条记录吗？',
        confirmBtn: {
            content: '确定',
            variant: 'base',
            theme: 'danger',
        },
        onConfirm: ({ e }) => {
            console.log('confirm e: ', e);
            getAPI(SysuserApi).labSysuserUserUseridDelete(id).then((res) => {
                console.warn(res)
                initData();
            }).catch((err) => {
                console.warn(err)
            }).finally(() => {
                showDialog.value = false;
            }
            )
            alertDia.hide();
        },
        onClose: ({ e, trigger }) => {
            console.log('close e: ', e);
            console.log('trigger: ', trigger);
            alertDia.hide();
        },
    });


}

const edit = async ({ row }) => {
    console.warn("编辑", row)
    showEdit.value = showEdit.value ? false : true;
    console.warn(typeof (showEdit.value))
    rowData.value = { ...row };
}

const selectedRowKeys = ref([102]);

const rehandleClickOp = ({ row }) => {
    console.log(row);
};

const rehandleSelectChange = (value, { selectedRowData }) => {
    selectedRowKeys.value = value;
    rowData.value = selectedRowData;
    console.log(value, selectedRowData);
};
</script>
  
<style lang="less" scoped>
.link {
    cursor: pointer;
    margin-right: 15px;
}

.status {
    position: relative;
    color: #00a870;
    margin-left: 10px;

    &::before {
        position: absolute;
        top: 50%;
        left: 0px;
        transform: translateY(-50%);
        content: "";
        background-color: #00a870;
        width: 6px;
        height: 6px;
        margin-left: -10px;
        border-radius: 50%;
    }
}

.status.unhealth {
    color: #e34d59;

    &::before {
        background-color: #e34d59;
    }
}
</style>
  