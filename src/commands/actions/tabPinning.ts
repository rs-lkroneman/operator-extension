import { currentWindow } from "src/commands/helpers";
import chromeTabs from "src/api/tabs";

export const togglePinned = () => {
  currentWindow.forEachTab((tab) => {
    if (!tab.active) {
      return;
    }

    chromeTabs.update(tab.id, { pinned: !tab.pinned });
  });
};

export const unpinAllTabs = () => {
  currentWindow.forEachTab((tab) => {
    chromeTabs.update(tab.id, { pinned: false });
  });
};

export const pinAllTabs = () => {
  currentWindow.forEachTab((tab) => {
    chromeTabs.update(tab.id, { pinned: true });
  });
};

const tabPinning = {
  togglePinned,
  unpinAllTabs,
  pinAllTabs,
};

export default tabPinning;
