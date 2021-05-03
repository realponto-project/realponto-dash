import React, { useState } from 'react'
import { Card, Typography, Row, Col, Tag, Steps, Table, Button } from 'antd'
import formattedDate from '../../../utils/parserDate'
import { cpf, cnpj } from 'cpf-cnpj-validator'
import AddEvent from './AddEvent'
import AddSerialNumber from './AddSerialNumber'
import AssociateSerialNumber from './AssociateSerialNumber'
import AssociateCustomer from './AssociateCustomer'

import moment from 'moment'
const { Step } = Steps
const { Title } = Typography

const columns = (order) => [
  {
    title: 'Descrição',
    dataIndex: 'product.name',
    render: (_, record) => record.product.name
  },
  {
    title: 'Quantidade',
    dataIndex: 'quantity'
  },
  {
    title: 'Status',
    dataIndex: 'statusId',
    render: () => (
      <Tag color={order.status && order.status.color}>
        {order.status && order.status.label}
      </Tag>
    )
  }
]

const Detail = ({
  order,
  users,
  customers,
  statusList,
  updateOrderDetail,
  addSerialNumbers,
  addAssociateSerialNumbers,
  finishedOrder,
  serialNumberExistOrActivated,
  serialNumbersOuts,
  associateCustomerOrder
}) => {
  const [productMovimentation, setProductMovimentation] = useState([])
  const [productSelected, setProductSelected] = useState({
    status: {
      label: null
    }
  })

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Colaborador</p>
              <Title level={5}>{order.user?.name}</Title>
            </Col>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Status</p>
              <Title level={5}>
                <Tag color={order.status?.color}>
                  {order.status?.label}
                </Tag>
              </Title>
            </Col>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Responsável</p>
              <Title level={5}>{order.responsibleUser?.name}</Title>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
            <p>
              Protocolo:
              <Title style={{ display: 'inline'}} level={5}> {order.protocol && String(order.protocol).padStart(6, '0')}</Title>
              </p>
              <p>
                Data de criação: <Title style={{ display: 'inline'}} level={5}>{formattedDate(order.createdAt, 'DD/MM/YYYY')}</Title>
              </p>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Row gutter={[8, 16]}>
          <Col span={24}>
            <Card bordered={false}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Title level={5}>Detalhes do cliente</Title>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                  {!order.customer && order.pendingReview && (
                    <Button onClick={customerModalOpen}>
                      Associar cliente
                    </Button>
                  )}
                </Col>
                <Col span={8}>
                  <p style={{ marginBottom: '4px' }}>Nome do cliente</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>
                    {order.customer?.name ?? '-'}
                  </Title>
                </Col>
                <Col span={8}>
                  <p style={{ marginBottom: '4px' }}>CPF/CNPJ</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>
                    {order.customer?.document ?? '-'}
                  </Title>
                </Col>
                <Col span={8}>
                  <p style={{ marginBottom: '4px' }}>Telefone</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>
                    {order.customer?.phone ?? '-'}
                  </Title>
                </Col>

                {/* temos que adicionar a tabela de endereço no backend depois só descomentar o codigo abaixo */}
                {/* <Col span={16}>
                  <p style={{ marginBottom: '4px' }}>Rua</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>{order.customer && order.customer.name}</Title>
                </Col>
                <Col span={4}>
                  <p style={{ marginBottom: '4px' }}>Nº</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>{order.customer && order.customer.name}</Title>
                </Col>
                <Col span={4}>
                  <p style={{ marginBottom: '4px' }}>Complemento</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>{order.customer && order.customer.name}</Title>
                </Col>
                <Col span={8}>
                  <p style={{ marginBottom: '4px' }}>Bairro</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>{order.customer && order.customer.name}</Title>
                </Col>
                <Col span={8}>
                  <p style={{ marginBottom: '4px' }}>Cidade</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>{order.customer && order.customer.name}</Title>
                </Col>
                <Col span={4}>
                  <p style={{ marginBottom: '4px' }}>Estado</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>{order.customer && order.customer.name}</Title>
                </Col>
                <Col span={4}>
                  <p style={{ marginBottom: '4px' }}>Cep</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>{order.customer && order.customer.name}</Title>
                </Col> */}
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                <Title level={5}>Produtos</Title>
                </Col>
                <Col span={24}>
                  <Table
                    columns={columns(order)}
                    dataSource={order.transactions}
                    pagination={false}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Detail
