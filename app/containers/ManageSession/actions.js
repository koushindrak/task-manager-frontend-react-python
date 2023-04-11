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
