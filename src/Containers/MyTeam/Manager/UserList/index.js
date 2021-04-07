import React from 'react'
import { Table, Tag, Button } from 'antd'
import { map } from 'ramda'

const columns = (chooseUser) => [
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (text) => (
      <Tag color={text ? '#65A300' : '#DF285F'}>
        {text ? 'Ativo' : 'Inativo'}
      </Tag>
    )
  },
  {
    title: 'Usuário',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    fixed: 'left'
  },
  {
    title: 'Documento',
    dataIndex: 'document',
    key: 'document',
    fixed: 'left',
    render: (text) => (text.replace(/([^x|X|\d])/g,'')
    .replace(/(\d{2})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\w)/,'$1-$2')
    .replace(/(-\w{1})\d+?$/,'$1'))
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => (
      <Button type="link" onClick={() => chooseUser(record)}>
        Editar
      </Button>
    )
  }
]

const UserList = ({ datasource, chooseUser }) => {
  return <Table columns={columns(chooseUser)} dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource)} />
}

export default UserList
