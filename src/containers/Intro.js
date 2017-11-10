import React from 'react';
import './Intro.css';
import { Link } from 'react-router-dom';

const Intro = () => {
  return (
    <main className="intro__outer">
      <h1 className="intro__subheader">Demo using the Dark Sky API: </h1>
      <h1 className="intro__header">Bike or Metro?</h1>
      <p className="intro__body">A mobile-first web app that determines what method of transportation you should use for your commute, based on stored preferences and current weather forecasts.</p>
      <button className="intro__button"><Link to="/app">Open app</Link></button>
    </main>
  )
}

export default Intro;