import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the collapsibleTable state domain
 */

const selectCollapsibleTableDomain = state =>
  state.get('collapsibleTable', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CollapsibleTable
 */

const makeSelectCollapsibleTable = () =>
  createSelector(selectCollapsibleTableDomain, substate => substate.toJS());

export default makeSelectCollapsibleTable;
export { selectCollapsibleTableDomain };
