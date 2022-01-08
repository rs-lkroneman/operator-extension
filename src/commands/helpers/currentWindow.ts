import chromeWindow from "src/api/windows";

export async function forEachTab(fn) {
  const currentWindow = await chromeWindow.getCurrent({ populate: true });
  if (!currentWindow || !currentWindow.tabs) {
    return;
  }

  currentWindow.tabs.forEach(fn);
}

const currentWindow = {
  forEachTab,
};

export default currentWindow;
