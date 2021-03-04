import React from 'react'
import {
  PageHeader,
  Button,
  Menu,
  Dropdown,
  Row,
  Col,
} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Switch, Route, withRouter } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import AdBanner from '../../Components/AdBanner'

const Header = ({
  rootRoutes,
  history,
  location,
  loggoutUser,
  unSetCompany,
  unSetStatus,
  user,
  company,
  cleanCustomer,
  cleanOrder,
  cleanProduct,
}) => {

  const handleNavegator = ({ key }) => {
    if(key === 'loggout') {
      localStorage.removeItem('token')
      localStorage.removeItem('user.name')
      loggoutUser()
      unSetCompany()
      unSetStatus()
      cleanCustomer()
      cleanOrder()
      cleanProduct()
      history.push('/login')
    }

    return history.push(key)
  }

  const menu = (
    <Menu onClick={handleNavegator} style={{ width: 300 }}>
      <Menu.Item key="/logged/account-myinfo">Dados cadastrais</Menu.Item>
      <Menu.Item key="/logged/account-myteam">Gerenciamento de equipe</Menu.Item>
      <Menu.Item key="/logged/account-password">Alterar senha</Menu.Item>
      <Menu.Item key="loggout">Sair</Menu.Item>
    </Menu>
  )

  const renderHeader = props => () => (
    <Row>
      <Col span={12}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {(
            <Button
              icon={<LeftOutlined />}
              onClick={history.goBack}
              type="link"
              disabled={!props.goBack}
              style={{
                opacity: props.goBack ? 1 : 0,
                cursor:  props.goBack ? 'pointer' : 'default',
              }}
            />
          )}
          <h1 style={{
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '32px',
            marginBottom: 0,
          }}>
            {props.title}
          </h1>
        </div>
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
      <Dropdown
        key="1"
        overlay={menu}
        trigger={['click']}
        onClick={e => e.preventDefault()}
      >
        <Button type="link" style={{ fontSize: '14px' }}>
          {user.name || 'Minha Conta'} <DownOutlined />
        </Button>
      </Dropdown>
      </Col>
      <Col span={24}>
        {
          location.pathname.replace('/logged/', '') !== 'plans'
          && !company.subscription
          && <AdBanner />
          }
      </Col>
    </Row>
  )

  const renderRoute = route => (
    <Route
      key={route.path}
      {...route}
      component={renderHeader(route)}
    />
  )

  return (
    <PageHeader style={{ padding: '0 0 16px 0' }}>
      <Switch>
        {rootRoutes.map(renderRoute)}
      </Switch>

    </PageHeader>
  )
}

const mapStateToProps = ({ user, company }) => ({
  user,
  company,
})

const mapDispatchToProps = dispatch => ({
  loggoutUser: () => dispatch({ type: 'USER_LOGOUT' }),
  unSetCompany: () => dispatch({ type: 'UNSET_COMPANY' }),
  unSetStatus: () => dispatch({ type: 'UNSET_STATUS' }),
  cleanCustomer: () => dispatch({ type: 'CLEAN_CUSTOMER_GLOBAL_SEARCH' }),
  cleanOrder: () => dispatch({ type: 'CLEAN_ORDER_GLOBAL_SEARCH' }),
  cleanProduct: () => dispatch({ type: 'CLEAN_PRODUCT_GLOBAL_SEARCH' }),
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)

export default enhanced(Header)
