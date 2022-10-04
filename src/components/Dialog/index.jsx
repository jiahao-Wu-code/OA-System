import React from 'react';
import { Modal } from 'antd';
const Dialog = ({
  title,
  dialogStatus,
  render,
  setDialogStatus,
  width = 600,
}) => {
  return (
    <Modal
      width={width}
      destroyOnClose={true}
      title={title}
      centered={true}
      open={dialogStatus}
      onCancel={() => setDialogStatus(false)}
      footer={null}
    >
      {render()}
    </Modal>
  );
};

export default Dialog;
