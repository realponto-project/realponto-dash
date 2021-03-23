import { compose } from 'ramda'
import React from 'react'
import { withRouter } from 'react-router-dom'

import SuccessContainer from '../../../Containers/Accreditation/Success'

const Success = ({ history }) => {
  const goToLogin = () => history.push('/login')
  return <SuccessContainer goToLogin={goToLogin} />
}

const enhanced = compose(withRouter)

export default enhanced(Success)
