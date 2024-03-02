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
            <t-card style="width: 20%;" title="组件列表">
                <t-list>
                    <t-list-item v-for="item in componentList" :key="item.id" draggable="true" class="border-com mt-5"
                        @dragstart="(e) => left_dragStart(e, item)" @dragend="(e) => left_dragEnd(e, item)"
                        @dragover.prevent>
                        <t-icon :icon="item.icon" />
                        <span>{{ item.name }}</span>
                    </t-list-item>
                </t-list>
            </t-card>

            <t-card style="width: 80%;" title="工作流编辑器">

                <template #actions>
                    <t-button theme="primary" @click="showAddType">添加大类</t-button>
                </template>
                <div v-for="(item, index) in     workFlow    " :key="index" class="border-com pa-5">
                    <div class="flex flex-between">
                        <t-tag theme="primary">
                            <span>{{ item.type }}</span>

                        </t-tag>
                        <div>
                            <t-button theme="primary" variant="outline" @click="showEditType(item, index)">编辑</t-button>
                            <t-button theme="danger" variant="outline" @click="delType(index)">删除</t-button>
                        </div>
                    </div>
                    <div class="grid-container" style="min-height: 100px;" @dragenter="onDragEnter"
                        @dragleave="onDragLeave" @dragover.prevent="onDragOver" @drop="(e) => onDrop(e, item)">
                        <div class="grid-item" v-for="(    items, indexs    ) in     item.items    " :key="indexs"
                            draggable="true">
                            <div class="border-com flex flex-between flex-col" style="height:160px;width: 160px;">
                                <div>{{ items.icon }}</div>
                                <div>{{ items.name }}</div>
                                <t-button size="small" theme="primary" variant="outline">选择程序</t-button>
                            </div>
                        </div>

                    </div>

                </div>

            </t-card>
        </div>
        <t-dialog v-model:visible="dialogVisible" header="添加大类" :on-confirm="addType">
            <t-input v-model="typeName" placeholder="请输入大类名称" />
        </t-dialog>
        <t-dialog v-model:visible="editTypeVisible" header="编辑大类" :on-confirm="editType">
            <t-input v-model="typeName" placeholder="请输入大类名称" />
        </t-dialog>
    </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { ref, onMounted, onBeforeUnmount } from 'vue'

const componentList = ref([{ id: 1, orderNum: 1, name: "成品登记", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }, { id: 1, orderNum: 1, name: "原料登记", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }])// 组件列表来源于后台，后台管理员配置好可用组件
const backgroundColorList = ref([])
const iconList = ref([])
const programList = ref([])
const workFlow = ref([{ type: "登记模板", items: [{ id: 1, orderNum: 1, name: "成品登记", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }] }])

const typeName = ref('')// 大类名称
const editTypeVisible = ref(false)// 显示编辑大类弹窗
const dialogVisible = ref(false) // 显示弹窗
const selectedEditType = ref(-1)// 选中的大类

// 组件区坐标
const componentArea = ref({ x: 0, y: 0, width: 0, height: 0 })
// 工作流区坐标
const workFlowArea = ref({ x: 0, y: 0, width: 0, height: 0 })

onMounted(() => {
    getComponentList()
    getProgramList()
})

const getComponentList = () => {
    // 获取组件列表
}
const getProgramList = () => {
    // 获取程序列表
}

const showAddType = () => {
    // 显示添加大类弹窗
    dialogVisible.value = true
}
const showEditType = (item: any, index: number) => {
    // 显示编辑大类
    typeName.value = item.type
    selectedEditType.value = index
    editTypeVisible.value = true

}

const addType = () => {

    // 检查大类名称是否为空
    if (!typeName.value) {
        MessagePlugin.warning('大类名称不能为空')
        return
    }
    // 检查大类名称是否重复
    if (workFlow.value.some(item => item.type === typeName.value)) {
        MessagePlugin.warning('大类名称重复')
        typeName.value = ''
        return
    }
    // 隐藏弹窗
    dialogVisible.value = false
    // 添加大类
    workFlow.value.push({ type: typeName.value, items: [] })

}
// 编辑大类
const editType = () => {
    console.warn('编辑大类')
    // 检查大类名称是否为空
    if (!typeName.value) {
        MessagePlugin.warning('大类名称不能为空')
        return
    }
    // 检查大类名称是否重复
    if (workFlow.value.some(item => item.type === typeName.value)) {
        MessagePlugin.warning('大类名称重复')
        typeName.value = ''
        return
    }
    editTypeVisible.value = false
    // 编辑大类
    workFlow.value[selectedEditType.value].type = typeName.value
}

const delType = (index: number) => {
    // 删除大类
    workFlow.value.splice(index, 1)
}

/* 拖拽函数 */
const left_dragStart = (e: DragEvent, item: any) => {
    console.log('dragStart', e)
    // 记录拖拽元素的位置
    componentArea.value = (e.target as HTMLElement).getBoundingClientRect()
    console.log('componentArea', componentArea.value)
    console.warn('item', item)
}
const left_dragEnd = (e: DragEvent, item: any) => {
    console.log('dragEnd', e)
    // 记录拖拽元素的位置
    workFlowArea.value = (e.target as HTMLElement).getBoundingClientRect()
    console.log('workFlowArea', workFlowArea.value)
    console.warn('item', item)
}
const onDragEnter = (e: DragEvent) => {
    console.log('onDragEnter', e)
    const target = e.target as HTMLElement
    // target.style.border = '1px solid #eeeeee'
    target.classList.add('border-active')
}
const onDragLeave = (e: DragEvent) => {
    console.log('onDragLeave', e)
    const target = e.target as HTMLElement
    target.classList.remove('border-active')
}
const onDragOver = (e) => {
    // 必须阻止默认行为才能触发 drop 事件
    e.preventDefault();
}

const onDrop = (e: DragEvent, item: any) => {
    console.log('onDrop', e)
    const target = e.target as HTMLElement
    target.classList.remove('border-active')
    // 计算拖拽元素的位置
    const x = e.clientX - workFlowArea.value.x
    const y = e.clientY - workFlowArea.value.y
    console.log('x', x, 'y', y)
    // 添加组件
    item.items.push({ id: 1, orderNum: 1, name: "成品登记", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" })
}
</script>

<style>
.border-com {
    border: 2px solid #eeeeee;
}

.border-active {
    box-shadow: 0px 0px 10px rgba(0, 140, 200, 0.3),
        /* 更柔和的半透明内阴影 */
        0px 0px 20px rgba(0, 140, 200, 0.5);
    /* 更柔和且更强的半透明外阴影 */
    outline: 2px solid rgba(0, 140, 200, 0.3);
    /* 可选：添加更柔和荧光效果的轮廓 */
}

.border-unactive {
    box-shadow: 0;

}

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
</style>
