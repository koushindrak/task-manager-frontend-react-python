import { fromJS } from 'immutable';
import parkingAreasReducer from '../reducer';

describe('parkingAreasReducer', () => {
  it('returns the initial state', () => {
    expect(parkingAreasReducer(undefined, {})).toEqual(fromJS({}));
  });
});
