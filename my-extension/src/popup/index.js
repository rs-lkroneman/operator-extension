import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';
import './Popup.scss';

import { StateProvider } from '../store';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <Popup />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
