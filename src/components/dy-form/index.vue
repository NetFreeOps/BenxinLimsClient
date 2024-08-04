<template>
    <div>

    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
    // 菜单数据
    formData: {
        type: Array,
        default: () => []
    },
    formConfig: {
        type: Array,
        default: () => []
    }
})
</script>