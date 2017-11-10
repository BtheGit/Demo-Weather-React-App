import { NONE } from '../utilities/constants';
import {
  IS_FETCHING,
  HAS_ERROR,
  UPDATE_RESULTS,
  UPDATE_RAW_DATA
} from '../actions/weatherTypes';

export const initialState = {
  lastUpdate: 0,
  isFetching: false,
  err: null,
  hasError: false,
  rawData: {
    today: [],
    tomorrow: []
  },
  results: {
    today: NONE,
    tomorrow: NONE
  }
}

const weather = (state = initialState, action) => {
  switch(action.type) {
    case IS_FETCHING:
      return {
        ...state,
        isFetching: true,
        err: null,
        hasError: false
      }
    case HAS_ERROR:
      return {
        ...state,
        isFetching: false,
        err: action.err,
        hasError: true
      }
    case UPDATE_RAW_DATA:
      return {
        ...state,
        isFetching: false,
        err: null,
        hasError: false,
        lastUpdate: action.time,
        rawData: action.data
      }
    case UPDATE_RESULTS:
      return {
        ...state,
        results: action.results
      }
    default:
      return state;
  }
}

export default weather;