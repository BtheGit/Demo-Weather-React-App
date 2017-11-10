export const NONE = 'NONE';
export const BIKE = 'BIKE';
export const METRO = 'METRO';
export const ERR = 'ERR';

export const settingsRanges = {
  'maxPrecip': {
    min: 0,
    max: 1,
    default: 0.5
  },
  'minTemp': {
    min: 0,
    max: 130,
    default: 55
  },
  'maxTemp': {
    min: 0,
    max: 130,
    default: 90
  },
  'departTime': {
    min: 0,
    max: 23,
    default: 9
  },
  'returnTime': {
    min: 0,
    max: 23,
    default: 17
  }
}