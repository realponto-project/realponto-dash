import React from 'react'
import { Button, Table, Tag, Empty, ConfigProvider, Image } from 'antd'
import formattedDate from '../../../../utils/parserDate'
import NoData from '../../../../Assets/noData.svg'

const columns = (goToOrderDetail) => [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
    render: (_, record) => (
      <Tag color={record.status.color}>{record.status.label}</Tag>
    )
  },
  {
    title: 'Tipo de ordem',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    render: (_, record) => record.status.typeLabel
  },
  {
    title: 'Data da ordem',
    dataIndex: 'createdAt',
    key: 'createdAt',
    fixed: 'left',
    render: (text) => formattedDate(text, 'DD/MM/YY - HH:mm')
  },
  {
    title: 'Funcionário',
    dataIndex: 'user.name',
    key: 'user.name',
    fixed: 'left',
    render: (_, record) => record.user && record.user.name
  },
  {
    title: 'Revisar?',
    dataIndex: 'pendingReview',
    fixed: 'left',
    render: (text) => (text ? 'Sim' : 'Não')
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'right',
    render: (_, record) => (
      <Button onClick={() => goToOrderDetail(record.id)}>Ver detalhes</Button>
    )
  }
]

const OrderList = ({ datasource, goToOrderDetail, onChangeTable, total, loading, page }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty
      description="Não há dados"
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table
        loading={loading}
        columns={columns(goToOrderDetail)}
        dataSource={datasource}
        pagination={{ total, current: page }}
        onChange={onChangeTable}
      />
    </ConfigProvider>
  )
}

export default OrderList
