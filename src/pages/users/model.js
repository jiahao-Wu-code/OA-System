import $http from 'api';
import { message } from 'antd';
import { history } from 'umi';
export default {
  namespace: 'user',
  state: {
    userInfo: sessionStorage.getItem('userProfile')
      ? JSON.parse(sessionStorage.getItem('userProfile'))
      : null,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *login({ payload }, { put, call, select }) {
      const { data, msg } = yield call($http.userLogin, payload);
      // console.log(data, msg);
      if (!data) {
        message.error(msg);
        return;
      }
      const routeData = yield call($http.getRouteList);
      // console.log("routeData", routeData);
      sessionStorage.setItem('userProfile', JSON.stringify(data));
      sessionStorage.setItem('routeList', JSON.stringify(routeData.data));
      yield put({
        type: 'updateUserProfile',
        payload: { userInfo: data },
      });
      // console.log(data, msg);
      // 开始界面跳转
      history.push(routeData.data[0].route);
    },
  },
};
