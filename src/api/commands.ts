// Facade around Chrome API => commands
// https://developer.chrome.com/docs/extensions/reference/commands/
type Tab = chrome.tabs.Tab;

const commands = {
  getAll(callback: (commands: chrome.commands.Command[]) => void) {
    chrome.commands.getAll(callback);
  },
  onCommand: {
    addListener(callback: (command: string, tab: Tab) => void) {
      chrome.commands.onCommand.addListener(callback);
    }
  }
}

export {
  commands as default
}
