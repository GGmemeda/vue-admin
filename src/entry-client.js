import { createApp } from './main';
import 'babel-polyfill';

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  // 必须和App.vue的根元素id相同，否则无法在客户端混合服务器端已经渲染完的静态标记
  app.$mount('#app');
});
