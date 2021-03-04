import React from 'react'
import { Button, Card, Input, Row, Col, Typography } from 'antd'
import CustomerList from './CustomerList'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

const Manager = ({
  source,
  onChangeSearch,
  filters,
  handleFilter,
  clearFilters,
}) => (
  <Row gutter={[8, 16]}>
    <Col span={24}>
      <Card bordered={false}>
        <Row>
          <Col span={12}>
            <Title style={{ marginBottom: 0 }} level={4}>Adicione novos clientes</Title>
            <p style={{ marginBottom: 0 }}>Crie e gerencie os seus clientes</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button
              onClick={console.log}
              style={{ marginRight: '16px'}}
              icon={<PlusOutlined />}
            >
              Adicionar Cliente
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
    <Col span={24}>
    <Card bordered={false}>
      <Row gutter={[8, 8]}>
        <Col span={20}>
          <Input
            name='search_name_or_document'
            placeholder="Filtre por nome ou documento."
            prefix={<SearchOutlined />}
            value={filters.search_name_or_document}
            onChange={onChangeSearch}
          />
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Button
            style={{ marginRight: '16px' }}
            onClick={clearFilters}
          >
            Limpar Filtros
          </Button>
          <Button type="primary" onClick={handleFilter}>
            Filtrar
          </Button>
        </Col>
      </Row>
    </Card>
  </Col>
  <Col span={24}>
    <Card bordered={false}>
      <CustomerList datasource={source} />
    </Card>
  </Col>
  </Row>
)

export default Manager
