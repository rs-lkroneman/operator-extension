import chromeTabs from "src/api/tabs";
import chromeWindow from "src/api/windows";

export default async function moveCurrentTabToNewWindow() {
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
