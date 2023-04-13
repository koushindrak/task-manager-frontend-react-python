/*
 *
 * Projects reducer
 *
 */


import { fromJS } from 'immutable';

export const initialState = fromJS({});
import * as CONSTANTS from './constants'

function manageProjectsReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.CREATE_PROJECT_SUCCESS:
      return Object.assign({},state,{createProjectResponse:action.response})

    case CONSTANTS.CREATE_PROJECT_FAILURE:
      return Object.assign({},state, {createProjectError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_PROJECTS_SUCCESS:
      return Object.assign({},state,{getProjectResponse:action.response})

    case CONSTANTS.GET_PROJECTS_FAILURE:
      return Object.assign({},state, {getProjectError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_PROJECT_BY_ID_SUCCESS:
      return Object.assign({},state,{getProjectByIdResponse:action.response})

    case CONSTANTS.GET_PROJECT_BY_ID_FAILURE:
      return Object.assign({},state, {getProjectByIdError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.UPDATE_PROJECT_SUCCESS:
      return Object.assign({},state,{updateProjectResponse:action.response})

    case CONSTANTS.UPDATE_PROJECT_FAILURE:
      return Object.assign({},state, {updateProjectError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.DELETE_PROJECT_SUCCESS:
      return Object.assign({},state,{deleteProjectResponse:action.response})

    case CONSTANTS.DELETE_PROJECT_FAILURE:
      return Object.assign({},state, {deleteProjectError:{error:action.error,errorTime:new Date()}})

    default:
      return state;
  }
}

export default manageProjectsReducer;
