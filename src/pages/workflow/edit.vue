<template>
    <div>
        <div>
            <t-card title="编辑工作流">
                <template #actions>
                    <t-button theme="primary">加载</t-button>
                    <t-button theme="primary" @click="saveWorkflow">保存</t-button>
                    <t-button theme="primary" @click="showPreviewDialog">预览</t-button>
                    <t-button theme="danger">删除</t-button>
                </template>
            </t-card>

            <div class="flex">
                <t-card style="width: 20%; height: 80vh;" title="组件列表">
                    <t-list split>
                        <VueDraggable v-model="componentList" :animation="150" ghostClass="ghost"
                            :group="{ name: 'people', pull: 'clone', put: false }" @clone="onClone">

                            <t-list-item v-for="item in componentList" :key="item.id">
                                <t-icon :icon="item.icon" />
                                <span>{{ item.name }}</span>
                            </t-list-item>
                        </VueDraggable>
                    </t-list>

                </t-card>

                <t-card style="width: 80%;" title="工作流编辑器">
                    <template #actions>
                        <t-button @click="showCreateTypeDialog">创建分类</t-button>
                    </template>
                    {{ editWorkflow }}
                    <div v-for="(item, index) in editWorkflow" :key="index">
                        <t-card :title="item.type" style="margin-top: 20px;">
                            <template #actions><!-- 编辑大类 -->
                                <t-button @click="showEditTypeDialog(item, index)">编辑</t-button>
                                <t-button theme="danger" @click="deleteType(index)">删除</t-button>
                            </template>
                            <VueDraggable v-model="item.items" :animation="150" ghostClass="ghost"
                                :group="{ name: 'people' }" class="edit-card">
                                <t-card v-for="(items, indexs) in item.items" :key="indexs"
                                    style="width:200px;margin:5px" :style="{ backgroundColor: items.backgroundColor }">
                                    <template #actions><!-- 编辑具体项目 -->
                                        <t-button size="small"
                                            @click="showEditItemDialog(item, index, indexs)">编辑</t-button>
                                        <t-button size="small" theme="danger"
                                            @click="deleteItem(index, indexs)">删除</t-button>
                                    </template>
                                    {{ items.name }}
                                </t-card>
                                <!-- <div v-for="(items, indexs) in item.items" :key="indexs" :span="4" style="margin-top:10px">
                                {{ items.name }}
                            </div> -->
                            </VueDraggable>

                        </t-card>
                    </div>
                </t-card>
            </div>
        </div>
        <!-- 创建分类对话框 -->
        <t-dialog v-model:visible="createTypeDialog" header="请输入分类名称" :on-cancel="() => { }" :on-confirm="createType">
            <t-input v-model="subTypeName" />
        </t-dialog>
        <!-- 编辑大类对话框 -->
        <t-dialog v-model:visible="editTypeDialog" header="请重新输入分类名称" :on-cancel="() => { }" :on-confirm="editType">
            <t-input v-model="editTypeData.name" />
        </t-dialog>

        <!-- 编辑具体项对话框 -->
        <t-dialog v-model:visible="editItemDialog" header="编辑具体项" :on-cancel="() => { }" :on-confirm="editItem">
            <t-form>
                <t-form-item label="名称">
                    <t-input v-model="editItemData.data.name" />
                </t-form-item>
                <t-form-item label="背景颜色">
                    <t-color-picker v-model="editItemData.data.backgroundColor" />
                </t-form-item>
                <t-form-item label="图标">
                    <t-input v-model="editItemData.data.icon" />
                </t-form-item>
                <t-form-item label="要加载的程序">
                    <t-input v-model="editItemData.data.programName" />
                </t-form-item>
            </t-form>
        </t-dialog>

        <!-- 预览对话框 -->
        <t-dialog v-model:visible="previewDialog" header="预览" :on-cancel="() => { }" :on-confirm="confirmPreviewDialog"
            width="1000px">
            <div v-for="(item, index) in editWorkflow" :key="index">
                <t-card :title="item.type" style="width:100%;margin-top:20px">
                    <div class="grid-container">
                        <div class="grid-item" v-for="(items, indexs) in item.items" :key="indexs"
                            :style="{ backgroundColor: items.backgroundColor }">
                            <div>
                                <div style="height:160px">{{ items.name }}</div>
                            </div>
                        </div>
                    </div>
                </t-card>
            </div>
        </t-dialog>
    </div>

</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { VueDraggable, useDraggable } from 'vue-draggable-plus';
import { randomString } from '@/utils/common';
import { use } from 'echarts';

