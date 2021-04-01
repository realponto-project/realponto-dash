import { merge } from 'ramda'

import { SET_FORM_PDV, CLEAR_FORM_PDV } from '../actions/formPdv'

const initialState = {
  discount: 0,
  productsSelcts: []
}

const formPdvReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_PDV:
      return merge(state, action.payload)
    case CLEAR_FORM_PDV:
      return initialState
    default:
      return state
  }
}

export default formPdvReducer
