"use client"
import { Form, Input, Select } from 'antd';
import BaseInfo from './BaseInfo';

const EditProject = () => {
  return (
    <Form
      className='w-10/12'
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 18 }}
    >
      <div>
        <div className="text-base font-bold mb-4">基础信息</div>
        <BaseInfo />
      </div>
      <div>
        <div className="text-base font-bold mb-4">账号和访问地址</div>
        
      </div>
    </Form>
  )
}
export default EditProject;