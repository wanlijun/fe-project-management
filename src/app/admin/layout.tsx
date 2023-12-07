import Link from 'next/link';
const AdminLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <section>
      <Link href="/admin/role/list">角色管理</Link>
      <Link href="/admin/user/list">用户管理</Link>
      <div>{children}</div>
    </section>
  )
}
export default AdminLayout;