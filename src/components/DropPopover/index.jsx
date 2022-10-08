import React, { useState, useEffect } from 'react';
import { Popover, Input, List, Pagination } from 'antd';
const { Search } = Input;
import $http from 'api';
import './index.less';

/**
 *
 * @param {*} placeholderVal
 * @param {*} interfaceName 接口名
 * @param {*} searchType 搜索内容
 * @param {Function} getSelectItem  获取筛选后的数据
 * @returns
 */
const DropPopover = ({
  placeholderVal,
  interfaceName,
  searchType,
  getSelectItem,
}) => {
  // console.log(placeholderVal, interfaceName, searchType, getSelectItem)

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const changePage = (currentPage) => {
    // console.log(page)
    setPage(currentPage);
    _initList(currentPage);
  };

  useEffect(() => {
    _initList(1);
  }, []);

  // 获取列表
  const _initList = async (page, queryData = {}) => {
    console.log('queryData', queryData);
    const {
      data: { total, list },
    } = await $http[interfaceName]({
      page,
      size: 5,
      queryData,
    });
    // console.log(total, list)
    setTotal(total);
    setList(list);
  };
  // 处理搜索框
  const onSearch = (val) => {
    // console.log(val, searchType, interfaceName);
    const searchData = !val ? {} : { [searchType]: val };
    setPage(1);
    _initList(searchData);
  };

  const selectItem = (item) => {
    // console.log(item)
    setVisible(false);
    getSelectItem(item);
  };

  return (
    <>
      <Popover
        placement={'bottomRight'}
        open={visible}
        onOpenChange={() => setVisible(!visible)}
        title={
          <Search placeholder={placeholderVal} onSearch={onSearch}></Search>
        }
        trigger={'click'}
        content={
          <List
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                style={{ cursor: 'pointer' }}
                onClick={() => selectItem(item)}
              >
                {item[searchType]}
              </List.Item>
            )}
            footer={
              <Pagination
                onChange={changePage}
                current={page}
                pageSize={5}
                total={total}
              />
            }
          ></List>
        }
      >
        <span className="add-icon">+</span>
      </Popover>
    </>
  );
};

export default DropPopover;
