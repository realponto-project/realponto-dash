import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import { updateMyInfo as updateMyInfoService } from '../../Services/User'
import MyInfoContainer from '../../Containers/MyInfo'

const MyInfo = ({
  user,
  loggedUser,
}) => {
  const updateMyInfo = async (values) => {
    try {
      const { data } = await updateMyInfoService(user.id, values)
      loggedUser({
        ...user,
        ...data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MyInfoContainer
      user={user}
      updateMyInfo={updateMyInfo}
    />
  )
}

const mapStateToProps = ({ user }) => ({
  user,
})

const mapDispatchToProps = dispatch => ({
  loggedUser: payload => dispatch({ type: 'USER_LOGGED', payload }),
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhanced(MyInfo)
