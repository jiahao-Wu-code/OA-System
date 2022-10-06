//- 引入封装好的fetch方法
import ajax from '../http.js';

//- 获取部门列表
export const getLevelList = (params) => ajax.post('/getLevel', params);
