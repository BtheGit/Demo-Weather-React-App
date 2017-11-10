import * as actions from './settingsActions';
import * as types from './settingsTypes';

describe('Settings actions', () => {

  it('should show settings modal', () => {
    const expectedAction = {
      type: types.SHOW_SETTINGS
    }
    expect(actions.showSettings()).toEqual(expectedAction);
  })

  it('should hide settings modal', () => {
    const expectedAction = {
      type: types.HIDE_SETTINGS
    }
    expect(actions.hideSettings()).toEqual(expectedAction);
  })

  it('should update passed setting type with passed value type', () => {
    const setting = 'minTemp';
    const value = 50;
    const expectedAction = {
      type: types.CHANGE_SETTING,
      setting,
      value
    }
    expect(actions.updateSetting(setting, value)).toEqual(expectedAction);
  })

  describe('Thunks - changeSetting', () => {
    it('should return null when an error occurs', () => {
      expect(actions.changeSetting(new Error)()).toEqual(null);
    })
  })
})