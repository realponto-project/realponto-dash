import {
  SET_STATUS_GLOBAL_SEARCH,
  CLEAN_STATUS_GLOBAL_SEARCH
} from '../actions/statusSearch'

const initialState = {
  activated: ['Ativo', 'Inativo'],
  name: ''
}

const statusSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS_GLOBAL_SEARCH:
      return {
        ...state,
        ...action.payload
      }
    case CLEAN_STATUS_GLOBAL_SEARCH:
      return initialState
    default:
      return state
  }
}

export default statusSearchReducer
