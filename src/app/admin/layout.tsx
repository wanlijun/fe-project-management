"use client"
import { Suspense, useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Loading from './loading';
import { useRouter } from 'next/navigation';


type Items = NonNullable<MenuProps["items"]>[number]
const items: Items[] = [
  {
    label: '项目管理',
    key: 'project',
  },
  {
    label: '角色管理',
    key: 'role',
  },
  {
    label: '账号管理',
    key: 'user',
  }
] as const;
const paths: { [index: string]: string } = {
  project: '/admin/project/list',
  role: '/admin/role/list',
  user: '/admin/user/list',
}
const AdminLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { Sider, Header, Content } = Layout;
  const [current, setCurrent] = useState('project');
  const router = useRouter();
  const onClick: MenuProps['onClick'] = (item) => {
    console.log(item)
    setCurrent(item.key);
    router.push(paths[item.key])
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className='text-lg text-white py-3 pl-3'>项目信息录入系统</div>
        <Menu
          theme="dark"
          items={items}
          selectedKeys={[current]}
          onClick={(evt) => onClick(evt)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className='p-6 bg-white'
          >
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>

  )
}
export default AdminLayout;