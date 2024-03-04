"use client"

import { Button, Table, Modal } from 'antd';
import AddProject, { IBaseInfo } from '../AddProject'
import Link from 'next/link';
import { useAntdTable } from 'ahooks';
import { getProject } from '@/api/project';
import { useEffect } from 'react';

interface RecordType {
  id: number;
  platform: string;
  nameCol: number;
  platformFirst?: boolean;
  platformCol?: number;
  gitUlr?: string
}

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '简称',
    dataIndex: 'shortName',
    key: 'shortName',
  },
  {
    title: '访问地址/账号',
    dataIndex: 'platform',
    key: 'platform',
    render: (data: any) => {
      return <a>查看详情</a>
    }
  },
  {
    title: 'git地址',
    dataIndex: 'platform',
    key: 'platform',
    render: (data: any) => {
      if (!data) {
        return;
      }
      return data.map((item: any, idx: number) => {
        return (
          <div key={idx} className='mb-1'>
            <div>
              <a href={item.gitUlr}>{item.name}</a>
            </div>
          </div>
        )
      })

    }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (value: any, row: any) => {
      return <Link href={`/admin/project/form/${row.id}`}>完善信息</Link>
    }
  },
];
const List = () => {
  const { tableProps, refresh } = useAntdTable(getProject)
  useEffect(() => {
    console.log('=====?')
  }, [])
  return (
    <>
      <div className="text-right m-4">
        <AddProject refreshList={refresh}>
          <Button>添加</Button>
        </AddProject>
      </div>
      <Table
        rowKey="id"
        bordered
        columns={columns}
        {...tableProps}
      />
    </>
  );
}
export default List;