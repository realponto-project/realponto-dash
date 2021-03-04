import React from 'react'
import { Divider, Typography, Row, Col, Button } from 'antd'
import { translateStatus } from '../../../../utils/orderStatus'
const { Title } = Typography

const ConfirmStep = ({
  formData,
  customerSelected,
  userSelected,
  navigationStep,
}) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Title level={4}>CONFIRMAÇÃO DA ORDEM</Title>
        <p>Confirme abaixo os dados informados e finalize a criação dessa ordem</p>
      </Col>


      { userSelected && userSelected.name && (
        <>
          <Divider />
          <Col span={20}>
            <p style={{ marginBottom: 0 }}>Nome do usuário</p>
            <Title level={5}>{userSelected.name}</Title>
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Button type="text" onClick={() => navigationStep(1)}>Editar</Button>
          </Col>
        </>
      )}


      { customerSelected && customerSelected.name && (
          <Col span={24}>
            <p style={{ marginBottom: 0 }}>Nome do cliente</p>
            <Title level={5}>{customerSelected && customerSelected.name }</Title>
          </Col>
        )
      }

      <Divider />

      <Col span={20}>
        <p style={{ marginBottom: 0 }}>Tipo de Ordem</p>
        <Title level={5}>{translateStatus[formData.status]}</Title>
      </Col>

      <Col span={4} style={{ textAlign: 'right' }}>
        <Button type="text" onClick={() => navigationStep(0)}>Editar</Button>
      </Col>

      <Divider />

      <Col span={20}>
        <Row>
          <Col span={12}>
            <p style={{ marginBottom: 0 }}>Produtos</p>
          </Col>

          <Col span={4} style={{ textAlign: "center"}}>
            <p style={{ marginBottom: 0 }}>Quantidade</p>
          </Col>

          <Col span={4} style={{ textAlign: "center"}}>
            <p style={{ marginBottom: 0 }}>Análise?</p>
          </Col>
        </Row>
        {formData.products.map(product => (
          <Row key={product.key}>
            <Col span={12}>
              <Title level={5}>{product.name}</Title>
            </Col>

            <Col span={4} style={{ textAlign: "center"}}>
              <Title level={5}>{product.quantity}</Title>
            </Col>

            <Col span={4} style={{ textAlign: "center"}}>
              <Title level={5}>{product.analysis ? 'Sim' : 'Não'}</Title>
            </Col>
          </Row>
        ))}
      </Col>

      <Col span={4} style={{ textAlign: 'right' }}>
        <Button type="text" onClick={() => navigationStep(2)}>Editar</Button>
      </Col>

      <Divider />
    </Row>
  )
}

export default ConfirmStep
