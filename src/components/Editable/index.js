import { Form, Select, Input, DatePicker } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { mapData } from 'utils/mapData';
import moment from 'moment';

const { Option } = Select;

const EditableContext = React.createContext(null);

// 可编辑单元行
export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
// 可编辑单元格
export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  rules,
  type,
  handleSave,
  ...restProps
}) => {
  // console.log(rules, type)
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current && inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    // console.log(dataIndex, record[dataIndex])
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
      onboardingTime: moment(record.onboardingTime),
    });
  };

  // const save = async () => {
  //   console.log('save')
  //   try {
  //     const values = await form.validateFields();
  //     toggleEdit();
  //     handleSave({ ...record, ...values });
  //   } catch (errInfo) {
  //     console.log('Save failed:', errInfo);
  //   }
  // };

  //- 修改之前的检测
  const _sendBeforeCheck = async () => {
    try {
      const editData = await form.validateFields([dataIndex]);
      setEditing(!editing);
      //- 当前修改后的值是否与之前的值相等
      if (record[dataIndex] === editData[dataIndex]) return;
      handleSave({
        _id: record._id,
        updateVal: editData[dataIndex],
        type: dataIndex,
      });
    } catch (error) {
      setEditing(!editing);
    }
  };

  const editNodeData = {
    inputNode: (
      <Input
        ref={inputRef}
        onPressEnter={_sendBeforeCheck}
        onBlur={_sendBeforeCheck}
      />
    ),
    selectNode: (
      <Select onBlur={_sendBeforeCheck} ref={inputRef}>
        {mapData[dataIndex] &&
          mapData[dataIndex].map((item, index) => (
            <Option key={index} value={index}>
              {item}
            </Option>
          ))}
      </Select>
    ),
    dateNode: (
      <DatePicker
        onChange={_sendBeforeCheck}
        ref={inputRef}
        onBlur={_sendBeforeCheck}
      />
    ),
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={rules}
      >
        {editNodeData[type]}
        {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
