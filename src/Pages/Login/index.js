import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import LoginContainer from '../../Containers/Login'
import Auth from '../../Services/Auth'
import getCompanyById from '../../Services/Company'
import getAllStatus from '../../Services/Status'

const Login = ({
  history,
  loggedUser,
  setCompany,
  setStatus,
}) => {
  const authentication = (values) => {
      Auth(values)
        .then(({ data }) => {
          loggedUser(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('user.name', data.name)
          return data.companyId
        })
        .then(companyId => getCompanyById(companyId))
        .then(({ data }) => setCompany(data))
        .then(() => getAllStatus({ limit: 9999 }))
        .then(({ data }) => setStatus(data))
        .then(() => history.push('/logged/order/manager'))
        .catch(err => console.log(err))
  }

  return (
    <LoginContainer authentication={authentication} />
  )
}

const mapDispatchToProps = dispatch => ({
  loggedUser: payload => dispatch({ type: 'USER_LOGGED', payload }),
  setCompany: payload => dispatch({ type: 'SET_COMPANY', payload }),
  setStatus: payload => dispatch({ type: 'SET_STATUS', payload }),
})

const enhanced = compose(
  connect(null, mapDispatchToProps),
  withRouter,
)

export default enhanced(Login)
