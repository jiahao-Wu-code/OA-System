import React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  message,
  Select,
  DatePicker,
  Button,
} from 'antd';
import formList from 'staticList/staffList';
import DropPopover from 'components/DropPopover';
import { staffRule } from 'utils/rules';
import $http from 'api';
const { Option } = Select;

const AddForm = ({ setDialogStatus, reloadList }) => {
  const [form] = Form.useForm();

  // 用户表单提交
  const _onFinish = async (data) => {
    delete data.departmentName;
    delete data.levelName;
    console.log(data);
    const { code, msg } = await $http.createStaff(data);
    if (code) return;
    message.success(msg);
    reloadList();
    setDialogStatus(false);
    form.resetFields();
  };

  // 用户名和密码的检测
  const beforeChecked = async (item) => {
    if (item.itemName !== 'accountName' || item.itemName !== 'mobile') return;
    const checkData = await form.validateFields([item.itemName]);
    // console.log(data)
    const { data, msg } = await $http.checkIsExists({ checkData });
    if (data) {
      form.setFieldValue({ [item.itemName]: '' });
      return message.error(msg);
    }
  };

  // 表单项
  const formData = {
    input: (item) => (
      <Input
        placeholder={item.placeholderVal}
        type={item.itemName === 'password' ? 'password' : 'text'}
        onBlur={() => beforeChecked(item)}
      />
    ),
    popover: (item) => (
      <Input
        placeholder={item.placeholderVal}
        addonAfter={
          <DropPopover
            placeholderVal={item.placeholderVal}
            interfaceName={item.interfaceName}
            searchType={item.itemName}
            getSelectItem={(res) => {
              form.setFieldsValue({
                [item.itemName]: res[item.itemName],
                [item.itemName.split('N')[0]]: res._id,
              });
            }}
          />
        }
        readOnly
      />
    ),
    select: (item) => (
      <Select placeholder={item.placeholderVal}>
        {item.optionData.map((item, index) => (
          <Option key={index} value={index}>
            {item}
          </Option>
        ))}
      </Select>
    ),

    date: (item) => (
      <DatePicker
        placeholder={item.placeholderVal}
        allowClear={false}
        style={{ width: '100%' }}
      />
    ),
    // upload: (item) => <Input placeholder={item.placeholderVal} />,
  };

  return (
    <Form layout={'vertical'} form={form} onFinish={_onFinish}>
      {formList.map((arr, index) => (
        <Row justify={'space-between'} key={index}>
          {arr.map((item, childIndex) => (
            <Col span={11} key={childIndex}>
              <Form.Item
                label={item.labelTxt}
                name={item?.itemName}
                style={{ ...item.style }}
                rules={staffRule[item.itemName]}
              >
                {formData[item.renderType](item)}
              </Form.Item>
            </Col>
          ))}
        </Row>
      ))}
      <Col span={24} style={{ textAlign: 'right' }}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            创建
          </Button>
        </Form.Item>
      </Col>
    </Form>
  );
};

export default AddForm;
