import mock from '@/api/mock-points';
import * as types from './mutation-types';

// initial state
// shape: [{ id, quantity }]
// 单一状态树

const state = {
  all: []
};

// getters
// 用于对状态树过滤
const getters = {
  changePoints: state => {
    return state.all.map(item => {
      return {
        top: item[0],
        left: item[1]
      };
    });
  }
};

// actions
// action 提交 的是一个 mutations，而不是直接变更状态
// action Action 可以包含任意异步操作
// Action 通过 store.dispatch 方法触发
// 你需要以相应的 type 调用 store.dispatch 方法

const actions = {
  searchPlace ({ commit, state }, name) {
    console.log(state.all);
    debugger;
  },
  getAllPoints ({ commit }) {
    mock.getPoints(points => {
      commit(types.RECEIVE_POINTS, { points });
    });
  }
};

// mutations
// mutations有：事件类型 (type) 和 一个 回调函数 (handler)
// mutations必须是同步函数
// 你需要以相应的 type 调用 store.commit 方法
const mutations = {
  [types.RECEIVE_POINTS] (state, { points }) {
    state.all = points;
  }
};

export default {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
