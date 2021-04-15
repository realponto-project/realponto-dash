import React from 'react'
import { Card, Button, Typography, Row, Col, Tag } from 'antd'
import PieChart from './PieChart'
import SerialNumberList from './SerialNumberList'
import { PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

const Detail = () => {
  return (
    <Row gutter={[16, 16]}>   
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Produto</p>
              <Title level={5}>Relogio Tommy </Title>
            </Col>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Status</p>
              <Title level={5}>
                <Tag color={true ? '#65A300' : 'rgba(0,0,0,.25)'}>
                  Ativo
                </Tag>
              </Title>
            </Col>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Quantidade disponível</p>
              <Title level={5}>100 und </Title>
            </Col>
            <Col span={6}>
              <p style={{ marginBottom: '4px' }}>Criado em</p>
              <Title level={5}>22/03/2021</Title>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={18} style={{ height: '550px'}}>
          <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Número de série
              </Title>
              <p style={{ marginBottom: 0 }}>
                Adicione e edite os seus números de séries
              </p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={() => console.log()}
                icon={<PlusOutlined />}>
                Adicionar
              </Button>
            </Col>
            </Row>
            </Card>
            </Col>
            <Col span={24}>
              <Card bordered={false}>
                <SerialNumberList />
              </Card>
            </Col>
          </Row>
      </Col>
      <Col span={6}>
        <Card bordered={false} style={{ height: '608px'}}>
          <PieChart />
        </Card>
      </Col>
    </Row>
  )
}

export default Detail
