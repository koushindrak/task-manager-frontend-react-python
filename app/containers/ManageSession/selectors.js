import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageSession state domain
 */

const selectManageSessionDomain = state =>
  state.get('manageSession', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageSession
 */

export const loginSuccess = () => createSelector(selectManageSessionDomain, substate => substate.loginResponse)
export const loginFailure = () => createSelector(selectManageSessionDomain, substate => substate.loginFailure)

export const signupSuccess = () => createSelector(selectManageSessionDomain, substate => substate.signupResponse)
export const signupFailure = () => createSelector(selectManageSessionDomain, substate => substate.signupFailure)

const makeSelectManageSession = () =>
  createSelector(selectManageSessionDomain, substate => substate);

export default makeSelectManageSession;
export { selectManageSessionDomain };
