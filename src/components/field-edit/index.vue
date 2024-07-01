<template>
    <div>
        <div class="pb-10">正在编辑{{ fieldName }}字段</div>
        <component :is="getComponentType(fieldType)" v-model="fieldValue" :placeholder="`请输入${fieldValue}`"
            @input="handleInput"></component>
    </div>


</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// Props 接收传入的字段名称、字段值和字段类型
const props = defineProps({
    fieldName: String,
    fieldValue: [String, Number, Boolean],
    fieldType: String
});

// Emits 传出编辑完成后的字段名称和字段值
const emit = defineEmits(['udpate:updateField']);

const fieldValue = ref(props.fieldValue);

// 根据字段类型选择合适的组件
const getComponentType = (type) => {
    switch (type) {
        case 'text':
            return 't-input';
        case 'number':
            return 't-input-number';
        case 'select':
            return 't-select'; // 这里你需要根据具体情况传入选项数据
        case 'date':
            return 't-date-picker';
        default:
            return 't-input';
    }
};

const handleInput = (value) => {
    console.warn(fieldValue.value);
    // emit('updateField', fieldName, value);
    emit('udpate:updateField', fieldValue.value);
}

</script>

<style scoped></style>