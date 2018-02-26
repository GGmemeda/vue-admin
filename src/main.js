// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import { createRouter } from './router';
import { createStore } from './store';
import 'font-awesome/css/font-awesome.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(Vuex);
Vue.use(iView);
Vue.config.productionTip = false;

/* eslint-disable no-new */
export function createApp () {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  });
  return { app, router, store };
}

