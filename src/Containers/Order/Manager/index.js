import React, { useState } from 'react'
import {
  Card,
  Typography,
  Radio,
  Row,
  Col,
  Button,
  Input,
  Checkbox,
  DatePicker
} from 'antd'
import {
  PlusOutlined,
  MenuOutlined,
  BarChartOutlined,
  SearchOutlined
} from '@ant-design/icons'

import OrderList from './OrderList'
import Chart from './Chart'
import formattedDate from '../../../utils/parserDate'

const dateFormat = 'DD/MM/YYYY'

const { RangePicker } = DatePicker
const CheckboxGroup = Checkbox.Group
const plainOptions = ['Sim', 'Não']

const options = [
  { label: <MenuOutlined />, value: 'table' },
  { label: <BarChartOutlined />, value: 'chart' }
]
const { Title } = Typography

const Manager = ({
  datasource,
  goToAddOrder,
  goToAddOrderOut,
  goToOrderDetail,
  handleGetOrdersByFilters,
  chartSettings,
  datasourceChart,
  filters,
  handleOnChange,
  clearFilters,
  loading,
  onChangeTable, 
  total, 
  page
}) => {
  const [radioValue, setRadioValue] = useState('table')
  const radioOnChange = ({ target }) => setRadioValue(target.value)

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Crie novas ordens
              </Title>
              <p style={{ marginBottom: 0 }}>
                Crie e gerencie as ordens de entrada e saída
              </p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={goToAddOrderOut}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}
                danger>
                Adicionar saída
              </Button>
              <Button
                onClick={goToAddOrder}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar entrada
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={4}>
              <RangePicker
                value={filters.dates}
                format={dateFormat}
                placeholder=""
                onChange={(value) =>
                  handleOnChange({ target: { name: 'dates', value } })
                }
              />
            </Col>
            <Col span={13}>
              <Input
                placeholder="Filtre por colaborador"
                prefix={<SearchOutlined />}
                onChange={handleOnChange}
                name="user_name"
                value={filters.user_name}
              />
            </Col>
            <Col span={7} style={{ textAlign: 'right' }}>
              <Button style={{ marginRight: '16px' }} onClick={clearFilters}>
                Limpar filtros
              </Button>
              <Button type="primary" onClick={handleGetOrdersByFilters}>
                Filtrar
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[0, 20]}>
            <Col span={8}>
              <Title level={5}>
                {filters.dates &&
                  filters.dates[0] &&
                  formattedDate(filters.dates[0], 'DD/MM/YYYY - ')}
                {filters.dates &&
                  filters.dates[1] &&
                  formattedDate(filters.dates[1], 'DD/MM/YYYY')}
                <span style={{ fontWeight: 'normal' }}> | </span>
                {datasource.total}{' '}
                <span style={{ fontWeight: 'normal' }}>Ordens</span>
              </Title>
            </Col>
            <Col span={16} style={{ textAlign: 'right' }}>
              <Radio.Group
                options={options}
                optionType="button"
                onChange={radioOnChange}
                value={radioValue}
                buttonStyle="solid"
              />
            </Col>
            <Col span={24}>
              {radioValue === 'chart' && (
                <Chart data={datasourceChart} chartSettings={chartSettings} />
              )}
              {radioValue === 'table' && (
                <OrderList
                  loading={loading}
                  datasource={datasource.source}
                  goToOrderDetail={goToOrderDetail}
                  total={total}
                  onChangeTable={onChangeTable}
                  page={page}
                />
              )}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Manager
