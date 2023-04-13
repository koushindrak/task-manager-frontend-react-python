import { take, takeEvery,call, put, select } from 'redux-saga/effects';
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import * as CONSTANTS from ".//constants";

export function* handleCreateTaskRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.CREATE_TASK_SUCCESS, CONSTANTS.CREATE_TASK_FAILURE, apis.TASK_APIS_BASE_URL,apiTypes.CREATE)];
}
export function* watchCreateTaskRequest() {
  yield takeEvery(CONSTANTS.CREATE_TASK,handleCreateTaskRequest)
}

export function* handleGetTaskRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_TASKS_SUCCESS, CONSTANTS.GET_TASKS_FAILURE, apis.TASK_APIS_BASE_URL,apiTypes.GET_ALL)];
}
export function* watchGetTaskRequest() {
  yield takeEvery(CONSTANTS.GET_TASKS,handleGetTaskRequest)
}

export function* handleGetTaskByIdRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_TASK_BY_ID_SUCCESS, CONSTANTS.GET_TASK_BY_ID_FAILURE, apis.TASK_APIS_BASE_URL,apiTypes.GET_BY_ID)];
}
export function* watchGetTaskByIdRequest() {
  yield takeEvery(CONSTANTS.GET_TASK_BY_ID,handleGetTaskByIdRequest)
}

export function* handleUpdateTaskRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.UPDATE_TASK_SUCCESS, CONSTANTS.UPDATE_TASK_FAILURE, apis.TASK_APIS_BASE_URL,apiTypes.UPDATE_BY_ID)];
}
export function* watchUpdateTaskRequest() {
  yield takeEvery(CONSTANTS.UPDATE_TASK,handleUpdateTaskRequest)
}

export function* handleDeleteTaskRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.DELETE_TASK_SUCCESS, CONSTANTS.DELETE_TASK_FAILURE, apis.TASK_APIS_BASE_URL,apiTypes.DELETE_BY_ID)];
}
export function* watchDeleteTaskRequest() {
  yield takeEvery(CONSTANTS.DELETE_TASK,handleDeleteTaskRequest)
}
export default function* defaultSaga() {
 yield [
   watchCreateTaskRequest(),
   watchGetTaskRequest(),
   watchGetTaskByIdRequest(),
   watchUpdateTaskRequest(),
   watchDeleteTaskRequest(),
 ]
}
