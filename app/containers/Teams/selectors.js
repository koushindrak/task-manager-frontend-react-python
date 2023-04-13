import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the parkingAreas state domain
 */

const selectManageTeamsDomain = state => state.get('teamss', initialState);

export const createTeamSuccess=()=> createSelector(selectManageTeamsDomain,substate=>substate.createTeamResponse)
export const createTeamFailure=()=> createSelector(selectManageTeamsDomain,substate=>substate.createTeamError)

export const getTeamSuccess=()=> createSelector(selectManageTeamsDomain,substate=>substate.getTeamResponse)
export const getTeamFailure=()=> createSelector(selectManageTeamsDomain,substate=>substate.getTeamError)

export const getTeamByIdSuccess=()=> createSelector(selectManageTeamsDomain,substate=>substate.getTeamByIdResponse)
export const getTeamByIdFailure=()=> createSelector(selectManageTeamsDomain,substate=>substate.getTeamByIdError)

export const updateTeamSuccess=()=> createSelector(selectManageTeamsDomain,substate=>substate.updateTeamResponse)
export const updateTeamFailure=()=> createSelector(selectManageTeamsDomain,substate=>substate.updateTeamError)

export const deleteTeamSuccess=()=> createSelector(selectManageTeamsDomain,substate=>substate.deleteTeamResponse)
export const deleteTeamFailure=()=> createSelector(selectManageTeamsDomain,substate=>substate.deleteTeamError)

export { selectManageTeamsDomain };
