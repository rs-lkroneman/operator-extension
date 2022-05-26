type Command = chrome.commands.Command;

const getCommandShortcuts = (): Promise<Command[]> => {
  return new Promise((resolve, reject) => {
    chrome.commands.getAll((commands) => {
      resolve(commands);
    });
  });
};

export default getCommandShortcuts;
