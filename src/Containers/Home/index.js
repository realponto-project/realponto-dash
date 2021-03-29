import React from 'react'
import {
  Row,
  Col,
  Image
} from 'antd'
import PieChart from './PieChart'
import BarChart from './BarChart'
import OrdersSvg from './orders.svg'
import CustomersSvg from './customers.svg'
import PersonAd from './personAd.png'
import styles from './style.module.css'

const Home = ({
  dataBarChart,
  dataPieChart
}) => {
  return (
    <Row gutter={[18, 18]}>
      <Col span={24}>
        <h1 className={styles.welcomeTitle}>Bem Vindo</h1>
        <p className={styles.welcomeSubtitle}>Ao <b>alxa dashboard</b> para suas análises</p>
      </Col>
      <Col span={12}>
        <div className={styles.cardPremiumAd}>
          <div>
            <h2 className={styles.cardPremiumTitle}>HOME PREMIUM</h2>
            <p className={styles.cardPremiumSubtitle}>Aguarde em breve no <b>alxa</b>, nova <b>Home Premium</b>,  mais controle e métricas.</p>
          </div>
          <Image src={PersonAd} alt="person ad" preview={false} />
        </div>
      </Col>
      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de Pedidos</h1>
            <h1 className={styles.cardTotalValue}>872</h1>
          </div>
          <Image preview={false} src={OrdersSvg} alt="orders" />
        </div>
      </Col>
      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de Clientes</h1>
            <h1 className={styles.cardTotalValue}>872</h1>
          </div>
          <Image src={CustomersSvg} preview={false} alt="customers" />
        </div>
      </Col>
      <Col span={18}>
        <div className={styles.cardBarChart}>
          <BarChart data={dataBarChart} />
        </div>
      </Col>
      <Col span={6}>
        <div className={styles.cardPieChart}>
          <PieChart data={dataPieChart} />
        </div>
      </Col>
    </Row>
  )
}

export default Home
