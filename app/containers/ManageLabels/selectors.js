import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageLabels state domain
 */

const selectManageLabelsDomain = state =>
  state.get('manageLabels', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageLabels
 */

const makeSelectManageLabels = () =>
  createSelector(selectManageLabelsDomain, substate => substate.toJS());

export default makeSelectManageLabels;
export { selectManageLabelsDomain };
