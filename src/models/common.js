import $http from 'api';
export default {
  namespace: 'common',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      // 初始化 查询用户是否登录 ，在app.start()阶段执行
      // console.log("arguments", arguments)
      dispatch({ type: 'queryUserLogin', payload: { history } });
    },
  },
  effects: {
    *queryUserLogin({ payload }, { put, call }) {
      // 判断用户当前访问路径
      // console.log("payload", payload);
      const {
        history,
        history: {
          location: { pathname },
        },
      } = payload;
      // console.log(history, pathname);
      if (pathname !== '/users/login' || pathname !== '/users/forgetPassword') {
        if (
          !sessionStorage.getItem('userProfile') ||
          !sessionStorage.getItem('token') ||
          !sessionStorage.getItem('routeList')
        ) {
          // 跳转登录界面
          history.replace('/users/login');
        } else {
          // 满足条件
          const res = yield call($http.queryUserLogin);
          if (res.code !== 0) return;
          const { data: routeList } = yield call($http.getRouteList);
          sessionStorage.setItem('routeList', JSON.stringify(routeList));
        }
      } else {
        // 不需要拦截
        // 清除sessionStorage，下次会重新获取
        sessionStorage.clear();
      }
    },
  },
};
