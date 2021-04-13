import { append, inc, merge } from 'ramda'

import { SET_STATUS, UNSET_STATUS, SET_NEW_STATUS } from '../actions/status'

const initialState = {
  total: 0,
  source: []
}

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS:
      return action.payload
    case UNSET_STATUS:
      return initialState
    case SET_NEW_STATUS:
      return merge(state, {
        source: append(action.payload, state.source),
        total: inc(state.total)
      })

    default:
      return state
  }
}

export default statusReducer
