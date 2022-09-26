import React from 'react';
import IconMap from 'components/IconMap';
import { Avatar, Menu } from 'antd';
const { SubMenu, Divider, Item } = Menu;
import defaultAvatar from 'common/img/img1.jpeg';
import { useSelector, history } from 'umi';

const CommonHeader = ({ Header, collapse, changeCollapse }) => {
  // 从user model里面获取用户信息
  const { userInfo } = useSelector((state) => state.user);
  // console.log("userInfo", userInfo)

  // const menuTitle = (
  //   <>
  //     <span>{userInfo?.userName || '哆啦A梦'}</span>
  //     <Avatar src={defaultAvatar} style={{ marginLeft: 10 }} />
  //   </>
  // );
  // 退出登录
  const signOut = () => {
    sessionStorage.clear();
    window.location.href = '/user/login';
  };
  {
    /* 处理警告  */
  }
  const items = [
    {
      key: 'submenu',
      icon: <Avatar src={defaultAvatar} style={{ marginLeft: 10 }} />,
      label: '哆啦A梦',
    },
    {
      key: 'signOut',
      icon: IconMap.signOut,
      label: '退出',
      onClick: signOut,
    },
  ];

  return (
    <Header className="header-wrapper">
      <div className="button" onClick={changeCollapse}>
        {collapse ? IconMap.rightArrow : IconMap.leftArrow}
      </div>
      <Menu mode="horizontal" items={items}></Menu>
    </Header>
  );
};

export default CommonHeader;
