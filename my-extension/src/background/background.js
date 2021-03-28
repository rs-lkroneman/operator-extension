/* eslint-disable no-undef */
import commandHandlers, { commandNames } from './commands';

const memory = {};
const runCommand = (command) => {
    if(Object.hasOwnProperty.call(commandHandlers, command)) {
        commandHandlers[command]();
    }
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.commands.getAll(result => {
        memory.commands = [...commandNames];
    });
    chrome.commands.onCommand.addListener(runCommand);
    chrome.extension.onConnect.addListener((port) => {
        console.log("Connected .....");
        port.postMessage(memory.commands);
        port.onMessage.addListener(runCommand);
    })
});
