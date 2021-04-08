import {
  SET_MYTEAM_GLOBAL_SEARCH,
  CLEAN_MYTEAM_GLOBAL_SEARCH
} from '../actions/myTeam'

const initialState = {
  activated: ['Ativo', 'Inativo'],
  name: ''
}

const myTeamSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MYTEAM_GLOBAL_SEARCH:
      return {
        ...state,
        ...action.payload
      }
    case CLEAN_MYTEAM_GLOBAL_SEARCH:
      return initialState
    default:
      return state
  }
}

export default myTeamSearchReducer
