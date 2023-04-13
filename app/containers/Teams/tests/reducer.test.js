import { fromJS } from 'immutable';
import teamsReducer from '../reducer';

describe('teamsReducer', () => {
  it('returns the initial state', () => {
    expect(teamsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
