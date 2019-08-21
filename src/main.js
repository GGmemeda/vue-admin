// 用“import”命令加载VUE构建版本
// 在WebPACK.BASE.CONF中设置了别名（运行时单独或运行时）
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import { setInterceptors } from './utils/request';
// 路由许可
import './permission';
import Element from 'element-ui'; // ElementUI
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'; // global css
//eidtor
// require styles 引入样式


// import './mock'; // simulation data
import './icons'; // icon
import './components/plugins';//全局映入通用自定义插件
import * as filters from './filters';

Vue.config.productionTip = false;
Vue.use(Element);
setInterceptors(store);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

