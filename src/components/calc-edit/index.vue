<template>
    <div class="edit-content">
        <t-space class="flex-end">
            <t-button @click="showModal('params')">添加计算变量</t-button>
        </t-space>
        <t-table :columns="columns" :data="calcParamsList" row-key="id"></t-table>
        <Codemirror v-model:value="code" :options="cmOptions" border ref="cmRef" height="400" width="600"
            @change="onChange" @input="onInput" @ready="onReady">
        </Codemirror>
        <!-- {{ editItem }} -->
        <t-dialog v-model:visible="paramsModal" header="正在添加变量" @confirm="AddParams">
            <t-select v-model="selectedParamsType" :options="paramsTypeList"
                @change="handleSelectedParamsType"></t-select>
            <t-form v-if="selectedParamsType == '分项'" class="mt-20">
                <t-form-item label="变量名称：">
                    <t-input v-model="calcParams.name" placeholder="请输入变量名称" />
                </t-form-item>
                <t-form-item label="来源：">
                    <!-- <t-input v-model="calcParams.value" placeholder="来源" /> -->
                    <t-select v-model="calcParams.value" :options="analysisItemList"></t-select>
                </t-form-item>
            </t-form>
        </t-dialog>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import "codemirror/mode/javascript/javascript.js"
import Codemirror from "codemirror-editor-vue3"
import type { CmComponentRef } from "codemirror-editor-vue3"
import type { Editor, EditorConfiguration } from "codemirror"

const props = defineProps({

    editItem: {
        type: Object,
        default: () => ({})
    },
    analysisItemList: {
        type: Array,
        default: () => []
    }
});
const columns = [{ title: 'id', colKey: 'id', width: 100 },
{ title: '名称', colKey: 'name' },
{ title: '值', colKey: 'value' },
{ title: '类型', colKey: 'type' }]
const calcParamsList = ref([{ id: -1, name: '', value: '', type: '' }]);
const calcParams = ref({ id: -1, name: '', value: '', type: '' })
const paramsModal = ref(false);
const paramsTypeList = ref([{
    label: '分项',
    value: '分项'
}])
const selectedParamsType = ref('')
/* 代码编辑器属性 */
const code = ref('')
const cmRef = ref<CmComponentRef>()
const cmOptions: EditorConfiguration = {
    mode: "text/javascript"
}

/* 根据变量选择类型计算下一步的数据 */
const handleSelectedParamsType = (res) => {
    console.log(res)
}
/* 将参数添加到主窗口的表格中 */
const AddParams = () => {
    //calcParamsList.value.push({ id: -1, name: '', value: '', type: '' })
    if (calcParamsList.value[0].id == -1) {
        calcParamsList.value = []
    }
    calcParams.value.id = calcParamsList.value.length + 1
    // 检查变量名不能重复
    if (calcParamsList.value.some(item => item.name == calcParams.value.name)) {
        MessagePlugin.error('变量名不能重复')
        return
    }
    // 深拷贝
    const tmp = JSON.parse(JSON.stringify(calcParams.value))
    calcParamsList.value.push(tmp)
    hideModal('params')
}

const showModal = (res) => {
    switch (res) {
        case 'params':
            paramsModal.value = true;
            break;

        default:
            break;
    }

};
const hideModal = (res) => {
    switch (res) {
        case 'params':
            paramsModal.value = false;
            break;

        default:
            break;
    }
};

</script>
<style>
.edit-content {
    width: 100%;
    height: 500px
}
</style>