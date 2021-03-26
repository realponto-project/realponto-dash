import React from 'react'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Typography
} from 'antd'
import {
  addIndex,
  length,
  map
  //  replace
} from 'ramda'
import {
  BarcodeOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons'

import styles from './style.module.css'
import ModalSearchBarCode from './ModalSearchBarCode'
import ModalNotFoundProduct from './ModalNotFoundProduct'

const { Text, Title } = Typography
const { Option } = Select

const listaTipoPagamento = [
  { value: 'money', children: 'Dinheiro' },
  { value: 'bolet', children: 'Boleto' },
  { value: 'cardDM', children: 'Cartão débito Master' },
  { value: 'cardDV', children: 'Cartão débito Visa' },
  { value: 'cardCM', children: 'Cartão crédito Master' },
  { value: 'cardCV', children: 'Cartão crédito Visa' }
]

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]

const PDV = ({
  form,
  productList,
  handleChangeSelect,
  handleClickClear,
  handleClickDown,
  handleClickUp,
  handleClickDelete,
  handleSearchBarCode,
  subTotal,
  handleClickSearchBarCode,
  handleCancelSearchBarCode,
  isVisibleNotFoundProduct,
  handleCancelNotFountProduct,
  handleClickTryAgain,
  searchValue,
  handleChangeSearchValue,
  isVisibleSearchBarCode,
  onValuesChange
}) => {
  // const [desconto, setDesconto] = useState(0)
  return (
    <Form
      form={form}
      onFinish={(formData) => console.log(formData)}
      layout="vertical"
      onValuesChange={onValuesChange}>
      <Row>
        <Col className={styles.content} span={16}>
          <Title level={3}>Pedido de venda</Title>

          <Form.List name="productsSelcts">
            {(fields, { add, remove }, { errors }) => {
              // console.log(fields)
              return (
                <>
                  <Row justify="space-between" align="bottom" gutter={[18, 26]}>
                    <Col flex="auto">
                      <Text>Buscar produto</Text>
                      <Select
                        value={null}
                        style={{ width: '100%' }}
                        onChange={(_, { item }) => {
                          handleChangeSelect(item, add)
                        }}>
                        {map(
                          (item) => (
                            <Option key={item.id} value={item.id} item={item}>
                              {item.name}
                            </Option>
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

                  <Form.Item noStyle shouldUpdate>
                    {({ getFieldValue }) => {
                      const productsSelcts =
                        getFieldValue('productsSelcts') || []
                      // console.log('>>>', getFieldValue('productsSelcts'))

                      return (
                        <>
                          <Row justify="end">
                            <Text>
                              Total de Itens{' '}
                              <Text style={{ color: '#1890FF' }}>
                                {length(productsSelcts)}
                              </Text>
                            </Text>
                          </Row>

                          <Divider />

                          <div className={styles.wrapperProducts}>
                            {addIndex(map)(
                              (
                                { id, amount, barCode, name, salePrice },
                                index
                              ) => {
                                return (
                                  <Row
                                    key={id}
                                    align="middle"
                                    className={styles.wrapperProduct}
                                    gutter={10}>
                                    <Col span={10}>
                                      <Row>
                                        <label className={styles.productName}>
                                          {name}
                                        </label>
                                      </Row>
                                      <Row>
                                        <label
                                          className={styles.productBarCode}>
                                          {barCode}
                                        </label>
                                      </Row>
                                    </Col>
                                    <Col span={4}>
                                      <Row
                                        className={styles.productAmount}
                                        justify="center"
                                        align="middle"
                                        gutter={10}>
                                        <Col>
                                          <DownOutlined
                                            onClick={() => handleClickDown(id)}
                                          />
                                        </Col>
                                        <Col>
                                          <Row>
                                            <label>{amount}</label>
                                          </Row>
                                        </Col>
                                        <Col>
                                          <UpOutlined
                                            onClick={() => handleClickUp(id)}
                                          />
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col span={8}>
                                      <Row justify="end">
                                        <label
                                          className={styles.productPriceUnit}>
                                          x {salePrice}
                                        </label>
                                      </Row>
                                      <Row justify="end">
                                        <label
                                          className={styles.productPriceTotal}>
                                          {amount * salePrice}
                                        </label>
                                      </Row>
                                    </Col>
                                    <Col span={2}>
                                      <Row justify="end">
                                        <DeleteOutlined
                                          onClick={() => remove(index)}
                                          className={styles.delete}
                                        />
                                      </Row>
                                    </Col>
                                  </Row>
                                )
                              },
                              productsSelcts
                            )}
                          </div>
                        </>
                      )
                    }}
                  </Form.Item>
                </>
              )
            }}
          </Form.List>
        </Col>

        <Col className={styles.resumo} span={8}>
          <div>
            <Title level={4}>Resumo</Title>

            <Form.Item rules={rules} name="type" label="Tipo de venda">
              <Radio.Group style={{ width: '100%' }}>
                <Row justify="space-between">
                  <Radio value="fast">Venda rápida</Radio>
                  <Radio value="delivery">Venda com entrega</Radio>
                </Row>
              </Radio.Group>
            </Form.Item>

            <span>Nome do cliente</span>
            <Form.Item name="name">
              <Input />
            </Form.Item>

            <span>Telefone</span>
            <Form.Item name="telphone">
              <Input />
            </Form.Item>

            <span>Endereço completo</span>
            <Form.Item name="address">
              <Input />
            </Form.Item>

            <Divider />

            <Form.Item
              label="Forma de Pagamento"
              rules={rules}
              name="pagamento">
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
              <Text>R$ {subTotal}</Text>
            </Row>
            <Row justify="space-between">
              <Text>Desconto</Text>
              <Form.Item name="discount">
                <InputNumber
                  className={styles.productDiscount}
                  formatter={(value) =>
                    `-R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/-R\$\s?|(,*)/g, '')}
                  min={0}
                  max={subTotal}
                />
              </Form.Item>
            </Row>

            <Row justify="space-between">
              <Col>
                <Title>Total</Title>
              </Col>
              <Col>
                <Form.Item
                  shouldUpdate={(prevValues, curValues) => {
                    console.log(!isNaN(Number(curValues.discount)))
                    return false
                    // return (
                    //   // prevValues.discount !== curValues.discount &&
                    //   !isNaN(Number(curValues.discount))
                    // )
                  }}>
                  {({ getFieldValue }) => {
                    console.log('updated')
                    return (
                      <Title style={{ color: '#1890FF' }}>
                        R$ {subTotal - getFieldValue('discount')}
                      </Title>
                    )
                  }}
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-between" gutter={12}>
              <Col span={12}>
                <Button
                  style={{ width: '100%' }}
                  onClick={handleClickClear}
                  danger>
                  Limpar pedido
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  htmlType="submit"
                  style={{ width: '100%' }}
                  type="primary">
                  Salvar
                </Button>
              </Col>
            </Row>
          </div>
        </Col>

        <ModalSearchBarCode
          isVisible={isVisibleSearchBarCode}
          handleCancel={handleCancelSearchBarCode}
          handleSearch={handleSearchBarCode}
          searchValue={searchValue}
          handleChangeSearchValue={handleChangeSearchValue}
        />
        <ModalNotFoundProduct
          handleCancel={handleCancelNotFountProduct}
          isVisible={isVisibleNotFoundProduct}
          handleClickTryAgain={handleClickTryAgain}
        />
      </Row>
    </Form>
  )
}

export default PDV
