import React from 'react'
import { withRouter } from 'react-router-dom'
import PDVContainer from '../../Containers/PDV'

const PDV = ({
  history,
}) => {

  return (
    <PDVContainer />
  )
}

export default withRouter(PDV)
