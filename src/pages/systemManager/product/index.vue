<template>
    <div style="display: flex;justify-content: space-around;">
        <div style="width: 30%;">
            <t-card title="产品列表">
                <template #actions>
                    <t-button theme="primary" @click="getProductList" shape="circle">
                        <template #icon>
                            <RefreshIcon />
                        </template>
                    </t-button>
                    <t-button theme="primary" @click="addProduct">添加产品</t-button>
                </template>
                <t-radio-group class="flex flex-col flex-start pt-n5" @change="changeProductSelect">
                    <t-radio :value="item.id" v-for="(item, index) in leftList" :key="index" :allow-uncheck="true"
                        class="py-5" style="width: 100%;">
                        {{ item.name }}
                        <span v-if="item.active === 1" class="text-success">[激活]</span>
                        <span v-if="item.active === 0" class="text-unactive">[未激活]</span>
                    </t-radio>
                </t-radio-group>
            </t-card>
        </div>
        <div style="width: 65%;">
            <t-card title="产品基础信息">
                <template #actions>
                    <t-button theme="primary" @click="updateProduct">保存</t-button>
                </template>
                <t-form>
                    <t-form-item label="产品名称" required>
                        <t-input v-model="product.name" placeholder="请输入产品名称" />
                    </t-form-item>
                    <t-form-item label="产品代码">
                        <t-input v-model="product.code" placeholder="请输入产品代码" />
                    </t-form-item>
                    <t-form-item label="是否激活">
                        <t-switch v-model="product.active" :custom-value="[1, 0]" />
                    </t-form-item>
                    <t-form-item label="描述信息">
                        <t-textarea v-model="product.description"></t-textarea>
                    </t-form-item>
                    <t-form-item label="产品别名">
                        <t-input v-model="product.aliasName" placeholder="请输入产品别名" />
                    </t-form-item>
                    <t-form-item label="产品等级类型">
                        <t-select v-model="product.grade" :options="gradeOptions"></t-select>
                    </t-form-item>
                    <t-form-item label="检测单">
                        <!-- <t-input v-model="product.testListName" placeholder="请输入检测单" /> -->
                        <t-select v-model="product.testListName" :options="testListOptions"></t-select>
                    </t-form-item>
                </t-form>

            </t-card>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RefreshIcon } from 'tdesign-icons-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import { getAPI } from '@/axios-utils'
import { ProductApi, TestlistApi, ListApi } from '@/api-services'

const leftList = ref([])
const productList = ref([{ id: -1, name: '', aliasName: '', code: '', description: '', grade: '', testListName: '', active: 0, fileLink: '' }])
const product = ref({ id: -1, name: '', aliasName: '', code: '', description: '', grade: '', testListName: '', active: 0, fileLink: '' })
const testListOptions = ref([])
const gradeOptions = ref([])

onMounted(() => {
    getProductList()
    getTestList()
    getGradeList()
})
/* 加载产品详细信息 */
const changeProductSelect = async (res) => {
    console.warn(res)
    if (res) {
        product.value = productList.value[res - 1]

    }
}
/* 获取检测单列表 */
const getTestList = async () => {
    getAPI(TestlistApi).apiTestlistAlltestlistGet().then((res) => {
        if (res.data.data) {
            testListOptions.value = res.data.data.map((item) => {
                return {
                    label: item.name,
                    value: item.name,
                }
            })
        }
    })
}
/* 获取产品等级列表 
@param id
@param name
@param description
@param listType
@param groupName
@param pageIndex — 当前页码
@param pageSize — 每页数据数
@param total — 数据总数
@param options — Override http request option.
*/
const getGradeList = async () => {
    getAPI(ListApi).apiListListGet(-1, '', '', '产品等级', '', 1, 100, 0).then((res) => {
        if (res.data.data) {
            gradeOptions.value = res.data.data.pageData.map((item) => {
                return {
                    label: item.name,
                    value: item.name,
                }
            })
        }
    })
}

/* 获取所有产品 */
const getProductList = async () => {
    getAPI(ProductApi).apiProductAllproductGet().then((res) => {
        // 采用map赋值给productList
        productList.value = res.data.data.map((item: any) => {
            return {
                id: item.id,
                name: item.name,
                aliasName: item.aliasName,
                code: item.code,
                description: item.description,
                grade: item.grade,
                testListName: item.testListName,
                active: item.active,
                fileLink: item.fileLink,
            }
        })
        // 用map赋值给leftlist
        leftList.value = res.data.data.map((item) => {
            return {
                id: item.id,
                name: item.name,
                active: item.active
            }

        })

    })

}
/* 添加产品 */
const addProduct = async () => {
    product.value.name = 'default'
    product.value.code = 'default'
    getAPI(ProductApi).apiProductProductPost(product.value).then((res) => {
        getProductList()
    })
}
/* 更新产品 */
const updateProduct = async () => {
    getAPI(ProductApi).apiProductProductPut(product.value).then((res) => {
        if (res.data.statusCode == 200) {
            MessagePlugin.success('更新成功')
        }
        getProductList()
    })
}
</script>