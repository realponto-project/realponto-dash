import React, { useState } from 'react'
import { Row, Col, AutoComplete, Button } from 'antd'
import styles from './style.module.css'
import {
  BarcodeOutlined,
  DownOutlined,
  UpOutlined,
  DeleteOutlined
} from '@ant-design/icons'

const productItem = (item, index) => (
  <li className={styles.productItem}>
    <Row key={index}>
      <Col span={10}>
        <h1 className={styles.productListDescription}>Iphone 12 pro max 256gb</h1>
        <p  className={styles.productListSubtitle}>0987654321</p>
      </Col>
      <Col span={4}>
        <DownOutlined onClick={() => console.log('estou aqui')} />
        <span className={styles.productListQuantity}>20</span>
        <UpOutlined onClick={() => console.log('estou la')}/>
      </Col>
      <Col span={6}>
      <p  className={styles.productListSubtitle}>x R$ 900,00</p>
      <h1 className={styles.productListDescription}>R$ 1.800,00</h1>
      </Col>
      <Col span={4}>
        <Row justify="center">
            <Col>
              <DeleteOutlined
                onClick={() => console.log('mande embora')}
                className={styles.removeProduct}
              />
            </Col>
        </Row>
      </Col>
    </Row>
  </li>
)

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const ProductList = ({
  products
}) => {
  const [options, setOptions] = useState([])
  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    )
  }

  const onSelect = (data) => {
    console.log('onSelect', data)
  }

  return (
    <div>
      <div className={styles.searchProduct}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <h4>Buscar produto</h4>
          </Col>
          <Col span={20}>
            <AutoComplete
              options={options}
              style={{ width: '100%' }}
              onSelect={onSelect}
              onSearch={onSearch}
              placeholder="pequise um produto aqui!"
            />
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<BarcodeOutlined />}
              onClick={() => console.log('buscar cod barras')}>
              Buscar cód. barras
            </Button>
          </Col>
        </Row>
      </div>
      <div className={styles.productListHeader}>
        <h1 className={styles.productListTitle}>
          Total de itens
          <spa className={styles.productListTitleQuantity}> 4</spa>
        </h1>
      </div>
      <ul className={styles.productList}>
        {[1,2,3,4,5,6,7,8,9,10,11,12,14,145].map(productItem)}
      </ul>
    </div>
  )
}

export default ProductList
