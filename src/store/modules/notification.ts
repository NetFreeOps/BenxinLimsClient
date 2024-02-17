import { defineStore } from 'pinia';
import type { NotificationItem } from '@/types/interface';

// 定义消息数据模型
const msgData = [
  {
    id: '123',
    content: '腾讯大厦一楼改造施工项目 已通过审核！',
    type: '合同动态',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'high',
  },
  {
    id: '124',
    content: '三季度生产原材料采购项目 开票成功！',
    type: '票务动态',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low',
  },
  {
    id: '125',
    content: '2021-01-01 10:00的【国家电网线下签约】会议即将开始，请提前10分钟前往 会议室1 进行签到！',
    type: '会议通知',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'middle',
  },
  {
    id: '126',
    content: '一季度生产原材料采购项目 开票成功！',
    type: '票务动态',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low',
  },
  {
    id: '127',
    content: '二季度生产原材料采购项目 开票成功！',
    type: '票务动态',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low',
  },
  {
    id: '128',
    content: '三季度生产原材料采购项目 开票成功！',
    type: '票务动态',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low',
  },
];

// 定义消息数据模型的类型
type MsgDataType = typeof msgData;

// 使用pinia定义store
export const useNotificationStore = defineStore('notification', {
  // 定义store的状态
  state: () => ({
    msgData,
  }),

  // 定义store的getter
  getters: {
    // 获取未读消息
    unreadMsg: (state) => state.msgData.filter((item: NotificationItem) => item.status),
    // 获取已读消息
    readMsg: (state) => state.msgData.filter((item: NotificationItem) => !item.status),
  },

  // 定义store的action
  actions: {
    // 设置消息数据
    setMsgData(data: MsgDataType) {
      this.msgData = data;
    },
  },

  // 设置store的持久化
  persist: true,
});