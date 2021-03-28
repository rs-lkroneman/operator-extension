import { useReducer } from "react";
import {
  COMMANDS_UPDATE,
  COMMANDS_FILTER,
  COMMANDS_SELECT_UP,
  COMMANDS_SELECT_DOWN,
  COMMANDS_EXECUTE,
} from "../constants";
import backgroundClient from "../background/client";

const initialState = {
  searchTerm: "",
  selectedCommand: null,
  commands: [],
  filteredCommands: [],
};

function selectCommand(commands, atIndex = 0) {
  if (commands.length === 0) {
    return null;
  }

  const resultingIndex = Math.max(Math.min(atIndex, commands.length - 1), 0);
  return resultingIndex;
}

function filterCommands(commands, searchTerm = "") {
  const isEmptySearch = searchTerm === "";
  if (isEmptySearch) {
    return commands;
  }

  return commands.filter((command) => command.includes(searchTerm));
}

export default function useCommandReducer() {
  return useReducer((state, action) => {
    console.log(action);
    const { selectedCommand } = state;
    switch (action.type) {
      case COMMANDS_UPDATE:
        console.log(COMMANDS_UPDATE);
        return {
          ...state,
          commands: [...action.payload],
          filteredCommands: [
            ...filterCommands(action.payload, state.searchTerm),
          ],
        };
      case COMMANDS_FILTER:
        console.log(COMMANDS_FILTER);
        const filteredCommands = filterCommands(state.commands, action.payload);
        return {
          ...state,
          searchTerm: action.payload,
          selectedCommand: selectCommand(filteredCommands),
          filteredCommands: [...filteredCommands],
        };
      case COMMANDS_SELECT_UP:
        console.log(COMMANDS_SELECT_UP);
        console.log(selectedCommand && selectedCommand - 1);
        const atIndexUp = selectedCommand !== null && selectedCommand - 1;
        return {
          ...state,
          selectedCommand: selectCommand(state.filteredCommands, atIndexUp),
        };
      case COMMANDS_SELECT_DOWN:
        console.log(COMMANDS_SELECT_DOWN);
        const atIndexDown = selectedCommand !== null && selectedCommand + 1;
        return {
          ...state,
          selectedCommand: selectCommand(state.filteredCommands, atIndexDown),
        };
      case COMMANDS_EXECUTE:
        console.log(COMMANDS_EXECUTE);
        if (selectedCommand == null) {
          return state;
        }

        const commandToExecute = state.filteredCommands[selectedCommand];
        console.log("commandToExecute");
        console.log(commandToExecute);
        if (commandToExecute) {
          backgroundClient.postMessage(commandToExecute);
        }
        return state;
      default:
        return state;
    }
  }, initialState);
}