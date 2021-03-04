import React from 'react'
import { Menu, Layout } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import AdSide from '../../Components/AdSide'

import {
  HomeOutlined,
  ShrinkOutlined,
  BlockOutlined,
  TeamOutlined,
} from '@ant-design/icons'

const { Sider, Content } = Layout
const menuItems = [
  // {
  //   icon: <HomeOutlined />,
  //   label: 'Resumo',
  //   key: '/logged/dashboard',
  // },
  {
    icon: <TeamOutlined />,
    label: 'Clientes',
    key: '/logged/customer/manager',
  },
  {
    icon: <BlockOutlined />,
    label: 'Produtos',
    key: '/logged/product/manager',
  },
  {
    icon: <ShrinkOutlined />,
    label: 'Ordens',
    key: '/logged/order/manager',
  },
]

const LayoutComponent = ({
  children,
  history,
  location,
  company,
}) => {
  const goTo = ({ key }) => history.push(key)

  return (
    <Layout>
      <Sider
        theme="light"
        collapsible
        collapsed={false}
        width={256}
        trigger={null}
      >
        <Menu
          theme="ligth"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ width: 256 }}
        >
          {menuItems.map(menuItem => (
            <Menu.Item
              {...menuItem}
              onClick={goTo}
            >
              {menuItem.label}
            </Menu.Item>
          ))}
        </Menu>
        {
          location.pathname.replace('/logged/', '') !== 'plans'
          && !company.subscription
          && <AdSide />
        }
      </Sider>
      <Layout >
        <Content
          style={{
            padding: 16,
            minHeight: '100vh',
          }}
        >
          { children || 'Nenhum conteúdo criado!' }
        </Content>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = ({ user, company }) => ({
  company,
})

const enhanced = compose(
  connect(mapStateToProps),
  withRouter,
)

export default enhanced(LayoutComponent)
