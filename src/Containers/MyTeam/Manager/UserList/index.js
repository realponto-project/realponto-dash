import React from 'react'
import { Table, Tag, Button, Empty, ConfigProvider, Image } from 'antd'
import { map } from 'ramda'
import NoData from '../../../../Assets/noData.svg'

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

const UserList = ({ datasource, chooseUser, loading, onChangeTable, total, page }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty
      description="Não há dados"
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      {console.log('total', total)}
      <Table 
        pagination={{ total, current: page }}
        onChange={onChangeTable}
        columns={columns(chooseUser)} 
        loading={loading} 
        dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource)} />
    </ConfigProvider>
  )
}

export default UserList
