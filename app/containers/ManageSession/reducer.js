/*
 *
 * ManageSession reducer
 *
 */

import { fromJS } from 'immutable';
import * as CONSTANTS from './constants'
import * as ACTIONS from './actions'
export const initialState = fromJS({});

function manageSessionReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.LOGIN_SUCCESS:
      return Object.assign({},state,{loginResponse: action.response});
    case CONSTANTS.LOGIN_FAILURE:
      return Object.assign({},state, {loginFailure: {error:action.error, timestamp: new Date()}})

    case CONSTANTS.SIGNUP_SUCCESS:
      return Object.assign({},state,{signupResponse: action.response});
    case CONSTANTS.SIGNUP_FAILURE:
      return Object.assign({},state, {signupFailure: {error:action.error, timestamp: new Date()}})

    default:
      return state;
  }
}

export default manageSessionReducer;
