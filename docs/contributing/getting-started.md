# Contributing

## Initial Setup

1. Clone the repository

2. ensure you have `node 14.15.4` installed. If you use asdf it should prompt you if you don't have it installed

3. ensure you have `yarn` installed, i use `1.22.4` but it shouldn't matter too much

4. cd into the `my-extension directory`

5. run yarn to install packages

6. build the project by running `yarn build` in the `my-extension` directory

7. open chrome

8. navigate to `chrome://extensions/`

9. Enable developer mode in the top right corner

![developer mode](./docs/assets/developer_toggle.png)

10. Click on the "load unpacked" button in the top left

![load unpacked](./docs/assets/load_unpacked.png)

11. Select the build folder that gets generated from running `yarn build`

![folder selection](./docs/assets/folder_selection.png)

## Development

Once your extension is loaded to reload the extension you should only have to click the reload button

![reload button](./docs/assets/reload_button.png)

To have webpack watch for changes use `yarn watch` instead of yarn build. You will still need to click the reload button to see your latest changes.
