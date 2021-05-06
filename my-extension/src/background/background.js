/* eslint-disable no-undef */
import commandHandlers, { commandNames } from './commands';

const memory = {};
const runCommand = (command) => {
    if(command === "REFRESH_COMMANDS") {
        refreshCommands();
        return;
    }

    if(Object.hasOwnProperty.call(commandHandlers, command)) {
        commandHandlers[command]();
    }
}

const refreshCommands = () => {
    chrome.commands.getAll(result => {
        memory.commands = Array.from(new Set([...commandNames, "REFRESH_COMMANDS"]));
    });
}

chrome.runtime.onInstalled.addListener(() => {
    refreshCommands();

    chrome.commands.onCommand.addListener(runCommand);
});


chrome.extension.onConnect.addListener((port) => {
    refreshCommands();
    port.postMessage(memory.commands);
    port.onMessage.addListener(runCommand);
});
