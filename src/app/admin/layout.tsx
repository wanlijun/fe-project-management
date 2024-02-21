"use client"
import useSWR from 'swr';
import { Suspense, useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { fetcher } from '@/api/fetcher';
import Loading from './loading';


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
const NoLayoutPath: (string | RegExp)[] = [
  /^\/admin\/project\/form\/\d+$/,
  // '/admin/role/list'
]
const checkIfNeedLayout = (pathname: string) => {
  for (let i = 0; i < NoLayoutPath.length; i++) {
    const path = NoLayoutPath[i]
    if (path instanceof RegExp) {
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

  const [current, setCurrent] = useState('project');
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSWR('/api/user/info');

  const { Sider, Header, Content } = Layout;

  const onClick: MenuProps['onClick'] = (item) => {
    console.log(item)
    setCurrent(item.key);
    // router.push(paths[item.key])
  };
  // logout
  const [logoutLoading, setLogoutLoading] = useState(false);
  const logout = async () => {
    setLogoutLoading(true)
    try {
      await fetcher('/api/auth/logout', {
        method: 'delete'
      })
    } catch (error) {
      console.log(error)
    }
    router.push('/login')
    setLogoutLoading(false)
  }
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
        <Header style={{ background: '#fff' }} >
          <div className='flex justify-end'>
            <div className='text-right pl-4 mr-4'>{data?.username}</div>
            <div><Button type='link' onClick={() => logout()} loading={logoutLoading}>退出</Button></div>
          </div>
        </Header>
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