import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ModalRoot.css';
import { TransitionGroup } from 'react-transition-group';
import Settings from './Settings';

const ModalRoot = ({ isActive }) => {
  
  return (
    <TransitionGroup>
      <Settings />
    </TransitionGroup>
  )
}

ModalRoot.propTypes = {
  isActive: PropTypes.bool,
}

export default connect(state => state.settings)(ModalRoot);