import React from 'react';
import { useSelector, useDispatch } from 'umi';
import { Drawer, Modal, message } from 'antd';
import IconMap from 'components/IconMap';
import $http from 'api';
import './index.less';

/**
 *
 * @param {*} title 标题
 * @param {*} interfaceName 接口名
 * @param {*} _id 唯一Id
 * @param {*} render 需要渲染的函数
 * @param {*} reloadList 重新触发列表变化
 * @returns
 */
const DrawerComponent = ({ title, interfaceName, _id, render, reloadList }) => {
  const { isShowDetailDialog } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const closeDialog = () => {
    dispatch({
      type: 'common/setShowDetailDialog',
      payload: { isShowDetailDialog: !isShowDetailDialog },
    });
  };

  const openModelDialog = () => {
    Modal.confirm({
      title: '温馨提示',
      content: '确定要删除当前用户信息吗?',
      onOk: _deleteItem,
    });
  };

  // 删除当前项
  const _deleteItem = async () => {
    const { code, msg } = await $http[interfaceName]({ ids: [_id] });
    if (code) return;
    message.success(msg);
    closeDialog();
    reloadList();
  };

  const titleNode = (
    <>
      <span>{IconMap.copy}</span>
      <span>{title}</span>
    </>
  );
  const extra = (
    <>
      <span className="icon" onClick={openModelDialog}>
        {IconMap.del}
      </span>
      <span className="line"></span>
      <span className="icon" onClick={closeDialog}>
        {IconMap.close}
      </span>
    </>
  );
  return (
    <Drawer
      title={titleNode}
      placement="right"
      closable={false}
      destroyOnClose={true}
      width={500}
      open={isShowDetailDialog}
      extra={extra}
    >
      {render()}
    </Drawer>
  );
};

export default DrawerComponent;
