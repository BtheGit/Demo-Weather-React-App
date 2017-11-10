import { NONE, BIKE, METRO } from './constants';

export const url = 'https://1miudhz7a9.execute-api.us-east-1.amazonaws.com/dev/forecast/38.9072,-77.0369';


/* 
* ##################################################
* These are functions related to the processing of responses 
* from our API calls to DarkSky.
* ###################################################
*/


/**
 * The Dark Sky API returns a UTC timestamp in seconds, we need to convert to
 * milliseconds to correctly work with the Date API. 
 * 
 * @param {number} time
 * @returns {Date object}  
 */
const convertTime = time => new Date(time * 1000);

const extractTimeTempPrecip = hours => {
  const filtered = hours.map(hour => {
    const time = convertTime(hour.time);
    return {
      day: time.getDay(),
      hour: time.getHours(),
      precip: hour.precipProbability,
      temp: hour.temperature
    };
  })
  return filtered;
}

const splitDays = (hours, currentDate) => {
  const today = [],
        tomorrow = [];
  const currentDay = currentDate.getDay();
  hours.forEach(hour => {
    if(hour.day === currentDay) {
      today.push(hour);
    } else if(hour.day === currentDay + 1) {
      tomorrow.push(hour);
    }
  });
  return {
    today,
    tomorrow
  };
}

/**
 * The various data manipulation methods are called by two distinct functions.
 * This, the first, is to extract the relevant data from a successful API response.
 * This function returns the raw data, before it has been filtered based on user preferences.
 *  { 
 *    today: [
 *      {
 *        day: NUMBER (0-6),
 *        hour: NUMBER (0-23),
 *        precip: NUMBER (0-1),
 *        temp: NUMBER
 *      }
 *    ], 
 *    tomorrow: []
 *  }
 * 
 * @param {any} body 
 * @returns {object}
 */
export const formatAPIResponse = body => {
  try {
    const hours = body.hourly.data;
    const data = extractTimeTempPrecip(hours);
    const days = splitDays(data, new Date());
    return days;
  }
  catch (err) {
    throw err;
  }
}

/*
* #################################################
* These are functions related to the determination of appropriate
* transportation means using current settings and processed API data.
* #################################################
*/


const filterDaysForCommuteTimes = (days, settings) => {
  const filteredDays = {};
  const { departTime, returnTime } = settings;
  for(let day in days) {
    const hours = days[day];
    const filteredHours = hours.filter(hour => (
      hour.hour === departTime || hour.hour === returnTime
    ));
    filteredDays[day] = filteredHours;
  }
  return filteredDays;
}

/**
 * determineVehicle() evaluates an array containing both commute times and
 * returns METRO if either commutes would require metro riding due to
 * undesirable weather conditions (we are assuming for the purposes of this 
 * exercise that people won't use combination methods of transport).
 * 
 * @param {array} day 
 * @param {object} settings 
 * @returns {string}
 */
const determineVehicle = (day, settings) => {
  const { minTemp, maxTemp, maxPrecip } = settings;
  const filtered = day.map(commute => {
    const tempIsAcceptable = commute.temp >= minTemp && commute.temp <= maxTemp;
    const precipIsAcceptable = commute.precip <= maxPrecip
    return tempIsAcceptable && precipIsAcceptable ? BIKE : METRO;
  });
  return filtered.includes(METRO) ? METRO : BIKE;
}

const calculateRoutes = (days, settings) => {
  let routes = {};
  for (let day in days) {
    let route;
    const hours = days[day];
    const hasCommuteRemaining = hours.length ? true : false;    
    if(!hasCommuteRemaining){
      route = NONE;
    }
    else {
      route = determineVehicle(hours, settings)
    }
    routes[day] = route;
  }
  return routes;
}


/**
 * determineCommuteMethods() takes an object of days that contain arrays of hours with
 * pertinent weather conditions (stored as rawData in the weather reducer) and a settings
 * object representing current user preferences and returns an object that represents
 * the prefered means of commute as strings:
 *  {
 *    today: 'METRO',
 *    tomorrow: 'BIKE'
 *  }
 * 
 * @param {object} days 
 * @param {object} settings 
 * @returns {object}
 */
export const determineCommuteMethods = (days, settings) => {
  const commuteTimes = filterDaysForCommuteTimes(days, settings);
  const routes = calculateRoutes(commuteTimes, settings);
  return routes;
}