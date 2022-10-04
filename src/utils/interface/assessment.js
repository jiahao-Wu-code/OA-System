//- 引入封装好的fetch方法
import ajax from '../http.js';

//- 获取绩效考核列表
export const getAssessmentList = (params) =>
  ajax.post('/getAssessmentList', params);
