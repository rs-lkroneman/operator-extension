// Facade around Chrome API => windows
// https://developer.chrome.com/docs/extensions/reference/windows/

import { callbackToPromise } from "./util";
type ChromeWindow = {} & chrome.windows.Window;

const windows = {
  getCurrent(...args) {
    return callbackToPromise<ChromeWindow>(chrome.windows.getCurrent, ...args);
  },

  get(...args) {
    return callbackToPromise<ChromeWindow>(chrome.windows.get, ...args);
  },

  create(...args) {
    return callbackToPromise<ChromeWindow>(chrome.windows.create, ...args);
  },

  update(...args) {
    return callbackToPromise(chrome.windows.update, ...args);
  },

  getAll() {
    return chrome.windows.getAll();
  },
};

export { windows as default };
