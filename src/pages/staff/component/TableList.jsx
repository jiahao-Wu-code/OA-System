import { Table, message } from 'antd';
import React, { useState } from 'react';
import { EditableRow, EditableCell } from 'components/Editable';
import Columns from './Columns';
import Dialog from 'components/Dialog';
import RecordTable from './RecordTable';
import $http from 'api';
import { useDispatch } from 'umi';

const TableList = ({ userInfo, staffList, loading, reloadPage }) => {
  const [currentRecord, setCurrentRecord] = useState({});
  const [dialogStatus, setDialogStatus] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async (obj) => {
    if (obj.type === 'mobile') {
      const checkData = { mobile: obj.updateVal };
      const { data, msg } = await $http.checkIsExists({ checkData });

      if (data) return message.error(msg);
    }
    // 修改表单
    const { code, msg } = await $http.updateStaff(obj);
    if (code) {
      return message.error(msg);
    } else {
      message.success(msg);
      reloadPage();
    }
  };

  // 打开员工详情
  const openDetailDialog = (_id) => {
    dispatch({ type: 'staff/_getStaffDetail', payload: { _id } });
  };

  const openReviewRecord = (record) => {
    setDialogStatus(true);
    setCurrentRecord(record);
  };
  return (
    <>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={staffList}
        pagination={false}
        scroll={{ x: true }}
        loading={loading.effects['staff/_initStaffList']}
        rowKey={(record) => record._id}
        columns={Columns({
          userInfo,
          handleSave,
          openReviewRecord,
          openDetailDialog,
        })}
      />
      <Dialog
        title={currentRecord?.title}
        setDialogStatus={setDialogStatus}
        dialogStatus={dialogStatus}
        render={() => <RecordTable {...currentRecord} />}
      />
    </>
  );
};

export default TableList;
