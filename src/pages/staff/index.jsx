import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import TableHeader from 'components/TableHeader';
import FilterForm from './component/FilterForm';
import SearchContainer from 'components/SearchContainer';
import TableList from './component/TableList';

const staff = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { staffTotal, staffList } = useSelector((state) => state.staff);
  const { userInfo } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state);

  //  改变当前页数
  const changeCurrentPage = (currentPage) => {
    setPage(currentPage);
    _initStaffList(currentPage);
  };

  // 从state 获取员工列表
  const _initStaffList = (currentPage = page) =>
    dispatch({
      type: 'staff/_initStaffList',
      payload: { size: 10, page: currentPage },
    });
  useEffect(() => {
    _initStaffList();
  }, []);

  return (
    <div className="main-search">
      {/* 表格头部组件 */}
      <TableHeader
        page={page}
        total={staffTotal}
        size={10}
        changeCurrentPage={changeCurrentPage}
        interfaceDelMethod="deleteStaffs"
      />
      {/* 左侧搜索组件 */}

      <SearchContainer render={() => <FilterForm />} />
      <TableList
        userInfo={userInfo}
        staffList={staffList}
        reloadPage={_initStaffList}
        loading={loading}
      />
    </div>
  );
};

export default staff;
