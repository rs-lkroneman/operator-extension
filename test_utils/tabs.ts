import {Tab} from 'src/api/tabs';

export const buildTab = (overrides: Partial<Tab> = {}): Tab => ({
  windowId: 1,
  index: 0,
  groupId: 0,
  incognito: false,
  pinned: false,
  highlighted: false,
  active: false,
  selected: false,
  discarded: false,
  autoDiscardable: false,
  ...overrides
});

export const indexToTab = (tab, index) => ({
  ...tab,
  index: index
});

export const queryTabs = (tabs, query) => {
  return tabs.filter(tab => Object.keys(query).every(
    property => query[property] === tab[property])
  );
}

export const createMockQueryImplementationWith = (tabs) => {
  return (config) => {
    const { currentWindow, ...otherQueryConfig } = config;
    return queryTabs(tabs, otherQueryConfig);
  }
}