const componentList = ref([{ id: "1", orderNum: 1, name: "成品登记", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }, { id: "1", orderNum: 1, name: "原料登记", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }])// 组件列表来源于后台，后台管理员配置好可用组件
const editWorkflow = ref([{ type: '分类', items: [{ id: "1", orderNum: 1, name: "", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }] }])// 编辑的工作流
const subTypeData = ref({ type: '', items: [{ id: "1", orderNum: 1, name: "", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }] })// 子分组数据格式
const subTypeName = ref('')// 子分组名称
const editTypeData = ref({ name: '', index: '' })// 编辑大类名称
const editItemData = ref({ data: { id: "1", orderNum: 1, name: "", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }, index: -1, indexs: -1 })// 编辑项数据格式
/* 拖拽组件 */
const el1 = ref()
const el2 = ref()

/* 弹窗 */
const createTypeDialog = ref(false)// 创建分类弹窗显示隐藏
const previewDialog = ref(false)// 预览弹窗显示隐藏
const editTypeDialog = ref(false)// 编辑大类弹窗显示隐藏
const editSubTypeDialog = ref(false)// 编辑小类弹窗显示隐藏
const editItemDialog = ref(false)// 编辑具体项弹窗显示隐藏

onMounted(() => {
    console.warn("编辑工作流")
})

/* 显示创建分类弹窗 */
const showCreateTypeDialog = () => {
    createTypeDialog.value = true
}
/* 显示预览弹窗 */
const showPreviewDialog = () => {
    previewDialog.value = true
}
/* 显示编辑大类弹窗 */
const showEditTypeDialog = (item, index) => {
    editTypeDialog.value = true
    editTypeData.value = { name: item.type, index: index }
}

/* 显示编辑具体项弹窗 */
const showEditItemDialog = (item, index, indexs) => {
    editItemDialog.value = true
    editItemData.value.data = item
    editItemData.value.index = index
    editItemData.value.indexs = indexs
}

const confirmPreviewDialog = () => {
    previewDialog.value = false
}
/* 监听editWorkflow变化 */
watch(editWorkflow.value, (newVal) => {
    console.log(newVal)
    // 按照子元素的顺序赋值ordNum
    newVal.forEach((item, index) => {
        // 如果长度大于1，删除名称为空的元素
        if (item.items.length > 1) {
            item.items = item.items.filter(items => items.name !== '')
        }
        item.items.forEach((items, indexs) => {
            items.orderNum = indexs + 1
            // 如果id = 1，赋值一个随机id
            if (items.id === "1") {
                items.id = randomString(8)
            }
        })

    })
})




/* 拖拽组件 */
const onClone = (e) => {
    console.log(e)
}


/* 创建分类 */
const createType = () => {
    // 检查是否存在同名分类
    if (editWorkflow.value.some(item => item.type === subTypeName.value)) {
        MessagePlugin.error('已存在同名分类')
        return
    }

    const newSubType = { ...subTypeData.value, type: subTypeName.value } // 使用浅拷贝创建新的对象
    createTypeDialog.value = false
    editWorkflow.value.push(newSubType) // 添加新对象到数组
}
/* 编辑大类名称 */
const editType = () => {
    // 检查是否存在同名分类
    if (editWorkflow.value.some(item => item.type === editTypeData.value.name)) {
        MessagePlugin.error('已存在同名分类')
        return
    }
    editWorkflow.value[editTypeData.value.index].type = editTypeData.value.name
    editTypeDialog.value = false
}
/* 删除大类 */
const deleteType = (index) => {
    editWorkflow.value.splice(index, 1)
}
/* 编辑分项 */
const editItem = () => {
    editWorkflow.value[editItemData.value.index].items[editItemData.value.indexs].name = editItemData.value.data.name
    editWorkflow.value[editItemData.value.index].items[editItemData.value.indexs].backgroundColor = editItemData.value.data.backgroundColor
    editWorkflow.value[editItemData.value.index].items[editItemData.value.indexs].icon = editItemData.value.data.icon
    editWorkflow.value[editItemData.value.index].items[editItemData.value.indexs].programName = editItemData.value.data.programName
    editItemDialog.value = false
}
/* 删除分项*/
const deleteItem = (index, indexs) => {
    editWorkflow.value[index].items.splice(indexs, 1)
}

/* 保存工作流 */
const saveWorkflow = () => {
    // 保存工作流
    console.log(editWorkflow.value)
    // 检查是否有空名称
    if (editWorkflow.value.some(item => item.items.some(items => items.name === ''))) {
        MessagePlugin.error('存在空名称')
        return
    }
}

</script>

<style>
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    justify-content: flex-start;
    /* 左对齐 */
    gap: 10px;
    /* 子元素之间的间距（可选） */
    padding: 10px;
}

.grid-item {
    height: 200px;
    max-width: 400px;
    background-color: #f0f0f0;
    /* 只是为了方便展示，你可以替换为你需要的背景颜色或样式 */
    border: 1px solid #ccc;
    text-align: center;
    line-height: 200px;
}

.edit-card {
    display: flex;
    flex-wrap: wrap;
}

.edit-card>* {
    flex-shrink: 0;
}
</style>