// Facade around Chrome API => runtime
// https://developer.chrome.com/docs/extensions/reference/runtime/
type ConnectInfo = chrome.runtime.ConnectInfo;
type Port = chrome.runtime.Port;
type InstalledDetails = chrome.runtime.InstalledDetails;

const runtime = {
  reload() {
    return chrome.runtime.reload();
  },
  connect(info: ConnectInfo): Port {
    return chrome.runtime.connect(info);
  },
  getBackgroundPage(callback) {
    return chrome.runtime.getBackgroundPage(callback);
  },
  sendMessage(message) {
    return chrome.runtime.sendMessage(message);
  },
  onMessage: {
    addListener(callback) {
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        callback(message, sender, sendResponse);
      });
    },
  },
  onConnect: {
    addListener(callback: (port: Port) => void) {
      chrome.runtime.onConnect.addListener(callback);
    },
  },
  onInstalled: {
    addListener(callback: (details: InstalledDetails) => void) {
      chrome.runtime.onInstalled.addListener(callback);
    },
  },
};

export { runtime as default };
