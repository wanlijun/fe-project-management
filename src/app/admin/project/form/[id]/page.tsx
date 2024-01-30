"use client"
import { Form, Button } from 'antd';
import BaseInfo from './BaseInfo';
import AccountAndUrl from './AccountAndUrl';

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
      <div>
        <div className="text-base font-bold mb-4">基础信息</div>
        <BaseInfo />
      </div>
      <div>
        <div className="text-base font-bold mb-4">账号和访问地址</div>
        <AccountAndUrl form={form} />
      </div>
      <div>
        <div className="text-base font-bold mb-4">前端</div>
      </div>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}
export default EditProject;