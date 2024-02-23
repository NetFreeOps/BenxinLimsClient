<template>
  <t-form ref="form" :class="['item-container', `login-${type}`]" :data="formData" :rules="FORM_RULES" label-width="0"
    @submit="onSubmit">
    <template v-if="type == 'password'">
      <t-form-item name="userId">
        <t-input v-model="formData.userId" size="large" placeholder="请输入账号：admin">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input v-model="formData.password" size="large" :type="showPsw ? 'text' : 'password'" clearable
          placeholder="请输入登录密码：admin">
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item label="选择角色" v-if="loginStatus">
        <!-- 角色列表 -->
        <t-select v-model="userRole" size="large" placeholder="请选择角色" :options="userRoles" clearable>
          <template #prefix-icon>
            <t-icon name="role" />
          </template>
        </t-select>
      </t-form-item>


    </template>

    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button v-if="!loginStatus" block size="large" type="submit"> 登录 </t-button>
      <t-button v-if="loginStatus" block size="large" type="button" @click="onEnterSystem"> 进入系统 </t-button>
    </t-form-item>


  </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MessagePlugin } from 'tdesign-vue-next';
import type { FormInstanceFunctions, FormRule } from 'tdesign-vue-next';
import { useCounter } from '@/hooks';
import { useUserStore } from '@/store';
import { getAPI } from '@/axios-utils';
import { SysroleApi } from '@/api-services'

const userStore = useUserStore();

const INITIAL_DATA = {
  phone: '',
  userId: '100000',
  password: '123456',
  verifyCode: '',
  checked: false,
};

const FORM_RULES: Record<string, FormRule[]> = {
  phone: [{ required: true, message: '手机号必填', type: 'error' }],
  userId: [{ required: true, message: '账号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  verifyCode: [{ required: true, message: '验证码必填', type: 'error' }],
};

const type = ref('password');

const form = ref<FormInstanceFunctions>();
const formData = ref({ ...INITIAL_DATA });
const showPsw = ref(false);

const [countDown, handleCounter] = useCounter();

const loginStatus = ref(false);

const userRoles = ref([{ value: '1', label: '管理员' }, { value: '2', label: '普通用户' }]);
const userRole = ref('');

const router = useRouter();
const route = useRoute();

/**
 * 发送验证码
 */
const sendCode = () => {
  form.value.validate({ fields: ['phone'] }).then((e) => {
    if (e === true) {
      handleCounter();
    }
  });
};
// 认证登录
const onSubmit = async ({ validateResult }) => {
  if (validateResult === true) {
    try {
      await userStore.login(formData.value);

      loginStatus.value = true;

      MessagePlugin.success('登陆成功,正在加载角色');

      var userid = Number(formData.value.userId);

      getAPI(SysroleApi).apiSysroleUserroleUseridGet(userid).then((res) => {
        console.warn(res.data.data)
        if (res.data.data.length > 0) {
          userRoles.value = res.data.data.map((item) => {
            return { value: item.roleCode, label: item.roleName };
          });
        }
      });

    } catch (e) {
      console.log(e);
      MessagePlugin.error(e.message);
    }
  }

};
// 选择角色后进入系统
const onEnterSystem = () => {
  // 判断角色是否为空
  if (!userRole.value) {
    MessagePlugin.error('请选择角色');
    return;
  }
  // 请求该角色具有的菜单权限、按钮权限、数据权限
  Promise.all([
    getAPI(SysroleApi).apiSysroleRolemenuRoleidGet(Number(userRole.value)),
    getAPI(SysroleApi).apiSysroleRolebuttonRoleidGet(Number(userRole.value)),
    getAPI(SysroleApi).apiSysroleRoledataRoleidGet(Number(userRole.value)),
  ]).then((res) => {
    console.warn(res);
    // 将三个结果拼接
    const userPermission = {
      menu: res[0].data.data,
      button: res[1].data.data,
      data: res[2].data.data,
    };
    window.localStorage.setItem('userPermission', JSON.stringify(userPermission))
    return;
  });

  const redirect = route.query.redirect as string;
  const redirectUrl = redirect ? decodeURIComponent(redirect) : '/dashboard';
  router.push(redirectUrl);
};
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>
