import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Day from '../components/Day';
import Loading from '../components/Loading';
import { 
  fetchWeatherData,
  refreshResults
} from '../actions/weatherActions';
import { showSettings } from '../actions/settingsActions';
import { weatherIcons } from '../images';
import 'font-awesome/css/font-awesome.css';
import './Home.css';

export class Home extends React.Component {

  componentDidMount = () => {
    this.props.fetchWeatherData();
  }

  componentWillReceiveProps = next => {
    // We want to make sure we recalculate every time the user changes a setting,
    // not just when a new API call is made.
    if(next.settings !== this.props.settings) {
      this.props.refreshResults();
    }
  }

  renderDays = results => {
    const days = ['today', 'tomorrow'];
    return days.map(day => {
      const type = results[day]
      return (
        <Day
          key={day}
          type={type}
          date={day}
          icon={weatherIcons[type]}
        />
      )
    });
  }

  // For expediency, we are reusing this component and setting its defaults to error state
  renderError = () => {
    return (
      <Day />
    )    
  }

  renderResults = () => {
    const {
      hasError, 
      results,
      lastUpdate,
      fetchWeatherData,
      showSettings
    } = this.props;

    const date = new Date(lastUpdate);
    
    return ([
      <Helmet key="1">
        <title>Should I commute by bike or metro?</title>
      </Helmet>,
      <main className="home__outer" key="2">
        <section className="home__inner">
          <button 
            className="home__button button--refresh" 
            onClick={ fetchWeatherData }
          >
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </button>
          <button 
            className="home__button button--settings" 
            onClick={ showSettings }
          >
            <i className="fa fa-sliders" aria-hidden="true"></i>
          </button>
          { hasError 
              ? this.renderError() 
              : results 
                ? this.renderDays(results) 
                : null 
          }
          <div className="home__updated">
            Last update: {date.toLocaleTimeString().toLowerCase()}
          </div>
        </section>
      </main>      
    ])
  }

  render() {
    return this.props.isFetching ? <Loading /> : this.renderResults();
  }
}

Home.propTypes = {
  settings: PropTypes.object.isRequired,
  results: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  err: PropTypes.string,
  lastUpdate: PropTypes.number.isRequired,
  fetchWeatherData: PropTypes.func.isRequired,
  showSettings: PropTypes.func.isRequired,
  refreshResults: PropTypes.func.isRequired
};

Home.defaultProps = {
  settings: {},
  results: {},
  isFetching: false,
  hasError: false,
  err: 'Undefined error',
  lastUpdate: 0,
  fetchWeatherData: () => {},
  showSettings: () => {},
  refreshResults: () => {}
}

const mapStateToProps = ({weather, settings}) => ({
  isFetching: weather.isFetching,
  results: weather.results,
  hasError: weather.hasError,
  err: weather.err,
  lastUpdate: weather.lastUpdate,
  settings
});

const mapDispatchToProps = {
  fetchWeatherData,
  showSettings,
  refreshResults
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);