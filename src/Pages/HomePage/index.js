import React from 'react'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'

import HomePageContainer from '../../Containers/HomePage'

const HomePage = ({ history }) => {

  const goToLogin = () => history.push('/login')

  return <HomePageContainer 
    goToLogin={goToLogin}
  />
}

const enhanced = compose(withRouter)

export default enhanced(HomePage)
