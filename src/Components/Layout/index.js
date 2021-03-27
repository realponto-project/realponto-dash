import React from 'react'
import { Image, Menu, Layout } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, pathOr } from 'ramda'
import Logo from '../../Assets/logo.svg'
import AdSide from '../../Components/AdSide'

import {
  DotChartOutlined,
  ShrinkOutlined,
  BlockOutlined,
  CalculatorOutlined,
  TeamOutlined
} from '@ant-design/icons'

const { Sider, Content } = Layout
const menuItems = [
  {
    icon: <DotChartOutlined />,
    label: 'Resumo',
    key: '/logged/dashboard'
  },
  {
    icon: <TeamOutlined />,
    label: 'Clientes',
    key: '/logged/customer/manager'
  },
  {
    icon: <BlockOutlined />,
    label: 'Produtos',
    key: '/logged/product/manager'
  },
  {
    icon: <CalculatorOutlined />,
    label: 'Ponto de venda',
    key: '/logged/pdv'
  },
  {
    icon: <ShrinkOutlined />,
    label: 'Ordens',
    key: '/logged/order/manager'
  }
]

const LayoutComponent = ({ children, history, location, company }) => {
  const goTo = ({ key }) => history.push(key)
  const companyName = pathOr('', ['name'], company)
  const parseCompanyName = companyName.length > 18 ? `${companyName.substr(0, 18)}...` : companyName

  return (
    <Layout>
      <Sider
        theme="light"
        collapsible
        collapsed={false}
        width={256}
        trigger={null}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}>
        <div
          style={{
            padding: '24px 0 24px 24px',
            margin: 'auto'
          }}
        >
          <Image
            style={{
              position: 'relative',
              width: '150px',
              height: '79px',
              margin: 'auto'
            }}
            preview={false}
            width={220}
            src={Logo}
          />
          <p
            style={{
              color: '#454550',
              fontSize: '16px'
            }}
            title={parseCompanyName}
          >
            {parseCompanyName}
          </p>
        </div>
        <Menu
          theme="ligth"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ width: 256 }}>
          {menuItems.map((menuItem) => (
            <Menu.Item {...menuItem} key={menuItem.key} onClick={goTo}>
              {menuItem.label}
            </Menu.Item>
          ))}
        </Menu>
        {location.pathname.replace('/logged/', '') !== 'plans' &&
          !company.subscription && <AdSide />}
      </Sider>
      <Layout>
        <Content
          style={{
            marginLeft: '256px',
            padding: 16,
            minHeight: '100vh'
          }}>
          {children || 'Nenhum conteúdo criado!'}
        </Content>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = ({ company }) => ({
  company
})

const enhanced = compose(connect(mapStateToProps), withRouter)

export default enhanced(LayoutComponent)
