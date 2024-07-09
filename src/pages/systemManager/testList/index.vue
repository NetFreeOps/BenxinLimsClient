<template>
    <div style="display: flex; justify-content: space-around;">
        <div style="width: 30%;">
            <t-card title="请选择检测单" :header-bordered="true">
                <template #actions>
                    <t-button theme="primary" @click="getAllTestList" shape="circle">
                        <template #icon>

                            <RefreshIcon />
                        </template>
                    </t-button>
                    <t-button theme="primary" @click="addTestList">新增检测单</t-button>
                </template>
                <t-input label="搜索：" v-model="searchParams.name" @enter="filterTestList"></t-input>
                <t-radio-group class="flex flex-col flex-start pt-n5" @change="changeListSelect">
                    <t-radio :value="item.id" v-for="(item, index) in leftList" :key="index" :allow-uncheck="true"
                        class="py-5" style="width: 100%;">
                        {{ item.name }}
                        <span v-if="item.active === 1" class="text-success">[激活]</span>
                        <span v-if="item.active === 0" class="text-unactive">[未激活]</span>
                    </t-radio>
                </t-radio-group>
            </t-card>
        </div>
        <div style=" width: 65%; display: flex; flex-direction: column;">
            <t-card title="检测单基础信息">
                <template #actions>
                    <t-button theme="primary" @click="updateTestList">保存</t-button>
                </template>
                <t-form>
                    <t-form-item label="检测单名称">
                        <t-input v-model="testList.name" />
                    </t-form-item>
                    <t-form-item label="是否激活">
                        <t-switch v-model="testList.active" :custom-value="[1, 0]" />
                    </t-form-item>
                    <t-form-item label="描述信息">
                        <t-textarea type="textera" v-model="testList.description" />
                    </t-form-item>
                    <t-form-item label="检测单类型">
                        <t-select v-model="testList.type" :options="testListTypeOptions"></t-select>
                    </t-form-item>
                    <t-form-item label="产品名称">
                        <t-input v-model="testList.productName" />
                    </t-form-item>
                </t-form>
            </t-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAPI } from '@/axios-utils';
import { TestlistApi, ListApi } from '@/api-services';
import { MessagePlugin } from 'tdesign-vue-next';
import { RefreshIcon } from 'tdesign-icons-vue-next'

const leftList = ref([{ id: -1, name: '', active: 1 }])
//const searchParams = ref({ name: '', product_name: '', type: '' })
const searchParams = ref({ name: '' })
const testListList = ref([{ id: -1, name: '', productName: '', description: '', type: '', active: 1 }])
const testList = ref({
    name: '',
    productName: '',
    description: '',
    type: '',
    active: 1
})
const testListTypeOptions = ref([])

onMounted(() => {
    getAllTestList()
    getTestListType()
})
/* 获取所有检测单列表 */
const getAllTestList = async () => {
    getAPI(TestlistApi).apiTestlistAlltestlistGet(searchParams.value.name).then(res => {
        // 利用map将结果赋值给leftlist
        leftList.value = res.data.data.map(item => {
            return {
                id: item.id,
                name: item.name,
                active: item.active
            }
        })
        // 利用map将结果赋值给testlist
        testListList.value = res.data.data.map(item => {
            return {
                id: item.id,
                name: item.name,
                productName: item.productName,
                description: item.description,
                type: item.type,
                active: item.active
            }
        })
    })
}
/* 获取所有样品类型 */
const getTestListType = async () => {
    getAPI(ListApi).apiListListitembylistnameListnameGet("样品类型").then(res => {
        testListTypeOptions.value = res.data.data.map(item => {
            return {
                label: item.name,
                value: item.name
            }
        })
    })
}
/* 添加检测单 */
const addTestList = () => {
    console.log('addTestList')
    getAPI(TestlistApi).apiTestlistTestlistPost(testList.value).then(res => {
        if (res.data.data != -1) {
            MessagePlugin.success('添加成功')
            getAllTestList()
        }
    })
}
/* 更新检测单 */
const updateTestList = () => {
    console.log('updateTestList')
    getAPI(TestlistApi).apiTestlistTestlistPut(testList.value).then(res => {
        if (res.data.data != -1) {
            MessagePlugin.success('更新成功')
            getAllTestList()
        }
    })
}
/* 获取检测单详细信息 */
const changeListSelect = (res) => {
    console.log(res)
    // 获取指定id的testlistlist的值，赋值给testlist
    testList.value = testListList.value[res - 1]
}
const filterTestList = (res) => {

}
</script>
<style>
.text-success {
    color: #00a854;
}

.text-unactive {
    color: #f04134;
}
</style>