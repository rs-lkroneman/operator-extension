import { forEachTab, updateTab, removeTab } from "./helpers";
import {
  TAB_TOGGLE_PIN_UNPIN,
  TAB_UNPIN_ALL,
  TAB_PIN_ALL,
  TAB_CLOSE_ALL_UNPINNED,
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
};

export default handlers;
