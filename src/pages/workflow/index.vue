<template>
    <div v-for="(item, index) in pageComponent" :key="index">
        <t-card title="我的工作台" style="width:95%;margin-top:20px">
            <div class="grid-container">
                <div class="grid-item" v-for="(items, indexs) in item.items" :key="indexs">
                    <div>
                        <div style="height:160px">{{ items.name }}</div>
                    </div>
                </div>

            </div>
        </t-card>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 定义初始配置文件格式
const userWorkFlow = ref([{
    "id": 1,
    "orderNum": 1,
    "type": "登记模板",
    "name": "成品登记",
    "backgroundColor": "#f0f0f0",
    "icon": "path/to/main/icon.png",
    "programName": "My Application"
}, {
    "id": 1,
    "orderNum": 1,
    "type": "登记模板",
    "name": "原油登记",
    "backgroundColor": "#f0f0f0",
    "icon": "path/to/main/icon.png",
    "programName": "My Application"
}, {
    "id": 1,
    "orderNum": 1,
    "type": "登记模板",
    "name": "辅料登记",
    "backgroundColor": "#f0f0f0",
    "icon": "path/to/main/icon.png",
    "programName": "My Application"
}, {
    "id": 1,
    "orderNum": 1,
    "type": "样品管理",
    "name": "接收样品",
    "backgroundColor": "#f0f0f0",
    "icon": "path/to/main/icon.png",
    "programName": "My Application"
}, {
    "id": 1,
    "orderNum": 1,
    "type": "样品管理",
    "name": "录入结果",
    "backgroundColor": "#f0f0f0",
    "icon": "path/to/main/icon.png",
    "programName": "My Application"
}, {
    "id": 1,
    "orderNum": 1,
    "type": "样品管理",
    "name": "审核结果",
    "backgroundColor": "#f0f0f0",
    "icon": "path/to/main/icon.png",
    "programName": "My Application"
}])
const pageComponent = ref([])
onMounted(() => {
    // 获取用户工作流
    // userWorkFlow.value = []
    getWorkFlow();
})

const getWorkFlow = () => {
    // 获取用户工作流
    // userWorkFlow.value = []
    pageComponent.value = Object.values(userWorkFlow.value.reduce((acc, item) => {
        if (!acc[item.type]) {
            acc[item.type] = { type: item.type, items: [] };
        }
        acc[item.type].items.push({
            id: item.id,
            orderNum: item.orderNum,
            name: item.name,
            backgroundColor: item.backgroundColor,
            icon: item.icon,
            programName: item.programName,
        });
        return acc;
    }, {}));
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
</style>