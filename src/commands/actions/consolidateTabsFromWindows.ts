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
  const hasId = (item) => Boolean(item?.id);
  const flattenedTabs = tabsFromOtherWindows
    .filter(Boolean)
    .reduce((result, current) => [...result, ...current], [])
    .filter(hasId);

  if (flattenedTabs.length < 1) {
    return;
  }

  for (const tab of flattenedTabs) {
    if (tab.id) {
      const movedTab = await chromeTabs.move(tab.id, {
        windowId: currentWindow.id,
        index: -1,
      });

      await chromeTabs.update(movedTab.id, {
        pinned: tab.pinned,
      });
    }
  }
}
