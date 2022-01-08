import tabMovement from 'src/commands/actions/tabMovement';
import chromeTabs from "src/api/tabs";
import {buildTab, indexToTab, createMockQueryImplementationWith} from "test_utils/tabs";

jest.mock("src/api/tabs");

const DEFAULT_TABS = [
  buildTab(),
  buildTab({highlighted: true, id: 9}),
  buildTab()
].map(indexToTab);

describe('TabMovement', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  describe('When all tabs are unpinned', () => {
    it('moves the tab left if it is not the first', async () => {
      (chromeTabs.query as jest.Mock).mockImplementation(createMockQueryImplementationWith(DEFAULT_TABS));

      await tabMovement('move_tab_left');
      expect(chromeTabs.move).toHaveBeenCalledWith(9, {index: 0})
    });

    it('moves the tab to the end if it is the first', async () => {
      const WITH_FIRST_TAB_ACTIVE = [
        buildTab({highlighted: true, id: 9}),
        buildTab(),
        buildTab()
      ].map(indexToTab);

      (chromeTabs.query as jest.Mock).mockImplementation(createMockQueryImplementationWith(WITH_FIRST_TAB_ACTIVE));

      await tabMovement('move_tab_left');
      expect(chromeTabs.move).toHaveBeenCalledWith(9, {index: 2})
    });
  });

  describe('Moving Right', () => {

  });

  describe('Move To Start', () => {

  })

  describe('Move To End', () => {

  });
  it('is my first test', () => {
    (chromeTabs.query as jest.Mock).mockImplementation((config) => {
      return [];
    });
    tabMovement('move_tab_left');
    expect(false).not.toBeTruthy();
  });
});
