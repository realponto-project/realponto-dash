import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Row, Col, Typography, Image } from 'antd'
import styles from './style.module.css'
import { isEmpty, map } from 'ramda'

import EmptyImage from '../../../../Assets/empty.svg'

const { Title } = Typography
const PieChartProduct = ({ pieChartData }) => {
  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Title className={styles.pieChartTitle}>Movimentações do produto</Title>
      </Col>

      {isEmpty(pieChartData) ? (
        <Col span={24}>
          <Image src={EmptyImage} preview={false} alt="Empty" />
        </Col>
      ) : (
        <>
          <Col span={24}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart width={800} height={200}>
                <Tooltip cursor={{ fillOpacity: 0.3 }} />
                <Pie
                  data={pieChartData}
                  innerRadius={70}
                  outerRadius={90}
                  fill="#E6E6E6"
                  paddingAngle={0}
                  dataKey="value">
                  {pieChartData.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col span={24}>
            {map(
              ({ name, value, color }) => (
                <div className={styles.pieChartLegends}>
                  <span
                    className={styles.spanCircle}
                    style={{ background: color }}
                  />
                  <p className={styles.pieChartLegend}>
                    {name}: {value}
                  </p>
                </div>
              ),
              pieChartData
            )}
          </Col>
        </>
      )}
    </Row>
  )
}

export default PieChartProduct
