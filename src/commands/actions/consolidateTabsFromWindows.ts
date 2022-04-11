import chromeWindow from "src/api/windows";
import chromeTabs from "src/api/tabs";

export default async function consolidateTabsFromWindows() {
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

  await chromeTabs.move(flattenedTabsIds as number[], {
    windowId: currentWindow.id,
    index: -1,
  });
}
