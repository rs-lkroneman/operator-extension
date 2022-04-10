// Facade around Chrome API => commands
// https://developer.chrome.com/docs/extensions/reference/commands/
type Tab = chrome.tabs.Tab;
type Command = chrome.commands.Command;

const commands = {
  getAll(callback: (commands: Command[]) => void) {
    chrome.commands.getAll(callback);
  },
  onCommand: {
    addListener(callback: (command: string, tab: Tab) => void) {
      chrome.commands.onCommand.addListener(callback);
    },
  },
};

export { commands as default };
