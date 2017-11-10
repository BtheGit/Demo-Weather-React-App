import React from 'react';
import './Loading.css';
import { spinnerWheel } from '../images';

const Loading = () => (
  <div className="loading__outer">
    <img className="loading__spinner" src={spinnerWheel} alt="" />
  </div>
)

export default Loading;