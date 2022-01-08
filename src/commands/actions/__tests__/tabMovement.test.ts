import tabMovement from "src/commands/actions/tabMovement";
import chromeTabs from "src/api/tabs";
import {
  buildTab,
  indexToTab,
  createMockQueryImplementationWith,
} from "test_utils/tabs";

jest.mock("src/api/tabs");

const DEFAULT_TABS = [
  buildTab(),
  buildTab({ highlighted: true, id: 9 }),
  buildTab(),
].map(indexToTab);

describe("TabMovement", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("Moving a single tab to the left", () => {
    describe("When all tabs are unpinned", () => {
      it("moves the tab left if it is not the first", async () => {
        (chromeTabs.query as jest.Mock).mockImplementation(
          createMockQueryImplementationWith(DEFAULT_TABS)
        );

        await tabMovement("move_tab_left");
        expect(chromeTabs.move).toHaveBeenCalledWith(9, { index: 0 });
      });

      it("moves the tab to the end if it is the first", async () => {
        const TAB_STATE = [
          buildTab({ highlighted: true, id: 9 }),
          buildTab(),
          buildTab(),
        ].map(indexToTab);

        (chromeTabs.query as jest.Mock).mockImplementation(
          createMockQueryImplementationWith(TAB_STATE)
        );

        await tabMovement("move_tab_left");
        expect(chromeTabs.move).toHaveBeenCalledWith(9, { index: 2 });
      });
    });
  });

  describe("Moving a single tab to the right", () => {
    describe("When all tabs are unpinned", () => {
      it("moves the tab right if it is not the last", async () => {
        (chromeTabs.query as jest.Mock).mockImplementation(
          createMockQueryImplementationWith(DEFAULT_TABS)
        );

        await tabMovement("move_tab_right");
        expect(chromeTabs.move).toHaveBeenCalledWith(9, { index: 2 });
      });

      it("moves the tab to the start if it is the last", async () => {
        const TAB_STATE = [
          buildTab(),
          buildTab(),
          buildTab({ highlighted: true, id: 9 }),
        ].map(indexToTab);

        (chromeTabs.query as jest.Mock).mockImplementation(
          createMockQueryImplementationWith(TAB_STATE)
        );

        await tabMovement("move_tab_right");
        expect(chromeTabs.move).toHaveBeenCalledWith(9, { index: 0 });
      });
    });
  });

  describe("Move a single tab To Start", () => {
    it("moves it to the start even if it is already there", async () => {
      const TAB_STATE = [
        buildTab({ highlighted: true, id: 9 }),
        buildTab(),
        buildTab(),
      ].map(indexToTab);

      (chromeTabs.query as jest.Mock).mockImplementation(
        createMockQueryImplementationWith(TAB_STATE)
      );

      await tabMovement("move_tab_to_front");
      expect(chromeTabs.move).toHaveBeenCalledWith(9, { index: 0 });
    });

    it("moves it to the start if in the middle", async () => {
      const TAB_STATE = [
        buildTab(),
        buildTab({ highlighted: true, id: 9 }),
        buildTab(),
      ].map(indexToTab);

      (chromeTabs.query as jest.Mock).mockImplementation(
        createMockQueryImplementationWith(TAB_STATE)
      );

      await tabMovement("move_tab_to_front");
      expect(chromeTabs.move).toHaveBeenCalledWith(9, { index: 0 });
    });
  });

  describe("Move To End", () => {
    it("moves it to the end even if it is already there", async () => {
      const TAB_STATE = [
        buildTab(),
        buildTab(),
        buildTab({ highlighted: true, id: 9 }),
      ].map(indexToTab);

      (chromeTabs.query as jest.Mock).mockImplementation(
        createMockQueryImplementationWith(TAB_STATE)
      );

      await tabMovement("move_tab_to_end");
      expect(chromeTabs.move).toHaveBeenCalledWith(9, { index: 2 });
    });

    it("moves it to the end if it starts in the middle", async () => {
      const TAB_STATE = [
        buildTab(),
        buildTab({ highlighted: true, id: 9 }),
        buildTab(),
      ].map(indexToTab);

      (chromeTabs.query as jest.Mock).mockImplementation(
        createMockQueryImplementationWith(TAB_STATE)
      );

      await tabMovement("move_tab_to_end");
      expect(chromeTabs.move).toHaveBeenCalledWith(9, { index: 2 });
    });
  });
});
