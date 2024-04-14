<template>
    <div>
        <t-card title="编辑工作流">
            <template #actions>
                <t-button theme="primary">加载</t-button>
                <t-button theme="primary">保存</t-button>
                <t-button theme="primary">预览</t-button>
                <t-button theme="danger">删除</t-button>
            </template>
        </t-card>

        <div class="flex">
            <t-card style="width: 20%; height: 80vh;" title="组件列表">
                <t-list split>
                    <t-list-item v-for="item in componentList" :key="item.id">
                        <t-icon :icon="item.icon" />
                        <span>{{ item.name }}</span>
                    </t-list-item>
                </t-list>
            </t-card>

            <t-card style="width: 80%;" title="工作流编辑器">
                <template #actions>
                    <t-button @click="showCreateTypeDialog">创建分类</t-button>
                </template>
                <div v-for="(item, index) in editWorkflow" :key="index">
                    <t-card :title="item.type">
                        <t-row>
                            <t-col v-for="(items, indexs) in item.items" :key="indexs">
                                <t-card style="height:50px;width:200px">
                                    <t-icon :icon="items.icon" />
                                    <span>{{ items.name }}</span>
                                </t-card>
                            </t-col>
                        </t-row>
                    </t-card>
                    {{ item }}
                </div>

            </t-card>
        </div>
    </div>
    <t-dialog v-model:visible="createTypeDialog" title="请输入分类名称" :on-cancel="() => { }" :on-confirm="createType">
        <t-input v-model="subTypeName" />
    </t-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const componentList = ref([{ id: 1, orderNum: 1, name: "成品登记", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }, { id: 1, orderNum: 1, name: "原料登记", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }])// 组件列表来源于后台，后台管理员配置好可用组件
const editWorkflow = ref([{ type: '分类', items: [{ id: 1, orderNum: 1, name: "", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }] }])// 编辑的工作流
const subTypeData = ref({ type: '', items: [{ id: 1, orderNum: 1, name: "", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }] })// 子分组数据格式
const subTypeName = ref('')// 子分组名称

/* 弹窗 */
const createTypeDialog = ref(false)// 创建分类弹窗显示隐藏

/* 显示创建分类弹窗 */
const showCreateTypeDialog = () => {
    createTypeDialog.value = true
}

/* 创建分类 */
const createType = () => {
    // 检查是否存在同名分类
    if (editWorkflow.value.some(item => item.type === subTypeName.value)) {
        MessagePlugin.error('已存在同名分类')
        return
    }
    subTypeData.value.type = subTypeName.value
    createTypeDialog.value = false
    editWorkflow.value.push(subTypeData.value)
}

</script>