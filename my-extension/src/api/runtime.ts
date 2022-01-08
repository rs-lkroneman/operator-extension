// Facade around chrome runtime
// https://developer.chrome.com/docs/extensions/reference/runtime/
// eslint-disable-next-line @typescript-eslint/no-use-before-define
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
