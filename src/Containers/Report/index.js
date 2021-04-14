import React, { Fragment, useState } from 'react'
import { Row, Col, Typography, Card, DatePicker, Input, Button, Empty, Image } from 'antd'
import { SearchOutlined, PrinterOutlined } from '@ant-design/icons'
import moment from 'moment'
import Print from './Print'

import NoData from '../../Assets/noData.svg'
import styles from './style.module.css'

const { Title } = Typography
const { Paragraph } = Typography

const dateFormat = 'DD/MM/YYYY'

const Report = ({
  orderSearch,
  handleChangeSearch,
  handleGetAllOrders,
  datasource
}) => {
  const [orderSelected, setOrderSelected] = useState(null)

  const HandleorderSelected = values => () => {
    const data = values.lenth ? values : [values]
    setOrderSelected(data)
    window.print()
  }

  return (
    <Row>
      <Col span={24} style={{ marginBottom: '16px' }} className={styles.noPrint}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Imprima suas ordens
              </Title>
              <p style={{ marginBottom: 0 }}>
                Clique no botão e imprima suas ordens
              </p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={HandleorderSelected(datasource)}
                icon={<PrinterOutlined />}>
                Imprimir ordens
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} className={styles.noPrint}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={4}>
              <DatePicker
                format={dateFormat}
                placeholder="20/11/2021"
                onChange={(value) => handleChangeSearch('date', value)}
              />
            </Col>
            <Col span={13}>
              <Input
                name="user_name"
                value={orderSearch.user_name}
                placeholder="Filtre por colaborador"
                prefix={<SearchOutlined />}
                onChange={({ target: { value, name } }) => handleChangeSearch(name, value)}
              />
            </Col>
            <Col span={7} style={{ textAlign: 'right' }}>
              <Button style={{ marginRight: '16px' }} >
                Limpar filtros
              </Button>
              <Button type="primary" onClick={handleGetAllOrders}>
                Filtrar
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>

      {datasource.length > 0 ? datasource.map(item => (
        <Fragment key={item.id} className={styles.noPrint}>
          <Col span={20} style={{ marginTop: '50px' }} className={styles.noPrint}>
            <Title level={5}>{item.customer ? item.customer.name : 'Cliente não associado'}</Title>
          </Col>
          <Col span={4} style={{ marginTop: '50px' }} align="end" className={styles.noPrint}>
            <Button type="link" onClick={HandleorderSelected(item)}>Imprimir ordem</Button>
          </Col>
          { item.transactions && item.transactions.map(transactionItem => (
            <Col span={24} key={transactionItem.id} className={styles.noPrint}>
              <Card>
                <Row align="middle">
                  <Col span={2} align="center">
                    <Paragraph className={styles.textParagraph}>{item.user && item.user.name}</Paragraph>
                  </Col>
                  <Col span={4} align="center">
                    <Paragraph className={styles.textParagraph}>{moment(transactionItem.createdAt).format('DD/MM/YYYY')}</Paragraph>
                  </Col>
                  <Col span={12} align="center">
                    <Paragraph className={styles.textParagraph}>{transactionItem.product && transactionItem.product.name}</Paragraph>
                  </Col>
                  <Col span={2} align="center">
                    <Paragraph className={styles.textParagraph}>{transactionItem.quantity}</Paragraph>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Fragment>
      )) :
        <Col span={24} align="center" style={{marginTop: '16px'}} className={styles.noPrint}>
          <Card>
            <Empty
              style={{color: 'rgb(114, 113, 113)'}}
              description="Não há dados"
              image={<Image width={85} src={NoData} preview={false} />}
            />
          </Card>
        </Col>
      }
      <Print orderSelected={orderSelected} />
    </Row>
  )
}

export default Report
