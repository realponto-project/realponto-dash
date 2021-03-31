import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import OnboardingContainer from '../../Containers/Onboarding'
import {
  updateUserPassword as updateUserPasswordService,
  updateMyInfo as updateMyInfoService
} from '../../Services/User'

const Onboarding = ({ user, loggedUser, history }) => {
  const handleSubmit = async (values) => {
    try {
      await updateUserPasswordService(values)
      history.push('/logged/dashboard')
    } catch (error) {
      updateMyInfoService(user.id, { firstAccess: true })
        .then(() => history.push('/logged/dashboard'))
      console.log(error)
    }
  }

  const updateMyInfo = async (userId, values) => {
    try {
      const { data } = await updateMyInfoService((userId = user.id), values)
      loggedUser({
        ...user,
        ...data
      })
    } catch (error) {
      console.log(error)
      history.push('/logged/dashboard')
    }
  }

  return (
    <OnboardingContainer
      user={user}
      updateMyInfo={updateMyInfo}
      handleSubmit={handleSubmit}
    />
  )
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({
  loggedUser: (payload) => dispatch({ type: 'USER_LOGGED', payload })
})

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)

export default enhanced(Onboarding)
