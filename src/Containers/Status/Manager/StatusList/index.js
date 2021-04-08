import React from 'react'
import { Table, Tag, Button, Empty, ConfigProvider, Image } from 'antd'
import { map } from 'ramda'
import NoData from '../../../../Assets/noData.svg'

const columns = (chooseStatus) => [
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
    title: 'Descrição',
    dataIndex: 'label',
    key: 'label',
    fixed: 'left'
  },
  {
    title: 'Tipo',
    dataIndex: 'typeLabel',
    key: 'typeLabel',
    fixed: 'left',
  },
  {
    title: 'Cor ',
    dataIndex: 'typeLabel',
    key: 'typeLabel',
    fixed: 'left',
    render: (_, record) => (
      <Tag color={record.color}>
        {record.color}
      </Tag>
    )
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => (
      <Button type="link" onClick={() => chooseStatus(record)}>
        Editar
      </Button>
    )
  }
]

const StatustList = ({ datasource, chooseStatus }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
      description="Não há dados" 
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table columns={columns(chooseStatus)} dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource || [])} />
    </ConfigProvider>
  ) 
}

export default StatustList
