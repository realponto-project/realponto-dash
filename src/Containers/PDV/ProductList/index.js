import React from 'react'
import { AutoComplete, Button, Col, Row } from 'antd'
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

const productItem = (
  handleClickDelete,
  handleClickUp,
  handleClickDown,
  isSaved
) => ({ id, name, barCode, quantity, salePrice, balance }) => {
  return (
    <li key={id} className={styles.productItem}>
      <Row>
        <Col span={10}>
          <h1 className={styles.productListDescription}>{name}</h1>
          <p className={styles.productListSubtitle}>{barCode}</p>
        </Col>
        <Col span={4}>
          { <DownOutlined onClick={() => handleClickDown(id)} /> }
          <span className={styles.productListQuantity}>{quantity}</span>
         { <UpOutlined onClick={() => quantity < balance ? handleClickUp(id) : null } /> }
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
             {(
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
  removeProduct
}) => {
  return (
    <div>
      <h2>Ponto de Venda</h2>
      <div className={styles.searchProduct}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <h4>Buscar produto</h4>
          </Col>
          <Col span={20}>
            <AutoComplete
              // disabled={isSaved}
              onSearch={onSearch}
              onChange={onChange}
              onSelect={onSelectProduct}
              options={optionSearch}
              placeholder="pequise um produto aqui!"
              style={{ width: '100%' }}
              value={searchProduct}
            />
          </Col>
          <Col span={4}>
            <Button
              icon={<BarcodeOutlined />}
              onClick={() => {}}
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
            {length(productList)}
          </spa>
        </h1>
      </div>
      <ul className={ClassNames(styles.productList, styles.scrollbarPanelList)}>
        {map(
          productItem(removeProduct, incrementQuantity, decrementQuantity, false),
          productList
        )}
      </ul>
    </div>
  )
}

export default ProductList