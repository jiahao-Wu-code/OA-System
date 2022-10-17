import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import TableHeader from 'components/TableHeader';
import FilterForm from './component/FilterForm';
import SearchContainer from 'components/SearchContainer';
import TableList from './component/TableList';
import DrawerComponent from 'components/Drawer';
import DetailForm from './component/DetailForm';
import Dialog from 'components/Dialog';
import AddForm from './component/AddForm';

const staff = () => {
  const [page, setPage] = useState(1);
  const [dialogStatus, setDialogStatus] = useState(false);
  const dispatch = useDispatch();
  const { staffTotal, staffList, staffDetail } = useSelector(
    (state) => state.staff,
  );
  const { userInfo } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state);

  // 根据搜索条件进行列表展示
  const getQueryData = (queryData) => {
    console.log('queryData', queryData);
    _initStaffList(1, queryData);
  };

  //  改变当前页数
  const changeCurrentPage = (currentPage) => {
    setPage(currentPage);
    _initStaffList(currentPage);
  };

  // 从state 获取员工列表
  const _initStaffList = (currentPage = page, data) =>
    dispatch({
      type: 'staff/_initStaffList',
      payload: { size: 10, page: currentPage, ...data },
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
        openAddDialog={() => setDialogStatus(true)}
      />
      {/* 左侧搜索组件 */}

      <SearchContainer
        render={() => <FilterForm reload={(data) => getQueryData(data)} />}
      />
      {/* 员工列表组件 */}
      <TableList
        userInfo={userInfo}
        staffList={staffList}
        reloadPage={_initStaffList}
        loading={loading}
      />

      {/* 新增员工组件 */}
      <Dialog
        title="新增员工"
        dialogStatus={dialogStatus}
        render={() => (
          <AddForm
            setDialogStatus={setDialogStatus}
            reloadList={() => {
              setPage(1);
              _initStaffList(1);
            }}
          />
        )}
        setDialogStatus={setDialogStatus}
        width={800}
      />

      {/* 使用抽屉组件实现详情信息 */}

      <DrawerComponent
        title={staffDetail?.userName}
        _id={staffDetail?._id}
        interfaceName="deleteStaffs"
        reloadList={() => {
          setPage(1);
          _initStaffList(1);
        }}
        render={() => (
          <DetailForm
            staffDetail={staffDetail}
            _initStaffList={_initStaffList}
          />
        )}
      />
    </div>
  );
};

export default staff;
