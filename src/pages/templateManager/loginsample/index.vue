<template>
    <div style="display: flex;justify-content: space-around;">
        <div style="width: 30%;">
            <t-card title="模板列表">
                <template #actions>
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
            <t-card title="表单">

            </t-card>
        </div>

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

const formData = ref([{
    name: '张三',
    age: 18,
    sex: '男',
    address: '北京市',
    hobby: ['吃饭', '睡觉'],
    remark: '我是备注'
}])
const previewModal = ref(false)
const templateList = ref([])
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
    console.warn(id)
    if (id) {
        // 获取id(index)对应的模板列表中的模板信息
        const templateSingle = templateList.value[id - 1]
        getAPI(TemplateApi).apiTemplateTemplateitemlistGet(templateSingle.templateName).then(res => {
            console.log(res.data.data)
            formConfig.value = res.data.data
        })

    }
}
</script>
