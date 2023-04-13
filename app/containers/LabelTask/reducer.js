/*
 *
 * ManageTasks reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});
import * as CONSTANTS from './constants'
function manageTasksReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.CREATE_TASK_SUCCESS:
      return Object.assign({},state,{createTaskResponse:action.response})

    case CONSTANTS.CREATE_TASK_FAILURE:
      return Object.assign({},state, {createTaskError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_TASKS_SUCCESS:
      return Object.assign({},state,{getTaskResponse:action.response})

    case CONSTANTS.GET_TASKS_FAILURE:
      return Object.assign({},state, {getTaskError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_TASK_BY_ID_SUCCESS:
      return Object.assign({},state,{getTaskByIdResponse:action.response})

    case CONSTANTS.GET_TASK_BY_ID_FAILURE:
      return Object.assign({},state, {getTaskByIdError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.UPDATE_TASK_SUCCESS:
      return Object.assign({},state,{updateTaskResponse:action.response})

    case CONSTANTS.UPDATE_TASK_FAILURE:
      return Object.assign({},state, {updateTaskError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.DELETE_TASK_SUCCESS:
      return Object.assign({},state,{deleteTaskResponse:action.response})

    case CONSTANTS.DELETE_TASK_FAILURE:
      return Object.assign({},state, {deleteTaskError:{error:action.error,errorTime:new Date()}})

    default:
      return state;
  }
}

export default manageTasksReducer;
