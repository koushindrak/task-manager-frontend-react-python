/*
 *
 * ManageTasks actions
 *
 */

import * as CONSTANTS from './constants';

export function createTask(payload) {
  return {
    type: CONSTANTS.CREATE_TASK,
    payload
  }
}

export function getAllTasks() {
  return{
    type: CONSTANTS.GET_TASKS
  }
}
export function getTaskById(id) {
  return {
    type: CONSTANTS.GET_TASK_BY_ID,
    id
  }
}
export function updateTask(payload) {
  return {
    type: CONSTANTS.UPDATE_TASK,
    payload
  }
}
export function deleteTask(id) {
  return {
    type: CONSTANTS.DELETE_TASK,
    id
  }
}
