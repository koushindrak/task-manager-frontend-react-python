import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the parkingAreas state domain
 */

const selectManageLabelsDomain = state => state.get('manageLabels', initialState);

export const createLabelSuccess=()=> createSelector(selectManageLabelsDomain,substate=>substate.createLabelResponse)
export const createLabelFailure=()=> createSelector(selectManageLabelsDomain,substate=>substate.createLabelError)

export const getLabelSuccess=()=> createSelector(selectManageLabelsDomain,substate=>substate.getLabelResponse)
export const getLabelFailure=()=> createSelector(selectManageLabelsDomain,substate=>substate.getLabelError)

export const getLabelByIdSuccess=()=> createSelector(selectManageLabelsDomain,substate=>substate.getLabelByIdResponse)
export const getLabelByIdFailure=()=> createSelector(selectManageLabelsDomain,substate=>substate.getLabelByIdError)

export const updateLabelSuccess=()=> createSelector(selectManageLabelsDomain,substate=>substate.updateLabelResponse)
export const updateLabelFailure=()=> createSelector(selectManageLabelsDomain,substate=>substate.updateLabelError)

export const deleteLabelSuccess=()=> createSelector(selectManageLabelsDomain,substate=>substate.deleteLabelResponse)
export const deleteLabelFailure=()=> createSelector(selectManageLabelsDomain,substate=>substate.deleteLabelError)

export { selectManageLabelsDomain };
