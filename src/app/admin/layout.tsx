"use client"
import { Suspense, useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Loading from './loading';
import { useRouter, usePathname  } from 'next/navigation';

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
const NoLayoutPath: (string | RegExp)[]  = [
  /^\/admin\/project\/form\/\d+$/,
  // '/admin/role/list'
]
const checkIfNeedLayout = (pathname: string) => {
  for(let i = 0; i< NoLayoutPath.length; i++) {
    const path = NoLayoutPath[i]
    if (path instanceof RegExp ) {
      console.log(pathname, path, '=====>')
      if (path.test(pathname)) {
        return false
      }
    } else {
      if (pathname === path) {
        return false
      }
    }
  }
  return true;
}
const AdminLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { Sider, Header, Content } = Layout;
  const [current, setCurrent] = useState('project');
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname, '=====');
  const onClick: MenuProps['onClick'] = (item) => {
    console.log(item)
    setCurrent(item.key);
    // router.push(paths[item.key])
  };
  const layoutCss = checkIfNeedLayout(pathname) ? 'p-6 bg-white' : ''
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
            className={layoutCss}
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