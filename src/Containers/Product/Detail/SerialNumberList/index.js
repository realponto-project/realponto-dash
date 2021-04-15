import React from 'react'
import { Button, Table, Tag, Empty, ConfigProvider, Image } from 'antd'
import formattedDate from '../../../../utils/parserDate'
import NoData from '../../../../Assets/noData.svg'

const columns = [
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (activated) => (
      <Tag color={activated ? '#65A300' : 'rgba(0,0,0,.25)'}>{activated? 'Disponível' : 'Associado' }</Tag>
    )
  },
  {
    title: 'Número Série',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
    fixed: 'left',
  },
  {
    title: 'Criado em',
    dataIndex: 'createdAt',
    key: 'createdAt',
    fixed: 'left',
    render: (text) => formattedDate(text, 'DD/MM/YY - HH:mm')
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => <Button disabled={!record.activated} onClick={() => console.log(record.id)} type="link">Editar</Button>
  },
]

const datasource = [
  { id: 1, serialNumber: '372198769831', createdAt: '11/03/21 - 14:21', activated: true },
  { id: 2, serialNumber: '372198769831', createdAt: '11/03/21 - 14:21', activated: false },
  { id: 3, serialNumber: '372198769831', createdAt: '11/03/21 - 14:21', activated: false },
  { id: 4, serialNumber: '372198769831', createdAt: '11/03/21 - 14:21', activated: true },
  { id: 5, serialNumber: '372198769831', createdAt: '11/03/21 - 14:21', activated: false },
]

const OrderList = () => {
  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          description="Não há dados"
          image={<Image width={85} src={NoData} preview={false} />}
        />
      )}>
      <Table
        columns={columns}
        dataSource={datasource}
        pagination={{ total: 25, current: 1 }}
      />
    </ConfigProvider>
  )
}

export default OrderList
