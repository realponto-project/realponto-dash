import {
  SET_PRODUCT_GLOBAL_SEARCH,
  CLEAN_PRODUCT_GLOBAL_SEARCH
} from '../actions/productSearch'

const initialState = {
  activated: ['Ativo', 'Inativo'],
  name: '',
}

const productSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_GLOBAL_SEARCH:
      return {
        ...state,
        ...action.payload,
      }
    case CLEAN_PRODUCT_GLOBAL_SEARCH:
      return initialState
    default:
      return state
  }
}

export default productSearchReducer
