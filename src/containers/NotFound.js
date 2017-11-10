import React from 'react';
import './NotFound.css';
import { Helmet } from 'react-helmet';

const NotFound = props => (
  <article className="notfound__outer">
    <Helmet>
      <title>404: Page Not Found</title>
    </Helmet>
    <div>404: Page Not Found</div>
  </article>
)

export default NotFound;