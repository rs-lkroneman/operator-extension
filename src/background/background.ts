import runtime from "../api/runtime";
import commands from "../api/commands";

import commandHandlers, { commandNames } from "../commands";
import getCommandShortcuts from "src/commands/helpers/getCommandShortcuts";
import logger from "src/utils/logger";
type Port = chrome.runtime.Port;

const REFRESH_COMMANDS = "REFRESH_COMMANDS";

const runCommand = (command: string) => {
  if (Object.hasOwnProperty.call(commandHandlers, command)) {
    commandHandlers[command]();
  }
};

const runPortCommand = (command: string, port: Port) => {
  if (command === REFRESH_COMMANDS) {
    refreshCommands().then((commands) => {
      logger.debug(commands);
      port.postMessage(commands);
    });
    return;
  }

  runCommand(command);
};

const refreshCommands = async () => {
  const uniqueNames = Array.from(new Set([...commandNames, REFRESH_COMMANDS]));
  const withShortcuts = await getCommandShortcuts();
  return uniqueNames.map((name) => {
    const config = withShortcuts.find((item) => item.name === name) ?? {};
    return {
      description: "",
      name: "",
      shortcut: "",
      ...config,
      id: name,
    };
  });
};

commands.onCommand.addListener(runCommand);
runtime.onConnect.addListener(async (port: Port) => {
  const commands = await refreshCommands();
  port.postMessage(commands);
  port.onMessage.addListener(runPortCommand);
});
