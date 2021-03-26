const PIN_UNPIN_TAB = "runner_pin_unpin_tab";
const UNPIN_ALL = "runner_unpin_all_tabs";
const PIN_ALL = "runner_pin_all_tabs";
const CLOSE_ALL_UNPINNED = "runner_close_all_unpinned_tabs";
const SHOW_RUNNER = "runner_show_command_search";

const memory = {};

function forEachTab (fn) {
    chrome.windows.getCurrent({populate: true}, function(curWindow) {
        curWindow.tabs.forEach(fn);
    });
}

function bindCommandListener() {
    const handlers = {
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
        },
        [SHOW_RUNNER]() {
            console.log("show the runner")
        }
    }

    chrome.commands.onCommand.addListener(function(command) {
        if(Object.hasOwnProperty.call(handlers, command)) {
            handlers[command]();
        }
    });
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.commands.getAll(result => {
        memory.commands = [...result];
    });
    bindCommandListener();

    chrome.extension.onConnect.addListener(function(port) {
        console.log("Connected .....");
        port.onMessage.addListener(function(msg) {
            port.postMessage(memory.commands);
        });
    })


    // chrome.tabs.query({active: true, currentWindow: true}, function([tabs]){
    //     port.sendMessage(tabs.id, {action: "open_dialog_box"}, function(response) {});
    // });
});
