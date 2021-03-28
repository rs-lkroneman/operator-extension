/* global chrome */

const toPromise = (api) => (...args) => new Promise(resolve => api(...args, resolve));

const chromeWindow = {
    getCurrent: toPromise(chrome.windows.getCurrent),
    get: toPromise(chrome.windows.get),
    create: toPromise(chrome.windows.create),
    update: toPromise(chrome.windows.update),
    getAll: toPromise(chrome.windows.getAll)
};

const chromeTabs = {
    query: toPromise(chrome.tabs.query),
    move: toPromise(chrome.tabs.move),
    async getCurrent() {
        const [result] = await this.query({ currentWindow: true, active: true })
        return result;
    }
}

export function forEachTab(fn) {
  chrome.windows.getCurrent({ populate: true }, (curWindow) => {
    curWindow.tabs.forEach(fn);
  });
}

export function updateTab(id, config) {
  chrome.tabs.update(id, config);
}

export function removeTab(id) {
    chrome.tabs.remove(id);
}

export function navigateTo(url) {
    chrome.tabs.update({ url });
}

export async function moveCurrentTabToNewWindow() {
    const { id: tabId, windowId } = await chromeTabs.getCurrent();
    const currentWindow = await chromeWindow.get(windowId, { populate: true });
    const { id: newWindowId } = await chromeWindow.create({
        top: currentWindow.top,
        left: currentWindow.left,
        width: currentWindow.width,
        height: currentWindow.height,
        focused: false
    });
    const tabsToClose = await chromeTabs.query({ windowId: newWindowId })
    await chromeWindow.update(newWindowId, { state: currentWindow.state });
    await chromeTabs.move([tabId], {
        windowId: newWindowId,
        index: -1
    });

    const movedTabIndex = tabsToClose.length - 1;
    tabsToClose.forEach((tab, index) => {
        chrome.tabs.remove(tab.id);
        if(movedTabIndex === index) {
            chromeWindow.update(newWindowId, {
                focused: true
            });
        }
    })
}

export async function consolidateTabsFromWindows() {
    const currentWindow = await chromeWindow.getCurrent();
    const allWindows = await chromeWindow.getAll();
    const filerOutCurrent = (win) => win.id !== currentWindow.id;
    const filteredWindows = allWindows.filter(filerOutCurrent);
    const tabsFromOtherWindows = await Promise.all(filteredWindows.map(win => chromeTabs.query({ windowId: win.id })));
    const flattenedTabs = tabsFromOtherWindows.filter(Boolean).reduce((result, current) => [...result, ...current], []);
    const flattenedTabsIds = flattenedTabs.map(tab => tab.id);

    await chromeTabs.move(flattenedTabsIds, {
        windowId: currentWindow.id,
        index: -1
    });
}

