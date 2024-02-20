import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import { store, usePermissionStore } from '@/store';
import { feature,getAPI } from '@/axios-utils';
import{SysAuthApi, SysauthApi } from '@/api-services';


// 初始化用户信息
const InitUserInfo = {
  roles: [],
};

// 使用 Pinia 定义用户 store
export const useUserStore = defineStore('user', {
  state: () => {
    // 保存用户 token 和信息
    return {
      token: localStorage.getItem(TOKEN_NAME) || 'main_token', // 默认 token 不走权限
      userInfo: { ...InitUserInfo },
    };
  },
  getters: {
    // 获取用户角色列表
    roles: (state) => {
      return state.userInfo?.roles;
    },
  },
  actions: {
    // 用户登录
    async login(userInfo: Record<string, unknown>) {
      const [err,res] = await feature(getAPI(SysauthApi).apiSysauthWebloginPost(userInfo));

      if(err){
        throw err;
      }
      this.token = res.data.data.token;

      // const mockLogin = async (userInfo: Record<string, unknown>) => {
      //   // 登录请求流程
      //   console.log(userInfo);
      //   // const { account, password } = userInfo;
      //   // if (account !== 'td') {
      //   //   return {
      //   //     code: 401,
      //   //     message: '账号不存在',
      //   //   };
      //   // }
      //   // if (['main_', 'dev_'].indexOf(password) === -1) {
      //   //   return {
      //   //     code: 401,
      //   //     message: '密码错误',
      //   //   };
      //   // }
      //   // const token = {
      //   //   main_: 'main_token',
      //   //   dev_: 'dev_token',
      //   // }[password];
      //   return {
      //     code: 200,
      //     message: '登陆成功',
      //     data: 'main_token',
      //   };
      // };

      // const res = await mockLogin(userInfo);
      // if (res.code === 200) {
      //   this.token = res.data;
      // } else {
      //   throw res;
      // }
    },
    // 获取用户信息
    async getUserInfo() {
      const mockRemoteUserInfo = async (token: string) => {
        if (token === 'main_token') {
          return {
            name: 'td_main',
            roles: ['all'],
          };
        }
        return {
          name: 'td_dev',
          roles: ['UserIndex', 'DashboardBase', 'login'],
        };
      };

      const res = await mockRemoteUserInfo(this.token);

      this.userInfo = res;
    },
    // 用户登出
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = { ...InitUserInfo };
    },
    // 删除 token
    async removeToken() {
      this.token = '';
    },
  },
  // 使用 Pinia 持久化 store
  persist: {
    afterRestore: (ctx) => {
      if (ctx.store.roles && ctx.store.roles.length > 0) {
        const permissionStore = usePermissionStore();
        permissionStore.initRoutes(ctx.store.roles);
      }
    },
  },
});

// 获取用户 store
export function getUserStore() {
  return useUserStore(store);
}