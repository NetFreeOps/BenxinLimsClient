<template>
    <div>
        <div class="pb-10">正在编辑<span class="text-weight-b text-size-lg px-5">{{ fieldName }}</span>
        </div>
        <!-- <component :is="getComponentType(fieldType)" v-model="inValue" v-if="fieldType !== 'switch'">
            <t-option v-for="option in listData" :key="option.value" :value="option.value">{{ option.name }}</t-option>
        </component> -->
        <t-textarea v-model="inValue" v-if="fieldType === 'text'" />
        <t-input-number v-model="inValue" v-if="fieldType === 'number'" />
        <t-select v-model="inValue" v-if="fieldType === 'select'">
            <t-option v-for="option in listData" :key="option.value" :value="option.value">{{ option.name }}</t-option>
        </t-select>

    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { getAPI } from '@/axios-utils';
import { ListApi } from '@/api-services';
// Props 接收传入的字段名称、字段值和字段类型
const props = defineProps({
    fieldName: String,
    fieldValue: [String, Number],
    fieldType: String,
    listKey: String
});
const listData = ref([{ id: -1, name: '', value: '', order: '' }]);

// Emits 传出编辑完成后的字段名称和字段值
const emit = defineEmits(['update:updateField']);

const inValue = ref(props.fieldValue);

// 根据字段类型选择合适的组件
const getComponentType = (type) => {
    switch (type) {
        case 'text':
            return 't-textarea';
        case 'number':
            return 't-input-number';
        case 'select':
            getListData();
            return 't-select'; // 这里你需要根据具体情况传入选项数据
        case 'switch':
            return 't-switch';
        case 'date':
            return 't-date-picker';
        default:
            return 't-input';
    }
};
/* 获取列表数据 */
const getListData = () => {
    // 这里你需要根据具体情况获取列表数据
    console.warn(props.listKey)
    getAPI(ListApi).apiListListitembylistnameListnameGet(props.listKey).then((res) => {
        console.log(res);
        listData.value = res.data.data
    });
    return [];
};

const handleInput = (value) => {
    inValue.value = value;
    emit('update:updateField', value);
};

// 监听 inValue 的变化，当其变化时触发 handleInput 逻辑
watch(inValue, (newVal) => {
    handleInput(newVal);
});

watch(() => props.fieldValue, (newVal) => {
    inValue.value = newVal;
});
// 监听props.fieldType的变化，当其变化时触发 getComponentType 逻辑
watch(() => props.fieldName, (newVal) => {
    getComponentType(props.fieldType);
});

</script>

<style scoped></style>
