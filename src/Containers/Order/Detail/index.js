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

const columns = (detail, handleSerialNumber, order, associateSerialNumber, serialOrderOuts) => (
  [
    {
      title: 'Status',
      dataIndex: 'status.value',
      render: (text, record) => (
        <Tag color={record.status.color}>{record.status.value}</Tag>
      )
    },
    {
      title: 'Descrição',
      dataIndex: 'productName',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
    },
    {
      title: '',
      dataIndex: 'productId',
      key: 'action',
      render: (productId, record) => {
        let serialNumbersAdded = order.serialNumbers.filter(product => product.product.id === productId)
        if (order.status.type === 'outputs') {
          serialNumbersAdded = serialOrderOuts.filter(product => product.product.id === productId)
        }

        const quantityMax = record.quantity - (serialNumbersAdded && serialNumbersAdded.length) || 0

        return (
       <>
         <Button
          onClick={() => detail(record)}
          type="text"
        >
          Detalhes
        </Button>
        {
          quantityMax !== 0 && order.status.type === 'inputs' && (
          <Button
            onClick={() => handleSerialNumber(record)}
            type="outline"
          >
            Adicionar Número Série
          </Button>
          )
        }
        {
          quantityMax !== 0 && order.status.type === 'outputs' && (
          <Button
            onClick={() => associateSerialNumber(record)}
            type="outline"
          >
            Associar Número Série
          </Button>
          )
        }
       </>
      )
    },
    },
  ]
)

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
  associateCustomerOrder,
}) => {
  const [productMovimentation, setProductMovimentation] = useState([])
  const [productSelected, setProductSelected] = useState({
    status: {
      label: null
    }
  })
  const [event, setEvent] = useState(false)
  const [customerModal, setCustomerModal] = useState(false)

  const [productSerialSelected, setProductSerialSelected] = useState({})
  const [serial, setSerial] = useState(false)

  const [productSerialAssociateSelected, setProductSerialAssociateSelected] = useState({})
  const [associateSerial, setAssociateSerial] = useState(false)


  const handleProductMovimentation = (productSelectedTable) => {
    const movimentation = order.transactions.filter(product => product.productId === productSelectedTable.productId)
    setProductMovimentation(movimentation)
    setProductSelected(productSelectedTable)
  }

  const handleSerialNumber = (productSelectedTable) => {
    setProductSerialSelected(productSelectedTable)
    setSerial(true)
  }

  const associateSerialNumber = (productSelectedTable) => {
    setProductSerialAssociateSelected(productSelectedTable)
    setAssociateSerial(true)
  }

  const selectedProductFunction = () => {
    setEvent(true)
  }

  const customerModalOpen = () => {
    setCustomerModal(true)
  }

  const customerModalClose = () => {
    setCustomerModal(false)
  }

  const closeModalEvent = () => {
    setEvent(false)
  }

  const closeModalAssociateSerialNumber = () => {
   setProductSerialAssociateSelected({})
    setAssociateSerial(false)
  }

  const closeModalSerial = () => {
    setSerial(false)
    setProductSerialSelected({})
  }

  const customerDocument = order.customer && order.customer.document
    ? order.customer.document
    : ''

  let isAddEvent = (
    productMovimentation.length > 0
    && productSelected.status.label === 'pending_analysis'
  )

  if (productMovimentation.length > 0 && productSelected.status.label === 'booking') {
    isAddEvent = true
  }


  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Usuário</p>
              <Title level={5}>{order.user && order.user.name}</Title>
            </Col>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Status</p>
              <Title level={5}>
                <Tag color={order.status && order.status.color}>{order.status && order.status.value}</Tag>
              </Title>
            </Col>
            <Col span={6}>
            </Col>
            <Col span={6} style={{ textAlign: "right" }}>
              <p style={{ marginBottom: '4px' }}>
                Data de criação: {formattedDate(order.createdAt, 'DD/MM/YYYY')}
              </p>
              {order.pendingReview && <Button onClick={finishedOrder}>Fechar Ordem</Button>}
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={16}>
        <Row gutter={[8, 16]}>
          <Col span={24}>
            <Card bordered={false}>
              <Row gutter={[8, 8]}>
              <Col span={24}>
                  <p>Produtos</p>
                </Col>
                <Col span={24}>
                  <Table
                    columns={columns(handleProductMovimentation, handleSerialNumber, order, associateSerialNumber, serialNumbersOuts)}
                    dataSource={order.orderProducts}
                    expandable={{
                      expandedRowRender: record => {
                        let items = order.serialNumbers
                        if (order.status.type === 'outputs') {
                          items = serialNumbersOuts
                        }

                        return items
                        .filter(serialNumber => serialNumber.product.id === record.productId)
                        .map(serialNumber =>(
                          <Row gutter={[8, 8]} key={serialNumber.serialNumber}>
                            <Col span={8}>
                              Número Serial: <b>{serialNumber.serialNumber}</b>
                            </Col>
                            <Col span={8}>
                              Revisado por: <b>{serialNumber.user.name}</b>
                            </Col>
                            <Col span={8}>
                              Data da Revisão: <b>{moment(serialNumber.createdAt).format('DD/MM/YY - HH:mm')}</b>
                            </Col>
                          </Row>
                        ))
                      }
                    }}
                  />
                </Col>

              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>
              <Row gutter={[8, 8]}>
                <Col span={16}>
                  <p>Detalhes do cliente</p>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                  {!order.customer && order.pendingReview && (
                    <Button onClick={customerModalOpen}>Associar cliente</Button>
                  )}
                </Col>
                <Col span={8}>
                  <p style={{ marginBottom: '4px' }}>Nome do cliente</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>{order.customer && order.customer.name}</Title>
                </Col>
                <Col span={8}>
                  <p style={{ marginBottom: '4px' }}>CPF/CNPJ</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>{
                   customerDocument.length > 11
                     ? cnpj.format(customerDocument)
                     : cpf.format(customerDocument)
                   }
                  </Title>
                </Col>
                <Col span={8}>
                  <p style={{ marginBottom: '4px' }}>Telefone</p>
                  <Title level={5} style={{ fontWeight: 'normal' }}>{order.customer && order.customer.phone}</Title>
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
        </Row>
      </Col>

      <Col span={8}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <p>Histório de Movimentação do Produto</p>
            </Col>
            <Col span={24}>
              <Steps direction="vertical">
                {productMovimentation.map(({
                    id,
                    status,
                    product,
                    createdAt,
                    quantity,
                  }) => (
                  <Step
                    status="finish"
                    key={id}
                    title={status.value}
                    description={
                      <>
                        {product.name} - Quatidade: <b>{quantity}</b><br />
                        {formattedDate(createdAt, 'DD/MM/YYYY - HH:mm')} <br />
                      </>
                    }
                    />
                ))}
                {productMovimentation.length === 0 &&(
                  <Title level={5}>Para ver as operação selecione um produto ao lado</Title>
                )}
              </Steps>
              {isAddEvent && <Button onClick={selectedProductFunction} block type="text">Adicionar Evento</Button>}
            </Col>
          </Row>
        </Card>
      </Col>
      <AddEvent
        visible={event}
        users={users}
        productSelected={productSelected}
        productTransaction={productMovimentation}
        statusList={statusList}
        onCancel={closeModalEvent}
        onCreate={updateOrderDetail}
      />

      <AddSerialNumber
        visible={serial}
        users={users}
        productSelected={productSerialSelected}
        onCancel={closeModalSerial}
        onCreate={addSerialNumbers}
        serialNumbers={order.serialNumbers}
        serialNumberExistOrActivated={serialNumberExistOrActivated}
      />
      <AssociateSerialNumber
        visible={associateSerial}
        onCancel={closeModalAssociateSerialNumber}
        productSelected={productSerialAssociateSelected}
        serialNumbers={serialNumbersOuts}
        onCreate={addAssociateSerialNumbers}
      />

      <AssociateCustomer
        visible={customerModal}
        onCancel={customerModalClose}
        customers={customers}
        onCreate={associateCustomerOrder}
      />
    </Row>

  )
}

export default Detail
