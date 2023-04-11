import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the parkingAreas state domain
 */

const selectManageProjectsDomain = state => state.get('manageProjects', initialState);

export const createProjectSuccess=()=> createSelector(selectManageProjectsDomain,substate=>substate.createProjectResponse)
export const createProjectFailure=()=> createSelector(selectManageProjectsDomain,substate=>substate.createProjectError)

export const getProjectSuccess=()=> createSelector(selectManageProjectsDomain,substate=>substate.getProjectResponse)
export const getProjectFailure=()=> createSelector(selectManageProjectsDomain,substate=>substate.getProjectError)

export const getParkingAreasSuccess=()=> createSelector(selectManageProjectsDomain,substate=>substate.getParkingAreasResponse)
export const getParkingAreasFailure=()=> createSelector(selectManageProjectsDomain,substate=>substate.getParkingAreasFailure)

export const getProjectByIdSuccess=()=> createSelector(selectManageProjectsDomain,substate=>substate.getProjectByIdResponse)
export const getProjectByIdFailure=()=> createSelector(selectManageProjectsDomain,substate=>substate.getProjectByIdError)

export const updateProjectSuccess=()=> createSelector(selectManageProjectsDomain,substate=>substate.updateProjectResponse)
export const updateProjectFailure=()=> createSelector(selectManageProjectsDomain,substate=>substate.updateProjectError)

export const deleteProjectSuccess=()=> createSelector(selectManageProjectsDomain,substate=>substate.deleteProjectResponse)
export const deleteProjectFailure=()=> createSelector(selectManageProjectsDomain,substate=>substate.deleteProjectError)

export { selectManageProjectsDomain };
