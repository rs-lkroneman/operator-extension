/* eslint-disable no-undef */
const port = chrome.extension.connect({
    name: "Sample Communication"
});

port.postMessage("Hi BackGround");

export default port;
