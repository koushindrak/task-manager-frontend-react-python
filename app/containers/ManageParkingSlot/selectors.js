import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageParkingSlot state domain
 */

const selectManageParkingSlotDomain = state =>
  state.get('manageParkingSlot', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageParkingSlot
 */

const makeSelectManageParkingSlot = () =>
  createSelector(selectManageParkingSlotDomain, substate => substate.toJS());

export default makeSelectManageParkingSlot;
export { selectManageParkingSlotDomain };
