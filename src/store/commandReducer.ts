import {
  COMMANDS_UPDATE,
  COMMANDS_FILTER,
  COMMANDS_SELECT_UP,
  COMMANDS_SELECT_DOWN,
  COMMANDS_EXECUTE,
  COMMANDS_EXECUTE_OPTION,
} from "src/constants";

// Utils
import backgroundClient from "src/background/client";
import logger from "src/utils/logger";

interface CommandSearchAction {
  type: string;
  payload?: string[] | string | undefined;
}

interface CommandSearchState {
  searchTerm: string;
  selectedCommand: number | null;
  commands: string[];
  filteredCommands: string[];
}

export const initialState: CommandSearchState = {
  searchTerm: "",
  selectedCommand: null,
  commands: [],
  filteredCommands: [],
};

function selectCommand(commands, atIndex = 0) {
  if (commands.length === 0) {
    return null;
  }

  return Math.max(Math.min(atIndex, commands.length - 1), 0);
}

function filterCommands(commands, searchTerm = "") {
  const isEmptySearch = searchTerm === "";
  if (isEmptySearch) {
    return commands;
  }

  return commands.filter((command) =>
    command.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function commandReducer(
  state: CommandSearchState | undefined = initialState,
  action: CommandSearchAction
) {
  logger.info(action);
  const { selectedCommand } = state;
  switch (action.type) {
    case COMMANDS_UPDATE:
      logger.info(COMMANDS_UPDATE);
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
        commands: [...action.payload],
        filteredCommands: filterCommands(action.payload, state.searchTerm),
      };
    case COMMANDS_FILTER:
      logger.info(COMMANDS_FILTER);
      const filteredCommands = filterCommands(
        state.commands,
        action.payload as string
      );
      return {
        ...state,
        searchTerm: action.payload,
        selectedCommand: selectCommand(filteredCommands),
        filteredCommands: filteredCommands,
      };
    case COMMANDS_SELECT_UP:
      logger.info(COMMANDS_SELECT_UP);
      logger.info(selectedCommand && selectedCommand - 1);

      const atIndexUp =
        selectedCommand !== null ? selectedCommand - 1 : undefined;
      return {
        ...state,
        selectedCommand: selectCommand(state.filteredCommands, atIndexUp),
      };
    case COMMANDS_SELECT_DOWN:
      logger.info(COMMANDS_SELECT_DOWN);

      const atIndexDown =
        selectedCommand !== null ? selectedCommand + 1 : undefined;
      return {
        ...state,
        selectedCommand: selectCommand(state.filteredCommands, atIndexDown),
      };
    case COMMANDS_EXECUTE:
      logger.info(COMMANDS_EXECUTE);

      if (selectedCommand === null) {
        return state;
      }

      const commandToExecute = state.filteredCommands[selectedCommand];

      logger.info("commandToExecute");
      logger.info(commandToExecute);

      if (commandToExecute) {
        backgroundClient.sendMessage(commandToExecute);
      }
      return state;
    case COMMANDS_EXECUTE_OPTION:
      const command = action.payload as string;
      if (command == null) {
        return state;
      }

      if (state.commands.includes(command)) {
        backgroundClient.sendMessage(command);
      }
      return state;
    default:
      return state;
  }
}

export default commandReducer;