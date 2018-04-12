import Vue from 'vue';
import Router from 'vue-router';
// import store from '../store';

const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

const routes = [
  {
    path: '/mapMain',
    name: 'mapMain',
    component: _import('mapCenter/mapMain')
  },
  {
    path: '/',
    name: 'test',
    component: _import('test/index')
  },
  {
    path: '/about',
    name: 'about',
    component: _import('about/about')
  },
  {
    path: '/login',
    name: 'login',
    component: _import('login/login'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/components',
    name: 'components-componentsDemo',
    component: _import('componentsDemo/index'),
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      {
        path: 'downNumber',
        component: _import('componentsDemo/downNumber'),
        name: 'downNumber-demo',
        meta: { title: 'downNumber' }
      }
    ]
  }
];

[].forEach((m) => {
  Array.prototype.push.apply(routes, m);
});
const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
});
// 全局导航钩子
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    next();
  } else {
    // 应使用cookie存储token否则token会窜,工具使用为js-cookie
    const useToken = true || localStorage.getItem('ucToken');
    if (!useToken) {
      router.replace({
        path: '/login',
        redirect: to.fullPath
      });
    } else {
      next();
    }
  }
});

export default router;

