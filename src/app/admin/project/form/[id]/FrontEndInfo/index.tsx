import React, { useEffect, useState } from 'react';
import { Form, Radio, FormInstance, Input, Select, Space, Divider, Button, message } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { extractName, getLabelByValue } from '@/utils/common';
import { DEPLOY_OPTIONS } from './helper';
interface IFrontEndInfo {
  form: FormInstance,
  envs: any,
  platform: any,
}
interface IOption {
  label: string;
  value: string;
}
const FrontEndInfo: React.FC<IFrontEndInfo> = ({
  form,
  envs,
  platform: platformList
}) => {
  const environment = Form.useWatch('environmentIds', form) || []
  const platform = Form.useWatch('platformIds', form)
  const gitUrlType = Form.useWatch(['frontEndInfo', 'gitUrlType'], form)
  console.log(gitUrlType, '======>gitUrlType')
  const [name, setName] = useState('');
  const [options, setOptions] = useState<IOption[]>([])
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!name) {
      message.error('请输入项目名称')
      return;
    }
    e.preventDefault();
    setOptions([...options, { label: name, value: name }]);
    setName('');
  };
  useEffect(()=> {
    setOptions((value) => {
      const valueNames = value.map((item) => item.value)
      const names = extractName(platform, platformList, 'id', 'name');
      return Array.from(new Set([...valueNames, ...names]))
        .map((val) => ({value: val, label: val}))
    })
  }, [platformList, platform])
  return (
    <div>
      <Form.Item
        name={['frontEndInfo', 'gitUrlType']}
        label="git地址类型"
        initialValue="DETAIL"
      >
        <Radio.Group>
          <Radio value='GROUP'>分组地址</Radio>
          <Radio value='DETAIL'>详细地址</Radio>
        </Radio.Group>
      </Form.Item>
      {
        gitUrlType === 'GROUP' &&
        <Form.Item
          name="groupUrl"
          label="分组地址"
        >
          <Input />
        </Form.Item>
      }
      {
        gitUrlType === 'DETAIL' &&
        <Form.Item label="git地址">
          <Form.List
            name={['frontEndInfo', 'gitUrls']}
            initialValue={[{}]}
          >
            {(fields, { add, remove }) => (
              <div>
                {
                  fields.map((field, idx) => {
                    return (
                      <Space key={idx} >
                        <Form.Item name={[field.name, 'name']}>
                          <Select
                            options={options}
                            placeholder="请选择项目名字"
                            style={{ width: 200 }}
                            dropdownRender={(menu) => (
                              <>
                                {menu}
                                <Divider style={{ margin: '8px 0' }} />
                                <Space style={{ padding: '0 8px 4px' }}>
                                  <Input
                                    placeholder="项目名称"
                                    value={name}
                                    onChange={onNameChange}
                                    onKeyDown={(e) => e.stopPropagation()}
                                  />
                                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                    添加
                                  </Button>
                                </Space>
                              </>
                            )}
                          />
                        </Form.Item>
                        <Form.Item name={[field.name, 'url']}>
                          <Input placeholder="请填写git地址" style={{ width: 280 }} />
                        </Form.Item>
                        {
                          idx === fields.length - 1 &&
                          <PlusCircleOutlined
                            className='text-xl cursor-pointer mb-7'
                            style={{ color: '#1677ff' }}
                            onClick={() => add()}
                          />
                        }

                        {
                          fields.length > 1 &&
                          <MinusCircleOutlined
                            className='text-xl cursor-pointer mb-7'
                            style={{ color: '#1677ff' }}
                            onClick={() => remove(idx)}
                          />
                        }
                      </Space>

                    )
                  })
                }
              </div>
            )}
          </Form.List>
        </Form.Item>

      }
      <Form.Item label="部署方式">
        {
          environment.map((env: string, idx: number) => {
            return (
              <div key={idx}>
                <Form.Item name={['frontEndInfo','deploy', idx, 'environment']} initialValue={env}>
                  <div className='font-bold'>
                    {getLabelByValue(envs, env, 'id', 'name')}

                  </div>
                </Form.Item>
                <Form.List
                  name={['frontEndInfo', 'deploy', idx, 'data']}
                  initialValue={[{}]}
                >
                  {(fields, { add, remove }) => (
                    <div>
                      {
                        fields.map((field, idx) => {
                          return (
                            <Space key={idx} >
                              <Form.Item name={[field.name, 'name']}>
                                <Select
                                  options={options}
                                  placeholder="请选择部署平台"
                                  style={{ width: 200 }}
                                  dropdownRender={(menu) => (
                                    <>
                                      {menu}
                                      <Divider style={{ margin: '8px 0' }} />
                                      <Space style={{ padding: '0 8px 4px' }}>
                                        <Input
                                          placeholder="项目名称"
                                          value={name}
                                          onChange={onNameChange}
                                          onKeyDown={(e) => e.stopPropagation()}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                          添加
                                        </Button>
                                      </Space>
                                    </>
                                  )}
                                />
                              </Form.Item>
                              <Form.Item name={[field.name, 'method']}>
                                <Select
                                  options={DEPLOY_OPTIONS}
                                  placeholder="请选择部署方式"
                                  style={{ width: 200 }}
                                  dropdownRender={(menu) => (
                                    <>
                                      {menu}
                                      <Divider style={{ margin: '8px 0' }} />
                                      <Space style={{ padding: '0 8px 4px' }}>
                                        <Input
                                          placeholder="部署方式"
                                          value={name}
                                          onChange={onNameChange}
                                          onKeyDown={(e) => e.stopPropagation()}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                          添加
                                        </Button>
                                      </Space>
                                    </>
                                  )}
                                />
                              </Form.Item>
                              <Form.Item name={[field.name, 'note']}>
                                <Input placeholder="请填写备注" style={{ width: 280 }} />
                              </Form.Item>
                              {
                                idx === fields.length - 1 &&
                                <PlusCircleOutlined
                                  className='text-xl cursor-pointer mb-7'
                                  style={{ color: '#1677ff' }}
                                  onClick={() => add()}
                                />
                              }

                              {
                                fields.length > 1 &&
                                <MinusCircleOutlined
                                  className='text-xl cursor-pointer mb-7'
                                  style={{ color: '#1677ff' }}
                                  onClick={() => remove(idx)}
                                />
                              }
                            </Space>

                          )
                        })
                      }
                    </div>
                  )}
                </Form.List>
              </div>
            )
          })
        }
      </Form.Item>
    </div>
  )
}
export default FrontEndInfo;