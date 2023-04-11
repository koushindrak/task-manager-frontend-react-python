import { take,takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios'
import * as CONSTANTS from './constants'
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {getUserById} from "./actions";

export function* getUsersApiAsyncHandler(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_USERS_SUCCESS, CONSTANTS.GET_USERS_FAILURE, apis.USER_APIS_BASE_URL,apiTypes.GET_ALL)];
}

export function* getRolesApiAsyncHandler(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_ALL_ROLES_SUCCESS, CONSTANTS.GET_ALL_ROLES_FAILURE, apis.ROLE_APIS_BASE_URL,apiTypes.GET_ALL)];
}

export function* createUserApiAsyncHandler(action) {
  yield [apiCallHandler(action, CONSTANTS.CREATE_USER_SUCCESS, CONSTANTS.CREATE_USER_FAILURE, apis.USER_APIS_BASE_URL,apiTypes.CREATE)];
}

export function* getUserByIdApiAsyncHandler(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_USER_BY_ID_SUCCESS, CONSTANTS.GET_USER_BY_ID_FAILURE, apis.USER_APIS_BASE_URL,apiTypes.GET_BY_ID)];
}

export function* deleteUserByIdApiAsyncHandler(action) {
  yield [apiCallHandler(action, CONSTANTS.DELETE_USER_SUCCESS, CONSTANTS.DELETE_USER_FAILURE, apis.USER_APIS_BASE_URL,apiTypes.DELETE_BY_ID)];
}

export function* updateUserByIdApiAsyncHandler(action) {
  yield [apiCallHandler(action, CONSTANTS.UPDATE_USER_SUCCESS, CONSTANTS.UPDATE_USER_FAILURE, apis.USER_APIS_BASE_URL,apiTypes.UPDATE_BY_ID)];
}

export function* watchGetUserRequest() {
  yield takeEvery(CONSTANTS.GET_USERS, getUsersApiAsyncHandler)
}

export function* watchGetRolesRequest() {
  yield takeEvery(CONSTANTS.GET_ALL_ROLES, getRolesApiAsyncHandler)
}

export function* watchSaveUserRequest() {
  yield takeEvery(CONSTANTS.CREATE_USER, createUserApiAsyncHandler)
}

export function* watchGetUserByIdRequest() {
  yield takeEvery(CONSTANTS.GET_USER_BY_ID,getUserByIdApiAsyncHandler)
}

export function* watchDeleteUserByIdRequest() {
  yield takeEvery(CONSTANTS.DELETE_USER,deleteUserByIdApiAsyncHandler)
}

export function* watchUpdateUserByIdRequest() {
  yield takeEvery(CONSTANTS.UPDATE_USER,updateUserByIdApiAsyncHandler)
}

export default function* defaultSaga() {
  yield [
    watchGetUserRequest(),
    watchGetRolesRequest(),
    watchSaveUserRequest(),
    watchGetUserByIdRequest(),
    watchUpdateUserByIdRequest(),
    watchDeleteUserByIdRequest(),

  ]
}

