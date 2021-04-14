import { adjust, append, findIndex, inc, merge, propEq, __ } from 'ramda'

import {
  SET_STATUS,
  UNSET_STATUS,
  SET_NEW_STATUS,
  SET_UPDATE_STATUS
} from '../actions/status'

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
    case SET_UPDATE_STATUS:
      return merge(state, {
        source: adjust(
          findIndex(propEq('id', action.payload.id), state.source),
          merge(__, { activated: action.payload.activated }),
          state.source
        )
      })

    default:
      return state
  }
}

export default statusReducer
