import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import mapCenter from './modules/mapCenter/mapCenter';
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const state = {
  user: false
};
const mutations = {
  isLogin (state, user) {
    state.user = user;
  }
};
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    mapCenter: mapCenter
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
});
