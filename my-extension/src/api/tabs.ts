import {toPromise} from "./util";

const chromeTabs = {
  query(queryInfo: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> {
    // @ts-ignore
    return toPromise<chrome.tabs.Tab[]>(chrome.tabs.query, queryInfo)
  },

  moveTabs(tabIds: number[], moveProperties: chrome.tabs.MoveProperties) {
    // @ts-ignore
    return toPromise<chrome.tabs.Tab>(chrome.tabs.move, tabIds, moveProperties)
  },

  move(tabId: number, moveProperties: chrome.tabs.MoveProperties) {
    // @ts-ignore
    return toPromise<chrome.tabs.Tab>(chrome.tabs.move, tabId, moveProperties)
  },

  update(...args) {
    // @ts-ignore
    return chrome.tabs.update(...args);
  },

  async getCurrent() {
    const [result] = await this.query({ currentWindow: true, active: true });
    return result;
  }
}

export {
  chromeTabs as default
}
