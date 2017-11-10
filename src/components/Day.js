import React from 'react';
import PropTypes from 'prop-types';
import './Day.css';
import { weatherIcons } from '../images';
const iconErr = weatherIcons['ERR']

const Day = ({type, date, icon}) => {
  return (
    <section className={`day__outer day--${type}`}>
      <figure className='day__inner'>
        <img src={icon} alt="" className="day__icon" />
        <figcaption className={`day__title day--${type}`}>{date}</figcaption>
      </figure>
    </section>
  )
}

Day.propTypes = {
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired
}

Day.defaultProps = {
  type: 'ERR',
  icon: iconErr,
  date: 'ERROR'
}

export default Day;