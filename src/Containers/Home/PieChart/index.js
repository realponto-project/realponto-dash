import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Row, Col, Typography } from 'antd'
import styles from './style.module.css'

const { Title } = Typography
const PieChartHome = ({
  data
}) => {
  const dataChart = data.map(item => ({...item, value: Number(item.value)}))
  let rightPie = data && data[0].value.length === 1 ? '166px' : '145px'
  rightPie = data && data[0].value.length === 2 ? '156px' : rightPie

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Title className={styles.pieChartTitle}>Vendas de hoje</Title>
      </Col>
      <Col span={24}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={800} height={200}>
            <Pie
              data={dataChart}
              innerRadius={100}
              outerRadius={125}
              fill="#E6E6E6"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill="#E6E6E6" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <h1 
          className={styles.totalValueSales}
          style={{
            right: rightPie,
          }}
        >
          {dataChart && dataChart[0].value}
        </h1>
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
