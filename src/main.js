// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import router from './router';
import store from './store';
import 'font-awesome/css/font-awesome.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './style/theme.less';
import * as filters from './filters';
// import './icons';

Vue.use(iView);
Vue.use(Vuex);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
