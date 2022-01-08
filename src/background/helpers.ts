import chromeWindow from '../api/windows';
import chromeTabs from "../api/tabs";

export async function forEachTab(fn) {
  const currentWindow = await chromeWindow.getCurrent({ populate: true });
  if(!currentWindow || !currentWindow.tabs) {
    return;
  }

  currentWindow.tabs.forEach(fn);
}

export function updateTab(id, config) {
  return chromeTabs.update(id, config);
}

export function removeTab(id) {
  return chromeTabs.remove(id);
}

export function navigateTo(url) {
  return chromeTabs.update({ url });
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
  await chromeTabs.move(tabId, {
    windowId: newWindowId,
    index: -1,
  });

  const movedTabIndex = tabsToClose.length - 1;
  tabsToClose.forEach((tab, index) => {
    chromeTabs.remove(tab.id);
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

  await chromeTabs.moveTabs(flattenedTabsIds, {
    windowId: currentWindow.id,
    index: -1,
  });
}
