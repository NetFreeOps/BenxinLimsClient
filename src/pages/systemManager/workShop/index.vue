<template>
    <div>
        <t-card title="公司管理">
            <template #actions>
                <t-button theme="primary" @click="addCompany">添加公司</t-button>
            </template>

        </t-card>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAPI } from '@/axios-utils'
import { }
</script>