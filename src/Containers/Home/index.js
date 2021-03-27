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

const Home = ({
  dataBarChart,
  dataPieChart
}) => {
  return (
    <Row gutter={[18, 18]}>
      <Col span={24}>
        <h1
          style={{
            color: '4A4A4A',
            fontFamily: 'Lato',
            fontSize: '28px'
          }}
        >Bem Vindo</h1>
        <p
          style={{
            color: '4A4A4A',
            fontFamily: 'Lato',
            fontSize: '14px'
          }}
        >Ao <b>alxa dashboard</b> para suas análises</p>
      </Col>
      <Col span={12}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '3px',
            boxShadow: '(0px 4px 4px rgba(0, 0, 0, 0.1))',
            boxSizing: 'border-box',
            maxHeight: '157px',
            minHeight: '157px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h2
              style={{
                color: '4A4A4A',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                padding: '20px 0 0 20px',
                fontSize: '18px'
              }}
            >HOME PREMIUM</h2>
            <p
              style={{
                color: '4A4A4A',
                fontFamily: 'Roboto',
                fontSize: '13px',
                width: '80%',
                padding: '0 20px'
              }}
            >Aguarde em breve no <b>alxa</b>, nova <b>Home Premium</b>,  mais controle e métricas.</p>
          </div>
          <Image src={PersonAd} alt="person ad" preview={false} />
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '3px',
            boxShadow: '(0px 4px 4px rgba(0, 0, 0, 0.1))',
            padding: '20px',
            boxSizing: 'border-box',
            maxHeight: '157px',
            minHeight: '157px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '16px',
                color: '#333',
                margin: '0',
                padding: '0'
              }}
            >Total de Pedidos</h1>
            <h1
              style={{
                fontSize: '40px',
                color: '#333',
                fontWeight: '500',
                margin: '0',
                padding: '0'
              }}
            >872</h1>
          </div>
          <Image preview={false} src={OrdersSvg} alt="orders" />
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '3px',
            boxShadow: '(0px 4px 4px rgba(0, 0, 0, 0.1))',
            padding: '20px',
            boxSizing: 'border-box',
            maxHeight: '157px',
            minHeight: '157px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '16px',
                color: '#333',
                margin: '0',
                padding: '0'
              }}
            >Total de Clientes</h1>
            <h1
              style={{
                fontSize: '40px',
                color: '#333',
                fontWeight: '500',
                margin: '0',
                padding: '0'
              }}
            >872</h1>
          </div>
          <Image src={CustomersSvg} preview={false} alt="customers" />
        </div>
      </Col>
      <Col span={18}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '3px',
            boxShadow: '(0px 4px 4px rgba(0, 0, 0, 0.1))',
            padding: '20px',
            boxSizing: 'border-box',
            maxHeight: '600px'
          }}
        >
          <BarChart data={dataBarChart} />
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '3px',
            boxShadow: '(0px 4px 4px rgba(0, 0, 0, 0.1))',
            padding: '20px',
            boxSizing: 'border-box',
            maxHeight: '600px',
            minHeight: '300px'
          }}
        >
          <PieChart data={dataPieChart} />
        </div>
      </Col>
    </Row>
  )
}

export default Home
