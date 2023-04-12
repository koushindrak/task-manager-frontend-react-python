/*
 *
 * ManageSession actions
 *
 */

import * as CONSTANTS from './constants'


export function login(payload) {
  return {
    type: CONSTANTS.LOGIN,
    payload
  }
}

export function signup(payload) {
  console.log("SIGNUP ACTION CALLED")
  return {
    type: CONSTANTS.SIGNUP,
    payload
  }
}
