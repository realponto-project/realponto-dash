import React, { useState } from 'react'
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

const dataProducts = [
  {  id: 1, name: 'RELOGIO TOMMY HILFIGER', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 2, name: 'RELOGIO TOMMY HILFIGER 1', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 3, name: 'RELOGIO TOMMY HILFIGER 2', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 4, name: 'RELOGIO TOMMY HILFIGER 3', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 5, name: 'RELOGIO TOMMY HILFIGER 4', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 6, name: 'RELOGIO TOMMY HILFIGER 5', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 1, name: 'RELOGIO TOMMY HILFIGER', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 2, name: 'RELOGIO TOMMY HILFIGER 1', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 3, name: 'RELOGIO TOMMY HILFIGER 2', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 4, name: 'RELOGIO TOMMY HILFIGER 3', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 5, name: 'RELOGIO TOMMY HILFIGER 4', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 6, name: 'RELOGIO TOMMY HILFIGER 5', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 1, name: 'RELOGIO TOMMY HILFIGER', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 2, name: 'RELOGIO TOMMY HILFIGER 1', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 3, name: 'RELOGIO TOMMY HILFIGER 2', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 4, name: 'RELOGIO TOMMY HILFIGER 3', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 5, name: 'RELOGIO TOMMY HILFIGER 4', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 6, name: 'RELOGIO TOMMY HILFIGER 5', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 1, name: 'RELOGIO TOMMY HILFIGER', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 2, name: 'RELOGIO TOMMY HILFIGER 1', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 3, name: 'RELOGIO TOMMY HILFIGER 2', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 4, name: 'RELOGIO TOMMY HILFIGER 3', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 5, name: 'RELOGIO TOMMY HILFIGER 4', barCode: '987654321', quantity: 10, salePrice: 1000 },
  {  id: 6, name: 'RELOGIO TOMMY HILFIGER 8799085', barCode: '987654321', quantity: 10, salePrice: 1000 },
]

const productItem = ({
  handleClickDelete,
  handleClickDown,
  handleClickUp,
  isSaved
}) => ({ id, name, barCode, quantity, salePrice }) => {
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
         {  <UpOutlined onClick={() => handleClickUp(id)} /> }
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
             {  (
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
  // handleClickDelete,
  // handleClickDown,
  // handleClickSearchBarCode,
  // handleClickUp,
  // isSaved,
  // onSearch,
  // onSelect,
  // options,
  // products
}) => {
  const [product, setProduct] = useState('')
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
              // onChange={setProduct}
              // onSearch={onSearch}
              // onSelect={(productId) => {
              //   onSelect(productId)
              //   setProduct('')
              // }}
              // options={options}
              placeholder="pequise um produto aqui!"
              style={{ width: '100%' }}
              value={product}
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
            {length(dataProducts)}
          </spa>
        </h1>
      </div>
      <ul className={ClassNames(styles.productList, styles.scrollbarPanelList)}>
        {map(
          productItem({ handleClickDelete: () => {}, handleClickDown: () => {}, handleClickUp: () => {}, isSaved: () => {} }),
          dataProducts
        )}
      </ul>
    </div>
  )
}

export default ProductList