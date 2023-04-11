import { take, takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import * as CONSTANTS from './constants'
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
// Individual exports for testing

export function* loginApiAsyncHandler(action) {
  yield [apiCallHandler(action, CONSTANTS.LOGIN_SUCCESS, CONSTANTS.LOGIN_FAILURE, apis.LOGIN, apiTypes.OTHER, false)];
}
export function* watchLoginRequest() {
  yield takeEvery(CONSTANTS.LOGIN, loginApiAsyncHandler)
}
export default function* defaultSaga() {
  yield [
    watchLoginRequest(),
  ]
}
