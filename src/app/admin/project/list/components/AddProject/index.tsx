"use client"
import React from 'react';
import { Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { postProject } from '@/api/project'
interface IAddProject {
  children: React.ReactNode,
  refreshList?: () => void;
}
export interface IBaseInfo {
  name: string;
  shortName: string;
  brief: string;
}
const AddProject: React.FC<IAddProject> = ({
  children,
  refreshList
}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        postProject(values)
          .then(() => {
            setVisible(false)
            // refreshList()
          })
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
        title="项目基本信息"
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
          <Form.Item<IBaseInfo>
            label="项目名称"
            name="name"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IBaseInfo>
            label="项目简称"
            name="shortName"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IBaseInfo>
            label="简介"
            name="brief"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default React.memo(AddProject);