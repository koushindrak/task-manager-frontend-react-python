import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addOrEditParkingArea state domain
 */

const selectAddOrEditParkingAreaDomain = state =>
  state.get('addOrEditParkingArea', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddOrEditParkingArea
 */

const makeSelectAddOrEditParkingArea = () =>
  createSelector(selectAddOrEditParkingAreaDomain, substate => substate.toJS());

export default makeSelectAddOrEditParkingArea;
export { selectAddOrEditParkingAreaDomain };
