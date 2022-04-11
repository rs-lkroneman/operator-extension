import runtime from "../api/runtime";
import commands from "../api/commands";

import commandHandlers, { commandNames } from "../commands";
type Port = chrome.runtime.Port;

const REFRESH_COMMANDS = "REFRESH_COMMANDS";

const runCommand = (command: string) => {
  if (Object.hasOwnProperty.call(commandHandlers, command)) {
    commandHandlers[command]();
  }
};

const runPortCommand = (command: string, port: Port) => {
  if (command === REFRESH_COMMANDS) {
    const commands = refreshCommands();
    port.postMessage(commands);
    return;
  }

  runCommand(command);
};

const refreshCommands = () => {
  return Array.from(new Set([...commandNames, REFRESH_COMMANDS]));
};

commands.onCommand.addListener(runCommand);
runtime.onConnect.addListener((port: Port) => {
  const commands = refreshCommands();
  port.postMessage(commands);
  port.onMessage.addListener(runPortCommand);
});
