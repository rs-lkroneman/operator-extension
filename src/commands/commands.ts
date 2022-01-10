import { tab } from "src/commands/helpers";

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
  TAB_CLOSE_ALL_TO_THE_RIGHT,
} from "src/constants";

import {
  tabPinning,
  tabClosing,
  tabMovement,
  moveCurrentTabToNewWindow,
  consolidateTabsFromWindows,
} from "src/commands/actions";

const handlers = {
  [TAB_TOGGLE_PIN_UNPIN]: tabPinning.togglePinned,
  [TAB_UNPIN_ALL]: tabPinning.unpinAllTabs,
  [TAB_PIN_ALL]: tabPinning.pinAllTabs,
  [TAB_CLOSE_ALL_UNPINNED]: tabClosing.closeAllUnpinned,
  [TAB_CLOSE_ALL_TO_THE_RIGHT]: tabClosing.closeAllToTheRight,
  [TAB_MOVE_TO_NEW_WINDOW]: moveCurrentTabToNewWindow,
  [TAB_CONSOLIDATE_FROM_WINDOWS]: consolidateTabsFromWindows,
  [TAB_LEFT]: tabMovement.tabLeft,
  [TAB_RIGHT]: tabMovement.tabRight,
  [TAB_MOVE_TO_FRONT]: tabMovement.tabStart,
  [TAB_MOVE_TO_END]: tabMovement.tabEnd,
  async [EXTENSIONS_MANAGER]() {
    await tab.navigateTo("chrome://extensions/");
  },
};

export const commandNames = Object.keys(handlers);

export default handlers;
