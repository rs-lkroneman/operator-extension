import runtime from "../api/runtime";
import commands from "../api/commands";

import commandHandlers, { commandNames } from "../commands";

const runCommand = (command: string) => {
  if (command === "REFRESH_COMMANDS") {
    const commands = refreshCommands();
    runtime.sendMessage(commands);
    return;
  }

  if (Object.hasOwnProperty.call(commandHandlers, command)) {
    commandHandlers[command]();
  }
};

const refreshCommands = () => {
  return Array.from(new Set([...commandNames, "REFRESH_COMMANDS"]));
};

commands.onCommand.addListener(runCommand);
runtime.onConnect.addListener((port) => {
  const commands = refreshCommands();
  port.postMessage(commands);
  port.onMessage.addListener(runCommand);
});
