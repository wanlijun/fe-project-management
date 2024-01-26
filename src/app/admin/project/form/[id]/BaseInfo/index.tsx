import { Form, Input, Select } from 'antd';
import AddPlatform from './AddPlatform';
import AddEnvironment from './AddEnvironment';

const BaseInfo = () => {
  const options = [
    {
      label: 'h5',
      value: 'H5'
    },
    {
      label: '前台',
      value: 'PC'
    },
    {
      label: '后台',
      value: 'ADMIN'
    }
  ]
  const EVN_OPTIONS = [
    {
      label: '测试',
      value: 'test'
    },
    {
      label: '预发布',
      value: 'pre'
    },
    {
      label: '正式',
      value: 'prod'
    }
  ]
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
      <Form.Item
        label="平台"
        name="platform"
        rules={[{ required: true, message: '请选择平台' }]}
      >
        <div className='flex items-center'>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="请选择平台"
            options={options}
          />
          <div className='shrink-0 ml-3'>
            <AddPlatform>
              <a>添加</a>
            </AddPlatform>
          </div>
        </div>
      </Form.Item>
      <Form.Item
        label="环境"
        name="environment"
        rules={[{ required: true, message: '请选择环境' }]}
      >
        <div className='flex items-center'>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="请选择环境"
            options={EVN_OPTIONS}
          />
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