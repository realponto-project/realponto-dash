import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image, Typography } from 'antd'
import {map} from 'ramda'
import NoData from '../../../../Assets/noData.svg'
import { parseValuePTbr } from '../../../../utils/Masks/myInfoMasks'

const { Title, Text } = Typography

const columns = ({ handleClickEdit }) => [
  {
    title: 'Descrição',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Valor do link',
    dataIndex: 'amount',
    key: 'amount',
    fixed: 'left',
    render: (amount) => parseValuePTbr(amount)
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left'
  },
  {
    title: 'Link',
    dataIndex: 'url',
    key: 'url',
    fixed: 'left',
    render: (url) => (
      <Text
        copyable={{
          text: url,
          tooltips: true
        }}>
          Copiar
      </Text>
    )
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (id) =>  <Button type="link" onClick={() => handleClickEdit(id)}>
      Editar
    </Button>
  }
]


const PaymentLinkList = ({ datasource, handleClickEdit, loading, onChangeTable, total, page}) => {
  console.log(datasource)
  return (
    <ConfigProvider renderEmpty={() => <Empty 
      description="Não há dados" 
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ total, current: page }}
        onChange={onChangeTable}
        columns={columns({ handleClickEdit })} 
        loading={loading} 
        dataSource={map((dataArray) => ({...dataArray, key: dataArray.id}), datasource)} />
    </ConfigProvider>  )
}

export default PaymentLinkList
