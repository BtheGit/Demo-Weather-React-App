import * as actions from './weatherActions';
import * as types from './weatherTypes';

describe('Weather actions', () => {
  
  it('should create an action to set isFetching', () => {
    const expectedAction = {
      type: types.IS_FETCHING
    }
    expect(actions.isFetching()).toEqual(expectedAction);
  })

  it('should create an action to dispatch an error message', () => {
    const err = 'whoops'
    const expectedAction = {
      type: types.HAS_ERROR,
      err
    }
    expect(actions.hasError(err)).toEqual(expectedAction);
  })

  it('should update results with passed results object', () => {
    const results = {
      today: 'BIKE',
      tomorrow: 'METRO'
    }
    const expectedAction = {
      type: types.UPDATE_RESULTS,
      results
    }
    expect(actions.updateResults(results)).toEqual(expectedAction);
  })

  describe('rawData action creator', () => {
    const data = {a: 1}

    it('should update raw results with passed data object', () => {
      expect(actions.updateRawData(data).data).toEqual(data);
    })
    it('should update generate a new date number in ms', () => {
      expect(typeof actions.updateRawData(data).time).toEqual('number');
    })
  })
})