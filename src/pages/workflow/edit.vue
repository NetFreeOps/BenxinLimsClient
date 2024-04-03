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
                    <t-list-item v-for="item in componentList" :key="item.id">
                        <t-icon :icon="item.icon" />
                        <span>{{ item.name }}</span>
                    </t-list-item>
                </t-list>
            </t-card>

            <t-card style="width: 80%;" title="工作流编辑器">


            </t-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const componentList = ref([{ id: 1, orderNum: 1, name: "成品登记", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }, { id: 1, orderNum: 1, name: "原料登记", backgroundColor: "#f0f0f0", icon: "path/to/main/icon.png", programName: "My Application" }])// 组件列表来源于后台，后台管理员配置好可用组件


</script>