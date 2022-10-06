import React from 'react';
import { Popover } from 'antd';
import './index.less';

const DropPopover = () => {
  return (
    <>
      <Popover
        placement={'bottomRight'}
        title={'搜索'}
        trigger={'click'}
        content={'旗袍'}
      >
        <span className="add-icon">+</span>
      </Popover>
    </>
  );
};

export default DropPopover;
