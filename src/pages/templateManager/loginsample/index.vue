<template>
    <div style="display: flex;justify-content: space-around;">
        <div style="width: 30%;">
            <t-card title="模板列表">
                <template #actions>
                    <t-button theme="primary" @click="GetTemplateList" shape="circle">
                        <template #icon>

                            <RefreshIcon />
                        </template>

                    </t-button>
                    <t-button @click="AddTemplate">添加模板</t-button>
                </template>
                <t-radio-group class="flex flex-col flex-start pt-n5" @change="changeTemplateSelect">
                    <t-radio :value="item.id" v-for="(item, index) in templateList" :key="index" :allow-uncheck="true"
                        class="py-5" style="width: 100%;">
                        {{ item.templateName }}
                        <span v-if="item.status == 1" class="text-success">[激活]</span>
                        <span v-if="item.status == 0" class="text-unactive">[未激活]</span>
                    </t-radio>
                </t-radio-group>
            </t-card>
        </div>
        <div style="width: 65%;">
            <!-- 右上 -->
            <div style="flex: 1;">
                <t-card title="模板信息">
                    <t-form>
                        <div style="display: flex; flex-wrap: wrap;">
                            <div style="width: 33%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="模板名称：" name="name">
                                    {{ templateInfo.templateName }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeTemplateValue('templateName', templateInfo.templateName, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>
                            <div style="width: 33%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="模板类型：" name="standard">
                                    {{ templateInfo.templateType }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeTemplateValue('templateType', templateInfo.templateType, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>
                            <div style="width: 33%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="是否激活：" name="status">
                                    <t-switch v-model="templateInfo.status" :value="0" :custom-value="['1', '0']"
                                        :default-value="0" @change="switchChange" />
                                </t-form-item>
                            </div>
                            <div style="width: 100%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="描述：" name="description">
                                    {{ templateInfo.description }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeTemplateValue('description', templateInfo.description, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>

                        </div>
                    </t-form>

                </t-card>
            </div>
            <!-- 右下 -->
            <div style="flex: 1; margin-top: 16px;">
                <t-card title="模板分项信息">
                    <template #actions>
                        <t-button theme="primary" @click="loadTemplateItemAndSampleItem">编辑分项</t-button>
                    </template>
                    <!-- <t-table :columns="itemColumns" drag-sort="row" :data="analysisItemList"
                        @drag-sort="orderAnalysisItem" row-key="id">
                        <template #operation="{ row }">
                            <t-button theme="primary" variant="text" @click="showSubItemModal(row)">编辑</t-button>
                            <t-popconfirm theme="danger" content="删除前确认" @confirm="delteAnalysisItem(row)">
                                <t-button theme="danger" variant="text">删除</t-button>
                            </t-popconfirm>
                        </template>
                    </t-table> -->

                </t-card>
            </div>
        </div>
        <!-- 数据表字段弹窗 -->
        <t-dialog v-model:visible="tableFieldModal" @confirm="hideModal('sampleField')" header="样品表字段" width="800px">

            <t-transfer v-model="selectedSampleFiledList" theme="primary" :data="sampleFiledList" :search="true" />
        </t-dialog>
        <!-- 字段编辑器弹窗 -->
        <t-dialog v-model:visible="templateEditModal" @confirm="hideModal('template')" header="字段编辑器">
            <fieldEdit :field-name="field.name" :field-value="field.value" :field-type="field.type"
                :list-key="field.listKey" v-model:updateField="field.updateValue" />
        </t-dialog>
        <!-- 表单预览弹窗 -->
        <t-dialog v-model:visible="previewModal" header="预览" width="800px">
            <dy-form :form-data="formData" :form-config="formConfig" ref="dyFormRef" />
        </t-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAPI } from '@/axios-utils'
import { TemplateApi } from '@/api-services/index'
import dyForm from '@/components/dy-form/index.vue'
import fieldEdit from '@/components/field-edit/index.vue';


const formData = ref([{
    name: '张三',
    age: 18,
    sex: '男',
    address: '北京市',
    hobby: ['吃饭', '睡觉'],
    remark: '我是备注'
}])
const previewModal = ref(false)
const templateEditModal = ref(false)
const tableFieldModal = ref(false)
/* 选中的模板ID */
const selectedTemplateId = ref(1)
/* 要编辑的字段信息 */
const field = ref({
    name: '',
    value: '',
    updateValue: '',
    type: 'text',
    listKey: ''
});

/* 样品表字段信息 */
const sampleFiledList = ref([{
    value: '',
    label: '',
    dataType: '',
    // required: '',//是否必须
    // // disabled: '',//是否禁用
    // readonly: '',//是否只读
    // hidden: ''//是否可见
}])
/* 样品表字段信息-选中 */
const selectedSampleFiledList = ref([])
const selectedTemplateItemFieldList = ref([{
    value: '',
    label: '',
    dataType: '',

}])
const templateList = ref([

])
const templateInfo = ref({
    id: 1,
    templateName: "string",
    templateType: "string",
    description: "string",
    status: "1"
})
const AddTemplateData = ref({
    templateName: "string",
    templateType: "string",
    description: "string"
})
const dyFormRef = ref(null)
const formConfig = ref([])
onMounted(() => {
    dyFormRef.value.init();
    GetTemplateList()
})
/* 加载所有样品登记模板 */
const GetTemplateList = async () => {
    getAPI(TemplateApi).apiTemplateTemplatelistGet().then(res => {
        templateList.value = res.data.data
    })
}
/* 添加模板 */
const AddTemplate = () => {
    getAPI(TemplateApi).apiTemplateTemplatePost(AddTemplateData.value).then(res => {
        GetTemplateList()
    })
}
/* 选择模板，加载模板分项信息 */
const changeTemplateSelect = (id) => {
    selectedTemplateId.value = id
    console.warn(id)
    if (id) {
        // 获取id(index)对应的模板列表中的模板信息
        //  const templateSingle = templateList.value[id - 1]
        const templateSingle = templateList.value.find(item => item.id === id)
        templateInfo.value = templateSingle
        getAPI(TemplateApi).apiTemplateTemplateitemlistGet(templateSingle.templateName).then(res => {
            console.log(res.data.data)
            formConfig.value = res.data.data
        })

    }
}
/* 加载样品字段信息、模板字段信息 */
const loadTemplateItemAndSampleItem = () => {
    showModal('sampleField')
    getAPI(TemplateApi).apiTemplateDbfieldbytablenameTablenameGet('sample').then(res => {
        console.warn(res.data.data)
        sampleFiledList.value = res.data.data.map(item => {
            return {
                label: item.columnDescription + '(' + item.dataType + ')',
                value: item.dbColumnName,
                dataType: '',
                // required: '',
                // readonly: '',
                // hidden: ''
            }
        })
    })
}
/* 弹出字段修改器 */
const changeTemplateValue = (key, value, type, listkey) => {
    console.log('Change Analysis Value:', key, value, type, listkey);
    field.value.name = key;
    field.value.value = value;
    field.value.type = type;
    field.value.listKey = listkey;
    showModal('template')
}
/* 修改指定字段 */
const updateSelectedField = async () => {
    console.log('Update Selected Field:', field.value);
    //  dyFormRef.value.updateField(field.value);

    // 获取待编辑字段ID
    const editId = templateInfo.value.id
    // 待编辑字段名
    const editName = field.value.name
    // 待编辑字段值
    const editValue = field.value.updateValue

    // 将id、字段名、字段值拼接成json
    const editString = `{"id":"${editId}", "${editName}":"${editValue}"}`
    // 转成json
    const editJson = JSON.parse(editString)
    await getAPI(TemplateApi).apiTemplateTemplatePut(editJson).then((res) => {
        getAPI(TemplateApi).apiTemplateTemplatelistGet().then(res => {
            templateList.value = res.data.data
            templateInfo.value = templateList.value.find(item => item.id === editId)
        })
    });

};
/* 开关值直接修改 */
const switchChange = (value) => {
    console.log('Switch Change:', value);
    // 在此处添加你的逻辑
    field.value.name = 'status'
    field.value.updateValue = value
    updateSelectedField();
}
const showModal = (res) => {
    switch (res) {
        case 'sampleField':
            tableFieldModal.value = true;
            break;
        case 'template':
            templateEditModal.value = true;
            break;
        case 'subItem':
            //  subItemEditModal.value = true;
            break;
        case 'calcRule':
            //  calcModal.value = true;
            break;
        default:
            break;
    }
};
const hideModal = (res) => {
    console.warn(field.value.updateValue)
    switch (res) {
        case 'sampleField':
            tableFieldModal.value = false;
            console.warn(selectedSampleFiledList.value)
            selectedTemplateItemFieldList.value = selectedSampleFiledList.value.map(item => {
                return {
                    label: item.label,
                    value: item.value,
                    dataType: item.dataType,
                    required: item.required,
                    readonly: item.readonly,
                    hidden: item.hidden
                }
            })
            break;
        case 'template':
            templateEditModal.value = false;
            updateSelectedField();
            break;
        case 'subItem':
            //  subItemEditModal.value = false;
            //  updateSubItem();
            break;
        case 'calcRule':
        // calcModal.value = false;
        default:
            break;
    }


};
</script>
