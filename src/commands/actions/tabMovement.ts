import {
  TAB_LEFT,
  TAB_MOVE_TO_END,
  TAB_MOVE_TO_FRONT,
  TAB_RIGHT
} from "src/constants";

import {createRange} from 'src/utils';
import chromeTabs from "src/api/tabs";

export default async function tabMovement(direction) {
  const baseConfig = {currentWindow: true};
  const tabCount = {all: 0, pinned: 0};
  const countAll = tabs => (tabCount.all = tabs.length);
  const countPinned = tabs => (tabCount.pinned = tabs.length);
  const movePinnedTabs = tabs => moveTabs(tabs, 0, tabCount.pinned - 1);
  const moveUnpinnedTabs = tabs =>
    moveTabs(tabs, tabCount.pinned, tabCount.all - 1);

  function moveTabs(tabs, leftBoundary, rightBoundary) {
    let newPositions = [];
    if (TAB_LEFT === direction) {
      const [firstTab] = tabs;
      const isFirstInRange = firstTab && firstTab.index === leftBoundary;
      // if wrapping around, we need to move only one tab,
      // even if more than one is selected
      if (isFirstInRange) {
        chromeTabs.move(firstTab.id, {index: rightBoundary});
        return;
      }

      newPositions = tabs.map(tab => tab.index - 1);
    } else if (TAB_RIGHT === direction) {
      const isLastInRange = tabs[tabs.length - 1] &&
        tabs[tabs.length - 1].index === rightBoundary;
      // if wrapping around, we need to move only one tab,
      // even if more than one is selected
      if (isLastInRange) {
        chromeTabs.move(tabs[tabs.length - 1].id, {index: leftBoundary});
        return;
      }

      tabs.reverse(); // when moving right, process tabs from right to left
      newPositions = tabs.map((tab) => tab.index + 1);
    } else if (TAB_MOVE_TO_FRONT === direction) {
      newPositions = createRange(leftBoundary, 1, tabs.length);
    } else if (TAB_MOVE_TO_END === direction) {
      tabs.reverse(); // when moving right, process tabs from right to left
      newPositions = createRange(rightBoundary, -1, tabs.length);
    }

    for (let i = 0; i < newPositions.length; i++) {
      chromeTabs.move(tabs[i].id, {index: newPositions[i]});
    }
  }

  const allTabs = await chromeTabs.query(baseConfig);
  countAll(allTabs);
  const pinnedTabs = await chromeTabs.query({...baseConfig, pinned: true});
  countPinned(pinnedTabs);

  const pinnedTabsToMove = await chromeTabs.query(
    {...baseConfig, highlighted: true, pinned: true});
  movePinnedTabs(pinnedTabsToMove);

  const unPinnedTabsToMove = await chromeTabs.query(
    {...baseConfig, highlighted: true, pinned: false});

  moveUnpinnedTabs(unPinnedTabsToMove);
}
