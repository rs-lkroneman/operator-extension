/* eslint-disable no-undef */
const port = chrome.extension.connect({
    name: "Sample Communication"
});

port.postMessage("Hi BackGround");
// port.onMessage.addListener(function(msg) {
//   console.log(msg)
// });

export default port;
