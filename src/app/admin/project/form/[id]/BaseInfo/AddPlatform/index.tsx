"use client"
import React from 'react';
import { Form, Input, Modal } from 'antd';
import { useState } from 'react';
interface IAddProject {
  children: React.ReactNode,
}
const AddPlatform: React.FC<IAddProject> = ({
  children,
}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        console.log('--- create value', values)
        setVisible(false)
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
    return false;
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const openModal = () => {
    setVisible(true)
  }
  return (
    <>
      <div onClick={openModal}>
        {children}
      </div>
      <Modal
        title="添加平台"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          className='pt-5'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          form={form}
        >
          <Form.Item
            label="平台名称"
            name="name"
            rules={[{ required: true, message: '请输入平台名称' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default React.memo(AddPlatform);