import React from 'react'
import { Table, Button } from 'antd'
import { cpf, cnpj } from 'cpf-cnpj-validator'

const columns = ({ handleClickEdit }) => [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'CPF/CNPJ',
    dataIndex: 'document',
    key: 'document',
    fixed: 'left',
    render: (text) => (text && text.length > 11 ? cnpj.format(text) : cpf.format(text))
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
    render: (id) =>  <Button type="link" onClick={() => handleClickEdit(id)}>
      Editar
    </Button>
  }
]

const CustomerList = ({ datasource, handleClickEdit }) => {
  return (
    <Table columns={columns({ handleClickEdit })} dataSource={datasource} />
  )
}

export default CustomerList
