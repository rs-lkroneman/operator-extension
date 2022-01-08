// Facade around Chrome API => extension
// https://developer.chrome.com/docs/extensions/reference/extension/

export type Connection = {
  onDisconnect: {
    addListener: (callback: Function) => void
  },
  onMessage: {
    addListener: (callback: Function) => void
  },
  postMessage: any
}

const extension = {
  connect(...args): Connection {
    // @ts-ignore
    return chrome.extension.connect(...args);
  },
  onConnect: {
    addListener(callback: (port) => void) {
      // @ts-ignore
      chrome.extension.onConnect.addListener(callback);
    }
  }
}

export {
  extension as default
}
