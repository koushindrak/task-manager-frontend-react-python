import { fromJS } from 'immutable';
import manageUsersReducer from '../reducer';

describe('manageUsersReducer', () => {
  it('returns the initial state', () => {
    expect(manageUsersReducer(undefined, {})).toEqual(fromJS({}));
  });
});
