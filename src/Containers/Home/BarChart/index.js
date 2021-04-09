import React from 'react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from 'recharts'
import { Col, Row, Typography } from 'antd'
import styles from './style.module.css'

const { Title } = Typography

const BarChartHome = ({ data }) => {
  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Title className={styles.barChartTitle}>Vendas últimos 15 dias</Title>
      </Col>
      <Col span={24}>
        <div className={styles.barChartLegends}>
          <span className={styles.spanCircle} />
          <p className={styles.barChartLegend}>Vendas</p>
        </div>
      </Col>
      <Col span={24}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width="100%"
            height={260}
            data={data}
            maxBarSize={8}
          >
            <XAxis dataKey="resumeDate" tickMargin={5} />
            <Tooltip labelFormatter={() => 'Vendas'} cursor={{ fillOpacity: 0.3 }} />
            <Bar
              dataKey="total"
              fill="#575A89"
            />
          </BarChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  )
}

export default BarChartHome
