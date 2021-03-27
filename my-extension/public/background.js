/* eslint-disable no-undef */
const PIN_UNPIN_TAB = "runner_pin_unpin_tab";
const UNPIN_ALL = "runner_unpin_all_tabs";
const PIN_ALL = "runner_pin_all_tabs";
const CLOSE_ALL_UNPINNED = "runner_close_all_unpinned_tabs";

const memory = {};
const commandHandlers = {
    [PIN_UNPIN_TAB]() {
        forEachTab(function(tab) {
            if (tab.active) {
                chrome.tabs.update(tab.id, {pinned: !tab.pinned});
            }
        });
    },
    [UNPIN_ALL]() {
        forEachTab(function(tab) {
            chrome.tabs.update(tab.id, {pinned: false});
        });
    },
    [PIN_ALL]() {
        forEachTab(function(tab) {
            chrome.tabs.update(tab.id, {pinned: true});
        });
    },
    [CLOSE_ALL_UNPINNED]() {
        forEachTab(tab => {
            if(!tab.pinned) {
                chrome.tabs.remove(tab.id);
            }
        })
    }
};

const runCommand = (command) => {
    if(Object.hasOwnProperty.call(commandHandlers, command)) {
        commandHandlers[command]();
    }
}

function forEachTab(fn) {
    chrome.windows.getCurrent({populate: true}, function(curWindow) {
        curWindow.tabs.forEach(fn);
    });
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.commands.getAll(result => {
        memory.commands = [...result];
    });
    chrome.commands.onCommand.addListener(runCommand);

    chrome.extension.onConnect.addListener(function(port) {
        console.log("Connected .....");
        port.postMessage(memory.commands);
        port.onMessage.addListener(function(msg) {
            runCommand(msg);
        });
    })
});
