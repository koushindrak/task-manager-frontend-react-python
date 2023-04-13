import { take, takeEvery,call, put, select } from 'redux-saga/effects';
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import * as CONSTANTS from ".//constants";

export function* handleCreateTeamRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.CREATE_TEAM_SUCCESS, CONSTANTS.CREATE_TEAM_FAILURE, apis.TEAM_APIS_BASE_URL,apiTypes.CREATE)];
}
export function* watchCreateTeamRequest() {
  yield takeEvery(CONSTANTS.CREATE_TEAM,handleCreateTeamRequest)
}

export function* handleGetTeamRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_TEAMS_SUCCESS, CONSTANTS.GET_TEAMS_FAILURE, apis.TEAM_APIS_BASE_URL,apiTypes.GET_ALL)];
}
export function* watchGetTeamRequest() {
  yield takeEvery(CONSTANTS.GET_TEAMS,handleGetTeamRequest)
}


export function* handleGetTeamByIdRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_TEAM_BY_ID_SUCCESS, CONSTANTS.GET_TEAM_BY_ID_FAILURE, apis.TEAM_APIS_BASE_URL,apiTypes.GET_BY_ID)];
}
export function* watchGetTeamByIdRequest() {
  yield takeEvery(CONSTANTS.GET_TEAM_BY_ID,handleGetTeamByIdRequest)
}

export function* handleUpdateTeamRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.UPDATE_TEAM_SUCCESS, CONSTANTS.UPDATE_TEAM_FAILURE, apis.TEAM_APIS_BASE_URL,apiTypes.UPDATE_BY_ID)];
}
export function* watchUpdateTeamRequest() {
  yield takeEvery(CONSTANTS.UPDATE_TEAM,handleUpdateTeamRequest)
}

export function* handleDeleteTeamRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.DELETE_TEAM_SUCCESS, CONSTANTS.DELETE_TEAM_FAILURE, apis.TEAM_APIS_BASE_URL,apiTypes.DELETE_BY_ID)];
}
export function* watchDeleteTeamRequest() {
  yield takeEvery(CONSTANTS.DELETE_TEAM,handleDeleteTeamRequest)
}
export default function* defaultSaga() {
  yield [
    watchCreateTeamRequest(),
    watchGetTeamRequest(),
    watchGetTeamByIdRequest(),
    watchUpdateTeamRequest(),
    watchDeleteTeamRequest(),
  ]
}
