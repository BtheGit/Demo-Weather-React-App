import createHistory from 'history/createBrowserHistory';
const history = createHistory();

// History is modularized for future implementations of router features,
// such as authentication routes, that need access to the same history
// object rather than a new instance.

export default history;

