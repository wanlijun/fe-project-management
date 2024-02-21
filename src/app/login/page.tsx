"use client"

import { Form, Button, Input } from 'antd';
import { useState } from 'react';
import { fetcher } from '@/api/fetcher'
import { useRouter } from 'next/navigation'
interface IFormValue {
  username: string,
  password: string
}
const Login = () => {
  const router = useRouter()
  const [fetchData, setFetchData] = useState(false); // 创建一个状态用来控制是否需要请求数据
  const onLogin = async (value: IFormValue) => {
    try {
      const data = await fetcher('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(value)
      })
      localStorage.setItem('token', data.access_token)
      console.log(data, '=====????');
      router.push('/admin/project/list')
    } catch (error) {
      console.log(error, '=====')
    }
  }
  return (
    <div className='w-1/4 mt-96 mx-auto border border-slate-100 p-8 shadow-sm text-center'>
      <div className='mb-5 text-xl font-bold'>项目信息录入系统</div>
      <Form
        size='large'
        onFinish={onLogin}
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[
            {
              required: true, message: '请输入账号'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true, message: '请输入密码'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Button className='w-full mt-4' type='primary' htmlType="submit">登录</Button>
      </Form>
    </div>
  )
}
export default Login;