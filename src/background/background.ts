import runtime from "../api/runtime";
import commands from "../api/commands";

import commandHandlers, { commandNames } from "../commands";

type Memory = {
  commands: string[];
};

const memory: Memory = {
  commands: [],
};

const runCommand = (command) => {
  if (command === "REFRESH_COMMANDS") {
    refreshCommands();
    return;
  }

  if (Object.hasOwnProperty.call(commandHandlers, command)) {
    commandHandlers[command]();
  }
};

const refreshCommands = () => {
  commands.getAll((result) => {
    memory.commands = Array.from(
      new Set([...commandNames, "REFRESH_COMMANDS"])
    );
  });
};

runtime.onInstalled.addListener(() => {
  refreshCommands();
  commands.onCommand.addListener(runCommand);
});

runtime.onConnect.addListener((port) => {
  refreshCommands();
  port.postMessage(memory.commands);
  port.onMessage.addListener(runCommand);
});
