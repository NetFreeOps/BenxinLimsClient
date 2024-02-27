<template>
    <div>
        <t-card title="编辑工作流">
            <template #actions>
                <t-button type="primary">保存</t-button>
                <t-button>预览</t-button>
                <t-button>取消</t-button>
            </template>
        </t-card>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const backgroundColorList = ref([])
const iconList = ref([])
const programList = ref([])
</script>
