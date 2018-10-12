import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import permission from './modules/permission';
import app from './modules/app';
import getters from './getters';
import errorLog from './modules/errorLog';
import tagsView from './modules/tagsView';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const vuexPersisted = createPersistedState({
  key: 'persist_main',
  storage: window.localStorage,
  paths: ['user']
});
const store = new Vuex.Store({
  modules: {
    app,
    user,
    errorLog,
    permission,
    tagsView
  },
  getters,
  plugins: [vuexPersisted]
});

export default store;
