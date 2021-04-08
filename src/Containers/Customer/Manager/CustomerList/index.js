import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image } from 'antd'
import { cpf, cnpj } from 'cpf-cnpj-validator'
import {map} from 'ramda'
import NoData from '../../../../Assets/noData.svg'

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
    <ConfigProvider renderEmpty={() => <Empty 
      description="Não há dados" 
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table columns={columns({ handleClickEdit })} dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource)} />
    </ConfigProvider>
  )
}

export default CustomerList
