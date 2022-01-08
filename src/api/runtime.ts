// Facade around Chrome API => runtime
// https://developer.chrome.com/docs/extensions/reference/runtime/
type InstalledDetails = chrome.runtime.InstalledDetails;

const runtime = {
  onInstalled: {
    addListener(callback: (details: InstalledDetails) => void) {
      chrome.runtime.onInstalled.addListener(callback);
    }
  }
}

export {
  runtime as default
}
