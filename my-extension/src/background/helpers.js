/* eslint-disable no-undef */

export function forEachTab(fn) {
  chrome.windows.getCurrent({ populate: true }, (curWindow) => {
    curWindow.tabs.forEach(fn);
  });
}

export function updateTab(id, config) {
  chrome.tabs.update(id, config);
}

export function removeTab(id) {
    chrome.tabs.remove(id);
}
