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
  if(getToken()){
    next();

    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    }else{
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
