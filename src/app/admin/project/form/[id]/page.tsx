"use client"
import { Form, Button, message } from 'antd';
import { useRequest } from 'ahooks';
import { useParams, useRouter } from  'next/navigation'
import  Box from '@/components/Box';
import { getProjectById, getEnvs, getPlatform, completeProjectById } from '@/api/project'
import { IProjectInfo } from './index';
import BaseInfo from './BaseInfo';
import AccountAndUrl from './AccountAndUrl';
import FrontEndInfo from './FrontEndInfo';


const handleParams = (data: IProjectInfo) => {
  const { account, ...remain } = data;
  const accountRes = account.map((item) => {
    const { account, ...remain } = item;
    return {
      account: account && typeof account === 'string' ? account.split(';') : account,
      ...remain
    }
  })
  return {
    account: accountRes,
    ...remain
  }
}

const EditProject = () => {
  const [form] = Form.useForm()
  const params  = useParams();
  const router = useRouter();
  const { loading, run } = useRequest((formValue) => {
    const id = params.id;
    return completeProjectById(Number(id), handleParams(formValue))
  },{
    manual: true,
    onSuccess: () => {
      message.success('保存成功');
      router.back();
    }
  })
  const onFinish = () => {
    const result = handleParams(form.getFieldsValue(true))
    run(result)
  }
  const onError = (error: any) => {
    console.log('Received values of form: ', error);
  }
  useRequest(() => {
    const id = params.id;
    return getProjectById(Number(id))
  }, {
    onSuccess: (data) => {
      // 处理账号信息
      form.setFieldsValue(data)
    }
  })
  const {data: envs } = useRequest(getEnvs);
  const {data: platform } = useRequest(getPlatform)

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
        <BaseInfo envs={envs} platform={platform}  />
      </Box>
      <Box title='账号和访问地址'>
        <AccountAndUrl form={form} envs={envs} platform={platform} />
      </Box>
      <Box title='前端'>
        <FrontEndInfo form={form} envs={envs} platform={platform} />
      </Box>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit" loading={loading}>
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}
export default EditProject;