import React, { useState } from 'react'
import { Row, Col, Card, Button, Typography, Input, Checkbox } from 'antd'
import Add from '../Add'
import Edit from '../Edit'
import UserList from './UserList'

import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
const CheckboxGroup = Checkbox.Group;

const { Title } = Typography
const plainOptions = ['Ativo', 'Inativo']
const initialFilterState = {
  activated: ['Ativo', 'Inativo'],
  search: '',
}

const Manager = ({
  handleSubmitUpdate,
  handleSubmit,
  users,
  handleGetUsersByFilters,
}) => {
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [userSelected, setUserSelected] = useState({})
  const [filters, setFilters] = useState(initialFilterState)

  const onSubmitUpdate = values => {
    handleSubmitUpdate({...values, id: userSelected.id })
    setVisibleEdit(false)
    setUserSelected({})
  }

  const onSubmit = values => {
    handleSubmit(values)
    setVisible(false)
  }

  const handleChooseUser = product => {
    setUserSelected(product)
    setVisibleEdit(true)
  }

  const handleCloseModalEdit = () => {
    setVisibleEdit(false)
    setUserSelected({})
  }

  const onChange = ({ target }) => {
    const { name, value } = target
    if(name === 'activated') {
      return setFilters({
        ...filters,
        [name]: (
          value.length === 0
          ? initialFilterState.activated
          : value
        )
      })
    }

    return setFilters({
      ...filters,
      [name]: value
    })
  }

  const handleFilters = async () => {
    await handleGetUsersByFilters(filters)
  }

  const clearFilters = async () => {
    setFilters(initialFilterState)
    await handleGetUsersByFilters({})
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>Crie novos usuários</Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie os usuários</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setVisible(true)}
              >
                Adicionar Usuário
              </Button>
            </Col>
          </Row>
        </Card>
        <Add
          visible={visible}
          onCreate={onSubmit}
          onCancel={() => setVisible(false)}
        />
          {
            visibleEdit &&
            <Edit
              visible
              onEdit={onSubmitUpdate}
              onCancel={handleCloseModalEdit}
              userSelected={userSelected}
            />
          }
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={15}>
              <Input
                placeholder="Filtre por nome ou email."
                prefix={<SearchOutlined />}
                name='search'
                value={filters.search}
                onChange={onChange}
              />
            </Col>
            <Col span={4} style={{ paddingTop: '5px' }}>
              <CheckboxGroup
                options={plainOptions}
                value={filters.activated}
                onChange={value => onChange({ target: { name: 'activated', value }})}
              />
            </Col>

            <Col span={5} style={{ textAlign: 'right' }}>
              <Button
                style={{ marginRight: '16px' }}
                onClick={clearFilters}
              >
                Limpar Filtros
              </Button>
              <Button
                type="primary"
                onClick={handleFilters}
              >
                Filtrar
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <UserList
            datasource={users}
            chooseUser={handleChooseUser}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default Manager
