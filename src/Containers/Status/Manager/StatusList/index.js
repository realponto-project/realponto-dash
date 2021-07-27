import React from 'react'
import { Table, Tag, Button, Switch } from 'antd'
import { map } from 'ramda'

const columns = (chooseStatus, handleSubmitUpdate) => [
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (__, record) => (
      <Switch
        style={{
          width: '70px',
          backgroundColor: record.activated ? '#65A300' : 'rgba(0,0,0,.25)'
        }}
        checkedChildren="Ativo"
        unCheckedChildren="Inativo"
        defaultChecked={record.activated}
        disabled={record.label === 'Saldo inicial' || record.label === 'Venda'}
        onChange={(activated) =>
          handleSubmitUpdate({ ...record, activated, id: record.id })
        }
      />
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
    fixed: 'left'
  },
  {
    title: 'Cor ',
    dataIndex: 'typeLabel',
    key: 'typeLabel',
    fixed: 'left',
    render: (_, record) => <Tag color={record.color}>{record.color}</Tag>
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => (
      <Button
        type="link"
        onClick={() => chooseStatus(record)}
        disabled={!record.activated}>
        Editar
      </Button>
    )
  }
]

const StatustList = ({
  datasource,
  chooseStatus,
  loading,
  onChangeTable,
  total,
  page,
  handleSubmitUpdate
}) => {
  return (
    <Table
      pagination={{ total, current: page }}
      handleUpdateSubmit={handleSubmitUpdate}
      onChange={onChangeTable}
      columns={columns(chooseStatus, handleSubmitUpdate)}
      loading={loading}
      dataSource={map(
        (dataArray) => ({ ...dataArray, key: dataArray.id }),
        datasource || []
      )}
    />
  )
}

export default StatustList
