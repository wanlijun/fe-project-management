"use client"

import Link from 'next/link';
import { Suspense, useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Loading from './loading';


type Items = NonNullable<MenuProps["items"]>[number] & {
  path?: string
}
const items: Items[] = [
  {
    label: '项目管理',
    key: 'project',
    path: '/admin/project/list',
  },
  {
    label: '角色管理',
    key: 'role',
    path: '/admin/role/list',
  },
  {
    label: '账号管理',
    key: 'user',
    path: '/admin/user/list',
  }
]
const AdminLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { Sider, Header, Content } = Layout;
  const [current, setCurrent] = useState('project');
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className='text-lg text-white py-3 pl-3'>项目信息录入系统</div>
        <Menu
          theme="dark"
          items={items}
          selectedKeys={[current]}
          onClick={onClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}/>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
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