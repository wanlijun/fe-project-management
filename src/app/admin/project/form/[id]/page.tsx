"use client"
import { Form, Button } from 'antd';
import  Box from '@/components/Box';
import BaseInfo from './BaseInfo';
import AccountAndUrl from './AccountAndUrl';
import FrontEndInfo from './FrontEndInfo';


const EditProject = () => {
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  }
  const onError = (error: any) => {
    console.log('Received values of form: ', error);
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onError}
      className='w-10/12'
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 18 }}
    >
      <Box title='基础信息'>
        <BaseInfo />
      </Box>
      <Box title='账号和访问地址'>
        <AccountAndUrl form={form} />
      </Box>
      <Box title='前端'>
        <FrontEndInfo form={form} />
      </Box>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}
export default EditProject;