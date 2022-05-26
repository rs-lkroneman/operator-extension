import chromeTabs from "src/api/tabs";

export function navigateTo(url) {
  return chromeTabs.update({ url });
}

export function forTabsInCurrentWindow(callback) {
  chromeTabs.query({ currentWindow: true });
}

const tab = {
  navigateTo,
};

export default tab;
