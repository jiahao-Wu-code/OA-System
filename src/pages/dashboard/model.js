import $http from 'api';

export default {
  namespace: 'dashboard',
  state: {
    amountDataList: [
      {
        title: '总人数',
        amount: 37,
        styleData: { width: '100%', height: '170px' },
      },
      {
        title: '入职1年内员工',
        amount: 14,
        styleData: { width: '33%', height: '170px' },
      },
      {
        title: '入职1-2年内员工',
        amount: 12,
        styleData: { width: '33%', height: '170px' },
      },
      {
        title: '入职3年以上员工',
        amount: 11,
        styleData: { width: '33%', height: '170px' },
      },
    ],
    // pieList: [
    //   {
    //     title: '学历情况',
    //     renderList: data.educationList,
    //     styleData: { width: '49.8%', height: '350px' },
    //   },
    //   {
    //     title: '员工性别占比',
    //     renderList: data.genderList,
    //     styleData: { width: '49.8%', height: '350px' },
    //   },
    // ],
    // columnList: [
    //   {
    //     title: '员工年龄段',
    //     renderList: data.ageMap,
    //     styleData: { width: '49.8%', height: '350px' },
    //   },
    //   {
    //     title: '部门员工数量',
    //     renderList: data.departmentList,
    //     styleData: { width: '49.8%', height: '350px' },
    //   },
    // ],
    // marriageData: {
    //   title: '员工婚姻状况',
    //   renderList: data.marriageList,
    //   styleData: { width: '49.8%', height: '350px' },
    // },
    staffData: {
      title: '工龄最老的10个人',
      renderList: [
        {
          name: '张三',
          department: '研发部',
        },
        {
          name: '李四',
          department: '',
        },
        {
          name: '王二麻子',
          department: '研发部',
        },
        {
          name: '张三丰',
          department: '技术部',
        },

        {
          name: '张涛',
          department: '',
        },
        {
          name: '赵雅婷',
          department: '技术部',
        },
        {
          name: '姜锦春',
          department: '技术部',
        },
        {
          name: '二狗子',
          department: '技术部',
        },
        {
          name: '突狗子',
          department: '技术部',
        },
      ],
      styleData: { width: '49.8%', height: '350px' },
    },
  },
};
