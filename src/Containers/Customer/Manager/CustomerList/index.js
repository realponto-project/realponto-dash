import React from 'react'
import { Table } from 'antd'
import { cpf, cnpj } from 'cpf-cnpj-validator'
import { EditOutlined } from '@ant-design/icons'

const columns = ({ handleClickEdit }) => [
  {
    title: 'Nome do cliente',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'CPF/CNPJ',
    dataIndex: 'document',
    key: 'document',
    fixed: 'left',
    render: (text) => (text.length > 11 ? cnpj.format(text) : cpf.format(text))
  },
  {
    title: 'Telefone',
    dataIndex: 'phone',
    key: 'phone',
    fixed: 'left'
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (id) => <EditOutlined onClick={() => handleClickEdit(id)} />
  }
]

const CustomerList = ({ datasource, handleClickEdit }) => {
  return (
    <Table columns={columns({ handleClickEdit })} dataSource={datasource} />
  )
}

export default CustomerList
