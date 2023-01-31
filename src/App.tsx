import PropTypes from 'prop-types';
import React from 'react';
import ToggleColorMode from './components/ToggleColorMode';
import Views from './components/Views';

type Props = {};

function App(props: Props) {
  return (
    <>
      <Views />
      <ToggleColorMode />
    </>
  );
}

export default App;
