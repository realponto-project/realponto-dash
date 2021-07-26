import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Row, Col, Typography } from 'antd'
import styles from './style.module.css'

const { Title } = Typography
const PieChartHome = ({
  data = []
}) => {
  const dataChart = data.length && data.map(item => item && ({...item, value: item && item.total}) )

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
              innerRadius={70}
              outerRadius={90}
              fill="rgb(93, 160, 252)"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill="rgb(93, 160, 252)" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Col>
      <Col span={24}>
        <div className={styles.pieChartLegends}>
          <span className={styles.spanCircle} style={{background: 'rgb(93, 160, 252)'}}/>
          <p className={styles.pieChartLegend}>Vendas: {dataChart.length && dataChart[0] && dataChart[0].value}</p>
        </div>
      </Col>
    </Row>
  )
}

export default PieChartHome
