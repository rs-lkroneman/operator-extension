import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { store, StateProvider } from './store';

/* eslint-disable-next-line no-undef */
const port = chrome.extension.connect({
    name: "Sample Communication"
});

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
  console.log(msg)
});
