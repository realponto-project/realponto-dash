import React from 'react'
import { useHistory } from 'react-router-dom'

import HomePageContainer from '../../Containers/HomePage'

const HomePage = () => {
  const history = useHistory()

  const goToLogin = () => history.push('/login')

  return <HomePageContainer 
    goToLogin={goToLogin}
  />
}

export default HomePage
