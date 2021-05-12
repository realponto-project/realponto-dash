import React from 'react'
import { Col, Row, Tabs } from 'antd'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { map } from 'ramda'

import Credits from '../Credits'
import UpdateMyPassword from '../UpdateMyPassword'
import StatusManager from '../Status/Manager'
import MyTeam from '../MyTeam'
import Company from '../Company'

const { TabPane } = Tabs

const tabs = [
  {
    key: '/logged/settings/company',
    tab: 'Dados cadastrais'
  },
  {
    key: '/logged/settings/credits',
    tab: 'Movimentações de créditos'
  },
  {
    key: '/logged/settings/account-myteam',
    tab: 'Gerenciamento de equipe'
  },
  {
    key: '/logged/settings/status',
    tab: 'Status'
  },
  {
    key: '/logged/settings/account-password',
    tab: 'Alterar senha'
  }
]

const Settings = () => {
  const history = useHistory()
  const location = useLocation()

  return (
    <Row>
      <Col span={24}>
        <Tabs
          activeKey={location.pathname}
          onTabClick={(path) => history.push(path)}>
          {map(
            ({ key, tab }) => (
              <TabPane tab={tab} key={key} />
            ),
            tabs
          )}
        </Tabs>
      </Col>
      <Col span={24}>
        <Switch>
          <Route exact path="/logged/settings/credits" component={Credits} />
          <Route
            exact
            path="/logged/settings/account-password"
            component={UpdateMyPassword}
          />
          <Route
            exact
            path="/logged/settings/status"
            component={StatusManager}
          />
          <Route
            exact
            path="/logged/settings/account-myteam"
            component={MyTeam}
          />
          <Route
            exact
            path="/logged/settings/company"
            component={Company}
          />
        </Switch>
      </Col>
    </Row>
  )
}

export default Settings
