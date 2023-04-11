/*
 *
 * ManageUsers reducer
 *
 */

import { fromJS } from 'immutable';
import * as CONSTANTS from './constants'
import {object} from "prop-types";
export const initialState = fromJS({});

function manageUsersReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.GET_USERS_SUCCESS:
      return Object.assign({},state,{getUsersResponse:action.response})

    case CONSTANTS.GET_USERS_FAILURE:
      return Object.assign({},state, {getUsersError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_USER_BY_ID_SUCCESS:
      return Object.assign({},state,{getUserByIdResponse:action.response})

    case CONSTANTS.GET_USER_BY_ID_FAILURE:
      return Object.assign({},state, {getUserByIdError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.UPDATE_USER_SUCCESS:
      return Object.assign({},state,{updateUserResponse:action.response})

    case CONSTANTS.UPDATE_USER_FAILURE:
      return Object.assign({},state, {updateUserError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.DELETE_USER_SUCCESS:
      return  Object.assign({},state,{deleteUserResponse:action.response})

    case CONSTANTS.DELETE_USER_FAILURE:
    // add current timestamp for error case kyuki agar do baar same error aati hai toh woh componentwillreceivePorps ka if case execute nhi ho pata
      return Object.assign({},state, {deleteUserError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_ALL_ROLES_SUCCESS:
      return Object.assign({},state,{getAllRolesResponse:action.response})

    case CONSTANTS.GET_ALL_ROLES_FAILURE:
      return Object.assign({},state, {getAllRolesError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.CREATE_USER_SUCCESS:
      return Object.assign({},state,{createUserResponse:action.response})

    case CONSTANTS.CREATE_USER_FAILURE:
      return Object.assign({},state,{createUserError: {error:action.error,errorTime:new Date()}})

    default:
      return state;
  }
}

export default manageUsersReducer;
