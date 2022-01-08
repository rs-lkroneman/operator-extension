import chromeTabs from "src/api/tabs";

export function navigateTo(url) {
  return chromeTabs.update({ url });
}

const tab = {
  navigateTo,
};

export default tab;
