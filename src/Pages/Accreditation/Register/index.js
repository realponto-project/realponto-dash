import React from 'react'
import { applySpec, compose, pathOr } from 'ramda'
import { withRouter } from 'react-router-dom'

import RegisterContainer from '../../../Containers/Accreditation/Register'
import { createCompany } from '../../../Services/Company'

const buildCompany = applySpec({
  name: pathOr('', ['razaoSocial']),
  document: pathOr('', ['cnpj'])
})
const buildUser = applySpec({
  name: pathOr('', ['responsible']),
  email: pathOr('', ['email']),
  password: pathOr('', ['password']),
  firstAccess: () => false
})

const buildPayload = applySpec({
  company: buildCompany,
  user: buildUser
})

const Register = ({ history }) => {
  const handleClickContinue = async (formData) => {
    try {
      await createCompany(buildPayload(formData))

      history.push('/register/sucess')
    } catch (err) {
      history.push('/register/sucess')
    }
  }

  return <RegisterContainer handleClickContinue={handleClickContinue} />
}

const enhanced = compose(withRouter)

export default enhanced(Register)
