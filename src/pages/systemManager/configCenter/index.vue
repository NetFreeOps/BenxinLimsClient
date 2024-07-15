<template>
    <div style="display: flex; justify-content: space-around;">
        <div style="width: 20%;">
            <t-card title="配置类型">
                <template #actions>
                    <t-button theme="primary" @click="getConfigInfo" shape="circle">
                        <template #icon>

                            <RefreshIcon />
                        </template>
                    </t-button>
                    <t-button @click="addConfig">添加</t-button>
                </template>
                <t-radio-group class="flex flex-col flex-start pt-n5" @change="changeListSelect">
                    <t-radio :value="item.id" v-for="(item, index) in leftList" :key="index" :allow-uncheck="true"
                        class="py-5" style="width: 100%;">
                        {{ item.label }}
                        <!-- <span v-if="item.active === 1" class="text-success">[激活]</span>
                        <span v-if="item.active === 0" class="text-unactive">[未激活]</span> -->
                    </t-radio>
                </t-radio-group>
            </t-card>
        </div>
        <div style="width: 75%;">
            <t-card title="配置内容">
                <!-- <template #actions>
                    <t-button theme="primary" @click="updateTestList">保存</t-button>
                </template> -->
                <t-table :columns="columns" row-key="id" :data="configList">
                    <template #operation="{ row }">
                        <t-button theme="primary" variant="text" @click="showConfigModal(row)">编辑</t-button>
                        <t-button theme="danger" variant="text" @click="delteConfig(row)">删除</t-button>
                    </template>
                </t-table>
            </t-card>
        </div>
        <t-dialog v-model:visible="configMoal" @confirm="updateConfig" header="配置编辑器" width="800">
            <t-form>
                <t-form-item label="用户ID：">
                    <t-input v-model="configItem.userId" />
                </t-form-item>"
                <t-form-item label="配置类型：">
                    <!-- <t-input v-model="configItem.configType" /> -->
                    <t-select v-model="configItem.configType" :options="confgTypeOptions" />
                </t-form-item>
                <t-form-item label="字段描述：">
                    <t-input v-model="configItem.description" />
                </t-form-item>
                <t-form-item label="配置字段：">
                    <t-input v-model="configItem.configField" />
                </t-form-item>
                <t-form-item label="配置值：">
                    <t-input v-model="configItem.configValue" />
                </t-form-item>
                <t-form-item label="状态：">
                    <t-switch v-model="configItem.status" :custom-value="['1', '0']" />
                </t-form-item>
            </t-form>
        </t-dialog>

    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAPI } from '@/axios-utils';
import { ConfigcenterApi, ListApi } from '@/api-services';
import { MessagePlugin } from 'tdesign-vue-next';
import { RefreshIcon } from 'tdesign-icons-vue-next'

const leftList = ref([])
const confgTypeOptions = ref([])
const queryParams = ref({
    userId: '',
    configType: '',
    configField: '',

})
const columns = [{
    title: 'ID',
    colKey: 'id',
    width: 100
}, {
    title: '所属用户',
    colKey: 'userId',
}, {
    title: '配置类型',
    colKey: 'configType',
}, {
    title: '字段说明',
    colKey: 'description'
}, {
    title: '配置字段',
    colKey: 'configField',
}, {
    title: '配置值',
    colKey: 'configValue',
}, {
    title: '状态',
    colKey: 'status',
    width: 100,
    cell: (h, { row }) => {
        return h('t-tag', row.status == 1 ? '生效中' : '未生效')

    }

}, { title: '操作', colKey: 'operation', width: 200 }]
const configMoal = ref(false)
const configList = ref([{
    id: 1,
    userId: '',
    configType: '',
    description: '',
    configField: '',
    configValue: '',
    status: '1'
}])
const configItem = ref({
    userId: '',
    configType: '',
    description: '',
    configField: '',
    configValue: '',
    status: '1'
})
const AddConfigItem = ref({
    userId: '',
    configType: '',
    description: '',
    configField: '',
    configValue: '',
    status: '1'
})

onMounted(() => {
    getConfigType();
    getConfigInfo();
})
/* 获取配置信息 */
const getConfigInfo = async () => {
    getAPI(ConfigcenterApi).apiConfigcenterConfigGet(queryParams.value.userId, queryParams.value.configType, queryParams.value.configField).then(res => {
        console.log(res.data.data)
        configList.value = res.data.data
    })
}
/* 显示编辑弹窗 */
const showConfigModal = (row) => {
    configMoal.value = true
    configItem.value = row
}
/* 更新配置信息 */
const updateConfig = async () => {
    getAPI(ConfigcenterApi).apiConfigcenterConfigPut(configItem.value).then(res => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('更新成功')
            getConfigInfo()
            reloadConfig()
            hideModal('config')
        }
        else {
            MessagePlugin.error('添加失败')
        }
    })
}
/* 添加配置信息 */
const addConfig = async () => {
    getAPI(ConfigcenterApi).apiConfigcenterConfigPut(AddConfigItem.value).then(res => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('添加成功')
            getConfigInfo()
            reloadConfig()
        }
        else {
            MessagePlugin.error('添加失败')
        }
    })
}
/* 删除配置信息 */
const delteConfig = async (row) => {
    getAPI(ConfigcenterApi).apiConfigcenterConfigIdDelete(row.id).then(res => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('删除成功')
            getConfigInfo()
            reloadConfig()
        }
        else {
            MessagePlugin.error('删除失败')
        }
    })
}
/* 获取配置类型 */
const getConfigType = async () => {
    getAPI(ListApi).apiListListitembylistnameListnameGet("配置类型").then(res => {
        leftList.value = res.data.data.map(item => {
            return {
                label: item.name,
                value: item.name
            }
        })
        confgTypeOptions.value = res.data.data.map(item => {
            return {
                label: item.name,
                value: item.name
            }
        })
    })
}
/* 重载配置 */
const reloadConfig = async () => {
    var localString = JSON.stringify(configList.value)
    window.localStorage.setItem('configList', localString)
}
/* 隐藏弹窗 */
const hideModal = (type) => {
    if (type == 'config') {
        configMoal.value = false
    }
}
/* 配置类型变更 */
const changeListSelect = (value: any) => {
    console.log(value)
}
</script>