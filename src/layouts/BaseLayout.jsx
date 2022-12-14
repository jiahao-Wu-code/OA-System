import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import CommonHeader from '../components/CommonHeader';
import NotFound from '../pages/404Page';
import './BaseLayout.less';
import { history, useSelector, useDispatch } from 'umi';
import 'common/css/main.less';

const { Header, Sider, Content } = Layout;

const BaseLayout = ({ children }) => {
  const { collapse } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const changeCollapse = () => {
    dispatch({
      type: 'common/changeCollapse',
      payload: { collapse: !collapse },
    });
  };
  const routeList = JSON.parse(sessionStorage.getItem('routeList'));
  const {
    location: { pathname },
  } = history;
  // 获取当前页面的 pathname
  const isIncludePage = () => {
    if (pathname === '/') {
      history.replace(routeList[0].route);
      return false;
    }
    return routeList.some((item) => item.route === pathname);
  };
  return (
    <Layout className="container">
      <SideBar Sider={Sider} Menu={Menu} collapse={collapse} />
      <Layout>
        <CommonHeader
          Header={Header}
          collapse={collapse}
          changeCollapse={changeCollapse}
        />
        <Content>{isIncludePage() ? children : <NotFound />}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
