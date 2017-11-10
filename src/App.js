import React from 'react';
import { Helmet } from 'react-helmet';
import Routes from './routes/Routes';
import ModalRoot from './containers/ModalRoot';


const App = () => (
  [
    <Helmet key="aa"
      titleTemplate="Bike or Metro - %s"
      defaultTitle="Bike or Metro"
    >
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <meta name="description" content="Pedal or Puddle" />
      <meta name="author" content="Brendan Beltz - brendanbeltz@gmail.com" />
    </Helmet>,
    <Routes key="bb" />,
    <ModalRoot key="cc" />
  ]
)

export default App;
