import { fromJS } from 'immutable';
import labelTaskReducer from '../reducer';

describe('labelTaskReducer', () => {
  it('returns the initial state', () => {
    expect(labelTaskReducer(undefined, {})).toEqual(fromJS({}));
  });
});
