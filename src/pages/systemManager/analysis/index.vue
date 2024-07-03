<template>
    <div style="display: flex; justify-content: space-around;">
        <!-- 左侧区域 -->
        <div style="width: 30%;">
            <t-card title="请选择分析方法" :header-bordered="true">
                <template #actions>
                    <t-button theme="primary" @click="addAnalysis">新增分析</t-button>
                </template>
                <t-input label="搜索：" v-model="searchParams" @enter="fiterAnalysis"></t-input>
                <t-radio-group class="flex flex-col flex-start pt-n5" @change="changeAnalysisType">
                    <t-radio :value="item.id" v-for="(item, index) in leftAnalysis" :key="index" :allow-uncheck="true"
                        class="py-5" style="width: 100%;">
                        {{ item.name }}
                    </t-radio>
                </t-radio-group>
            </t-card>

        </div>

        <!-- 右侧区域 -->
        <div style=" width: 65%; display: flex; flex-direction: column;">
            <!-- 上半部分：分析基础信息的变更 -->
            <div style="flex: 1;">
                <t-card title="分析基础信息">
                    <t-form>
                        <div style="display: flex; flex-wrap: wrap;">
                            <div style="width: 50%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="分析名称：" name="name">
                                    {{ analysisInfo.name }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('name', analysisInfo.name, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>
                            <div style="width: 50%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="标准：" name="standard">
                                    {{ analysisInfo.standard }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('standard', analysisInfo.standard, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>
                            <div style="width: 100%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="描述：" name="description">
                                    {{ analysisInfo.description }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('description', analysisInfo.description, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>
                            <div style="width: 50%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="版本：" name="version">
                                    {{ analysisInfo.version }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('version', analysisInfo.version, 'number', '')">修改</t-button>
                                </t-form-item>
                            </div>
                            <div style="width: 50%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="是否激活：" name="version">
                                    {{ analysisInfo.active }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('active', analysisInfo.version, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>
                            <div style="width: 50%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="分组名称：" name="groupName">
                                    {{ analysisInfo.groupName }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('groupName', analysisInfo.groupName, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>
                            <div style="width: 50%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="实验室名称：" name="labName">
                                    {{ analysisInfo.labName }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('labName', analysisInfo.labName, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>
                            <div style="width: 50%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="分析类型：" name="analysisType">
                                    {{ analysisInfo.analysisType }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('analysisType', analysisInfo.analysisType, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>
                            <div style="width: 50%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="常用名称：" name="commonName">
                                    {{ analysisInfo.commonName }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('commonName', analysisInfo.commonName, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>


                            <div style="width: 50%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="报告名称：" name="reportName">
                                    {{ analysisInfo.reportName }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('reportName', analysisInfo.reportName, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>

                            <div style="width: 50%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="默认岗位：" name="defaultPost">
                                    {{ analysisInfo.defaultPost }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('defaultPost', analysisInfo.defaultPost, 'select', '岗位')">修改</t-button>
                                </t-form-item>
                            </div>


                            <div style="width: 100%;border-bottom:1px solid #e5e5e5;">
                                <t-form-item label="文件链接：" name="fileLink">
                                    {{ analysisInfo.fileLink }}
                                    <t-button theme="primary" variant="text"
                                        @click="changeAnalysisValue('fileLink', analysisInfo.fileLink, 'text', '')">修改</t-button>
                                </t-form-item>
                            </div>
                        </div>
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
                :list-key="field.listKey" v-model:updateField="field.updateValue" />
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
    listKey: ''
});
/* 编辑后的字段值 */
const updateField = ref('');
const selectedValue = ref('');//当前选中数据
const searchParams = ref('');
const leftAnalysis = ref([{ id: 1, name: '类型1' }, { id: 2, name: '类型2' }])
const analysisList = ref([{
    id: 1,
    active: 1,
    analysisType: "",
    changeTime: "",
    changeUser: "",
    commonName: "",
    createTime: "",
    createUser: "",
    dataId: "1",
    defaultPost: "",
    deleted: "",
    description: "",
    fileLink: "",
    groupName: "",
    labName: "",
    name: "",
    reportName: "",
    standard: "",
    version: "1"
}]);
const analysisInfo = ref({
    id: -1,
    active: 1,
    analysisType: "",
    changeTime: "",
    changeUser: "",
    commonName: "",
    createTime: "",
    createUser: "",
    dataId: "1",
    defaultPost: "",
    deleted: "",
    description: "",
    fileLink: "",
    groupName: "",
    labName: "",
    name: "",
    reportName: "",
    standard: "",
    version: "1"
})

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
        console.log(res);
        leftAnalysis.value = res.data.data.map((item) => {
            return {
                id: item.id,
                name: item.name,
            };
        });
        analysisList.value = res.data.data;
        if (analysisInfo.value.id !== -1) {
            changeAnalysisType(analysisInfo.value.id)
        }
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
    // 获取指定位置的值
    analysisInfo.value = analysisList.value[value - 1];
    console.log('Selected Analysis Info:', analysisInfo.value);
};
/* 弹出字段修改器 */
const changeAnalysisValue = (key, value, type, listkey) => {
    console.log('Change Analysis Value:', key, value, type, listkey);
    field.value.name = key;
    field.value.value = value;
    field.value.type = type;
    field.value.listKey = listkey;
    showModal('analysis')
}
/* 修改指定字段 */
const updateSelectedField = async () => {
    // 获取待编辑字段ID
    const editId = analysisInfo.value.id
    // 待编辑字段名
    const editName = field.value.name
    // 待编辑字段值
    const editValue = field.value.updateValue

    // 将id、字段名、字段值拼接成json
    const editString = `{"id":"${editId}", "${editName}":"${editValue}"}`
    // 转成json
    const editJson = JSON.parse(editString)
    await getAPI(AnalysisApi).apiAnalysisAnalysisPut(editJson).then((res) => {
        console.log(res);
        getAllAnalysis();//先执行
    });

}

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


const showModal = (res) => {
    switch (res) {
        case 'analysis':
            analysisEditModal.value = true;
            break;

        default:
            break;
    }
    analysisEditModal.value = true;
};
const hideModal = (res) => {
    console.warn(field.value.updateValue)
    switch (res) {
        case 'analysis':
            analysisEditModal.value = false;
            updateSelectedField();
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