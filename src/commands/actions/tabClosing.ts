import { currentWindow } from "src/commands/helpers";
import chromeTabs from "src/api/tabs";

export const closeAllUnpinned = () => {
  currentWindow.forEachTab((tab) => {
    if (!tab.pinned) {
      chromeTabs.remove(tab.id);
    }
  });
};

export const closeAllToTheRight = () => {
  let activeTabIndex: number = 9999;
  currentWindow.forEachTab((tab, index) => {
    if (tab.active) {
      activeTabIndex = index;
      return;
    }

    if (index > activeTabIndex) {
      chromeTabs.remove(tab.id);
    }
  });
};

const tabClosing = {
  closeAllUnpinned,
  closeAllToTheRight,
};

export default tabClosing;
