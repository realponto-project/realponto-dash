import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'ramda'

import AddContainer from '../../../Containers/Customer/Add'

const Add = ({ history }) => {
  const goToManager = () => history.push('manager')

  return <AddContainer goToManager={goToManager} />
}

const enhanced = compose(withRouter)
export default enhanced(Add)
