<template>
    <div style="display: flex; justify-content: space-around;">
        <!-- 左侧区域 -->
        <div style="width: 30%;">
            <t-card title="请选择分析方法" :header-bordered="true">
                <template #actions>
                    <t-button theme="primary" @click="getAllAnalysis" shape="circle">
                        <template #icon>

                            <RefreshIcon />
                        </template>
                    </t-button>
                    <t-button theme="primary" @click="addAnalysis">新增分析</t-button>
                </template>
                <t-input label="搜索：" v-model="searchParams" @enter="fiterAnalysis"></t-input>
                <t-radio-group class="flex flex-col flex-start pt-n5" @change="changeAnalysisType">
                    <t-radio :value="item.id" v-for="(item, index) in leftAnalysis" :key="index" :allow-uncheck="true"
                        class="py-5" style="width: 100%;">
                        {{ item.name }}
                        <span v-if="item.active === 1" class="text-success">[激活]</span>
                        <span v-if="item.active === 0" class="text-unactive">[未激活]</span>
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
                                    <t-switch v-model="analysisInfo.active" :value="0" :custom-value="[1, 0]"
                                        :default-value="0" @change="switchChange" />
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
                                        @click="changeAnalysisValue('analysisType', analysisInfo.analysisType, 'select', '样品类型')">修改</t-button>
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
                <t-card title="分析分项信息">
                    <template #actions>
                        <t-button theme="primary" @click="addSubItem">新增分项</t-button>
                    </template>
                    <t-table :columns="itemColumns" drag-sort="row" :data="analysisItemList"
                        @drag-sort="orderAnalysisItem" row-key="id">
                        <template #operation="{ row }">
                            <t-button theme="primary" variant="text" @click="showSubItemModal(row)">编辑</t-button>
                            <t-popconfirm theme="danger" content="删除前确认" @confirm="delteAnalysisItem(row)">
                                <t-button theme="danger" variant="text">删除</t-button>
                            </t-popconfirm>
                        </template>
                    </t-table>

                </t-card>
            </div>
        </div>
        <!-- 字段编辑器弹窗 -->
        <t-dialog v-model:visible="analysisEditModal" @confirm="hideModal('analysis')" header="字段编辑器">
            <fieldEdit :field-name="field.name" :field-value="field.value" :field-type="field.type"
                :list-key="field.listKey" v-model:updateField="field.updateValue" />
        </t-dialog>
        <!-- 分项编辑器弹窗 -->
        <t-dialog v-model:visible="subItemEditModal" @confirm="hideModal('subItem')" header="分项编辑器">
            <t-form style="max-height: 600px; overflow-y: auto;">
                <t-form-item label="ID：">
                    <t-input :disabled="true" v-model="analysisItem.id" />
                </t-form-item>
                <t-form-item label="分析ID：">
                    <t-input :disabled="true" v-model="analysisItem.analysisId" />
                </t-form-item>
                <t-form-item label="分析名称：">
                    <t-input :disabled="true" v-model="analysisItem.analysisName" />
                </t-form-item>
                <t-form-item label="分项名称：">
                    <t-input v-model="analysisItem.name" />
                </t-form-item>
                <t-form-item label="常用名称：">
                    <t-input v-model="analysisItem.commonName" />
                </t-form-item>
                <t-form-item label="版本：">
                    <t-input v-model="analysisItem.version" />
                </t-form-item>
                <!-- <t-form-item label="排序号：">
                    <t-input v-model="analysisItem.orderNumber" />
                </t-form-item> -->
                <t-form-item label="结果类型：">
                    <!-- <t-input v-model="analysisItem.resultType" /> -->
                    <t-select v-model="analysisItem.resultType" :options="resultTypeOptions"
                        @change="resultTypeChange" />
                </t-form-item>
                <t-form-item label=" 列表键：" v-if="analysisItem.resultType == '列表型'">
                    <!-- <t-input v-model="analysisItem.listKey" /> -->
                    <t-select filterable v-model="analysisItem.listKey" :options="listKeyOptions" />"
                </t-form-item>
                <t-form-item label="计算公式：" v-if="analysisItem.resultType == '计算型'">
                    <!-- <t-input v-model="analysisItem.calcRule" /> -->
                    <t-button theme="primary" @click="showCalcRuleModal">编辑公式</t-button>
                </t-form-item>
                <t-form-item label="单位：">
                    <!-- <t-input v-model="analysisItem.units" /> -->
                    <t-select filterable v-model="analysisItem.units" :options="unitsOptions" />
                </t-form-item>
                <t-form-item label="最小值：">
                    <t-input-number v-model="analysisItem.minValue" />
                </t-form-item>
                <t-form-item label="最大值：">
                    <t-input-number v-model="analysisItem.maxValue" />
                </t-form-item>
                <t-form-item label="重复数：">
                    <t-input-number v-model="analysisItem.places" />
                </t-form-item>
                <t-form-item label="自动计算：">
                    <t-switch v-model="analysisItem.autoCalc" :custom-value="['1', '0']" />
                </t-form-item>
                <t-form-item label="允许为空：">
                    <t-switch v-model="analysisItem.nullable" :custom-value="['1', '0']" />
                </t-form-item>
                <t-form-item label="是否可报告：">
                    <t-switch v-model="analysisItem.reportable" :custom-value="['1', '0']" />
                </t-form-item>

                <t-form-item label="通用计算规则：">
                    <t-input v-model="analysisItem.commonCalcRule" />
                </t-form-item>
                <t-form-item label="舍入规则：">
                    <!-- <t-input v-model="analysisItem.roundRule" /> -->
                    <t-select v-model="analysisItem.roundRule" :options="roundRuleOptions" />
                </t-form-item>
                <t-form-item label="分组名称：">
                    <t-input v-model="analysisItem.groupName" />
                </t-form-item>
            </t-form>
        </t-dialog>
        <t-dialog v-model:visible="calcModal" @confirm="hideModal('calcRule')" header="计算公式编辑器" width="1200">
            <div>{{ analysisItem.analysisName }}-{{ analysisItem.name }}</div>
            <calcEdit :edit-item="analysisItem" :analysis-item-list="analysisItemOptions" :edit-code="calcModal">
            </calcEdit>

            <!-- <t-form>
                <t-form-item label="计算公式：">
                    <t-input v-model="analysisItem.calcRule" />
                </t-form-item>
            </t-form> -->
        </t-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAPI } from '@/axios-utils';
