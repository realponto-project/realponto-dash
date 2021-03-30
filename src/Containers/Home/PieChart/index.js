import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Row, Col, Typography } from 'antd'
import styles from './style.module.css'

const { Title } = Typography
const COLORS = ['#E6E6E6']

const PieChartHome = ({
  data
}) => {
  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Title className={styles.pieChartTitle}>Vendas de hoje</Title>
      </Col>
      <Col span={24}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={800} height={200}>
            <Pie
              data={data}
              innerRadius={100}
              outerRadius={125}
              fill="#E6E6E6"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <h1 className={styles.totalValueSales}>856</h1>
      </Col>
      <Col span={24}>
        <div className={styles.pieChartLegends}>
          <span className={styles.spanCircle} />
          <p className={styles.pieChartLegend}>Vendas</p>
        </div>
      </Col>
    </Row>
  )
}

export default PieChartHome
