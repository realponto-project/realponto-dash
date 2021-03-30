import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import OnboardingContainer from '../../Containers/Onboarding'
import {
  updateUserPassword as updateUserPasswordService,
  updateMyInfo as updateMyInfoService
} from '../../Services/User'

const Onboarding = ({ user, loggedUser }) => {
  const handleSubmit = async (values) => {
    try {
      await updateUserPasswordService(values)
    } catch (error) {
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

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhanced(Onboarding)
