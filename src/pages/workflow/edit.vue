<template>
    <div>
        <t-card title="编辑工作流">
            <template #actions>
                <t-button theme="primary">保存</t-button>
                <t-button theme="primary">预览</t-button>
                <t-button theme="danger">取消</t-button>
            </template>
        </t-card>

        <div class="flex">
            <t-card style="width: 19%;" title="组件列表"></t-card>
            <t-card style="width: 79%;" title="工作流编辑器">

            </t-card>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const componentList = ref([])// 组件列表来源于后台，后台管理员配置好可用组件
const backgroundColorList = ref([])
const iconList = ref([])
const programList = ref([])
const workFlow = ref([{ type: "登记模板", items: [{ id: 1, orderNum: 1, name: "成品登记", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }] }])
</script>
