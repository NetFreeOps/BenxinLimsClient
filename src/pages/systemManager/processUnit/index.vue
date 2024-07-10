<template>
    <div style="display: flex; justify-content: space-around;">
        <div style="width: 30%;">
            <t-card title="装置列表">
                <template #actions>
                    <t-button theme="primary" @click="getAllProcessUnit" shape="circle">
                        <template #icon>
                            <RefreshIcon />
                        </template>
                    </t-button>
                    <t-button theme="primary" @click="addProcessUnit">添加装置</t-button>
                </template>
                <t-tree :data="leftList" :expand-all="true" :line="true" :expandMutex="true"
                    :keys="{ value: 'name', label: 'name', children: 'children' }" @click="changeProcessUnitSelect" />

            </t-card>
        </div>
        <div style="width:65%">
            <t-card title="装置明细">
                <template #actions>
                    <t-button theme="primary" @click="updateProcessUnit">保存</t-button>
                </template>
                <t-form>
                    <t-form-item label="装置ID" name="id">
                        <t-input v-model="ProcessUnit.id" disabled />
                    </t-form-item>
                    <t-form-item label="上级装置ID" name="parentId">
                        <t-input v-model="ProcessUnit.parentId" />
                    </t-form-item>
                    <t-form-item label="装置名称" name="name">
                        <t-input v-model="ProcessUnit.name" />
                    </t-form-item>
                    <t-form-item label="是否激活" name="active">
                        <t-switch v-model="ProcessUnit.active" :custom-value="[1, 0]" />
                    </t-form-item>
                    <t-form-item label="装置编号" name="code">
                        <t-input v-model="ProcessUnit.code" />
                    </t-form-item>
                    <t-form-item label="装置别名" name="aliasName">
                        <t-input v-model="ProcessUnit.aliasName" />
                    </t-form-item>
                    <t-form-item label="所属公司" name="worshop">
                        <!-- <t-input v-model="ProcessUnit.workShop" /> -->
                        <t-select v-model="ProcessUnit.workShop" :options="workShopOptions" clearable />
                    </t-form-item>
                    <t-form-item label="模板" name="template">
                        <t-input v-model="ProcessUnit.template" />
                    </t-form-item>
                    <t-form-item label="是否为末端装置" name="isEnd">
                        <t-switch v-model="ProcessUnit.isEnd" :custom-value="[1, 0]" />
                    </t-form-item>

                </t-form>
            </t-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAPI } from '@/axios-utils'
import { ProcessunitApi, ListApi } from '@/api-services'
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import { RefreshIcon } from 'tdesign-icons-vue-next';
import { flatToTree } from '@/utils/common'


onMounted(() => {
    getAllProcessUnit()
    getWorkShopList()
})
const leftList = ref([])
const processUnitList = ref([{ id: -1, parentId: 0, name: '', code: '', aliasName: '', active: 0, template: '', workShop: '', isEnd: 1 }])
const ProcessUnit = ref({ id: -1, parentId: 0, name: '', code: '', active: 0, aliasName: '', template: '', workShop: '', isEnd: 1 })
const selectedUnit = ref('')
const workShopOptions = ref([])
/* 获取装置列表 */
const getAllProcessUnit = async () => {
    const res = await getAPI(ProcessunitApi).apiProcessunitProcessunitGet()
    // leftList.value = res.data.data
    var tmp = res.data.data
    // 将id添加到name
    tmp.forEach((item) => {
        item.name = item.name + '(装置ID：' + item.id + ')'
    })

    leftList.value = flatToTree(tmp, 'id', 'parentId', 'children')

    //processUnitList.value = res.data.data
    // 采用map赋值
    processUnitList.value = res.data.data.map((item) => {
        return {
            id: item.id,
            parentId: item.parentId,
            name: item.name,
            code: item.code,
            active: item.active,
            aliasName: item.aliasName,
            template: item.template,
            workShop: item.workShop,
            isEnd: item.isEnd
        }
    })
}
/* 获取公司列表 */
const getWorkShopList = async () => {
    const res = await getAPI(ListApi).apiListListitembylistnameListnameGet('公司列表')
    workShopOptions.value = res.data.data.map((item) => {
        return {
            id: item.id,
            label: item.name,
            value: item.name
        }
    })
}
/* 加载装置详细信息 */
const changeProcessUnitSelect = (res) => {
    console.log(res.node.value)
    console.warn(res.node.data)
    var tmp = 1
    ProcessUnit.value = processUnitList.value[res.node.data.id - 1]
}
/* 添加装置 */
const addProcessUnit = () => {
    console.log('添加装置')
    ProcessUnit.value.name = 'default'
    getAPI(ProcessunitApi).apiProcessunitProcessunitPost(ProcessUnit.value).then((res) => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('添加成功')
            getAllProcessUnit()
        }
        else {
            MessagePlugin.error(res.data.errors)
        }
    })
}
/* 更新装置 */
const updateProcessUnit = () => {
    console.log(ProcessUnit.value)
    getAPI(ProcessunitApi).apiProcessunitProcessunitPut(ProcessUnit.value).then((res) => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('更新成功')
            getAllProcessUnit()
        }
        else {
            MessagePlugin.error(res.data.errors)
        }
    })
}

</script>