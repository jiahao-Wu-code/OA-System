import React, { useState } from 'react';
import classNames from 'classnames';
import IconMap from 'components/IconMap';
import { useDispatch } from 'umi';
import './index.less';

const SearchContainer = ({ render }) => {
  const [closeStatus, setCloseStatus] = useState(false);
  const dispatch = useDispatch();

  const clearForm = () => {
    dispatch({ type: 'common/clearForm', payload: { isClearForm: true } });
    console.log('clearForm');
  };

  return (
    <div className={classNames('filter-wrapper', { close: closeStatus })}>
      <div className="filter-title-wrapper">
        <span>字段过滤</span>
        <span className="c-r" onClick={clearForm}>
          {IconMap.reload}
        </span>
      </div>
      <div
        className={classNames('filter-form-wrapper', { opacity: closeStatus })}
      >
        {render()}
      </div>
      <div className="close-tip" onClick={() => setCloseStatus(!closeStatus)}>
        {closeStatus ? IconMap.right : IconMap.left}
      </div>
    </div>
  );
};

export default SearchContainer;
