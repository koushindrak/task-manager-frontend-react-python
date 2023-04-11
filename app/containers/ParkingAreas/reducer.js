/*
 *
 * ParkingAreas reducer
 *
 */


import { fromJS } from 'immutable';

export const initialState = fromJS({});
import * as CONSTANTS from './constants'
import { act } from "react-dom/test-utils";

function parkingAreasReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.CREATE_PARKING_AREA_SUCCESS:
      return Object.assign({}, state, { createParkingAreaResponse: action.response })

    case CONSTANTS.CREATE_PARKING_AREA_FAILURE:
      return Object.assign({}, state, { createParkingAreaError: { error: action.error, errorTime: new Date() } })

    case CONSTANTS.GET_PARKING_AREAS_SUCCESS:
      return Object.assign({}, state, { getParkingAreaResponse: action.response })

    case CONSTANTS.GET_PARKING_AREAS_FAILURE:
      return Object.assign({}, state, { getParkingAreaError: { error: action.error, errorTime: new Date() } })

    case CONSTANTS.GET_PARKING_AREA_BY_ID_SUCCESS:
      return Object.assign({}, state, { getParkingAreaByIdResponse: action.response })

    case CONSTANTS.GET_PARKING_AREA_BY_ID_FAILURE:
      return Object.assign({}, state, { getParkingAreaByIdError: { error: action.error, errorTime: new Date() } })

    case CONSTANTS.UPDATE_PARKING_AREA_SUCCESS:
      return Object.assign({}, state, { updateParkingAreaResponse: action.response })

    case CONSTANTS.UPDATE_PARKING_AREA_FAILURE:
      return Object.assign({}, state, { updateParkingAreaError: { error: action.error, errorTime: new Date() } })

    case CONSTANTS.DELETE_PARKING_AREA_SUCCESS:
      return Object.assign({}, state, { deleteParkingAreaResponse: action.response })

    case CONSTANTS.DELETE_PARKING_AREA_FAILURE:
      return Object.assign({}, state, { deleteParkingAreaError: { error: action.error, errorTime: new Date() } })

    case CONSTANTS.GET_SLOTS_BY_PARKING_AREA_ID_SUCCESS:
      return Object.assign({}, state, { getSlotsResponse: action.response })

    case CONSTANTS.GET_SLOTS_BY_PARKING_AREA_ID_FAILURE:
      return Object.assign({}, state, { getSlotsError: { error: action.error, errorTime: new Date() } })

    case CONSTANTS.BOOKING_SLOT_SUCCESS:
      return Object.assign({}, state, { bookingSlotSuccess: action.response })

    case CONSTANTS.BOOKING_SLOT_FAILURE:
      return Object.assign({}, state, { bookingSlotError: { error: action.error, errorTime: new Date() } })

    case CONSTANTS.RELEASE_SLOT_SUCCESS:
      return Object.assign({}, state, { releaseSlotSuccess: action.response })

    case CONSTANTS.RELEASE_SLOT_FAILURE:
      return Object.assign({}, state, { releaseSlotError: { error: action.error, errorTime: new Date() } })
    case CONSTANTS.GET_PARKING_AREA_STATS_SUCCESS:
      return Object.assign({}, state, { parkingAreaStatsSuccess: action.response })

    case CONSTANTS.GET_PARKING_AREA_STATS_FAILURE:
      return Object.assign({}, state, { parkingAreaStatsError: { error: action.error, errorTime: new Date() } })

    default:
      return state;
  }
}

export default parkingAreasReducer;
