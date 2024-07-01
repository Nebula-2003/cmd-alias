# Alias Command Tool

Alias Command Tool is a command-line utility that allows you to define and execute command aliases at the directory level. This tool reads aliases from a configuration file (`r.config.json`) and provides an easy way to run complex commands with simple aliases.

## Features

-   Define and execute command aliases at the directory level.
-   Automatically redirect command output to the terminal.

## Installation

To install the Alias Command Tool globally, run:

```sh
npm install -g @nebula2003/cmd-alias
```

## Usage

1. Create a Configuration File
   In the directory where you want to use your aliases, create an r.config.json file. This file will contain your command aliases and settings.

    ```json
    {
        "gf": "git fetch --all",
        "sl": "npm run start:local",
        "test": "npm run test"
    }
    ```

2. Run an Alias
   To run an alias, use the `c` command followed by the alias name.

    ```sh
    c gf
    ```

    This will execute the `git fetch --all` command.
