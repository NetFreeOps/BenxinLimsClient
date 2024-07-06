<template>
    <div class="edit-content">
        {{ editItem }}
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
const props = defineProps({

    editItem: {
        type: Object,
        default: () => ({})
    }
});
</script>
<style>
.edit-content {
    width: 100%;
    height: 500px
}
</style>