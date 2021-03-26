import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* eslint-disable-next-line no-undef */
const port = chrome.extension.connect({
    name: "Sample Communication"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
