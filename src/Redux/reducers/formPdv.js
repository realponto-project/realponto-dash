import { merge } from 'ramda'

import { SET_FORM_PDV, CLEAR_FORM_PDV } from '../actions/formPdv'

const initialState = {}

const formPdvReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_PDV:
      return {
        ...state, 
        ...action.payload,
      }
    case CLEAR_FORM_PDV:
      return initialState
    default:
      return state
  }
}

export default formPdvReducer
