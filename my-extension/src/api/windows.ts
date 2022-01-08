import { callbackToPromise } from "./util";

type ChromeWindow = {} & chrome.windows.Window;

const windows = {
  getCurrent() {
    return callbackToPromise<ChromeWindow>(chrome.windows.getCurrent);
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

  getAll(...args) {
    return callbackToPromise<ChromeWindow[]>(chrome.windows.update, ...args);
  }
}

export {
  windows as default
}
