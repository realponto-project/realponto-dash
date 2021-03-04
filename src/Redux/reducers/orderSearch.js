import {
  SET_ORDER_GLOBAL_SEARCH,
  CLEAN_ORDER_GLOBAL_SEARCH,
} from '../actions/orderSearch'

const initialState = {
  dates: [null, null],
  pendingReview: ['Sim', 'Não'],
  user_name: '',
}

const orderSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_GLOBAL_SEARCH:
      return {
        ...state,
        ...action.payload,
      }
    case CLEAN_ORDER_GLOBAL_SEARCH:
      return initialState
    default:
      return state
  }
}

export default orderSearchReducer
