// Facade around Chrome API => runtime
// https://developer.chrome.com/docs/extensions/reference/runtime/
type Port = chrome.runtime.Port;
type InstalledDetails = chrome.runtime.InstalledDetails;

const runtime = {
  reload() {
    return chrome.runtime.reload();
  },
  connect(): Port {
    return chrome.runtime.connect();
  },
  getBackgroundPage(callback) {
    return chrome.runtime.getBackgroundPage(callback);
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
