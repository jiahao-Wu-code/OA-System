import React, { useEffect } from 'react';
import StaffAmount from './component/StaffAmount';
import OldStaffTable from './component/OldStaffTable';
import { useSelector, useDispatch } from 'umi';
import './css/index.less';

const index = () => {
  const { amountDataList, staffData } = useSelector((state) => state.dashboard);
  // useEffect(()=>{
  //   window.location.pathname = '/dashboard'
  // },[])
  return (
    <div className="dashboard-container">
      {amountDataList.map((item, index) => (
        <StaffAmount key={index} {...item} />
      ))}

      <OldStaffTable {...staffData} />
    </div>
  );
};

export default index;
