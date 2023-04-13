import { fromJS } from 'immutable';
import collapsibleTableReducer from '../reducer';

describe('collapsibleTableReducer', () => {
  it('returns the initial state', () => {
    expect(collapsibleTableReducer(undefined, {})).toEqual(fromJS({}));
  });
});
