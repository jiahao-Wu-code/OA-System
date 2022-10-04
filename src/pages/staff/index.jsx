import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import TableHeader from 'components/TableHeader';

const staff = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { staffTotal } = useSelector((state) => state.staff);
  //  改变当前页数
  const changeCurrentPage = (currentPage) => {
    setPage(currentPage);
    _initStaffList(currentPage);
  };
  // 从state 获取员工列表
  const _initStaffList = (currentPage) =>
    dispatch({
      type: 'staff/_initStaffList',
      payload: { size: 10, page: currentPage },
    });
  useEffect(() => {
    _initStaffList(page);
  }, []);

  return (
    <div className="main-container">
      {/* 表格头部组件 */}
      <TableHeader
        page={page}
        total={staffTotal}
        size={10}
        changeCurrentPage={changeCurrentPage}
        interfaceDelMethod="deleteStaffs"
      />
    </div>
  );
};

export default staff;
