import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Settings.css';
import ModalMenu from '../components/ModalMenu';
import { hideSettings, changeSetting } from '../actions/settingsActions';
import { settingsRanges } from '../utilities/constants';

import { Slider } from 'primereact/components/slider/Slider';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';

export const Settings = ({
  isActive,
  close,
  maxPrecip,
  minTemp,
  maxTemp,
  departTime,
  returnTime,
  changeSetting
}) => {

  const precipFixed = (maxPrecip * 100).toFixed(0);
  const hourFixed = hour => {
    return `${(hour + 24) % 12 || 12}${hour < 12 ? 'am' : 'pm'}`;
  };
  
  //The primereact library doesn't pass the original change event correctly. 
  //That means there are no unique identifiers, only values. 
  //To avoid inline lambdas, these rather prosaic functions are a bandaid of sorts.
  const updatePrecip = ({ value }) => {
    changeSetting('maxPrecip', value / 100);
  };

  const updateTemp = ({ value }) => {
    changeSetting('minTemp', value[0]);
    changeSetting('maxTemp', value[1]);
  };

  const updateTime = ({ value }) => {
    changeSetting('departTime', value[0]);
    changeSetting('returnTime', value[1]);
  };
  


  return (
    <ModalMenu
      className="settings"
      active={ isActive }
      enter={ 450 }
      exit={ 450 }
    >
      <section className="settings__outer">
        <div className="settings__inner">
          <button className="settings__close" onClick={ close }>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
          <h1 className="settings__header">Settings</h1>
          <div className="settings-input__container">
            <label htmlFor="maxPrecip">Chance of rain </label>
            <p>{ precipFixed }%</p>
            <Slider 
              className="prime__slider"
              id="maxPrecip" 
              value={ maxPrecip * 100 }
              onChange={ updatePrecip }
              min={ 0 }
              max={ 100 } 
              step={ 1 }
            />
          </div>
          <div className="settings-input__container">
            <label htmlFor="tempSlider">Temperature Range</label>
            <p>{ minTemp }° - { maxTemp }°</p>
            <Slider
              className="prime__slider"
              id="tempSlider"
              value={ [minTemp, maxTemp] }
              onChange={ updateTemp }
              min={ 0 }
              max={ 130 }
              step={ 1 }
              range={ true }
              animate={ true }
            />
          </div>
          <div className="settings-input__container">
            <label htmlFor="timeSlider">Commute Times</label>
            <p>{ hourFixed(departTime) } & { hourFixed(returnTime) }</p>
            <Slider
              className="prime__slider"            
              id="timeSlider"
              value={ [departTime, returnTime] }
              onChange={ updateTime }
              min={0}
              max={23}
              step={1}
              range={true}
              animate={true}
            />
          </div>
        </div>
      </section>
    </ModalMenu>
  )
}

Settings.propTypes = {
  isActive: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  maxPrecip: PropTypes.number.isRequired,
  minTemp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired,
  departTime: PropTypes.number.isRequired,
  returnTime: PropTypes.number.isRequired,
  changeSetting: PropTypes.func.isRequired
};

Settings.defaultProps = {
  isActive: false,
  close: () => {},
  maxPrecip: settingsRanges['maxPrecip'].default,
  minTemp: settingsRanges['minTemp'].default,
  maxTemp: settingsRanges['maxTemp'].default,
  departTime: settingsRanges['departTime'].default,
  returnTime: settingsRanges['returnTime'].default,
  changeSetting: () => {}  
}

const mapDispatchToProps = {
  close: hideSettings,
  changeSetting
};

export default connect(state => state.settings, mapDispatchToProps)(Settings);