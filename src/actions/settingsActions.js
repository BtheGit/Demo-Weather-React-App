import {
  SHOW_SETTINGS,
  HIDE_SETTINGS,
  CHANGE_SETTING
} from './settingsTypes';

import { settingsRanges } from '../utilities/constants';

export function showSettings() {
  return {
    type: SHOW_SETTINGS
  }
};

export function hideSettings() {
  return {
    type: HIDE_SETTINGS
  }
};

export function updateSetting(setting, value) {
  return {
    type: CHANGE_SETTING,
    setting,
    value
  }
}

export const changeSetting = (setting, value) => dispatch => {
  try {
    const settingRange = settingsRanges[setting];
    if(value >= settingRange.min && value <= settingRange.max) {
      dispatch(updateSetting(setting, value))
    }
  } 
  catch (e) {
    return null;
  }
}
