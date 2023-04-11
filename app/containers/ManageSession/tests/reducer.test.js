import { fromJS } from 'immutable';
import manageSessionReducer from '../reducer';

describe('manageSessionReducer', () => {
  it('returns the initial state', () => {
    expect(manageSessionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
