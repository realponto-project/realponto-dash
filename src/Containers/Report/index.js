import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col, Typography, Card, DatePicker, Button, Empty, Image, Select } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import moment from 'moment'
import Print from './Print'

import NoData from '../../Assets/noData.svg'
import styles from './style.module.css'
import { isEmpty, not, type } from 'ramda'

const { Option } = Select;

const { Title } = Typography
const { Paragraph } = Typography

const dateFormat = 'DD/MM/YYYY'

const Report = ({
  orderSearch,
  handleChangeSearch,
  handleGetAllOrders,
  datasource,
  users
}) => {
  const [orderSelected, setOrderSelected] = useState([])

  const HandleorderSelected = values => () => {
    
    const data = type(values) === 'Array' ? values : [values]
    setOrderSelected(data)
  }

  useEffect(() => {
    if(not(isEmpty(orderSelected))){
      setTimeout(() => {
        window.print()
      }, 100)
    }
  },[orderSelected])

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
                icon={<PrinterOutlined />}
                disabled={!orderSearch.userId}>
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
                placeholder="DD/MM/AAAA"
                onChange={(value) => handleChangeSearch('date', value)}
              />
            </Col>
            <Col span={13}>

            <Select 
              placeholder="Filtre por colaborador" 
              style={{ width: '100%' }}
              value={orderSearch.userId}
              onChange={(value) => handleChangeSearch('userId', value)}
            >
              {users.map(({ id, name}) => (
                <Option key={id} value={id}>{name}</Option>
              ))}
            </Select>
            </Col>
            <Col span={7} style={{ textAlign: 'right' }}>
              <Button style={{ marginRight: '16px' }} >
                Limpar filtros
              </Button>
              <Button type="primary" onClick={handleGetAllOrders} disabled={!orderSearch.userId}>
                Filtrar
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>

      {datasource.length > 0 ? datasource.map(item => (
        <Fragment key={item.id}>
          <Col span={20} style={{ marginTop: '20px' }} className={styles.noPrint}>
            <Title level={5} style={{color: 'rgb(70, 70, 70)'}}>{item.customer ? item.customer.name : 'Cliente não associado'}</Title>
          </Col>
          <Col span={4} style={{ marginTop: '20px' }} align="end" className={styles.noPrint}>
            <Button type="link" onClick={HandleorderSelected(item)}><PrinterOutlined style={{fontSize: '20px'}}/></Button>
          </Col>
          { item.transactions && item.transactions.map(transactionItem => (
            <Col span={24} key={transactionItem.id} className={styles.noPrint}>
              <Card>
                <Row align="middle">
                  <Col span={4}>
                    <Paragraph className={styles.textParagraph}>{item.user && item.user.name}</Paragraph>
                  </Col>
                  <Col span={2}>
                    <Paragraph className={styles.textParagraph}>{moment(transactionItem.createdAt).format('DD/MM/YYYY')}</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Paragraph className={styles.textParagraph}>{transactionItem.product && transactionItem.product.name}</Paragraph>
                  </Col>
                  <Col span={2}>
                    <Paragraph className={styles.textParagraph}>{transactionItem.quantity}</Paragraph>
                  </Col>
                  <Col span={2}>
                    <Button type='link'>Movimentação</Button>
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
      <Print orderSelected={orderSelected} className={styles.print}/>
    </Row>
  )
}

export default Report
