import React from 'react';
import { Button, Pagination } from 'antd';
import IconMap from 'components/IconMap';
import classNames from 'classnames';
import './index.less';

import { useSelector } from 'umi';

const TableHeader = ({
  page,
  size,
  total,
  changeCurrentPage,
  interfaceDelMethod,
}) => {
  const { collapse } = useSelector((state) => state.common);
  return (
    <div
      className={classNames('table-header-container', {
        'big-style': collapse,
      })}
    >
      <div>
        <Button size="small" shape="round" icon={IconMap.add} className="mr-10">
          创建
        </Button>
        <Button size="small" shape="round" icon={IconMap.del} danger>
          批量删除
        </Button>
      </div>
      <div className="pagination-container">
        <Pagination
          simple
          defaultCurrent={page}
          current={page}
          total={total}
          pageSize={size}
          onChange={(page) => changeCurrentPage(page)}
        />
        <span>共计{total} 条记录</span>
      </div>
    </div>
  );
};

export default TableHeader;
