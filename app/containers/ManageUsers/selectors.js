import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageUsers state domain
 */

const selectManageUsersDomain = state => state.get('manageUsers', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageUsers
 */

export const getUsersSuccess=()=> createSelector(selectManageUsersDomain,substate=>substate.getUsersResponse)
export const getUsersFailure=()=> createSelector(selectManageUsersDomain,substate=>substate.getUsersError)

export const getUserByIdSuccess=()=> createSelector(selectManageUsersDomain,substate=>substate.getUserByIdResponse)
export const getUserByIdFailure=()=> createSelector(selectManageUsersDomain,substate=>substate.getUserByIdError)

export const deleteUserByIdSuccess=()=> createSelector(selectManageUsersDomain,substate=>substate.deleteUserResponse)
export const deleteUserByIdFailure=()=> createSelector(selectManageUsersDomain,substate=>substate.deleteUserByIdFailure)

export const updateUserByIdSuccess=()=> createSelector(selectManageUsersDomain,substate=>substate.updateUserResponse)
export const updateUserByIdFailure=()=> createSelector(selectManageUsersDomain,substate=>substate.updateUserError)

export const createUserSuccess = () => createSelector(selectManageUsersDomain, substate => substate.createUserResponse)
export const createUserFailure = () => createSelector(selectManageUsersDomain, substate => substate.createUserError)

export const getRolesSuccess = () => createSelector(selectManageUsersDomain, substate => substate.getAllRolesResponse)
export const getRolesFailure = () => createSelector(selectManageUsersDomain, substate => substate.getAllRolesError)

const isFetchingState = state => state.get('loader');
export const getIsFetching = () => createSelector(isFetchingState, fetchingState => fetchingState.get('isFetching'));

const makeSelectManageUsers = () => createSelector(selectManageUsersDomain, substate => substate.toJS());

export default makeSelectManageUsers;
export { selectManageUsersDomain };
