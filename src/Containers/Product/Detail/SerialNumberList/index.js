import React from 'react'
import { Button, Table, Tag } from 'antd'
import formattedDate from '../../../../utils/parserDate'
import EditSerial from '../../../../Containers/Product/Detail/Edit'

const columns = (openSerialEdit) => [
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (activated) => (
      <Tag color={activated ? '#65A300' : 'rgba(0,0,0,.25)'}>
        {activated ? 'Disponível' : 'Associado'}
      </Tag>
    )
  },
  {
    title: 'Número série',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
    fixed: 'left'
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
    render: (_, record) => (
      <Button
        disabled={!record.activated}
        onClick={() => openSerialEdit(record)}
        type="link">
        Editar
      </Button>
    )
  }
]
const OrderList = ({
  serialNumberData,
  onChangeTable,
  openSerialEdit,
  serialVisibleEdit,
  serialNumberSelected,
  onCancel,
  onOk,
  page,
  total,
  loading
}) => {
  return (
    <>
      <EditSerial
        visible={serialVisibleEdit}
        serialNumber={serialNumberSelected}
        onCancel={onCancel}
        onOk={onOk}
      />
      <Table
        loading={loading}
        columns={columns(openSerialEdit)}
        dataSource={serialNumberData}
        pagination={{ total, current: page }}
        serialNumberData={serialNumberData}
        onChange={onChangeTable}
      />
    </>
  )
}

export default OrderList
