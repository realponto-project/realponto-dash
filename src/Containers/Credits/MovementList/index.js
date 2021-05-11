import React from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'Data',
    dataIndex: 'cratedAt'
  },
  {
    title: 'Usuário',
    dataIndex: 'userName'
  },
  {
    title: 'Tipo',
    dataIndex: 'type'
  },
  {
    title: 'Descrição',
    dataIndex: 'descripition'
  },
  {
    title: 'Crétidos',
    dataIndex: 'credits',
    render: (value) => (
      <label style={value > 0 ? { color: 'green' } : { color: 'red' }}>
        {`${value > 0 ? '+' : '-'} ${Math.abs(value)} ax`}
      </label>
    )
  }
]

const MovementList = ({ dataSource }) => {
  return <Table columns={columns} dataSource={dataSource} />
}

export default MovementList
