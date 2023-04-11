import { fromJS } from 'immutable';
import addOrEditParkingAreaReducer from '../reducer';

describe('addOrEditParkingAreaReducer', () => {
  it('returns the initial state', () => {
    expect(addOrEditParkingAreaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
