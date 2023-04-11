import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the parkingAreas state domain
 */

const selectParkingAreasDomain = state => state.get('parkingAreas', initialState);


export const createParkingAreaSuccess=()=> createSelector(selectParkingAreasDomain,substate=>substate.createParkingAreaResponse)
export const createParkingAreaFailure=()=> createSelector(selectParkingAreasDomain,substate=>substate.createParkingAreaError)

export const getParkingAreaSuccess=()=> createSelector(selectParkingAreasDomain,substate=>substate.getParkingAreaResponse)
export const getParkingAreaFailure=()=> createSelector(selectParkingAreasDomain,substate=>substate.getParkingAreaError)

export const getParkingAreaByIdSuccess=()=> createSelector(selectParkingAreasDomain,substate=>substate.getParkingAreaByIdResponse)
export const getParkingAreaByIdFailure=()=> createSelector(selectParkingAreasDomain,substate=>substate.getParkingAreaByIdError)

export const updateParkingAreaSuccess=()=> createSelector(selectParkingAreasDomain,substate=>substate.updateParkingAreaResponse)
export const updateParkingAreaFailure=()=> createSelector(selectParkingAreasDomain,substate=>substate.updateParkingAreaError)

export const deleteParkingAreaSuccess=()=> createSelector(selectParkingAreasDomain,substate=>substate.deleteParkingAreaResponse)
export const deleteParkingAreaFailure=()=> createSelector(selectParkingAreasDomain,substate=>substate.deleteParkingAreaError)


export const getSlotsSuccess=()=> createSelector(selectParkingAreasDomain,substate=>substate.getSlotsResponse)
export const getSlotsFailure=()=> createSelector(selectParkingAreasDomain,substate=>substate.getSlotsError)


export const bookingSlotSuccess=()=> createSelector(selectParkingAreasDomain,substate=>substate.bookingSlotSuccess)
export const bookingSlotError=()=> createSelector(selectParkingAreasDomain,substate=>substate.bookingSlotError)


export const releaseSlotSuccess=()=> createSelector(selectParkingAreasDomain,substate=>substate.releaseSlotSuccess)
export const releaseSlotError=()=> createSelector(selectParkingAreasDomain,substate=>substate.releaseSlotError)

export const parkingAreaStatsSuccess=()=> createSelector(selectParkingAreasDomain,substate=>substate.parkingAreaStatsSuccess)
export const parkingAreaStatsError=()=> createSelector(selectParkingAreasDomain,substate=>substate.parkingAreaStatsError)

export { selectParkingAreasDomain };
