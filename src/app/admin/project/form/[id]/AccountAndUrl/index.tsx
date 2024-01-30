"use client"

import React from 'react';
import { Form, FormInstance, Input } from 'antd';
import { getLabelByValue } from '@/utils/common';
import { EVN_OPTIONS, OPTIONS } from '../BaseInfo';
interface IAccountAndUrl {
  form: FormInstance
}
const AccountAndUrl: React.FC<IAccountAndUrl> = ({
  form
}) => {
  const environment = Form.useWatch('environment', form) || []
  const platform = Form.useWatch('platform', form) || []
  console.log(environment, platform)
  return (
    <div>
      {
        environment.map((env: string, idx: number) => {
          return (
            <Form.Item
              key={idx}
            >
              <div className='border-b border-slate-200'>
                <Form.Item name={['url', idx, 'env']} initialValue={env}>
                  <div className='font-bold'>
                    {getLabelByValue(EVN_OPTIONS, env)}
                  </div>
                </Form.Item>
                <div>
                  {
                    platform.map((plat: string, platIdx: number) => {
                      return (
                        <div key={platIdx} className='flex '>
                          <div className='w-16'>{getLabelByValue(OPTIONS, plat)}：</div>
                          <div className='grow'>
                            <Form.Item
                              label="访问地址"
                              name={['url', idx, 'platform', platIdx, 'url']}
                              rules={[{ required: true, message: '请输入访问' }]}
                              labelCol={{ span: 2 }}
                              wrapperCol={{ span: 18 }}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label="账号"
                              name={['url', idx, 'platform', platIdx, 'accounts']}
                              rules={[{ required: true, message: '请输入项目名称' }]}
                              labelCol={{ span: 2 }}
                              wrapperCol={{ span: 18 }}
                            >
                              <Input.TextArea />
                            </Form.Item>
                          </div>

                        </div>
                      )
                    })
                  }
                </div>
              </div>

            </Form.Item>

          )
        })
      }
    </div >
  )
}
export default AccountAndUrl;