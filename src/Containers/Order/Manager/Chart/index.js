import React from 'react'
import { Row, Col, Typography } from 'antd'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

import formattedDate from '../../../../utils/parserDate'
import { Tag } from 'antd'

const { Title } = Typography

const Chart = ({
  data,
  chartSettings
}) => (
  <Row gutter={[0, 16]}>
    <Col span={24}>
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={data}
          height={380}
          margin={{ left: 15 }}
          maxBarSize={17}
        >
          <XAxis
            axisLine={false}
            dataKey="name"
            tick={{ fontSize: 13 }}
            tickFormatter={value => formattedDate(value, 'DD/MM/YYYY')}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            height={50}
            label={(
              <text
                fontSize="13"
                textAnchor="end"
                transform="rotate(270, 13, 143)"
                x="120"
                y="140"
              >
                <tspan>Os totais estão por quantidade de ordens e não de itens!</tspan>
              </text>
            )}
            tick={{ fontSize: 13 }}
          />
          <CartesianGrid
            stroke="#d7d7d7"
            vertical={false}
          />
          <Tooltip
            cursor={{ fillOpacity: 0.3 }}
            labelFormatter={value => formattedDate(value, 'DD/MM/YYYY')}
          />
          {
              chartSettings.map(({ label, color, value }) => (
                <Bar
                  dataKey={label}
                  fill={color}
                  key={label}
                  name={value}
                  stackId="a"
                  stroke={color}
                  type="monotone"
                />
              ))
            }
        </BarChart>
      </ResponsiveContainer>
    </Col>
    <Row style={{ marginTop: "20px" }} gutter={[8, 8]} wrap={true} >
      <Col span={24}>
        <Title level={5}>LEGENDAS</Title>
      </Col>
      {chartSettings.map(({ color, value }) => (
        <Col key={`${color}-${value}`} xs={8} sm={8} md={8} lg={8} xl={8}>
          <Tag color={color}>
            {value}
          </Tag>
        </Col>
      ))}
    </Row>
  </Row>
)

export default Chart