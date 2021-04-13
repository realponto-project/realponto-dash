import { anyPass, isEmpty, isNil } from 'ramda'

const orderInfoValidators = {
  customerId: false,
  userId: true
}

const transactionValidators = {
  statusId: true
}

const productValidators = {
  products: true
}

const validatorAddProductSettings = {
  productId: true,
  quantity: true,
  statusProduct: true
}

const fieldsRequired = [
  transactionValidators,
  orderInfoValidators,
  productValidators
]

const isNilOrEmpty = anyPass([isEmpty, isNil])

const validatorForm = (validatorsettings, formValues) => {
  let errors = {}
  for (const key in formValues) {
    if (validatorsettings[key] && isNilOrEmpty(formValues[key])) {
      errors = {
        ...errors,
        [key]: 'Campo obrigatório!'
      }
    }
  }

  return errors
}

const validatorStep = (formValues, currentStep = null) => {
  if (!isNil(currentStep)) {
    return validatorForm(fieldsRequired[currentStep], formValues)
  }

  return validatorForm(validatorAddProductSettings, formValues)
}

export default validatorStep
