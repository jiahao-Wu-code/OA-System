import React from 'react';
import { Form, Input, Row, Col, message, Select, DatePicker } from 'antd';
import formList from 'staticList/staffList';
import DropPopover from 'components/DropPopover';
import moment from 'moment';
import { staffRule } from 'utils/rules';
import $http from 'api';
import { useDispatch } from 'umi';
const { Option } = Select;

const DetailForm = ({ staffDetail, _initStaffList }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // 提交表单前的验证
  const beforeChecked = async (item) => {
    const newVal = form.getFieldValue([item.itemName]);
    const oldVal = staffDetail[item.itemName];
    // console.log(oldData, newData);
    try {
      // 判断新旧值是否相同
      if (newVal === oldVal) return;
      if (item.itemName === 'accountName' || item.itemName === 'mobile') {
        const checkData = await form.validateFields([item.itemName]);
        // console.log(data)
        const { data, msg } = await $http.checkIsExists({ checkData });
        // console.log(data, msg)
        if (data) {
          form.setFieldValue({ [item.itemName]: staffDetail[item.itemName] });
          return message.error(msg);
        }
      }
      _updateStaff(item.itemName, newVal);
    } catch (error) {
      form.setFieldValue([item.itemName], staffDetail[item.itemName]);
    }
  };

  // 修改表单项
  const _updateStaff = async (type, updateVal) => {
    // console.log(type, updateVal)
    const { code, msg } = await $http.updateStaff({
      _id: staffDetail._id,
      type,
      updateVal,
    });
    if (code) return;
    _initStaffList();
    dispatch({
      type: 'staff/_getStaffDetail',
      payload: { _id: staffDetail._id },
    });
    message.success(msg);
  };

  const formData = {
    input: (item) => (
      <Input
        placeholder={
          item.itemName === 'password'
            ? '请在登录界面完成修改'
            : item.placeholderVal
        }
        disabled={item.itemName === 'password'}
        onBlur={() => beforeChecked(item)}
      />
    ),
    popover: (item) => (
      <Input
        placeholder={item.placeholderVal}
        addonAfter={<DropPopover />}
        readOnly
      />
    ),
    select: (item) => (
      <Select
        placeholder={item.placeholderVal}
        onChange={() => beforeChecked(item)}
      >
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
        onChange={() => beforeChecked(item)}
        style={{ width: '100%' }}
      />
    ),
    upload: (item) => <Input placeholder={item.placeholderVal} />,
  };

  return (
    <Form
      layout={'vertical'}
      form={form}
      initialValues={{
        ...staffDetail,
        onboardingTime: moment(staffDetail.onboardingTime),
      }}
    >
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
    </Form>
  );
};

export default DetailForm;
