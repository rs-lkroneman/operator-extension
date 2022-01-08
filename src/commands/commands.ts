import {
  forEachTab,
  updateTab,
  removeTab,
  navigateTo,
  moveCurrentTabToNewWindow,
  consolidateTabsFromWindows,
  tabMovement
} from "../background/helpers";
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
  async [TAB_MOVE_TO_NEW_WINDOW]() {
    await moveCurrentTabToNewWindow();
  },
  async [TAB_CONSOLIDATE_FROM_WINDOWS]() {
    await consolidateTabsFromWindows();
  },
  async [TAB_LEFT]() {
    await tabMovement(TAB_LEFT);
  },
  async [TAB_RIGHT]() {
    await tabMovement(TAB_RIGHT);
  },
  async [TAB_MOVE_TO_FRONT]() {
    await tabMovement(TAB_MOVE_TO_FRONT);
  },
  async [TAB_MOVE_TO_END]() {
    await tabMovement(TAB_MOVE_TO_END);
  }
};

export const commandNames = Object.keys(handlers);

export default handlers;
