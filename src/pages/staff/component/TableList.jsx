import { Table } from 'antd';
import React, { useState } from 'react';
import { EditableRow, EditableCell } from 'components/Editable';
import Columns from './Columns';
import Dialog from 'components/Dialog';
import RecordTable from './RecordTable';

const TableList = ({ userInfo, staffList, loading }) => {
  const [currentRecord, setCurrentRecord] = useState({});
  const [dialogStatus, setDialogStatus] = useState(false);
  const handleSave = (...args) => {
    console.log(args);
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
        columns={Columns({ userInfo, handleSave, openReviewRecord })}
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
