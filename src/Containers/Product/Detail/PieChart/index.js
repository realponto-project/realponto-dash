import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Row, Col, Typography } from 'antd'
import styles from './style.module.css'

const { Title } = Typography
const PieChartProduct = ({
  pieChartData,
}) => {
  const dataChart = [{ name: 'Entrada', value: 150 }, { name: 'Saída', value: 50 }]
  let rightPie = dataChart && dataChart[0].value.length === 1 ? '166px' : '145px'
  rightPie = dataChart && dataChart[0].value.length === 2 ? '156px' : rightPie

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Title className={styles.pieChartTitle}>Movimentações do produto</Title>
      </Col>
      <Col span={24}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={800} height={200}>
            <Tooltip cursor={{ fillOpacity: 0.3 }} />
            <Pie
              data={dataChart}
              innerRadius={100}
              outerRadius={125}
              fill="#E6E6E6"
              paddingAngle={0}
              dataKey="value"
            >
              {dataChart.map((item, index) => (
                <Cell key={`cell-${index}`} fill={item.name === 'Entrada' ? "rgb(93, 160, 252)" : 'rgb(23, 201, 178)'} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Col>
      <Col span={24}>
        <div className={styles.pieChartLegends}>
          <span className={styles.spanCircle} style={{ background: 'rgb(93, 160, 252)' }}/>
          <p className={styles.pieChartLegend}>Entrada</p>
        </div>
        <div className={styles.pieChartLegends}>
          <span className={styles.spanCircle} style={{ background: 'rgb(23, 201, 178)' }}/>
          <p className={styles.pieChartLegend}>Saida</p>
        </div>
      </Col>
    </Row>
  )
}

export default PieChartProduct
