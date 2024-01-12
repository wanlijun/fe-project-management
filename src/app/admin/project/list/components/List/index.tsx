"use client"

import { Button, Table, Modal } from 'antd';
import AddProject from '../AddProject';

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
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '访问地址/账号',
    dataIndex: 'platform',
    key: 'platform',
    render: (data: any) => {
      return <a>查看详情</a>
      // return data.map((item: any, idx: number) => {
      //   return (
      //     <div key={idx} className='mb-2'>
      //       <div className='font-bold'>{item.name}</div>
      //       {
      //         item.environment.map((env: any, envIdx: number) => {
      //           return (
      //             <div key={envIdx}>
      //               <div> <a href={env.url}>{env.name}</a>:</div>
      //               <div className='mb-2'>
      //                 {
      //                   env.account.map((item: string, idx: number) => {
      //                     return <div key={idx}>{item}</div>
      //                   })
      //                 }

      //               </div>
      //             </div>
      //           )
      //         })
      //       }
      //     </div>
      //   )
      // })

    }
  },
  {
    title: 'git地址',
    dataIndex: 'platform',
    key: 'platform',
    render: (data: any) => {
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
  },
];
const dataSource = [
  {
    id: 0,
    name: '两江统战',
    nameCol: 5,
    platform: [
      {
        name: 'pc',
        gitUlr: 'http://sc-git',
        environment: [
          {
            name: '测试环境',
            url: 'http://baiduc.com',
            account: ['1311111111/1qaz2wsx', '1311111111/1qaz2wsx']
          },
          {
            name: '试运行',
            url: 'http://baiduc.com',
            account: ['1311111111/1qaz2wsx']
          },
          {
            name: '正式',
            url: 'http://baiduc.com',
            account: ['1311111111/1qaz2wsx']
          },
        ]
      },
      {
        name: '大屏',
        gitUlr: 'http://sc-git',
        environment: [
          {
            name: '测试环境',
            url: 'http://baiduc.com',
            account: ['1311111111/1qaz2wsx']
          },
          {
            name: '试运行',
            url: 'http://baiduc.com',
            account: ['1311111111/1qaz2wsx']
          },
          {
            name: '正式',
            url: 'http://baiduc.com',
            account: ['1311111111/1qaz2wsx']
          },
        ]
      },
      {
        name: '后台',
        gitUlr: 'http://sc-git',
        environment: [
          {
            name: '测试环境',
            url: 'http://baiduc.com',
            account: ['1311111111/1qaz2wsx']
          },
          {
            name: '试运行',
            url: 'http://baiduc.com',
            account: ['1311111111/1qaz2wsx']
          },
          {
            name: '正式',
            url: 'http://baiduc.com',
            account: ['1311111111/1qaz2wsx']
          },
        ]
      },
    ]

  },
];
const List = () => {

  return (
    <>
      <div className="text-right m-4">
        <AddProject>
          <Button>添加</Button>
        </AddProject>
      </div>

      <Table bordered dataSource={dataSource} columns={columns} />
    </>
  );
}
export default List;