import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import OnboardingContainer from '../../Containers/Onboarding'
import {
  updateUserPassword as updateUserPasswordService,
  updateMyInfo as updateMyInfoService
} from '../../Services/User'


const Onboarding = ({ user, loggedUser, history }) => {
  const [errorMessage, setErrorMessage] = useState(false)

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
      const { data } = await updateMyInfoService((userId = user.id), {
        ...values,
        document: values.document.replace(/\D/g, '')
      })
      loggedUser({
        ...user,
        ...data
      })
    } catch (error) {
      setErrorMessage(error.response.data.error)
      throw error
    }
  }


  return (
    <OnboardingContainer
      user={user}
      updateMyInfo={updateMyInfo}
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
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
