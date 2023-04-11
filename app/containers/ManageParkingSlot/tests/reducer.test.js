import { fromJS } from 'immutable';
import manageParkingSlotReducer from '../reducer';

describe('manageParkingSlotReducer', () => {
  it('returns the initial state', () => {
    expect(manageParkingSlotReducer(undefined, {})).toEqual(fromJS({}));
  });
});
