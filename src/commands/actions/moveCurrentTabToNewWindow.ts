import chromeTabs from "src/api/tabs";
import chromeWindow from "src/api/windows";

export default async function moveCurrentTabToNewWindow() {
  const { id: tabId, windowId, pinned } = await chromeTabs.getCurrent();
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
  const newTab = await chromeTabs.move(tabId, {
    windowId: newWindowId,
    index: -1,
  });
  await chromeTabs.update(newTab.id, {
    pinned,
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
