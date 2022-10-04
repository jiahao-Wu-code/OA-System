import { Tag, Image } from 'antd';
import { formatYear, formatDate, formatBirth } from 'utils/format';
import { mapData } from 'utils/mapData';
const Columns = ({ handleSave, userInfo, openReviewRecord }) => {
  const normalList = [
    {
      title: '姓名',
      dataIndex: 'userName',
      editable: true,
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
      editable: true,
    },
    {
      title: '职级描述',
      dataIndex: 'level',
      render: (data) => data?.levelDescription || '暂无职级描述',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      editable: true,
      render: (type) => <Tag>{mapData.gender[type]}</Tag>,
    },
    {
      title: '部门',
      dataIndex: 'department',
      render: (data) => data?.department || '-',
    },
    {
      title: '部门负责人',
      dataIndex: 'department',
      render: (data) => data?.departmentLeader?.userName || '-',
    },
  ];

  const authList = [
    {
      title: '年龄',
      dataIndex: 'idNumber',
      render: (idNumber) => formatYear(idNumber, 'age'),
    },
    {
      title: '入职时间',
      dataIndex: 'onboardingTime',
      editable: true,
      render: (date) => (date ? formatDate(date, 'YYYY-MM-DD') : '-'),
    },
    // {
    //     title: '头像',
    //     dataIndex: 'avatar',
    //     editable: true,
    //     render: img => <Image src={img} />
    // },
    {
      title: '籍贯',
      dataIndex: 'hometown',
      editable: true,
      render: (hometown) => hometown || '-',
    },
    {
      title: '学历',
      dataIndex: 'education',
      editable: true,
      render: (type) => <Tag>{mapData.education[type] || '-'}</Tag>,
    },
    {
      title: '婚姻状况',
      dataIndex: 'marriage',
      editable: true,
      render: (type) => <Tag>{mapData.marriage[type] || '-'}</Tag>,
    },
    {
      title: '生日',
      dataIndex: 'idNumber',
      render: (idNumber) => formatBirth(idNumber),
    },
    {
      title: '银行卡',
      dataIndex: 'bankNumber',
      editable: true,
    },
    {
      title: '身份证号',
      dataIndex: 'idNumber',
      editable: true,
    },
    {
      title: '毕业院校',
      dataIndex: 'graduatedSchool',
      editable: true,
    },
    {
      title: '绩效考核',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            className="c-p"
            onClick={() =>
              openReviewRecord({
                title: '考核记录',
                interfaceName: 'getAssessmentList',
                requestData: {
                  queryData: {
                    staffName: data._id,
                  },
                },
                type: 'assessment',
              })
            }
          >
            查看
          </Tag>
        );
      },
    },
    {
      title: '奖惩记录',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            className="c-p"
            onClick={() =>
              openReviewRecord({
                title: '奖惩记录',
                interfaceName: 'getRewardAndPunishment',
                requestData: {
                  staffName: data._id,
                },
                type: 'reward',
              })
            }
          >
            查看
          </Tag>
        );
      },
    },
    {
      title: '调薪记录',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            className="c-p"
            onClick={() =>
              openReviewRecord({
                title: '调薪记录',
                interfaceName: 'getSalaryAdjustment',
                requestData: {
                  staffName: data._id,
                },
                type: 'salary',
              })
            }
          >
            查看
          </Tag>
        );
      },
    },
  ];

  let renderColumnsList =
    userInfo.identity === 0 ? normalList : [...normalList, ...authList];

  renderColumnsList = renderColumnsList.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return renderColumnsList;
};

export default Columns;
