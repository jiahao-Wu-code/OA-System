import React, { useEffect, useState } from 'react';
import $http from 'api';
import { Table } from 'antd';
import { columnData } from './renderType';

const RecordTable = ({ type, interfaceName, requestData }) => {
  // console.log(type)
  useEffect(() => {
    _initData();
  }, []);

  const [source, setSource] = useState([]);
  const [total, setTotal] = useState(0);

  // 表格初始化请求数据
  const _initData = async (page = 1) => {
    const res = await $http[interfaceName]({ ...requestData, page });
    setSource(res.data.list);
    setTotal(res.data.total);
    // console.log(res);
  };

  const changePage = (page) => {
    _initData(page);
  };

  return (
    <Table
      pagination={{ defaultPageSize: 5, onChange: changePage, total }}
      columns={columnData[type]}
      rowKey={(columns) => columns._id}
      dataSource={source}
    />
  );
};

export default RecordTable;
