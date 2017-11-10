import {
  IS_FETCHING,
  HAS_ERROR,
  UPDATE_RESULTS,
  UPDATE_RAW_DATA
} from './weatherTypes';
import { 
  url,
  formatAPIResponse,
  determineCommuteMethods
} from '../utilities/api';

export const isFetching = () => ({
  type: IS_FETCHING
})

export const hasError = err => ({
  type: HAS_ERROR,
  err
})

export const updateResults = results => ({
  type: UPDATE_RESULTS,
  results
})

export const updateRawData = data => ({
  type: UPDATE_RAW_DATA,
  time: Date.now(),
  data
})

/**
 * Both the reducers and Components that interact with fetch errors will assume it
 * is a string format. This is where we make the conversion.
 * 
 * @param {Error object} res 
 * @returns [string]
 */
export const handleFetchError = res => {
  if(!res.ok) {
    throw Error(res.statusText)
  }
  return res;
}

/**
 * fetchWeatherData()
 * For the purposes of this exercise, the url is hardcoded and so we can create rigid 
 * expectations for return value formatting.
 */
export const fetchWeatherData = () => (dispatch, getState) => {
  const settings = getState().settings;
  dispatch(isFetching());
  fetch(url)
    .then(res => handleFetchError(res))
    .then(res => res.json())
    .then(body => formatAPIResponse(body))
    .then(rawData => {
      dispatch(updateRawData(rawData));
      dispatch(updateResults(determineCommuteMethods(rawData, settings)));
    })
    .catch(err => dispatch(hasError(err)))
}

/**
 * refreshResults() is called both during API fetches, as well as props.settings changes to
 * the the Home component.
 * 
 */
export const refreshResults = () => (dispatch, getState) => {
  const settings = getState().settings;
  const { rawData } = getState().weather;
  const results = determineCommuteMethods(rawData, settings);
  dispatch(updateResults(results));
}