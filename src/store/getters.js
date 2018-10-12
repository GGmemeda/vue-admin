const getters = {
  // user
  token: state => state.user.token,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  setting: state => state.user.setting,
  // permission
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,

  // app
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  // errorLog
  errorLogs: state => state.errorLog.logs,

  // tagsView
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
};
export default getters;
