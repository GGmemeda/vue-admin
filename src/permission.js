import router from './router';
import store from './store';
// getToken from cookie
import { getToken } from './utils/auth';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// NProgress Configuration
NProgress.configure({ showSpinner: false });

// no redirect whitelist
const whiteList = ['/login', '/auth-redirect'];

// permission judge function
function hasPermission(roles, permissionRoles) {
  // admin permission passed directly
  if (roles.indexOf('admin') >= 0) return true;
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

router.beforeEach((to, from, next) => {
  // to and from are Route Object,next() must be called to resolve the hook
  // console.log(getToken(), !(!undefined), to.path, 'getToken');
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      // 如果当前页面是dashboard，则不会触发回调，手动处理NProgress
      NProgress.done();
    } else {
      // 判断当前用户是否已拉取完user_info信息
      if (store.getters.roles.length === 0) {
        // 拉取user_info
        store.dispatch('GetUserInfo').then(res => {
          // note: roles must be a array! such as: ['editor','develop']
          const roles = res.data.roles;
          // 根据roles权限生成可访问的路由表
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters);
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true });
          });
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again');
            next({ path: '/' });
          });
        });
      } else {
        // 没有动态改变权限的需求可直接next()
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next();
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }});
        }
        console.log(to.path, 'to.path');
      }
    }
  } else {
    // 免登录可访问whiteList，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      // console.log('whiteList', 'step2');
      next();
    } else {
      // 否则全部重定向到登录页
      // console.log('redirectLogin', 'step1');
      // next(`/login?redirect=${to.path}`);
      next('/login');
      // 如果当前页面是登录，则不会触发回调，手动处理NProgress
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
