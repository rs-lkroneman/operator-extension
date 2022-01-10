import {
  TAB_CLOSE_ALL_TO_THE_RIGHT,
  TAB_CLOSE_ALL_UNPINNED,
  TAB_MOVE_TO_END,
  TAB_MOVE_TO_FRONT,
  TAB_PIN_ALL,
  TAB_UNPIN_ALL,
} from "./src/constants";
// keep this import as "./src/constants", it is referenced by a file outside of webpack
// so aliases don't seem to be working

type ExtensionShortcutConfig = {
  [index: string]: {
    description: string;
  };
};

// !Verify that these don't conflict with the ones in config/manifest
// A maximum of 4 can include a "suggested_key"
// But others can have a shortcut assigned after the fact using the menu in
// chrome://extensions/shortcuts
const shortcutConfig: ExtensionShortcutConfig = {
  [TAB_MOVE_TO_FRONT]: {
    description: "Move selected tab to the front",
  },
  [TAB_MOVE_TO_END]: {
    description: "Move selected tab to the end",
  },
  [TAB_CLOSE_ALL_UNPINNED]: {
    description: "Close all unpinned tabs",
  },
  [TAB_CLOSE_ALL_TO_THE_RIGHT]: {
    description: "Close all tabs to the right",
  },
  [TAB_PIN_ALL]: {
    description: "Pin all tabs in current window",
  },
  [TAB_UNPIN_ALL]: {
    description: "un-Pin all tabs in current window",
  },
};

export default shortcutConfig;
