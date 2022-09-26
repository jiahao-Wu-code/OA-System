//- 引入封装好的fetch方法

import ajax from '../http.js';

//- 用户登录接口api
export const userLogin = (params) => ajax.post('/login', params);

// 获取收集验证码
export const getSmCode = (params) => ajax.get('/getCode', params);

// 检测验证码输入是否正确
export const checkedCode = (params) => ajax.get('/checkSmCode', params);

// 重置密码
export const resetPassword = (params) => ajax.post('/resetPassword', params);

// 检测用户是否登录
export const queryUserLogin = () => ajax.get('/queryLoginStatus');

// 获取路由表
export const getRouteList = () => ajax.get('/getRouteList');
