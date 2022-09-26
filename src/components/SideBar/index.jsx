import React, { Children } from 'react';
import logo from 'common/img/logo.svg';
import { Link } from 'umi';
import IconMap from 'components/IconMap';
const SideBar = ({ Sider, Menu, collapse }) => {
  const routeList = sessionStorage.getItem('routeList')
    ? JSON.parse(sessionStorage.getItem('routeList'))
    : [];
  const items = [
    ...routeList?.map((item) => ({
      key: item._id,
      icon: IconMap[item.icon],
      label: <Link to={item.route}>{item.zhName}</Link>,
      type: IconMap[item.icon],
    })),
  ];
  // console.log(items)
  return (
    <Sider theme="light" className="side-bar" collapsed={collapse}>
      <div className="brand">
        <div className="logo-home">
          <img src={logo} alt="" />
          {!collapse && <h1>织信OA系统</h1>}
        </div>
      </div>
      <div className="menu-container">
        <Menu mode="inline" items={items}>
          {/* 处理警告  */}
          {/* {routeList?.map((item) => {
            return (
              <Menu.Item key={item.route}>
                <Link to={item.route}>
                  {IconMap[item.icon]}
                  <span>{item.zhName}</span>
                </Link>
              </Menu.Item>
            );
          })} */}
        </Menu>
      </div>
    </Sider>
  );
};

export default SideBar;
