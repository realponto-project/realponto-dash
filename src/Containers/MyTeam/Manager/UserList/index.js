import React from 'react'
import { Table, Tag, Button } from 'antd'

const columns = chooseUser => ([
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (text) => (
      <Tag color={text ? '#65A300' : '#DF285F'}>
        {text ? 'Ativo' : 'Inativo' }
      </Tag>
    )
  },
  {
    title: 'Nome do usuário',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    fixed: 'left',
  },
  {
    title: 'Telefone',
    dataIndex: 'phone',
    key: 'phone',
    fixed: 'left',
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => (
      <Button
        type="link"
        onClick={() => chooseUser(record)}
      >
        Editar
      </Button>
    )
  },
])

const UserList = ({
  datasource,
  chooseUser,
}) => {
  return (
    <Table
      columns={columns(chooseUser)}
      dataSource={datasource}
    />
  )
}

export default UserList
