import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image, Switch } from 'antd'
import { map } from 'ramda'
import NoData from '../../../../Assets/noData.svg'

const columns = (chooseUser, handleSubmitUpdate) => [
  { 
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (__, record) => (
      <Switch 
        style={{width: '70px', backgroundColor: record.activated ? '#65A300' : 'rgba(0,0,0,.25)'}} 
        checkedChildren="Ativo" 
        unCheckedChildren="Inativo" 
        defaultChecked={record.activated}
        onChange={(activated) => handleSubmitUpdate({activated, id: record.id})}
      />
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
      <Button type="link" onClick={() => chooseUser(record)} disabled={!record.activated}>
        Editar
      </Button>
    )
  }
]

const UserList = ({ datasource, chooseUser, loading, onChangeTable, total, page, handleSubmitUpdate }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty
      description="Não há dados"
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ total, current: page }}
        onChange={onChangeTable}
        columns={columns(chooseUser, handleSubmitUpdate)} 
        loading={loading} 
        dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource)} />
    </ConfigProvider>
  )
}

export default UserList
