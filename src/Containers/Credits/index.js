import React from 'react'
import { Button, Card, Col, Image, Row } from 'antd'

import { toLocaleString } from '../../utils/Masks'

import MovementList from './MovementList'
import ModalBuyCredits from './ModalBuy'

import GoldWrapperImg from '../../Assets/goldWrapper.svg'
import GoldImg from '../../Assets/gold.svg'

import styles from './style.module.css'

const Credits = ({
  dataSource,
  credtisToBuy,
  formCreditsBuy,
  handleSubmit,
  balance,
  isVisible,
  openModal,
  closeModal,
  total,
  handleChange,
  current
}) => {
  return (
    <Row gutter={[16, 16]} className={styles.container}>
      <Col span={8}>
        <Card className={styles.card}>
          <Row>
            <Col span={24}>
              <Image src={GoldWrapperImg} alt="gold" preview={false} />
            </Col>
            <Col span={24}>
              <h1 className={styles.totalGold}>{toLocaleString(balance)}</h1>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={16}>
        <Card className={styles.buyCard}>
          <Row>
            <Col flex="130px">
              <Image src={GoldImg} alt="gold" preview={false} />
            </Col>
            <Col flex="auto">
              <h2>Compre crédito no alxa dashboard!</h2>
              <p>
                Você pode utilizar os crédito para cadastrar produtos,{'\n'}
                criar links de pagamento e muito mais.
              </p>
            </Col>
          </Row>
          <Button
            onClick={openModal}
            className={styles.buyButton}
            type="primary">
            Comprar
          </Button>
        </Card>
      </Col>

      <Col span={24}>
        <h3 className={styles.title}>Movimentações</h3>
        <Card className={styles.cardTable}>
          <MovementList
            dataSource={dataSource}
            total={total}
            handleChange={handleChange}
            current={current}
          />
        </Card>
      </Col>

      <ModalBuyCredits
        isVisible={isVisible}
        handleCancel={closeModal}
        credtisToBuy={credtisToBuy}
        form={formCreditsBuy}
        handleSubmit={handleSubmit}
      />
    </Row>
  )
}

export default Credits
