import React, { useState } from 'react'
import { Row, Col, Card, Button, Typography, Input, Checkbox } from 'antd'
import Add from '../Add'
import Edit from '../Edit'
import StatusList from './StatusList'

import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
const CheckboxGroup = Checkbox.Group

const { Title } = Typography
const plainOptions = ['Ativo', 'Inativo']

const Manager = ({
  handleSubmitUpdate,
  handleSubmit,
  status,
  clearFilters,
  handleOnChange,
  filters,
  handleGetStatusByFilters,
  loading,
  page,
  onChangeTable
}) => {
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [statusSelected, setStatusSelected] = useState({})

  const onSubmitUpdate = (values) => {
    handleSubmitUpdate({ ...values, id: statusSelected.id })
    setVisibleEdit(false)
    setStatusSelected({})
  }

  const handleChooseStatus = (status) => {
    setStatusSelected(status)
    setVisibleEdit(true)
  }

  const handleCloseModalEdit = () => {
    setVisibleEdit(false)
    setStatusSelected({})
  }

  const onSubmit = (values) => {
    handleSubmit(values)
    setVisible(false)
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Crie novos status
              </Title>
              <p style={{ marginBottom: 0 }}>
                Crie e gerencie os status em ordem
              </p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button icon={<PlusOutlined />} onClick={() => setVisible(true)}>
                Adicionar status
              </Button>
            </Col>
          </Row>
        </Card>
        <Add
          visible={visible}
          onCreate={onSubmit}
          onCancel={() => setVisible(false)}
        />
        {visibleEdit && (
          <Edit
            visible
            onEdit={onSubmitUpdate}
            onCancel={handleCloseModalEdit}
            statusSelected={statusSelected}
          />
        )}
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={14}>
              <Input
                placeholder="Filtre por nome"
                prefix={<SearchOutlined />}
                name="label"
                value={filters.label}
                onChange={handleOnChange}
              />
            </Col>
            <Col span={3} style={{ paddingTop: '5px' }}>
              <CheckboxGroup
                options={plainOptions}
                value={filters.activated}
                onChange={(value) =>
                  handleOnChange({ target: { name: 'activated', value } })
                }
              />
            </Col>

            <Col span={7} style={{ textAlign: 'right' }}>
              <Button style={{ marginRight: '16px' }} onClick={clearFilters}>
                Limpar filtros
              </Button>
              <Button type="primary" onClick={handleGetStatusByFilters}>
                Filtrar
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <StatusList
            handleSubmitUpdate={handleSubmitUpdate}
            onChangeTable={onChangeTable}
            loading={loading}
            datasource={status.source}
            total={status.total}
            chooseStatus={handleChooseStatus}
            page={page}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default Manager
