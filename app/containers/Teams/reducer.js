/*
 *
 * Teams reducer
 *
 */


import { fromJS } from 'immutable';

export const initialState = fromJS({});
import * as CONSTANTS from './constants'

function teamssReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.CREATE_TEAM_SUCCESS:
      return Object.assign({},state,{createTeamResponse:action.response})

    case CONSTANTS.CREATE_TEAM_FAILURE:
      return Object.assign({},state, {createTeamError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_TEAMS_SUCCESS:
      return Object.assign({},state,{getTeamResponse:action.response})

    case CONSTANTS.GET_TEAMS_FAILURE:
      return Object.assign({},state, {getTeamError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_TEAM_BY_ID_SUCCESS:
      return Object.assign({},state,{getTeamByIdResponse:action.response})

    case CONSTANTS.GET_TEAM_BY_ID_FAILURE:
      return Object.assign({},state, {getTeamByIdError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.UPDATE_TEAM_SUCCESS:
      return Object.assign({},state,{updateTeamResponse:action.response})

    case CONSTANTS.UPDATE_TEAM_FAILURE:
      return Object.assign({},state, {updateTeamError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.DELETE_TEAM_SUCCESS:
      return Object.assign({},state,{deleteTeamResponse:action.response})

    case CONSTANTS.DELETE_TEAM_FAILURE:
      return Object.assign({},state, {deleteTeamError:{error:action.error,errorTime:new Date()}})

    default:
      return state;
  }
}

export default teamssReducer;