import { AnalysisApi, ListApi } from '@/api-services';
import fieldEdit from '@/components/field-edit/index.vue';
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { RefreshIcon } from 'tdesign-icons-vue-next';
import calcEdit from '@/components/calc-edit/index.vue'

const ANALYSIS_TYPE = [
    { key: 1, value: '类型1' },
    { key: 2, value: '类型2' },
    { key: 3, value: '类型3' },
];
const analysisEditModal = ref(false);//分析（字段）编辑器弹窗
const subItemEditModal = ref(false);//分项编辑器弹窗
const calcModal = ref(false);//公式编辑器弹窗
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
const leftAnalysis = ref([{ id: 1, name: '类型1', active: 0 }, { id: 2, name: '类型2', active: 0 }])
const analysisList = ref([{
    id: 1,
    active: 1,
    analysisType: "",
    commonName: '',
    // changeTime: "",
    // changeUser: "",
    // commonName: "",
    // createTime: "",
    // createUser: "",
    //dataId: "1",
    defaultPost: "",
    //deleted: "",
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
    commonName: '',
    // changeTime: "",
    // changeUser: "",
    // commonName: "",
    // createTime: "",
    // createUser: "",
    // dataId: "1",
    defaultPost: "",
    //deleted: "",
    description: "",
    fileLink: "",
    groupName: "",
    labName: "",
    name: "",
    reportName: "",
    standard: "",
    version: "1"
})
/* 新增分析默认值，主键自增，因此没有主键 */
const addAnalysisInfo = ref({

    active: 1,
    analysisType: "",
    commonName: '',
    // changeTime: "",
    // changeUser: "",
    // commonName: "",
    // createTime: "",
    // createUser: "",
    // dataId: "1",
    defaultPost: "",
    //deleted: "",
    description: "",
    fileLink: "",
    groupName: "",
    labName: "",
    name: "",
    reportName: "",
    standard: "",
    version: "1"
})
/* 分项类型数据 */
const resultTypeOptions = ref([{}])
const roundRuleOptions = ref([{}])
const unitsOptions = ref([{}])
const listKeyOptions = ref([{}])
const analysisItemOptions = ref([{}])
/* 分析分项数据 */
const analysisItemList = ref([{
    id: -1,
    analysisId: -1,
    analysisName: "COD",
    name: null,
    version: 1,
    orderNumber: null,
    resultType: null,
    units: null,
    minValue: 0,
    maxValue: 999,
    places: 1,
    autoCalc: 1,
    commonName: null,
    nullable: 1,
    reportable: 1,
    listKey: null,
    calcRule: null,
    commonCalcRule: null,
    roundRule: null,
    groupName: null

}])
const analysisItem = ref({
    id: -1,
    analysisId: -1,
    analysisName: "",
    name: null,
    version: 1,
    orderNumber: null,
    resultType: null,
    units: null,
    minValue: 0,
    maxValue: 999,
    places: 1,
    autoCalc: 1,
    commonName: null,
    nullable: 1,
    reportable: 1,
    listKey: null,
    calcRule: null,
    commonCalcRule: null,
    roundRule: null,
    groupName: null
})
/* 新增分项默认值，主键自增，因此没有主键 */
const addAnalysisItem = ref({
    analysisId: -1,
    analysisName: "",
    name: null,
    version: 1,
    orderNumber: 999,
    resultType: null,
    units: null,
    minValue: 0,
    maxValue: 999,
    places: 1,
    autoCalc: 1,
    commonName: null,
    nullable: 1,
    reportable: 1,
    listKey: null,
    calcRule: null,
    commonCalcRule: null,
    roundRule: null,
    groupName: null
})

const itemColumns = [
    { title: 'id', colKey: 'id', width: 50 },
    { title: '名称', colKey: 'name' },
    { title: '单位', colKey: 'units' },
    { title: '可为空', colKey: 'nullable' },
    { title: '可报告', colKey: 'reportable' },
    { title: '操作', colKey: 'operation', width: 200 }]

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
                active: item.active
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
    getAPI(AnalysisApi).apiAnalysisAnalysisPost(addAnalysisInfo.value).then((res) => {
        console.log(res);
        getAllAnalysis();
    });
};

