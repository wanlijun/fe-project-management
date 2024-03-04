import { Form, Input, Select } from 'antd';
import AddPlatform from './AddPlatform';
import AddEnvironment from './AddEnvironment';
import React from 'react';

interface IBaseInfo {
  envs: any,
  platform: any
}
const BaseInfo: React.FC<IBaseInfo> = ({
  envs,
  platform
}) => {
  return (
    <>
      <Form.Item
        label="项目名称"
        name="name"
        rules={[{ required: true, message: '请输入项目名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="项目简称"
        name="shortName"
        rules={[{ required: true, message: '请输入项目名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="简介"
        name="brief"
        rules={[{ required: true, message: '请输入项目名称' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="平台" required>
        <div className='flex items-center'>
          <Form.Item
            noStyle
            name="platformIds"
            rules={[{ required: true, message: '请选择平台' }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="请选择平台"
              fieldNames={{
                value: 'id',
                label: 'name'
              }}
              options={platform}
            />
          </Form.Item>
          <div className='shrink-0 ml-3'>
            <AddPlatform>
              <a>添加</a>
            </AddPlatform>
          </div>
        </div>
      </Form.Item>
      <Form.Item label="环境" required>
        <div className='flex items-center'>
          <Form.Item
            noStyle
            name="environmentIds"
            rules={[{ required: true, message: '请选择环境' }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="请选择环境"
              fieldNames={{
                value: 'id',
                label: 'name'
              }}
              options={envs}
            />
          </Form.Item>
          <div className='shrink-0 ml-3'>
            <AddEnvironment>
              <a>添加</a>
            </AddEnvironment>
          </div>
        </div>
      </Form.Item>
    </>
  )
}
export default BaseInfo;