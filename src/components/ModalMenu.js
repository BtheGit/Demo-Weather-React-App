import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

/**
 * ModalMenu is a simple wrapper over CSSTransition.
 * 
 */
const ModalMenu = ({ 
  children, 
  className = 'undefined', 
  active = false, 
  enter = 100, 
  exit = 100, 
  ...props 
}) => {
  return (
    <CSSTransition
      key={ className }
      classNames={ className }
      appear={ true }
      timeout={ {enter, exit} }
      in={ active }
      unmountOnExit={ true }
      { ...props }
    >
      { children }
    </CSSTransition>
  )
}

ModalMenu.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  enter: PropTypes.number.isRequired,
  exit: PropTypes.number.isRequired,
};

export default ModalMenu;