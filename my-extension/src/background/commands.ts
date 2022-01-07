import {
  forEachTab,
  updateTab,
  removeTab,
  navigateTo,
  moveCurrentTabToNewWindow,
  consolidateTabsFromWindows,
  tabMovement
} from "./helpers";
import {
  TAB_TOGGLE_PIN_UNPIN,
  TAB_UNPIN_ALL,
  TAB_PIN_ALL,
  TAB_CLOSE_ALL_UNPINNED,
  TAB_MOVE_TO_NEW_WINDOW,
  TAB_CONSOLIDATE_FROM_WINDOWS,
  TAB_LEFT,
  TAB_RIGHT,
  TAB_MOVE_TO_FRONT,
  TAB_MOVE_TO_END,
  EXTENSIONS_MANAGER,
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
  },
  [TAB_LEFT]() {
    tabMovement(TAB_LEFT);
  },
  [TAB_RIGHT]() {
    tabMovement(TAB_RIGHT);
  },
  [TAB_MOVE_TO_FRONT]() {
    tabMovement(TAB_MOVE_TO_FRONT);
  },
  [TAB_MOVE_TO_END]() {
    tabMovement(TAB_MOVE_TO_END);
  }
};

export const commandNames = Object.keys(handlers);

export default handlers;
