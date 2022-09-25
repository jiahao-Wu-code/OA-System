import React, { useState } from 'react';
import { Button, Row, Input, Form, Col, message } from 'antd';
import './css/login.less';
import SmCodeLogin from './component/SmCodeLogin';
import UpdatePassword from './component/UpdatePassword';
import $http from 'api';

const FormItem = Form.Item;

const forgetPassword = ({ history }) => {
  const [currentStep, setCurrentStep] = useState(1); // 当前组件显示标识

  // 提交按钮处理
  const submitSelect = async (data) => {
    // console.log("data",data)
    currentStep === 1
      ? _checkCode(data.code)
      : _updatePassword(data.confirmPassword);
  };

  // 检测用户验证码
  const _checkCode = async (smCode) => {
    const { data, msg } = await $http.checkedCode({ smCode });
    // console.log("first,data",data)
    if (data) {
      setCurrentStep(2);
    } else {
      message.error(msg);
    }
  };

  // 用户修改密码
  const _updatePassword = async (newPassword) => {
    // console.log("newPassword", newPassword)
    const { data, msg } = await $http.resetPassword({ newPassword });
    console.log('data', data, msg);
    if (data) {
      message.success(msg);
      history.replace('/users/login');
    } else {
      message.error(msg);
    }
  };

  const componentSelector = (props) =>
    currentStep === 1 ? (
      <SmCodeLogin {...props} />
    ) : (
      <UpdatePassword {...props} />
    );
  const [form] = Form.useForm();

  return (
    <div className="form forget-password">
      <div className="forget-password-title">
        {currentStep === 1 ? '忘记密码' : '重置密码'}
      </div>
      <Form form={form} onFinish={submitSelect}>
        {componentSelector({ FormItem, Input, form })}
        <Row>
          <Button type="primary" htmlType="submit">
            {currentStep === 1 ? '下一步' : '重置'}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default forgetPassword;
