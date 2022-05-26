import chromeTabs from "src/api/tabs";
import chromeWindow from "src/api/windows";

export async function forEachTab(fn) {
  const tabsInCurrentWindow = await chromeTabs.query({ currentWindow: true });
  console.log(tabsInCurrentWindow);
  if (tabsInCurrentWindow.length) {
    tabsInCurrentWindow.forEach(fn);
    return;
  }

  const currentWindow = await chromeWindow.getCurrent({ populate: true });
  if (!currentWindow || !currentWindow.tabs) {
    return;
  }

  currentWindow.tabs.forEach(fn);
}

const currentWindow = {
  forEachTab,
};

export default currentWindow;
