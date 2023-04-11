import { take, takeEvery,call, put, select } from 'redux-saga/effects';
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import * as CONSTANTS from "../ParkingAreas/constants";

export function* handleCreateParkingAreaRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.CREATE_PARKING_AREA_SUCCESS, CONSTANTS.CREATE_PARKING_AREA_FAILURE, apis.PARKING_AREA_APIS_BASE_URL,apiTypes.CREATE)];
}
export function* watchCreateParkingAreaRequest() {
  yield takeEvery(CONSTANTS.CREATE_PARKING_AREA,handleCreateParkingAreaRequest)
}

export function* handleGetParkingAreaRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_PARKING_AREAS_SUCCESS, CONSTANTS.GET_PARKING_AREAS_FAILURE, apis.PARKING_AREA_APIS_BASE_URL,apiTypes.GET_ALL)];
}
export function* watchGetParkingAreaRequest() {
  yield takeEvery(CONSTANTS.GET_PARKING_AREAS,handleGetParkingAreaRequest)
}

export function* handleGetParkingAreaByIdRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_PARKING_AREA_BY_ID_SUCCESS, CONSTANTS.GET_PARKING_AREA_BY_ID_FAILURE, apis.PARKING_AREA_APIS_BASE_URL,apiTypes.GET_BY_ID)];
}
export function* watchGetParkingAreaByIdRequest() {
  yield takeEvery(CONSTANTS.GET_PARKING_AREA_BY_ID,handleGetParkingAreaByIdRequest)
}

export function* handleUpdateParkingAreaRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.UPDATE_PARKING_AREA_SUCCESS, CONSTANTS.UPDATE_PARKING_AREA_FAILURE, apis.PARKING_AREA_APIS_BASE_URL,apiTypes.UPDATE_BY_ID)];
}
export function* watchUpdateParkingAreaRequest() {
  yield takeEvery(CONSTANTS.UPDATE_PARKING_AREA,handleUpdateParkingAreaRequest)
}

export function* handleDeleteParkingAreaRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.DELETE_PARKING_AREA_SUCCESS, CONSTANTS.DELETE_PARKING_AREA_FAILURE, apis.PARKING_AREA_APIS_BASE_URL,apiTypes.DELETE_BY_ID)];
}
export function* watchDeleteParkingAreaRequest() {
  yield takeEvery(CONSTANTS.DELETE_PARKING_AREA,handleDeleteParkingAreaRequest)
}

export function* handleGetSlotsRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_SLOTS_BY_PARKING_AREA_ID_SUCCESS, CONSTANTS.GET_SLOTS_BY_PARKING_AREA_ID_FAILURE, apis.GET_SLOTS_BY_PARKING_AREA_ID,apiTypes.OTHER,false)];
}
export function* watchGetSlotsDetailsRequest() {
  yield takeEvery(CONSTANTS.GET_SLOTS_BY_PARKING_AREA_ID,handleGetSlotsRequest)
}


export function* bookingSlotRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.BOOKING_SLOT_SUCCESS, CONSTANTS.BOOKING_SLOT_FAILURE, apis.PROJECT_APIS_BASE_URL,apiTypes.CREATE)];
}

export function* watcherBookParkingArea() {
  yield takeEvery(CONSTANTS.BOOKING_SLOT,bookingSlotRequest)
}

export function* releaseSlotRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.RELEASE_SLOT_SUCCESS, CONSTANTS.RELEASE_SLOT_FAILURE, apis.PROJECT_APIS_BASE_URL,apiTypes.DELETE_BY_ID)];
}

export function* watcherReleaseSlot() {
  yield takeEvery(CONSTANTS.RELEASE_SLOT,releaseSlotRequest)
}
export function* parkingAreaStatusRequest(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_PARKING_AREA_STATS_SUCCESS, CONSTANTS.GET_PARKING_AREA_STATS_FAILURE, apis.GET_PARKING_AREA_STATS,apiTypes.OTHER)];
}

export function* watcherParkingAreaStats() {
  yield takeEvery(CONSTANTS.GET_PARKING_AREA_STATS,parkingAreaStatusRequest)
}

export default function* defaultSaga() {
  yield [
    watchCreateParkingAreaRequest(),
    watchGetParkingAreaRequest(),
    watchGetParkingAreaByIdRequest(),
    watchUpdateParkingAreaRequest(),
    watchDeleteParkingAreaRequest(),
    watchGetSlotsDetailsRequest(),
    watcherBookParkingArea(),
    watcherReleaseSlot(),
    watcherParkingAreaStats()
  ]
}
