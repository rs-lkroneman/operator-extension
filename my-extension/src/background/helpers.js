/* global chrome */
import {
  TAB_LEFT,
  TAB_RIGHT,
  TAB_MOVE_TO_FRONT,
  TAB_MOVE_TO_END
} from "../constants";

const toPromise = (api) => (...args) =>
  new Promise((resolve) => api(...args, resolve));

const chromeWindow = {
  getCurrent: toPromise(chrome.windows.getCurrent),
  get: toPromise(chrome.windows.get),
  create: toPromise(chrome.windows.create),
  update: toPromise(chrome.windows.update),
  getAll: toPromise(chrome.windows.getAll),
};

const chromeTabs = {
  query: toPromise(chrome.tabs.query),
  move: toPromise(chrome.tabs.move),
  async getCurrent() {
    const [result] = await this.query({ currentWindow: true, active: true });
    return result;
  },
};

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

export function navigateTo(url) {
  chrome.tabs.update({ url });
}

export async function moveCurrentTabToNewWindow() {
  const { id: tabId, windowId } = await chromeTabs.getCurrent();
  const currentWindow = await chromeWindow.get(windowId, { populate: true });
  const { id: newWindowId } = await chromeWindow.create({
    top: currentWindow.top,
    left: currentWindow.left,
    width: currentWindow.width,
    height: currentWindow.height,
    focused: false,
  });
  const tabsToClose = await chromeTabs.query({ windowId: newWindowId });
  await chromeWindow.update(newWindowId, { state: currentWindow.state });
  await chromeTabs.move([tabId], {
    windowId: newWindowId,
    index: -1,
  });

  const movedTabIndex = tabsToClose.length - 1;
  tabsToClose.forEach((tab, index) => {
    chrome.tabs.remove(tab.id);
    if (movedTabIndex === index) {
      chromeWindow.update(newWindowId, {
        focused: true,
      });
    }
  });
}

export async function consolidateTabsFromWindows() {
  const currentWindow = await chromeWindow.getCurrent();
  const allWindows = await chromeWindow.getAll();
  const filerOutCurrent = (win) => win.id !== currentWindow.id;
  const filteredWindows = allWindows.filter(filerOutCurrent);
  const tabsFromOtherWindows = await Promise.all(
    filteredWindows.map((win) => chromeTabs.query({ windowId: win.id }))
  );
  const flattenedTabs = tabsFromOtherWindows
    .filter(Boolean)
    .reduce((result, current) => [...result, ...current], []);
  const isNotEmpty = (item) => Boolean(item) || item !== null;
  const flattenedTabsIds = flattenedTabs
    .map((tab) => tab.id)
    .filter(isNotEmpty);

  if (flattenedTabs.length < 1) {
    return;
  }

  await chromeTabs.move(flattenedTabsIds, {
    windowId: currentWindow.id,
    index: -1,
  });
}

const createRange = (value, step, count) => {
  const list = [];
  for (let i = 0; i < count; i++, value += step) {
    list.push(value);
  }

  return list;
};

export async function tabMovement(direction) {
  const baseConfig = { currentWindow: true };
  const tabCount = { all: 0, pinned: 0 };
  const countAll = tabs => (tabCount.all = tabs.length);
  const countPinned = tabs => (tabCount.pinned = tabs.length);
  const movePinnedTabs = tabs => moveTabs(tabs, 0, tabCount.pinned - 1);
  const moveUnpinnedTabs = tabs =>
    moveTabs(tabs, tabCount.pinned, tabCount.all - 1);

  function moveTabs(tabs, leftBoundary, rightBoundary) {
    let newPositions = [];
    if (TAB_LEFT === direction) {
      const [firstTab] = tabs;
      const isFirstInRange = firstTab && firstTab.index === leftBoundary;
      // if wrapping around, we need to move only one tab,
      // even if more than one is selected
      if (isFirstInRange) {
        chrome.tabs.move(firstTab.id, { index: rightBoundary });
        return;
      }

      newPositions = tabs.map(tab => tab.index - 1);
    } else if (TAB_RIGHT === direction) {
      const isLastInRange = tabs[tabs.length - 1] &&
            tabs[tabs.length - 1].index === rightBoundary;
      // if wrapping around, we need to move only one tab,
      // even if more than one is selected
      if (isLastInRange) {
        chrome.tabs.move(tabs[tabs.length - 1].id, { index: leftBoundary });
        return;
      }

      tabs.reverse(); // when moving right, process tabs from right to left
      newPositions = tabs.map((tab) => tab.index + 1);
    } else if (TAB_MOVE_TO_FRONT === direction) {
      newPositions = createRange(leftBoundary, 1, tabs.length);
    } else if (TAB_MOVE_TO_END === direction) {
      tabs.reverse(); // when moving right, process tabs from right to left
      newPositions = createRange(rightBoundary, -1, tabs.length);
    }

    for (let i = 0; i < newPositions.length; i++) {
      chrome.tabs.move(tabs[i].id, { index: newPositions[i] });
    }
  }

  chrome.tabs.query(baseConfig, countAll);
  chrome.tabs.query({ ...baseConfig, pinned: true }, countPinned);
  chrome.tabs.query(
    { ...baseConfig, highlighted: true, pinned: true },
    movePinnedTabs
  );
  chrome.tabs.query(
    { ...baseConfig, highlighted: true, pinned: false },
    moveUnpinnedTabs
  );
}
