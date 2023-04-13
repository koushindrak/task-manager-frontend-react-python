import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the teams state domain
 */

const selectTeamsDomain = state => state.get('teams', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Teams
 */

const makeSelectTeams = () =>
  createSelector(selectTeamsDomain, substate => substate.toJS());

export default makeSelectTeams;
export { selectTeamsDomain };
