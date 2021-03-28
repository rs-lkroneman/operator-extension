import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';

import { StateProvider } from '../store';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <Popup />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
