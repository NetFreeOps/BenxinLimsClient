<template>
    <div class="edit-content">
        <t-space class="flex-end">
            <t-button @click="showModal('params')">添加计算变量</t-button>
            <t-button @click="SaveCode">保存</t-button>
        </t-space>
        <t-table :columns="columns" :data="calcCodeList.params" row-key="id"></t-table>

        <Codemirror id="editCodeContent" v-if="editCode" v-model:value="calcCodeList.code" :options="cmOptions"
            ref="cmRef" height="300" @change="CodeChange" @input="CodeInput" @ready="CodeReady"></Codemirror>
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
import { onMounted, watch, ref } from 'vue';
import { getAPI } from '@/axios-utils';
import { SysdynamicsubApi } from '@/api-services'
import { MessagePlugin } from 'tdesign-vue-next';
import "codemirror/mode/javascript/javascript.js"
import Codemirror from "codemirror-editor-vue3"
import type { CmComponentRef } from "codemirror-editor-vue3"
import type { Editor, EditorConfiguration } from "codemirror"

const props = defineProps({
    editCode: {
        type: Boolean,
        default: ''
    },
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
//const calcParamsList = ref([{ id: -1, name: '', value: '', type: '' }]);
const calcParams = ref({ id: -1, name: '', value: '', type: '' })
const calcCodeList = ref({ params: [{ id: -1, name: '', value: '', type: '' }], code: '' })
const paramsModal = ref(false);
const paramsTypeList = ref([{
    label: '分项',
    value: '分项'
}])
const selectedParamsType = ref('')
/* 代码编辑器属性 */
const code = ref('/* 请输入计算公式 */')
const cmRef = ref<CmComponentRef>()
const cmOptions: EditorConfiguration = {
    mode: "text/javascript",
    lineWrapping: true,
    lineNumbers: true,
    spellcheck: true,
    autocorrect: true
}
const CodeInput = (res) => {
    //  console.log(res)
}
const CodeChange = (res) => {
    //  console.log(res)
}
const CodeReady = (editor: Editor) => {
    console.log('代码编辑器初始化', editor)
    //editor.refresh();

}
/* 监听editcode的值 */
watch(() => props.editCode, (newVal, oldVal) => {
    console.warn(props.editItem)
    if (newVal == true) {
        setTimeout(() => {
            cmRef.value.refresh()

        }, 500);
    }
    // 从服务端加载计算公式
    getAPI(SysdynamicsubApi).apiSysdynamicsubDynamiccodeGet(-1, 'analysis', '', props.editItem.analysisId, props.editItem.id).then(res => {
        console.warn(res.data.data)
        var jsonCode = JSON.parse(res.data.data)
        calcCodeList.value = jsonCode
    })
})

/* 根据变量选择类型计算下一步的数据 */
const handleSelectedParamsType = (res) => {
    console.log(res)
}
/* 将参数添加到主窗口的表格中 */
const AddParams = () => {
    //calcParamsList.value.push({ id: -1, name: '', value: '', type: '' })
    if (calcCodeList.value.params[0].id == -1) {
        calcCodeList.value.params = []
    }
    calcParams.value.id = calcCodeList.value.params.length + 1
    // 检查变量名不能重复
    if (calcCodeList.value.params.some(item => item.name == calcParams.value.name)) {
        MessagePlugin.error('变量名不能重复')
        return
    }
    // 深拷贝
    const tmp = JSON.parse(JSON.stringify(calcParams.value))
    calcCodeList.value.params.push(tmp)
    hideModal('params')
}
const SaveCode = () => {

    // console.warn(cmRef.value.refresh())
    var stringCode = JSON.stringify(calcCodeList.value)
    getAPI(SysdynamicsubApi).apiSysdynamicsubSavedynamiccodePost(stringCode, props.editItem.id, 'analysis', props.editItem.name, props.editItem.analysisId, props.editItem.id).then(res => {
        MessagePlugin.success('保存成功')
    })
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

.CodeMirror {
    width: 100% !important;
    height: 300px !important;

}
</style>