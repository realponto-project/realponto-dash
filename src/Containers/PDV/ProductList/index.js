import React, { useState } from 'react'
import { AutoComplete, Button, Col, Row } from 'antd'
import {
  BarcodeOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons'
import { length, map } from 'ramda'

import styles from './style.module.css'
import { formatPrice } from '../../../utils'

const productItem = ({
  handleClickDelete,
  handleClickDown,
  handleClickUp,
  isSaved
}) => ({ id, name, barCode, amount, salePrice }) => {
  return (
    <li key={id} className={styles.productItem}>
      <Row>
        <Col span={10}>
          <h1 className={styles.productListDescription}>{name}</h1>
          <p className={styles.productListSubtitle}>{barCode}</p>
        </Col>
        <Col span={4}>
          { !isSaved && <DownOutlined onClick={() => handleClickDown(id)} /> }
          <span className={styles.productListQuantity}>{amount}</span>
         { !isSaved && <UpOutlined onClick={() => handleClickUp(id)} /> }
        </Col>
        <Col span={6}>
          <p className={styles.productListSubtitle}>
            x R$ {formatPrice(salePrice)}
          </p>
          <h1 className={styles.productListDescription}>
            R$ {formatPrice(amount * salePrice)}
          </h1>
        </Col>
        <Col span={4}>
          <Row justify="center">
            <Col>
             { !isSaved && (
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
  handleClickDelete,
  handleClickDown,
  handleClickSearchBarCode,
  handleClickUp,
  isSaved,
  onSearch,
  onSelect,
  options,
  products
}) => {
  const [product, setProduct] = useState('')
  return (
    <div>
      <h3>Ponto de Venda</h3>
      <div className={styles.searchProduct}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <h4>Buscar produto</h4>
          </Col>
          <Col span={20}>
            <AutoComplete
              disabled={isSaved}
              onChange={setProduct}
              onSearch={onSearch}
              onSelect={(productId) => {
                onSelect(productId)
                setProduct('')
              }}
              options={options}
              placeholder="pequise um produto aqui!"
              style={{ width: '100%' }}
              value={product}
            />
          </Col>
          <Col>
            <Button
              disabled={isSaved}
              icon={<BarcodeOutlined />}
              onClick={handleClickSearchBarCode}
              type="primary">
              Buscar cód. barras
            </Button>
          </Col>
        </Row>
      </div>
      <div className={styles.productListHeader}>
        <h1 className={styles.productListTitle}>
          Total de itens
          <spa className={styles.productListTitleQuantity}>
            {' '}
            {length(products)}
          </spa>
        </h1>
      </div>
      <ul className={styles.productList}>
        {map(
          productItem({ handleClickDelete, handleClickDown, handleClickUp, isSaved }),
          products
        )}
      </ul>
    </div>
  )
}

export default ProductList
