import { fromJS } from 'immutable';
import manageProjectsReducer from '../reducer';

describe('manageProjectsReducer', () => {
  it('returns the initial state', () => {
    expect(manageProjectsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
