import React from 'react';
import { withRouter } from 'react-router';

// Every Router page request should hit this 'route' which will reset the window scroll
// (React router doesn't do this by default)

// NB: While this particular project doesn't include any pages with overflow, as a matter
// of practice, I like to retain this boilerplate whenever I have a project that uses RR4.

class ScrollReset extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollReset);