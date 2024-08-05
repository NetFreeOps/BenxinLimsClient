<template>
    <div>
        <t-card :title="formConfig.title">
            <template #actions>
                <t-button @click="init">初始化</t-button>
            </template>
            <t-form>
                <t-form-item v-for="(item, index) in formConfig.formConfig" :key="index" :label="item.label">
                    <t-input v-model="item.default_value" type="text" v-if="item.field_type === '文本型'" />
                    <t-input-number v-model="item.default_value" type="number" v-if="item.field_type === '数值型'" />
                    <t-select v-model="item.default_value" v-if="item.field_type === '列表型'"
                        :options="item.list_options">
                    </t-select>
                    <t-select v-model="item.default_value" v-if="item.field_type === '公式型'"
                        :options="item.list_options"></t-select>
                </t-form-item>
            </t-form>
            <t-alert theme="error" v-if="loadError">{{ loadError }}</t-alert>
        </t-card>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getAPI } from '@/axios-utils';
import { ListApi, TemplateApi } from '@/api-services/index';
const props = defineProps({
    // 菜单数据
    formData: {
        type: Array,
        default: () => []
    },
    formName: {
        type: String,
        default: ''
    },
    // formConfig: {
    //     type: Array,
    //     default: () => []
    // }
})
const loadError = ref('')
/*  表单配置
* 公式型返回的结果必须是一个列表
*/
const formConfig = ref({
    title: '表单名称',//表单名称
    formConfig: [{
        id: '1',
        label: '样品名称',//显示名
        template_field: 'sampleName',//字段名
        field_type: '文本型',//字段类型：文本型、数值型、公式型、列表型、文件型
        default_value: '',//默认值
        source_code: '',//公式型代码
        list_name: '', //列表型的列表名称
        list_options: [{ label: '', value: '' }],//列表型选项
        list_field: '',//列表型取值字段
        file_id: '',//文件型文件id
        required: 'T',//是否必填
        disabled: 'F',//是否禁用
        readonly: 'F',//是否只读
        hidden: false,//是否隐藏
    },
    {
        id: '2',
        label: '样品数量',//显示名
        template_field: 'volume',//字段名
        field_type: '数值型',//字段类型：文本型、数值型、公式型、列表型、文件型
        default_value: '',//默认值
        source_code: '',//公式型代码
        list_name: '', //列表型的列表名称
        list_field: '',//列表型取值字段
        list_options: [{ label: '', value: '' }],//列表型选项
        file_id: '',//文件型文件id
        required: 'T',//是否必填
        disabled: 'F',//是否禁用
        readonly: 'F',//是否只读
        hidden: false,//是否隐藏
    }, {
        id: '3',
        label: '产品列表',//显示名
        template_field: 'product',//字段名
        field_type: '列表型',//字段类型：文本型、数值型、公式型、列表型、文件型
        default_value: '',//默认值
        source_code: '',//公式型代码
        list_name: '样品类型', //列表型的列表名称
        list_field: '',//列表型取值字段
        list_options: [{ label: '', value: '' }],//列表型选项
        file_id: '',//文件型文件id
        required: 'T',//是否必填
        disabled: 'F',//是否禁用
        readonly: 'F',//是否只读
        hidden: false,//是否隐藏
    },
    {
        id: '4',
        label: '分析岗位',//显示名
        template_field: 'analysis',//字段名
        field_type: '公式型',//字段类型：文本型、数值型、公式型、列表型、文件型
        default_value: '',//默认值
        source_code: 'select name as name from product',//公式型代码
        list_name: '', //列表型的列表名称
        list_field: '',//列表型取值字段
        list_options: [{ label: '', value: '' }],//列表型选项
        file_id: '',//文件型文件id
        required: 'T',//是否必填
        disabled: 'F',//是否禁用
        readonly: 'F',//是否只读
        hidden: false,//是否隐藏
    }
    ]
})
/*  初始化 */
const init = () => {
    console.warn("动态变态初始化")
    // 遍历表单配置
    formConfig.value.formConfig.forEach(async (item, index) => {
        // 处理列表型表单类型
        if (item.field_type === '列表型') {
            const res = await initList(item.list_name)
            // map赋值
            item.list_options = res.data.data.map((item) => {
                return {
                    label: item.name,
                    value: item.value
                }
            })
        }
        // 处理公式型表单类型
        if (item.field_type === '公式型') {
            const res = await getAPI(TemplateApi).apiTemplateSqlresultSqlGet(item.source_code)
            if (res.data.statusCode == 500) {
                loadError.value = res.data.errors
            }
            console.warn(res.data.data)
            // map赋值
            item.list_options = res.data.data.map((item) => {
                // 获取对象的所有属性名
                const keys = Object.keys(item);

                // 选择优先级最高的属性
                const preferredKey = keys.find(key => key.includes("name")) || keys[0];

                return {
                    label: item[preferredKey] || "default_label",
                    value: item[preferredKey] || "default_value"
                };
            });
        }
    })

}
/* 列表型初始化 */
const initList = async (listname) => {
    const res = await getAPI(ListApi).apiListListitembylistnameListnameGet(listname)
    return res
}
/* 暴露方法 */
defineExpose({
    init
})
</script>