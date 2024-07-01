<template>
    <div style="display: flex; justify-content: space-around;">
        <!-- 左侧区域 -->
        <div style="width: 30%;">
            <t-card title="请选择分析方法" :header-bordered="true">
                <template #actions>
                    <t-button theme="primary" @click="addAnalysis">新增分析</t-button>
                </template>
                <t-input label="搜索：" v-model="searchParams" @enter="fiterAnalysis"></t-input>
                <t-radio-group class="flex flex-col pt-n5" @change="changeAnalysisType">
                    <t-radio :value="item.id" v-for="(item, index) in leftAnalysis" :key="index" :allow-uncheck="true"
                        class="py-5">
                        {{ item.name }}
                    </t-radio>
                </t-radio-group>
            </t-card>

        </div>

        <!-- 右侧区域 -->
        <div style="width: 65%; display: flex; flex-direction: column;">
            <!-- 上半部分：分析基础信息的变更 -->
            <div style="flex: 1;">
                <t-card title="分析基础信息">
                    <t-form>
                        <t-form-item label="分析名称" name="name">
                            <t-input v-model="analysisInfo.name" placeholder="请输入分析名称" />
                        </t-form-item>
                        <t-form-item label="描述" name="description">
                            <t-input v-model="analysisInfo.description" placeholder="请输入描述" />
                        </t-form-item>
                    </t-form>
                </t-card>
            </div>

            <!-- 下半部分：分项的录入 -->
            <div style="flex: 1; margin-top: 16px;">
                <t-card title="分项录入">
                    <t-form>
                        <t-form-item label="分项名称" name="subItemName">
                            <t-input v-model="subItem.name" placeholder="请输入分项名称" />
                        </t-form-item>
                        <t-form-item label="分项描述" name="subItemDescription">
                            <t-input v-model="subItem.description" placeholder="请输入分项描述" />
                        </t-form-item>
                        <t-space>
                            <t-button theme="primary" @click="addSubItem">新增分项</t-button>
                            <t-button @click="resetSubItem">重置</t-button>
                        </t-space>
                    </t-form>
                </t-card>
            </div>
        </div>
        <t-dialog v-model:visible="analysisEditModal" @confirm="hideModal('analysis')" header="字段编辑器">
            <fieldEdit :field-name="field.name" :field-value="field.value" :field-type="field.type"
                v-model:updateField="field.updateValue" />
        </t-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAPI } from '@/axios-utils';
import { AnalysisApi } from '@/api-services';
import fieldEdit from '@/components/field-edit/index.vue';

const ANALYSIS_TYPE = [
    { key: 1, value: '类型1' },
    { key: 2, value: '类型2' },
    { key: 3, value: '类型3' },
];
const analysisEditModal = ref(false);

/* 要编辑的字段信息 */
const field = ref({
    name: '',
    value: '',
    updateValue: '',
    type: 'text',
});
/* 编辑后的字段值 */
const updateField = ref('');

const searchParams = ref('');
const leftAnalysis = ref([{ id: 1, name: '类型1' }, { id: 2, name: '类型2' }])
const analysisInfo = ref({
    id: 1,
    name: '',
    description: '',
});

const subItem = ref({
    name: '',
    description: '',
});
onMounted(() => {
    getAllAnalysis();
});

/* 获取所有分析 */
const getAllAnalysis = async () => {
    console.log('Get All Analysis');
    getAPI(AnalysisApi).apiAnalysisAnalysislistGet().then((res) => {

    });

};
const fiterAnalysis = () => {
    console.log('Search:', searchParams.value);
    // 在此处添加你的逻辑
};
const addAnalysis = () => {
    console.log('Add Analysis:', analysisInfo.value);
    // 在此处添加你的逻辑
};

const changeAnalysisType = (value) => {
    console.log('Selected Analysis Type:', value);
    // 在此处添加你的逻辑
};

const addSubItem = () => {
    console.log('Add Sub Item:', subItem.value);
    // 在此处添加你的逻辑
    analysisEditModal.value = true;
};

const resetSubItem = () => {
    subItem.value = {
        name: '',
        description: '',
    };
};

const handleFieldUpdate = (fieldName, fieldValue) => {
    console.log('Field Update:', fieldName, fieldValue);
    // 在此处添加你的逻辑
    analysisEditModal.value = false;
};
const showModal = () => {
    analysisEditModal.value = true;
};
const hideModal = (res) => {
    console.warn(updateField)
    switch (res) {
        case 'analysis':
            analysisEditModal.value = false;
            break;
        default:
            break;
    }


};
</script>

<style scoped>
.flex {
    display: flex;
}

.flex-col {
    flex-direction: column;
}
</style>