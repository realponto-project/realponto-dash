import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Typography, Input, Checkbox } from 'antd'
import { connect } from 'react-redux'

import Add from '../Add'
import Edit from '../Edit'
import Upgrade from '../Upgrade'
import ProductList from './ProductList'

import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { applySpec, compose, prop, __ } from 'ramda'
import { parseValuePTbr } from '../../../utils/Masks/myInfoMasks'
import { Link } from 'react-router-dom'
const CheckboxGroup = Checkbox.Group

const { Title, Text } = Typography
const plainOptions = ['Ativo', 'Inativo']

const Manager = ({
  handleSubmitUpdate,
  handleSubmit,
  products,
  clearFilters,
  handleOnChange,
  filters,
  handleGetProductsByFilters,
  loading,
  onChangeTable,
  page,
  company,
  goToDetail,
  catalogLink
}) => {
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleLimitProduct, setVisibleLimitProduct] = useState(false)
  const [productSelected, setProductSelected] = useState({})
  const [quantityProduct, setQuantityProduct] = useState(0)

  const onSubmitUpdate = (values) => {
    handleSubmitUpdate({ ...values, id: productSelected.id })
    setVisibleEdit(false)
    setProductSelected({})
  }

  const onSubmit = (values) => {
    handleSubmit(values)
    setVisible(false)
  }

  const handleChooseProduct = (product) => {
    const buildProductChoosed = applySpec({
      name: prop('name'),
      category: prop('category'),
      description: prop('description'),
      showOnCatalog: prop('showOnCatalog'),
      minQuantity: prop('minQuantity'),
      barCode: prop('barCode'),
      id: prop('id')
    })

    setProductSelected({
      ...buildProductChoosed(product),
      buyPrice: parseValuePTbr(product.buyPrice),
      salePrice: parseValuePTbr(product.salePrice)
    })
    setVisibleEdit(true)
  }

  const handleCloseModalEdit = () => {
    setVisibleEdit(false)
    setProductSelected({})
  }

  const checkQuantityProduct = () => {
    if (products.total === quantityProduct) {
      setVisibleLimitProduct(true)
    } else {
      setVisible(true)
    }
  }

  const quantityProductSeting = () => {
    setQuantityProduct(company.subscription.plan.quantityProduct)
  }

  useEffect(() => {
    quantityProductSeting()
  }, [])

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Crie novos produtos
              </Title>
              <p style={{ marginBottom: 0 }}>
                Crie e gerencie os produtos do estoque
              </p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Row gutter={[0, 8]}>
                <Col span={24}>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => checkQuantityProduct()}>
                    Adicionar produto
                  </Button>
                </Col>
                {/* <Col span={24}>
                  <Text
                    copyable={{
                      text: `${window.location.origin}/#${catalogLink}`,
                      tooltips: true
                    }}>
                    <Link to={catalogLink}>Catálogo</Link>
                  </Text>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      {visibleLimitProduct && (
        <Upgrade visible onCancel={() => setVisibleLimitProduct(false)} />
      )}
      {visible && (
        <Add
          visible={visible}
          onCreate={onSubmit}
          onCancel={() => setVisible(false)}
        />
      )}
      {visibleEdit && (
        <Edit
          visible
          onEdit={onSubmitUpdate}
          onCancel={handleCloseModalEdit}
          productSelected={productSelected}
        />
      )}
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={14}>
              <Input
                placeholder="Filtre por nome"
                prefix={<SearchOutlined />}
                name="name"
                value={filters.name}
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
              <Button type="primary" onClick={handleGetProductsByFilters}>
                Filtrar
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <ProductList
            handleSubmitUpdate={handleSubmitUpdate}
            onChangeTable={onChangeTable}
            total={products.total}
            loading={loading}
            datasource={products.source}
            chooseProduct={handleChooseProduct}
            page={page}
            goToDetail={goToDetail}
          />
        </Card>
      </Col>
    </Row>
  )
}

const mapStateToProps = ({ company }) => ({
  company
})

const enhanced = compose(connect(mapStateToProps))

export default enhanced(Manager)
