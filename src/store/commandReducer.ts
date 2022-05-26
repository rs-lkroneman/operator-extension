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
  payload?: string[] | string | undefined | CommandOption[];
}

export type CommandOption = {
  description: string;
  name: string;
  shortcut: string;
  id: string;
};

export interface CommandSearchState {
  searchTerm: string;
  selectedCommand: number | null;
  commands: CommandOption[];
  filteredCommands: CommandOption[];
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

function filterCommands(commands: CommandOption[], searchTerm = "") {
  const isEmptySearch = searchTerm === "";
  if (isEmptySearch) {
    return commands;
  }

  return commands.filter((command) =>
    command.id.toLowerCase().includes(searchTerm.toLowerCase())
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

      const payloadAsCommands = action.payload as CommandOption[];
      return {
        ...state,
        commands: [...payloadAsCommands],
        filteredCommands: filterCommands(payloadAsCommands, state.searchTerm),
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
        backgroundClient.sendMessage(commandToExecute?.id);
      }
      return state;
    case COMMANDS_EXECUTE_OPTION:
      const command = action.payload as string;
      logger.debug(COMMANDS_EXECUTE_OPTION);
      logger.debug(command);
      if (command == null) {
        return state;
      }

      const indexOfFilteredCommand = state.filteredCommands.findIndex(
        (item) => item.id === command
      );
      const indexOfCommand = state.commands.findIndex(
        (item) => item.id === command
      );

      if (indexOfCommand !== -1) {
        backgroundClient.sendMessage(command);
      }

      const isExecutedCommandSelected =
        state.selectedCommand === indexOfFilteredCommand;

      if (isExecutedCommandSelected) {
        return state;
      }

      return {
        ...state,
        selectedCommand: indexOfFilteredCommand,
      };
    default:
      return state;
  }
}

export default commandReducer;
