import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import CommonHeader from '../components/CommonHeader';
import './BaseLayout.less';

const { Header, Sider, Content } = Layout;
const BaseLayout = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  const changeCollapse = () => setCollapse(!collapse);
  return (
    <Layout className="container">
      <SideBar Sider={Sider} Menu={Menu} collapse={collapse} />
      <Layout>
        <CommonHeader
          Header={Header}
          collapse={collapse}
          changeCollapse={changeCollapse}
        />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
