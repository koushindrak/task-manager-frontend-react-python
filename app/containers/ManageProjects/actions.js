/*
 *
 * Projects actions
 *
 */

import * as CONSTANTS from './constants';

export function createProject(payload) {
  return {
    type: CONSTANTS.CREATE_PROJECT,
    payload
  }
}

export function getProjects() {
  return{
    type: CONSTANTS.GET_PROJECTS
  }
}
export function getProjectById(id) {
  return {
    type: CONSTANTS.GET_PROJECT_BY_ID,
    id
  }
}
export function updateProject(payload) {
  return {
    type: CONSTANTS.UPDATE_PROJECT,
    payload
  }
}
export function deleteProject(id) {
  return {
    type: CONSTANTS.DELETE_PROJECT,
    id
  }
}
