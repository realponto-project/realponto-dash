import React, { useState } from 'react'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography
} from 'antd'
import { map } from 'ramda'
import { BarcodeOutlined, DeleteOutlined } from '@ant-design/icons'

import styles from './style.module.css'
import ModalSearchBarCode from './ModalSearchBarCode'
import ModalNoFindedProduct from './ModalNoFindedProduct'

const { Text, Title } = Typography
const { Option } = Select

const listaTipoPagamento = [
  { value: 'money', children: 'Dinheiro' },
  { value: 'bolet', children: 'Boleto' },
  { value: 'cardDM', children: 'Cartão débito Master' },
  { value: 'cardDV', children: 'Cartão débito Visa' },
  { value: 'cardCM', children: 'Cartão crédito Master' },
  { value: 'cardCM', children: 'Cartão crédito Visa' }
]

const PDV = ({ list, productList }) => {
  const [isVisibleSearchBarCode, setIsVisibleSearchBarCode] = useState(false)

  const handleClickSearchBarCode = () => setIsVisibleSearchBarCode(true)
  const handleCancelSearchBarCode = () => setIsVisibleSearchBarCode(false)

  return (
    <Row
      style={{
        overflow: 'hidden',
        backgroundColor: '#fff',
        heigth: '100vh'
      }}>
      <Col className={styles.content} span={16}>
        <Title level={3}>Pedido de venda</Title>

        <Row justify="space-between" align="bottom" gutter={[18, 26]}>
          <Col flex="auto">
            <Text>Buscar produto</Text>
            <Select style={{ width: '100%' }}>
              {map(
                ({ value, children }) => (
                  <Option value={value}>{children}</Option>
                ),
                productList
              )}
            </Select>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<BarcodeOutlined />}
              onClick={handleClickSearchBarCode}>
              Buscar cód. barras
            </Button>
          </Col>
        </Row>

        <Row justify="end">
          <Text>
            Total de Itens <Text style={{ color: '#1890FF' }}>4</Text>
          </Text>
        </Row>

        <Divider />

        <div className={styles.wrapperProducts}>
          {map(
            ({ amount, barCode, productName, price }) => (
              <Row justify="space-between" align="middle">
                <Col>
                  <Row>{productName}</Row>
                  <Row>{barCode}</Row>
                </Col>
                <Col>
                  <Row>{amount}</Row>
                </Col>
                <Col>
                  <Row>{price}</Row>
                </Col>
                <Col>
                  <DeleteOutlined />
                </Col>
                <Divider />
              </Row>
            ),
            list
          )}
        </div>
      </Col>

      <Col className={styles.resumo} span={8}>
        <div>
          <Title level={4}>Tipo de venda</Title>
          <Form layout="vertical">
            <Form.Item name="radio-group">
              <Radio.Group style={{ width: '100%' }}>
                <Row justify="space-between">
                  <Radio value="b">Venda rápida</Radio>
                  <Radio value="c">Venda com entrega</Radio>
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <span>Nome do cliente</span>
              <Input />
            </Form.Item>

            <Form.Item>
              <span>Telefone</span>
              <Input />
            </Form.Item>

            <Form.Item>
              <span>Endereço completo</span>
              <Input />
            </Form.Item>

            <Divider />

            <Text>Forma de Pagamento</Text>

            <Form.Item name="pagamento">
              <Radio.Group style={{ width: '100%' }}>
                <Row>
                  {map(
                    ({ value, children }) => (
                      <Col span={12}>
                        <Radio value={value}>{children}</Radio>
                      </Col>
                    ),
                    listaTipoPagamento
                  )}
                </Row>
              </Radio.Group>
            </Form.Item>

            <Divider />

            <Row justify="space-between">
              <Text>Subtotal</Text>
              <Text>R$ xxxx,xx</Text>
            </Row>
            <Row justify="space-between">
              <Text>Desconto</Text>
              <Form.Item>
                <Input />
              </Form.Item>
            </Row>

            <Row justify="space-between">
              <Col>
                <Title>Total</Title>
              </Col>
              <Col>
                <Title style={{ color: '#1890FF' }}>R$ xxxx,xx</Title>
              </Col>
            </Row>

            <Row justify="space-between" gutter={12}>
              <Col span={12}>
                <Button style={{ width: '100%' }} danger>
                  Limpar pedido
                </Button>
              </Col>
              <Col span={12}>
                <Button style={{ width: '100%' }} type="primary">
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>

      <ModalSearchBarCode
        isVisible={isVisibleSearchBarCode}
        handleCancel={handleCancelSearchBarCode}
      />
      <ModalNoFindedProduct isVisible={false} />
    </Row>
  )
}

export default PDV
