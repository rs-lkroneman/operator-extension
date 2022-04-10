import path from "path";
import fsExtra from "fs-extra";
import shortcutCommandConfig from "../shortcutConfig";

const OUTPUT_PATH = path.resolve("public");
const RELEASE_VERSION = process.env.RELEASE_VERSION;

fsExtra
  .readJson(path.resolve("config/manifest.json"))
  .then((manifest) => {
    // For development the version updates each time you start the server to be the minute it started 202218.23.32
    const EXTENSION_VERSION = RELEASE_VERSION || developmentExtensionVersion();

    const updatedManifest = {
      ...manifest,
      version: `${EXTENSION_VERSION.replace("v", "")}`,
      commands: {
        ...manifest.commands,
        ...shortcutCommandConfig,
      },
    };

    return fsExtra.writeJson(
      path.join(OUTPUT_PATH, "manifest.json"),
      updatedManifest,
      {
        spaces: 2,
      }
    );
  })
  .catch(console.error);

/**
 * Development extension version generation using date
 * So one can tell if the version is actually reloading
 */
const developmentExtensionVersion = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; //months (0-11)
  const day = date.getDate(); //day (1-31)
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}${month}${day}.${hour}.${minute}`;
};
