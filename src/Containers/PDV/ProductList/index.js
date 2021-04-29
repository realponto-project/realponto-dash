import React from 'react'
import { AutoComplete, Button, Col, Row, Typography } from 'antd'
import {
  BarcodeOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons'
import { length, map } from 'ramda'
import ClassNames from 'classnames'

import styles from './style.module.css'
import { formatPrice } from '../../../utils'


const { Title } = Typography

const productItem = (
  handleClickDelete,
  handleClickUp,
  handleClickDown,
  orderCreated,
  // isSaved
) => ({ id, name, barCode, quantity, salePrice, balance }) => {
  return (
    <li key={id} className={styles.productItem}>
      <Row>
        <Col span={10}>
          <h1 className={styles.productListDescription}>{name}</h1>
          <p className={styles.productListSubtitle}>{barCode}</p>
        </Col>
        <Col span={4}>
          {orderCreated && <DownOutlined onClick={() => handleClickDown(id)} />}
          <span className={styles.productListQuantity}>{quantity}</span>
          {orderCreated && (
            <UpOutlined
              onClick={() => (quantity < balance ? handleClickUp(id) : null)}
            />
          )}
        </Col>
        <Col span={6} style={{ textAlign: 'center' }}>
          <p className={styles.productListSubtitle}>
            x R$ {formatPrice(salePrice)}
          </p>
          <h1 className={styles.productListDescription}>
            R$ {formatPrice(quantity * salePrice)}
          </h1>
        </Col>
        <Col span={4}>
          <Row justify="center">
            <Col>
              {orderCreated && (
                <DeleteOutlined
                  onClick={() => handleClickDelete(id)}
                  className={styles.removeProduct}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </li>
  )
}

const ProductList = ({
  onSearch,
  onChange,
  searchProduct,
  optionSearch,
  onSelectProduct,
  productList,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
  openModalBarcode,
  orderCreated
}) => {
  return (
    <div>
      <div className={styles.searchProduct}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Title level={5}>Busca por produto:</Title>
          </Col>
          <Col span={18}>
            <AutoComplete
              // disabled={isSaved}
              onSearch={onSearch}
              onChange={onChange}
              onSelect={onSelectProduct}
              options={optionSearch}
              placeholder="Pesquise por um produto"
              style={{ width: '100%' }}
              value={searchProduct}
              disabled={!!orderCreated}
            />
          </Col>
          <Col span={6}>
            <Button
              disabled={!!orderCreated}
              icon={<BarcodeOutlined />}
              onClick={openModalBarcode}
              type="primary">
              Código de barras
            </Button>
          </Col>
        </Row>
      </div>
      <div className={styles.productListHeader}>
        <h1 className={styles.productListTitle}>
          Total de itens
          <span className={styles.productListTitleQuantity}>
            {productList ? length(productList) : 0}
          </span>
        </h1>
      </div>
      <ul className={ClassNames(styles.productList, styles.scrollbarPanelList)}>
        {productList && map(
          productItem(
            removeProduct,
            incrementQuantity,
            decrementQuantity,
            (orderCreated = !orderCreated),
            false
          ),
          productList
        )}
      </ul>
    </div>
  )
}

export default ProductList
