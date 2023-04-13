import { fromJS } from 'immutable';
import manageLabelsReducer from '../reducer';

describe('manageLabelsReducer', () => {
  it('returns the initial state', () => {
    expect(manageLabelsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
