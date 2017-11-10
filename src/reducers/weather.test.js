import weather, { initialState } from './weather';
import * as types from '../actions/weatherTypes';

describe('weather reducer', () => {
  it('should return the default state', () => {
    expect(weather(undefined, {})).toEqual(initialState)
  })
})