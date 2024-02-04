import React, { useState } from 'react';
import { Form, Radio, FormInstance, Input, Select, Space, Divider, Button, message } from 'antd';
import { OPTIONS, EVN_OPTIONS } from '../BaseInfo';
import { PlusCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getLabelByValue } from '@/utils/common';
import { DEPLOY_OPTIONS } from './helper';
interface IFrontEndInfo {
  form: FormInstance
}
const FrontEndInfo: React.FC<IFrontEndInfo> = ({
  form
}) => {
  const environment = Form.useWatch('environment', form) || []
  const gitUrlType = Form.useWatch('gitUrlType', form)
  const [name, setName] = useState('');
  const [options, setOptions] = useState(OPTIONS)
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
  return (
    <div>
      <Form.Item
        name="gitUrlType"
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
            name="gitUrls"
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
                <Form.Item name={['deploy', idx, 'env']} initialValue={env}>
                  <div className='font-bold'>
                    {getLabelByValue(EVN_OPTIONS, env)}

                  </div>
                </Form.Item>
                <Form.List
                  name={['deploy', idx, 'data']}
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
                              <Form.Item name={[field.name, 'url']}>
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