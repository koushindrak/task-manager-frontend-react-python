import { fromJS } from 'immutable';
import manageTasksReducer from '../reducer';

describe('manageTasksReducer', () => {
  it('returns the initial state', () => {
    expect(manageTasksReducer(undefined, {})).toEqual(fromJS({}));
  });
});
