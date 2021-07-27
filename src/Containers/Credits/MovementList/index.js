import React from 'react'
import { Table } from 'antd'
import moment from 'moment'

const columns = [
  {
    title: 'Data',
    dataIndex: 'createdAt',
    render: (value) => moment(value).format('DD/MM/YYYY, h:mm:ss')
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
    title: 'Crétidos',
    dataIndex: 'credits',
    render: (value) => (
      <label style={value > 0 ? { color: 'green' } : { color: 'red' }}>
        {`${value > 0 ? '+' : '-'} ${Math.abs(value)} ax`}
      </label>
    )
  }
]

const MovementList = ({ dataSource, total, current, handleChange }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      onChange={handleChange}
      pagination={{ total, current }}
    />
  )
}

export default MovementList
