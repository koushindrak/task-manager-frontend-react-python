/*
 *
 * Teams actions
 *
 */

import * as CONSTANTS from './constants';

export function createTeam(payload) {
  return {
    type: CONSTANTS.CREATE_TEAM,
    payload
  }
}

export function getTeams() {
  return{
    type: CONSTANTS.GET_TEAMS
  }
}
export function getTeamById(id) {
  return {
    type: CONSTANTS.GET_TEAM_BY_ID,
    id
  }
}
export function updateTeam(payload) {
  return {
    type: CONSTANTS.UPDATE_TEAM,
    payload
  }
}
export function deleteTeam(id) {
  return {
    type: CONSTANTS.DELETE_TEAM,
    id
  }
}
