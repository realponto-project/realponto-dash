import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Typography
} from 'antd'
import {
  applySpec,
  find,
  map,
  pathOr,
  pipe,
  propEq,
  replace,
  slice,
  toUpper
} from 'ramda'

import { parseValuePTbr } from '../../../utils/Masks/myInfoMasks'
import mask, { toLocaleString } from '../../../utils/Masks'

import GoldImage from '../../../Assets/gold.svg'
import Visa from '../../../Assets/visa.svg'
import MasterCard from '../../../Assets/mastercard.svg'

import styles from './style.module.css'

const { Paragraph, Title, Text } = Typography

const formaterFormDatas = applySpec({
  card_holder_name: pipe(
    pathOr('', ['card_holder_name']),
    toUpper,
    replace(/[^A-Z | \s]/g, ''),
    slice(0, 40)
  ),
  card_number: pipe(
    pathOr('', ['card_number']),
    replace(/\D/g, ''),
    slice(0, 16),
    mask('#### #### #### ####'),
    replace(/(\s){0,3}$/g, '')
  ),
  card_expiration_date: pipe(
    pathOr('', ['card_expiration_date']),
    replace(/\D/g, ''),
    slice(0, 4),
    mask('##/##'),
    replace(/\/$/g, '')
  ),
  card_cvv: pipe(pathOr('', ['card_cvv']), replace(/\D/g, ''), slice(0, 4))
})

const CardItem = ({
  id,
  name,
  price,
  isFavorite,
  bonus,
  isActivate,
  handleClick
}) => {
  return (
    <Card
      onClick={() => handleClick(id)}
      className={isActivate ? styles.cardItemActivate : styles.cardItem}
      bodyStyle={{ padding: '5px 10px' }}>
      {isFavorite && (
        <label className={styles.textMostPopular}>Mais popular</label>
      )}
      <Row justify="center">
        <Text>
          <Image src={GoldImage} alt="gold" preview={false} width="1rem" />{' '}
          {name}
        </Text>

        <h2 className={styles.priceItem}>{parseValuePTbr(price)}</h2>
        {bonus && (
          <>
            <label className={styles.labelBonus}>Bônus em créditos</label>
            <label className={styles.valueBonus}>
              {/* + {toLocaleString(bonus)} bônus */}
            </label>
          </>
        )}
      </Row>
    </Card>
  )
}

const ModalBuyCredits = ({
  isVisible,
  handleCancel,
  credtisToBuy,
  form,
  handleSubmit
}) => {
  const [cardId, setCardId] = useState()

  useEffect(() => {
    const activateItem = find(propEq('isActivate', true), credtisToBuy)

    setCardId(activateItem?.id)
  }, [credtisToBuy])

  return (
    <Modal width={700} visible={isVisible} closable={false} footer={null}>
      <Row gutter={[30]}>
        <Col span={24}>
          <Title level={5}>
            Selecione o valor que deseja comprar em créditos
          </Title>
        </Col>

        {credtisToBuy.map((item, index) => (
          <Col span={8} key={item.id}>
            <CardItem
              {...item}
              isFavorite={index === 0}
              isActivate={cardId === item.id}
              handleClick={setCardId}
            />
          </Col>
        ))}

        <Col span={24}>
          <Paragraph className={styles.textCardData}>
            Preencha os dados do cartão
          </Paragraph>
        </Col>

        <Col span={24}>
          <Row>
            <Image
              className={styles.imageVisa}
              preview={false}
              width={48}
              src={Visa}
            />
            <Image
              className={styles.imageMasterCard}
              preview={false}
              width={28}
              src={MasterCard}
            />
          </Row>
        </Col>

        <Col span={24}>
          <Form
            onFinish={(valuesFormData) =>
              handleSubmit({ ...valuesFormData, cardId })
            }
            layout={'vertical'}
            onValuesChange={(_, values) =>
              form.setFieldsValue(formaterFormDatas(values))
            }
            form={form}>
            <Form.Item
              label={<label className={styles.labelItem}>Nome titular</label>}
              name="card_holder_name">
              <Input placeholder="Insira o nome do titular" />
            </Form.Item>

            <Form.Item
              label={
                <label className={styles.labelItem}>Número do cartão</label>
              }
              name="card_number">
              <Input placeholder="Insira o número do cartão" />
            </Form.Item>

            <Row gutter={38}>
              <Col span={12}>
                <Form.Item
                  label={
                    <label className={styles.labelItem}>Data validade</label>
                  }
                  name="card_expiration_date">
                  <Input placeholder="Insira a data" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={<label className={styles.labelItem}>CVV</label>}
                  name="card_cvv">
                  <Input placeholder="Insira o código" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                className={styles.buttonBuy}
                type="primary"
                htmlType="submit">
                Finalizar compra
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={24}>
          <Row justify="center">
            <Paragraph onClick={handleCancel} className={styles.textNoThanks}>
              Não, obrigado.
            </Paragraph>
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalBuyCredits
