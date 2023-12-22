"use client"

import { Table } from 'antd';

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
    onCell: (record: RecordType) => ({
      rowSpan: record.id === 0 ? record.nameCol : 0,
    }),
  },
  {
    title: '平台',
    dataIndex: 'platform',
    key: 'platform',
    render: (val: string, record: RecordType) => {
      return (
        <div>
          {val}
          <div>
            <a href={record.gitUlr}>git地址</a>
          </div>
        </div>
      )
    },
    onCell: (record: RecordType) => ({
      rowSpan: record.platformFirst ? record.platformCol : 0,
    }),
  },
  {
    title: '环境',
    dataIndex: 'environment',
    key: 'environment',
  },
  {
    title: '访问地址',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
];
const dataSource = [
  {
    id: 0,
    name: '两江统战',
    nameCol: 5,
    platform: 'pc',
    platformFirst: true,
    platformCol: 3,
    environment: '测试',
    url: 'http://baiduc.com',
    account: '1311111111/1qaz2wsx',
    gitUlr: 'http://sc-git'
  },
  {
    id: 1,
    name: '两江统战',
    nameCol: 5,
    platform: 'pc',
    environment: '试运行',
    url: 'http://baiduc.com',
    account: '1311111111/1qaz2wsx'
  },
  {
    id: 2,
    name: '两江统战',
    nameCol: 5,
    platform: 'pc',
    environment: '正式',
    url: 'http://baiduc.com',
    account: '1311111111/1qaz2wsx'
  },
  {
    id: 3,
    name: '两江统战',
    nameCol: 5,
    platform: '前台',
    platformFirst: true,
    platformCol: 1,
  },
  {
    id: 4,
    name: '两江统战',
    nameCol: 5,
    platform: '大屏',
    platformFirst: true,
    platformCol: 1,
  },
];
const List = () => {
  return <Table bordered dataSource={dataSource} columns={columns} />;
}
export default List;