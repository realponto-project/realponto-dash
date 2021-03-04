import React from 'react'
import { Table } from 'antd'
import { cpf, cnpj } from 'cpf-cnpj-validator'

const columns = [
  {
    title: 'Nome do cliente',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'CPF/CNPJ',
    dataIndex: 'document',
    key: 'document',
    fixed: 'left',
    render: (text) => text.length > 11 ? cnpj.format(text) : cpf.format(text)
  },
  {
    title: 'Telefone',
    dataIndex: 'phone',
    key: 'phone',
    fixed: 'left',
  },
]

const CustomerList = ({
  datasource,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={datasource}
    />
  )
}

export default CustomerList