const changeAnalysisType = (value) => {
    console.log('Selected Analysis Type:', value);
    // 获取指定位置的值
    //  analysisInfo.value = analysisList.value[value - 1];
    // 获取指定ID的值
    analysisInfo.value = analysisList.value.find((item) => item.id === value);

    console.log('Selected Analysis Info:', analysisInfo.value);
    searchSubItem();
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
/* 开关值直接修改 */
const switchChange = (value) => {
    console.log('Switch Change:', value);
    // 在此处添加你的逻辑
    field.value.name = 'active'
    field.value.updateValue = value
    updateSelectedField();
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
/* 获取指定分析的分项 */
const searchSubItem = () => {
    console.log('Search Sub Item:', searchParams.value);
    // 在此处添加你的逻辑
    getAPI(AnalysisApi).apiAnalysisItemlistfromanalysisAnalysisnameGet(analysisInfo.value.name).then((res) => {
        console.log(res.data.data);

        res.data.data.sort((a, b) => a.orderNumber - b.orderNumber);
        analysisItemList.value = res.data.data;

    });
}
/* 显示分析详细分项信息 */
const showSubItemModal = (subitemData) => {
    analysisItem.value = subitemData;
    showModal('subItem')
    // 获取分项类型列表
    getAPI(ListApi).apiListListitembylistnameListnameGet('分项类型').then((res) => {
        console.log(res);
        resultTypeOptions.value = res.data.data.map((item) => {
            return {
                id: item.id,
                name: item.name,
                value: item.value
            };
        });
    });
    getAPI(ListApi).apiListListitembylistnameListnameGet('舍入规则').then((res) => {
        console.log(res);
        roundRuleOptions.value = res.data.data.map((item) => {
            return {
                id: item.id,
                name: item.name,
                value: item.value
            };
        });
    });
    getAPI(ListApi).apiListListitembylistnameListnameGet('单位').then((res) => {
        unitsOptions.value = res.data.data.map((item) => {
            return {
                id: item.id,
                label: item.name,
                value: item.value
            };
        });
    });
};
/* 更新分析分项信息 */
const updateSubItem = async () => {
    console.log('Update Sub Item:', analysisItem.value);
    // 在此处添加你的逻辑
    getAPI(AnalysisApi).apiAnalysisItemfromanalysisPut(analysisItem.value).then((res) => {
        if (res.data.data == -1) {
            MessagePlugin.error('更新失败，请检查是否已存在同名分项');
        }
        console.log(res);
        searchSubItem();//先执行
    });
};
/* 删除一个分项 */
const delteAnalysisItem = async (row) => {
    const alerDia = DialogPlugin.alert({
        header: '删除前确认',
        body: '你确定要删除该记录吗？',
        confirmBtn: {
            content: '确定',
            theme: 'danger'
        },
        onConfirm: ((e) => {
            const itemapi = getAPI(AnalysisApi);
            itemapi.apiAnalysisItemfromanalysisIdDelete(row.id).then((res) => {
                searchSubItem();
            });

            alerDia.hide();
        }),
        onClose: (() => {
            alerDia.hide();
        })
    })



}
/* 显示公式编辑器弹窗 */
const showCalcRuleModal = () => {
    // 利用map将analysisItemList中的name和id组成一个对象数组
    analysisItemOptions.value = analysisItemList.value.map((item) => {
        return {
            id: item.id,
            label: item.name,
            value: item.analysisName + "|" + item.name

        };
    });
    console.log('Show Calc Rule Modal');
    // 在此处添加你的逻辑
    showModal('calcRule')
};
/* 添加分项 */
const addSubItem = () => {
    console.log('Add Sub Item:', subItem.value);
    const analysisId = analysisInfo.value.id;
    addAnalysisItem.value.analysisId = analysisId;
    addAnalysisItem.value.analysisName = analysisInfo.value.name;
    getAPI(AnalysisApi).apiAnalysisItemtoanalysisPost(addAnalysisItem.value).then((res) => {
        if (res.data.data == -1) {
            MessagePlugin.error('添加失败，请检查是否已存在同名分项');
        }
        searchSubItem();
    });
};
/* 结果类型选择更新 */
const resultTypeChange = (value) => {
    console.log('Result Type Change:', value);
    const queryParams = {
        name: '',
        description: '',
        listType: '',
        groupName: '',
        pageIndex: 1,
        pageSize: 500,
        total: 0
    };
    // 在此处添加你的逻辑
    if (value = '列表型') {
        getAPI(ListApi).apiListListGet(-1, queryParams.name, queryParams.description, queryParams.listType, queryParams.groupName, queryParams.pageIndex, queryParams.pageSize, queryParams.total).then((res) => {
            listKeyOptions.value = res.data.data.pageData.map((item) => {
                return {
                    id: item.id,
                    label: item.name,
                    value: item.name
                };
            });
        })
    }
};


/* 排序 */
const orderAnalysisItem = async (item) => {
    console.log('Order Analysis Item:', item.newData);
    const itemapi = getAPI(AnalysisApi);
    for (let i = 0; i < item.newData.length; i++) {
        item.newData[i].orderNumber = i + 1;
        const res = await itemapi.apiAnalysisItemfromanalysisPut(item.newData[i]);
    }
    searchSubItem();

}

// const updateListItem = async (row) => {
//     const listApi = getAPI(ListApi);
//     // 遍历列表项数组，循环更新
//     for (let i = 0; i < row.length; i++) {

//         const item = row[i];
//         item.order = i + 1;
//         console.warn(row[i])
//         const res = await listApi.apiListListitemPut(item);
//     }
//     reloadListItem();
// };

const showModal = (res) => {
    switch (res) {
        case 'analysis':
            analysisEditModal.value = true;
            break;
        case 'subItem':
            subItemEditModal.value = true;
            break;
        case 'calcRule':
            calcModal.value = true;
            break;
        default:
            break;
    }
};
const hideModal = (res) => {
    console.warn(field.value.updateValue)
    switch (res) {
        case 'analysis':
            analysisEditModal.value = false;
            updateSelectedField();
            break;
        case 'subItem':
            subItemEditModal.value = false;
            updateSubItem();
            break;
        case 'calcRule':
            calcModal.value = false;
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

.text-success {
    color: #00a854;
}

.text-unactive {
    color: #f04134;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
}

.t-form-item {
    border: 1px solid #e5e5e5;
    padding: 8px;
    box-sizing: border-box;
}
</style>