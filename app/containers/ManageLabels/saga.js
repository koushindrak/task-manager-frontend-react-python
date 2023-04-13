import { take, takeEvery,call, put, select } from 'redux-saga/effects';
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import * as CONSTANTS from ".//constants";

export function* handleCreateLabelRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.CREATE_LABEL_SUCCESS, CONSTANTS.CREATE_LABEL_FAILURE, apis.LABEL_APIS_BASE_URL,apiTypes.CREATE)];
}
export function* watchCreateLabelRequest() {
  yield takeEvery(CONSTANTS.CREATE_LABEL,handleCreateLabelRequest)
}

export function* handleGetLabelRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_LABELS_SUCCESS, CONSTANTS.GET_LABELS_FAILURE, apis.LABEL_APIS_BASE_URL,apiTypes.GET_ALL)];
}
export function* watchGetLabelRequest() {
  yield takeEvery(CONSTANTS.GET_LABELS,handleGetLabelRequest)
}


export function* handleGetLabelByIdRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_LABEL_BY_ID_SUCCESS, CONSTANTS.GET_LABEL_BY_ID_FAILURE, apis.LABEL_APIS_BASE_URL,apiTypes.GET_BY_ID)];
}
export function* watchGetLabelByIdRequest() {
  yield takeEvery(CONSTANTS.GET_LABEL_BY_ID,handleGetLabelByIdRequest)
}

export function* handleUpdateLabelRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.UPDATE_LABEL_SUCCESS, CONSTANTS.UPDATE_LABEL_FAILURE, apis.LABEL_APIS_BASE_URL,apiTypes.UPDATE_BY_ID)];
}
export function* watchUpdateLabelRequest() {
  yield takeEvery(CONSTANTS.UPDATE_LABEL,handleUpdateLabelRequest)
}

export function* handleDeleteLabelRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.DELETE_LABEL_SUCCESS, CONSTANTS.DELETE_LABEL_FAILURE, apis.LABEL_APIS_BASE_URL,apiTypes.DELETE_BY_ID)];
}
export function* watchDeleteLabelRequest() {
  yield takeEvery(CONSTANTS.DELETE_LABEL,handleDeleteLabelRequest)
}
export default function* defaultSaga() {
  yield [
    watchCreateLabelRequest(),
    watchGetLabelRequest(),
    watchGetLabelByIdRequest(),
    watchUpdateLabelRequest(),
    watchDeleteLabelRequest(),
  ]
}
