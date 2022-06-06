# Operator

Your productivity assistant

## Getting Started

1. Install the Extension to Chrome or Edge

2. Open the Extension, by using the hotkey (control + space) or clicking the icon

3. Search and execute a command

## Default Shortcuts (MacOS)

- `Ctrl+Space` - open runner dialogue
- `Cmd+Shift+X` - pin/unpin current tab
- `Ctrl+Shift+Left` - move tab left
- `Ctrl+Shift+Left` - move tab right

## Commands

- `pin unpin tab`
- `unpin all tabs`
- `pin all tabs`
- `close all unpinned tabs`
- `close tabs to the right`
- `move current tab to new window`
- `collect all tabs into one window`
- `move tab highlighted tabs left`
- `move tab highlighted tabs right`
- `move tab highlighted tabs to start`
- `move tab highlighted tabs to end`
- `open extension manager`
- `open extension shortcuts manager`

[Command configuration in code](./src/commands/commands.ts)

To find the shortcuts for your platform see the `"commands"` in [Shortcut configuration in code](./config/manifest.json)

To modify these shortcuts:

- open the runner and search for `open extension shortcuts`
- or navigate to `chrome://extensions/shortcuts`

You can also assign shortcuts to any commands defined in [./shortcutConfig.ts](./shortcutConfig.ts)

[But no more than 4 preset shortcuts and be set from the extension itself](https://newbedev.com/google-chrome-maximum-of-4-chrome-commands-allowed)

## Contributing

To get the environment set up locally see [Contributing](./docs/contributing/getting-started.md)
