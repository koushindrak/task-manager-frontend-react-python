import { take, takeEvery,call, put, select } from 'redux-saga/effects';
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import * as CONSTANTS from ".//constants";

export function* handleCreateProjectRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.CREATE_PROJECT_SUCCESS, CONSTANTS.CREATE_PROJECT_FAILURE, apis.PROJECT_APIS_BASE_URL,apiTypes.CREATE)];
}
export function* watchCreateProjectRequest() {
  yield takeEvery(CONSTANTS.CREATE_PROJECT,handleCreateProjectRequest)
}

export function* handleGetProjectRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_PROJECTS_SUCCESS, CONSTANTS.GET_PROJECTS_FAILURE, apis.PROJECT_APIS_BASE_URL,apiTypes.GET_ALL)];
}
export function* watchGetProjectRequest() {
  yield takeEvery(CONSTANTS.GET_PROJECTS,handleGetProjectRequest)
}
export function* handleGetParkingAreaRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_PARKING_AREAS_SUCCESS, CONSTANTS.GET_PARKING_AREAS_FAILURE, apis.PARKING_AREA_APIS_BASE_URL,apiTypes.GET_ALL)];
}
export function* watchGetParkingAreasRequest() {
  yield takeEvery(CONSTANTS.GET_PARKING_AREAS,handleGetParkingAreaRequest)
}

export function* handleGetProjectByIdRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_PROJECT_BY_ID_SUCCESS, CONSTANTS.GET_PROJECT_BY_ID_FAILURE, apis.PROJECT_APIS_BASE_URL,apiTypes.GET_BY_ID)];
}
export function* watchGetProjectByIdRequest() {
  yield takeEvery(CONSTANTS.GET_PROJECT_BY_ID,handleGetProjectByIdRequest)
}

export function* handleUpdateProjectRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.UPDATE_PROJECT_SUCCESS, CONSTANTS.UPDATE_PROJECT_FAILURE, apis.PROJECT_APIS_BASE_URL,apiTypes.UPDATE_BY_ID)];
}
export function* watchUpdateProjectRequest() {
  yield takeEvery(CONSTANTS.UPDATE_PROJECT,handleUpdateProjectRequest)
}

export function* handleDeleteProjectRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.DELETE_PROJECT_SUCCESS, CONSTANTS.DELETE_PROJECT_FAILURE, apis.PROJECT_APIS_BASE_URL,apiTypes.DELETE_BY_ID)];
}
export function* watchDeleteProjectRequest() {
  yield takeEvery(CONSTANTS.DELETE_PROJECT,handleDeleteProjectRequest)
}
export default function* defaultSaga() {
  yield [
    watchCreateProjectRequest(),
    watchGetProjectRequest(),
    watchGetParkingAreasRequest(),
    watchGetProjectByIdRequest(),
    watchUpdateProjectRequest(),
    watchDeleteProjectRequest(),
  ]
}
