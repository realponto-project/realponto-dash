import {
  SET_CUSTOMER_GLOBAL_SEARCH,
  CLEAN_CUSTOMER_GLOBAL_SEARCH,
} from '../actions/customerSearch'

const initialState = {
  search_name_or_document: '',
}

const customerSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_GLOBAL_SEARCH:
      return action.payload
    case CLEAN_CUSTOMER_GLOBAL_SEARCH:
      return initialState
    default:
      return state
  }
}

export default customerSearchReducer
