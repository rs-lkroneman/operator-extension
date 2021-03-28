import {
  forEachTab,
  updateTab,
  removeTab,
  navigateTo,
  moveCurrentTabToNewWindow,
  consolidateTabsFromWindows
} from "./helpers";
import {
  TAB_TOGGLE_PIN_UNPIN,
  TAB_UNPIN_ALL,
  TAB_PIN_ALL,
  TAB_CLOSE_ALL_UNPINNED,
  TAB_MOVE_TO_NEW_WINDOW,
  EXTENSIONS_MANAGER,
  TAB_CONSOLIDATE_FROM_WINDOWS
} from "../constants";

const handlers = {
  [TAB_TOGGLE_PIN_UNPIN]() {
    forEachTab((tab) => {
      if (!tab.active) {
        return;
      }

      updateTab(tab.id, { pinned: !tab.pinned });
    });
  },
  [TAB_UNPIN_ALL]() {
    forEachTab((tab) => {
      updateTab(tab.id, { pinned: false });
    });
  },
  [TAB_PIN_ALL]() {
    forEachTab((tab) => {
      updateTab(tab.id, { pinned: true });
    });
  },
  [TAB_CLOSE_ALL_UNPINNED]() {
    forEachTab((tab) => {
      if (!tab.pinned) {
        removeTab(tab.id);
      }
    });
  },
  [EXTENSIONS_MANAGER]() {
    navigateTo("chrome://extensions/")
  },
  [TAB_MOVE_TO_NEW_WINDOW]() {
    moveCurrentTabToNewWindow();
  },
  [TAB_CONSOLIDATE_FROM_WINDOWS]() {
    consolidateTabsFromWindows();
  }
};

export const commandNames = Object.keys(handlers);

export default handlers;
