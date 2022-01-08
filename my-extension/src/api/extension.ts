// Facade around chrome runtime
// https://developer.chrome.com/docs/extensions/reference/runtime/
// eslint-disable-next-line @typescript-eslint/no-use-before-define

const extension = {
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
