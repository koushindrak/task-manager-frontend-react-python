/*
 *
 * ParkingAreas actions
 *
 */

import * as CONSTANTS from './constants';

export function createParkingArea(payload) {
  return {
    type: CONSTANTS.CREATE_PARKING_AREA,
    payload
  }
}

export function getParkingAreas() {
  return{
    type: CONSTANTS.GET_PARKING_AREAS
  }
}
export function getParkingAreaById(id) {
  return {
    type: CONSTANTS.GET_PARKING_AREA_BY_ID,
    id
  }
}
export function updateParkingArea(payload) {
  return {
    type: CONSTANTS.UPDATE_PARKING_AREA,
    payload
  }
}
export function deleteParkingArea(id) {
  return {
    type: CONSTANTS.DELETE_PARKING_AREA,
    id
  }
}

export function getSlotsDetails(id) {
  return {
    type: CONSTANTS.GET_SLOTS_BY_PARKING_AREA_ID,
    id
  }
}

export function releaseSlot(id) {
  return {
    type: CONSTANTS.RELEASE_SLOT,
    id
  }
}

export function getParkingAreaStats(id) {
  return {
    type: CONSTANTS.GET_PARKING_AREA_STATS,
    id
  }
}


export function bookingSlot(payload) {
  console.log('payload: ', payload);
  return {
    type: CONSTANTS.BOOKING_SLOT,
    payload
  }
}
