import {
  TAB_LEFT,
  TAB_RIGHT,
  TAB_MOVE_TO_FRONT,
  TAB_MOVE_TO_END,
} from "src/constants";

import { createRange } from "src/utils";
import chromeTabs from "src/api/tabs";

export type TabDirection =
  | "move_tab_left"
  | "move_tab_right"
  | "move_tab_to_end"
  | "move_tab_to_front";

export type Boundaries = {
  left: number;
  right: number;
};

const moveTabsLeft = (tabs, { left, right }) => {
  const [firstTab] = tabs;
  const isFirstInRange = firstTab && firstTab.index === left;

  // if wrapping around, we need to move only one tab,
  // even if more than one is selected
  if (isFirstInRange) {
    chromeTabs.move(firstTab.id, { index: right });
    return;
  }

  // If not wrapping around move all selected tabs to the left
  tabs.map((tab) => chromeTabs.move(tab.id, { index: tab.index - 1 }));
};

const moveTabsRight = (tabs, { left, right }) => {
  const lastTab = tabs[tabs.length - 1];
  const isLastInRange = lastTab && lastTab.index === right;

  // if wrapping around, we need to move only one tab,
  // even if more than one is selected
  if (isLastInRange) {
    chromeTabs.move(lastTab.id, { index: left });
    return;
  }

  // If not wrapping around move all selected tabs to the right by incrementing their index
  tabs.reverse(); // when moving right, process tabs from right to left
  tabs.map((tab) => chromeTabs.move(tab.id, { index: tab.index + 1 }));
};

const moveTabsToFront = (tabs, { left, right }) => {
  const newPositions = createRange(left, 1, tabs.length);
  for (let i = 0; i < newPositions.length; i++) {
    chromeTabs.move(tabs[i].id, { index: newPositions[i] });
  }
};

const moveTabsToEnd = (tabs, { right }) => {
  tabs.reverse(); // when moving right, process tabs from right to left
  const newPositions = createRange(right, -1, tabs.length);
  for (let i = 0; i < newPositions.length; i++) {
    chromeTabs.move(tabs[i].id, { index: newPositions[i] });
  }
};

export type Movements = {
  [index in TabDirection]: (id: any[], boundaries: Boundaries) => void;
};

const movements: Movements = {
  [TAB_LEFT]: moveTabsLeft,
  [TAB_RIGHT]: moveTabsRight,
  [TAB_MOVE_TO_FRONT]: moveTabsToFront,
  [TAB_MOVE_TO_END]: moveTabsToEnd,
};

async function moveTab(direction: TabDirection) {
  const moveTabs = movements[direction];

  const baseConfig = { currentWindow: true };
  const selectedConfig = { ...baseConfig, highlighted: true };

  const allTabs = await chromeTabs.query(baseConfig);
  const pinnedTabs = await chromeTabs.query({ ...baseConfig, pinned: true });

  // The current tab is the highlighted one
  const pinnedTabsToMove = await chromeTabs.query({
    ...selectedConfig,
    pinned: true,
  });

  const numPinnedTabs = pinnedTabs.length;
  if (pinnedTabsToMove.length) {
    moveTabs(pinnedTabsToMove, { left: 0, right: numPinnedTabs - 1 });
  }

  // The current tab is the highlighted one
  const unPinnedTabsToMove = await chromeTabs.query({
    ...selectedConfig,
    pinned: false,
  });

  const numAllTabs = allTabs.length;
  if (unPinnedTabsToMove.length) {
    moveTabs(unPinnedTabsToMove, {
      left: numPinnedTabs,
      right: numAllTabs - 1,
    });
  }
}

export const tabLeft = () => moveTab(TAB_LEFT);
export const tabRight = () => moveTab(TAB_RIGHT);
export const tabStart = () => moveTab(TAB_MOVE_TO_FRONT);
export const tabEnd = () => moveTab(TAB_MOVE_TO_END);

const tabMovement = {
  tabLeft,
  tabRight,
  tabStart,
  tabEnd,
};

export default tabMovement;
