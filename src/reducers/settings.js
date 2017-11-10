import {
  SHOW_SETTINGS,
  HIDE_SETTINGS,
  CHANGE_SETTING
} from '../actions/settingsTypes';
import { settingsRanges } from '../utilities/constants';

export const initialState = {
  isActive: false,
  minTemp: settingsRanges['minTemp'].default,
  maxTemp: settingsRanges['maxTemp'].default,
  maxPrecip: settingsRanges['maxPrecip'].default,
  departTime: settingsRanges['departTime'].default,
  returnTime: settingsRanges['returnTime'].default
}

const settings = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SETTINGS:
      return {
        ...state,
        isActive: true
      }
    case HIDE_SETTINGS:
      return {
        ...state,
        isActive: false
      }
    case CHANGE_SETTING:
      return {
        ...state,
        [action.setting]: action.value
      }
    default:
      return state;
  }
}

export default settings;