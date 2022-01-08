// Facade around Chrome API => tabs
// https://developer.chrome.com/docs/extensions/reference/tabs/
import {toPromise} from "./util";

const chromeTabs = {
  query(...args): Promise<chrome.tabs.Tab[]> {
    // @ts-ignore
    return toPromise<chrome.tabs.Tab[]>(chrome.tabs.query, ...args);
  },

  moveTabs(tabIds: number[], moveProperties: chrome.tabs.MoveProperties) {
    // @ts-ignore
    return toPromise<chrome.tabs.Tab>(chrome.tabs.move, tabIds, moveProperties)
  },

  move(tabId: number, moveProperties: chrome.tabs.MoveProperties) {
    // @ts-ignore
    return toPromise<chrome.tabs.Tab>(chrome.tabs.move, tabId, moveProperties)
  },

  remove(...args) {
    // @ts-ignore
    return chrome.tabs.remove(...args);
  },

  update(...args) {
    // @ts-ignore
    return chrome.tabs.update(...args);
  },

  async getCurrent() {
    const [result] = await this.query({currentWindow: true, active: true});
    return result;
  }
}

export {
  chromeTabs as default
}
