import React from 'react'
import { Col, Row, Modal } from 'antd'

import styles from './style.module.css'
import Checkout from './Checkout'
import ProductList from './ProductList'
import ModalSearchBarCode from './ModalSearchBarCode'
import ModalNotFoundProduct from './ModalNotFoundProduct'
import Cupom from '../../Components/Cupom'

const PDV = ({
  company,
  customer,
  form,
  handleCancelCupom,
  handleCancelNotFountProduct,
  handleCancelSearchBarCode,
  handleClickClear,
  handleClickDown,
  handleClickDeleteProduct,
  handleClickSearchBarCode,
  handleClickTryAgain,
  handleClickUp,
  handleSearchBarCode,
  handleSubmit,
  isSaved,
  isVisibleCupom,
  isVisibleNotFoundProduct,
  isVisibleSearchBarCode,
  onSearchCustomer,
  onSearch,
  onSelect,
  onValuesChange,
  options,
  optionsCustomer,
  products,
  subTotal
}) => {
  return (
    <Row className={styles.checkoutContainer} gutter={[16, 16]}>
      <Col span={16}>
        <ProductList
          handleClickDelete={handleClickDeleteProduct}
          handleClickDown={handleClickDown}
          handleClickSearchBarCode={handleClickSearchBarCode}
          handleClickUp={handleClickUp}
          isSaved={isSaved}
          onSearch={onSearch}
          onSelect={onSelect}
          options={options}
          products={products}
        />
      </Col>
      <Col span={8}>
        <Checkout
          form={form}
          handleClickClear={handleClickClear}
          handleSubmit={handleSubmit}
          isSaved={isSaved}
          onSearch={onSearchCustomer}
          onValuesChange={onValuesChange}
          options={optionsCustomer}
          subTotal={subTotal}
        />
      </Col>

      <ModalSearchBarCode
        handleCancel={handleCancelSearchBarCode}
        handleSearch={handleSearchBarCode}
        isVisible={isVisibleSearchBarCode}
      />

      <ModalNotFoundProduct
        handleCancel={handleCancelNotFountProduct}
        handleClickTryAgain={handleClickTryAgain}
        isVisible={isVisibleNotFoundProduct}
      />

      <Modal
        visible={isVisibleCupom}
        onCancel={handleCancelCupom}
        footer={null}>
        <Cupom
          company={company}
          customer={customer}
          discount={form.getFieldValue('discount')}
          items={products}
          payment={form.getFieldValue('payment')}
        />
      </Modal>
    </Row>
  )
}

export default PDV
