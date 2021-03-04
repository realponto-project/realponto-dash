import React from 'react'
import { withRouter } from 'react-router-dom'
import UpdateMyPasswordContainer from '../../Containers/UpdateMyPassword'
import { updateUserPassword as updateUserPasswordService } from '../../Services/User'

const UpdateMyPassword = ({
  history,
}) => {

  const handleSubmit = async (values) => {
    try {
      await updateUserPasswordService(values)
    } catch (error) {

    }
  }

  const goToOrder = () => history.push('/order/manager')

  return (
    <UpdateMyPasswordContainer
      handleSubmit={handleSubmit}
      goToOrder={goToOrder}
    />
  )
}

export default withRouter(UpdateMyPassword)
