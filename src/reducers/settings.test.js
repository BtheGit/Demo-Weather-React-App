import settings, { initialState } from './settings';
import * as types from '../actions/settingsTypes';

describe('settings reducer', () => {
  it('should return the default state', () => {
    expect(settings(undefined, {})).toEqual(initialState)
  })

  it('should handle show settings', () => {
    const action = {
      type: types.SHOW_SETTINGS
    }
    const expectedState = {
      ...initialState,
      isActive: true
    }
    expect(settings(undefined, action)).toEqual(expectedState);
  })

  it('should handle hide settings', () => {
    const action = {
      type: types.HIDE_SETTINGS
    }
    const expectedState = {
      ...initialState,
      isActive: false
    }
    expect(settings(undefined, action)).toEqual(expectedState);
  })

  it('should handle settings change', () => {
    const action = {
      type: types.CHANGE_SETTING,
      setting: 'minTemp',
      value: 0
    }
    const expectedState = {
      ...initialState,
      minTemp: 0
    }
    expect(settings(undefined, action)).toEqual(expectedState);
  })
})