/*
 *
 * ManageUsers actions
 *
 */

import * as CONSTANTS from './constants'

export function createUser(payload) {
  return {
    type: CONSTANTS.CREATE_USER,
    payload
  };
}

export function getAllUsers() {
  return {
    type: CONSTANTS.GET_USERS
  }
}
export function getAllRoles() {
  return {
    type: CONSTANTS.GET_ALL_ROLES
  }
}
export function getUserById(id) {
  return {
    type: CONSTANTS.GET_USER_BY_ID,
    id
  }
}
export function deleteUserById(id) {
  return {
    type: CONSTANTS.DELETE_USER,
    id
  }
}
export function updateUserById(payload) {
  return {
    type: CONSTANTS.UPDATE_USER,
    payload
  }
}
