import commandReducer, { initialState } from "src/store/commandReducer";
import backgroundClient from "src/background/client";
import {
  COMMANDS_EXECUTE,
  COMMANDS_EXECUTE_OPTION,
  COMMANDS_FILTER,
  COMMANDS_SELECT_DOWN,
  COMMANDS_SELECT_UP,
  COMMANDS_UPDATE,
} from "src/constants";

jest.mock("src/background/client");

describe("commandReducer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("commands", () => {
    it("is an empty array by default", () => {
      const result = commandReducer(undefined, {
        type: "invalid_action",
        payload: undefined,
      });

      expect(result).toEqual(
        expect.objectContaining({
          commands: [],
        })
      );
    });

    it("gets set by an action to update commands", () => {
      const result = commandReducer(undefined, {
        type: COMMANDS_UPDATE,
        payload: ["one", "two", "three"],
      });

      expect(result).toEqual(
        expect.objectContaining({
          commands: ["one", "two", "three"],
        })
      );
    });

    it("does not update state when the update commands action has no payload", () => {
      const result = commandReducer(
        { ...initialState, commands: ["one", "two", "three"] },
        {
          type: COMMANDS_UPDATE,
          payload: undefined,
        }
      );

      expect(result).toEqual(
        expect.objectContaining({
          commands: ["one", "two", "three"],
        })
      );
    });
  });

  describe("SearchTerm", () => {
    it("Filters commands when not undefined", () => {
      const result = commandReducer(
        { ...initialState, commands: ["close other", "open new", "move left"] },
        {
          type: COMMANDS_FILTER,
          payload: "left",
        }
      );

      expect(result).toEqual(
        expect.objectContaining({
          searchTerm: "left",
          filteredCommands: ["move left"],
        })
      );
    });

    it("Lowercases the search term when filtering", () => {
      const result = commandReducer(
        { ...initialState, commands: ["close other", "open new", "move left"] },
        {
          type: COMMANDS_FILTER,
          payload: "leFT",
        }
      );

      expect(result).toEqual(
        expect.objectContaining({
          searchTerm: "leFT",
          filteredCommands: ["move left"],
        })
      );
    });

    it("Lowercases the command when filtering", () => {
      const result = commandReducer(
        { ...initialState, commands: ["close other", "open new", "move LEFT"] },
        {
          type: COMMANDS_FILTER,
          payload: "leFT",
        }
      );

      expect(result).toEqual(
        expect.objectContaining({
          searchTerm: "leFT",
          filteredCommands: ["move LEFT"],
        })
      );
    });

    it("Returns the entire list when undefined", () => {
      const result = commandReducer(
        { ...initialState, commands: ["close other", "open new", "move left"] },
        {
          type: COMMANDS_FILTER,
          payload: undefined,
        }
      );

      expect(result).toEqual(
        expect.objectContaining({
          searchTerm: undefined,
          filteredCommands: ["close other", "open new", "move left"],
        })
      );
    });

    it("pre-selects the first option in the list when filtering", () => {
      const result = commandReducer(
        { ...initialState, commands: ["close other", "open new", "move left"] },
        {
          type: COMMANDS_FILTER,
          payload: "left",
        }
      );

      expect(result).toEqual(
        expect.objectContaining({
          selectedCommand: 0,
        })
      );
    });

    it("resets the selected item when filteredCommands is empty", () => {
      const result = commandReducer(
        { ...initialState, commands: ["close other", "open new", "move left"] },
        {
          type: COMMANDS_FILTER,
          payload: "not in the list",
        }
      );

      expect(result).toEqual(
        expect.objectContaining({
          selectedCommand: null,
        })
      );
    });
  });

  describe("SelectedCommand", () => {
    describe("When no command is selected", () => {
      it("does nothing when dispatching action select up", () => {
        const result = commandReducer(
          {
            ...initialState,
            commands: ["close other", "open new", "move left"],
            selectedCommand: null,
          },
          {
            type: COMMANDS_SELECT_UP,
          }
        );

        expect(result).toEqual(
          expect.objectContaining({
            selectedCommand: null,
          })
        );
      });

      it("does nothing when dispatching action select down", () => {
        const result = commandReducer(
          {
            ...initialState,
            commands: ["close other", "open new", "move left"],
            selectedCommand: null,
          },
          {
            type: COMMANDS_SELECT_DOWN,
          }
        );

        expect(result).toEqual(
          expect.objectContaining({
            selectedCommand: null,
          })
        );
      });
    });

    describe("When the second out of five commands is selected", () => {
      it("Selects the first when dispatching select up action", () => {
        const result = commandReducer(
          {
            ...initialState,
            filteredCommands: [
              "close other",
              "open new",
              "move left",
              "fourth command",
              "fifth command",
            ],
            selectedCommand: 1,
          },
          {
            type: COMMANDS_SELECT_UP,
          }
        );

        expect(result).toEqual(
          expect.objectContaining({
            selectedCommand: 0,
          })
        );
      });

      it("Selects the third when dispatching select down action", () => {
        const result = commandReducer(
          {
            ...initialState,
            filteredCommands: [
              "close other",
              "open new",
              "move left",
              "fourth command",
              "fifth command",
            ],
            selectedCommand: 1,
          },
          {
            type: COMMANDS_SELECT_DOWN,
          }
        );

        expect(result).toEqual(
          expect.objectContaining({
            selectedCommand: 2,
          })
        );
      });

      it("Gets reset when updating the searchTerm", () => {
        const result = commandReducer(
          {
            ...initialState,
            commands: [
              "close other",
              "open new",
              "move left",
              "fourth command",
              "fifth command",
            ],
            selectedCommand: 1,
          },
          {
            type: COMMANDS_FILTER,
            payload: "close",
          }
        );

        expect(result).toEqual(
          expect.objectContaining({
            selectedCommand: 0,
          })
        );
      });
    });
  });

  describe("Executing a selectedCommand", () => {
    it("Does nothing if selectedCommand is null", () => {
      commandReducer(
        {
          ...initialState,
          commands: [
            "close other",
            "open new",
            "move left",
            "fourth command",
            "fifth command",
          ],
          selectedCommand: null,
        },
        {
          type: COMMANDS_EXECUTE,
        }
      );

      expect(backgroundClient.sendMessage).not.toHaveBeenCalled();
    });

    it("Does nothing if selectedCommand is out of range", () => {
      commandReducer(
        {
          ...initialState,
          filteredCommands: [
            "close other",
            "open new",
            "move left",
            "fourth command",
            "fifth command",
          ],
          selectedCommand: 6,
        },
        {
          type: COMMANDS_EXECUTE,
        }
      );

      expect(backgroundClient.sendMessage).not.toHaveBeenCalled();
    });

    it("Publishes a message to the background if a valid command is selected", () => {
      commandReducer(
        {
          ...initialState,
          filteredCommands: [
            "close other",
            "open new",
            "move left",
            "fourth command",
            "fifth command",
          ],
          selectedCommand: 3,
        },
        {
          type: COMMANDS_EXECUTE,
        }
      );

      expect(backgroundClient.sendMessage).toHaveBeenCalledWith(
        "fourth command"
      );
    });
  });

  describe("Executing a command option", () => {
    it("does nothing if the option is empty", () => {
      commandReducer(
        {
          ...initialState,
          commands: ["close other", "open new", "move left"],
        },
        {
          type: COMMANDS_EXECUTE_OPTION,
          payload: undefined,
        }
      );

      expect(backgroundClient.sendMessage).not.toHaveBeenCalled();
    });

    it("does nothing if the option is does not exist in commands", () => {
      commandReducer(
        {
          ...initialState,
          commands: ["close other", "open new", "move left"],
        },
        {
          type: COMMANDS_EXECUTE_OPTION,
          payload: "some arbitrary command",
        }
      );

      expect(backgroundClient.sendMessage).not.toHaveBeenCalled();
    });

    it("execute the command if valid", () => {
      commandReducer(
        {
          ...initialState,
          commands: ["close other", "open new", "move left"],
        },
        {
          type: COMMANDS_EXECUTE_OPTION,
          payload: "open new",
        }
      );

      expect(backgroundClient.sendMessage).toHaveBeenCalledWith("open new");
    });
  });
});
