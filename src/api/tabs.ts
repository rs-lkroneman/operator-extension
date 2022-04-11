// Facade around Chrome API => tabs
// https://developer.chrome.com/docs/extensions/reference/tabs/
import { toPromise } from "./util";

export type Tab = chrome.tabs.Tab;

const chromeTabs = {
  query(queryInfo): Promise<chrome.tabs.Tab[]> {
    return new Promise<chrome.tabs.Tab[]>((resolve) => {
      chrome.tabs.query(queryInfo, (result) => {
        resolve(result);
      });
    });
  },

  moveTabs(...args) {
    // @ts-ignore
    return toPromise<chrome.tabs.Tab>(chrome.tabs.move, ...args);
  },

  move(tabId: number | number[], moveProperties: chrome.tabs.MoveProperties) {
    return new Promise<chrome.tabs.Tab>((resolve) => {
      // @ts-ignore
      chrome.tabs.move(tabId, moveProperties, (result) => {
        // @ts-ignore
        return resolve(result);
      });
    });
  },
  // @ts-ignore
  remove(...args) {
    // @ts-ignore
    return chrome.tabs.remove(...args);
  },
  // @ts-ignore
  update(...args) {
    // @ts-ignore
    return chrome.tabs.update(...args);
  },

  async getCurrent() {
    const [result] = await this.query({ currentWindow: true, active: true });
    return result;
  },
};

export { chromeTabs as default };
