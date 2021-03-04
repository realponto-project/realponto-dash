import { SET_STATUS, UNSET_STATUS } from '../actions/status'

const initialState = {}

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS:
      return action.payload
    case UNSET_STATUS:
      return initialState
    default:
      return state
  }
}

export default statusReducer
