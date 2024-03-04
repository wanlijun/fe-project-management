"use client"

import React, { useEffect, useState } from 'react';
import { Form, FormInstance, Input } from 'antd';
import { getLabelByValue } from '@/utils/common';
import type { IAccounts } from '../index';
interface IAccountAndUrl {
  form: FormInstance,
  envs: any,
  platform: any
}
type IAccountsOptions = Omit<IAccounts, 'url'|'account'> & {
  url?: string;
  account?: string
}
const AccountAndUrl: React.FC<IAccountAndUrl> = ({
  envs,
  platform: platformOptions,
  form
}) => {
  const environment = Form.useWatch('environmentIds', form)
  const platform = Form.useWatch('platformIds', form)
  const [accounts, setAccounts] = useState<IAccountsOptions[]>([]);
  useEffect(() => {
    const output: IAccountsOptions[] = []
    const environmentList = environment || [];
    const platformList = platform || [];
    environmentList.forEach((environmentId: number) => {
      platformList.forEach((platformId: number) => {
        output.push({
          environmentId: environmentId,
          platformId: platformId
        })
      })
    });
    setAccounts(output)
  }, [environment, platform ])
  return (
    <div>
      {
        accounts.map((account, idx: number) => {
          return (
            <Form.Item
              key={idx}
            >
              <div className='border-b border-slate-200'>
                <div className='flex'>
                  <Form.Item name={['account', idx, 'environmentId']} initialValue={account.environmentId}>
                    <div className='font-bold'>
                      {getLabelByValue(envs, account.environmentId, 'id', 'name')}
                    </div>
                  </Form.Item>
                  <span>-</span>
                  <Form.Item name={['account', idx, 'platformId']} initialValue={account.platformId}>
                    <div className='w-16'>{getLabelByValue(platformOptions, account.platformId, 'id', 'name')}：</div>
                  </Form.Item>
                </div>
                <Form.Item
                  label="访问地址"
                  name={['account', idx, 'url']}
                  rules={[{ required: true, message: '请输入访问' }]}
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 18 }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="账号"
                  name={['account', idx,'account']}
                  rules={[{ required: true, message: '请输入项目名称' }]}
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 18 }}
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
            </Form.Item>

          )
        })
      }
      <Form.Item label="备注">
        <Input.TextArea></Input.TextArea>
      </Form.Item>
    </div >
  )
}
export default AccountAndUrl;