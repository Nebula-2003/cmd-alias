#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const configFileName = "r.config.json";

function findConfigFile(startPath) {
    let currentDir = startPath;

    while (currentDir !== path.parse(currentDir).root) {
        const configFilePath = path.join(currentDir, configFileName);
        if (fs.existsSync(configFilePath)) {
            return configFilePath;
        }
        currentDir = path.dirname(currentDir);
    }
    return null;
}

const args = process.argv.slice(2);
const alias = args[0];

if (!alias) {
    console.error("Please provide an alias to execute.");
    process.exit(1);
}

const configFilePath = findConfigFile(process.cwd());

if (!configFilePath) {
    console.error(`Could not find ${configFileName} in the current or any parent directory.`);
    process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));

let command = config[alias];
// Default to true if redirectOutput is not set
const redirectOutput = config.redirectOutput !== false;

if (redirectOutput) {
    command += " > /dev/tty";
}
if (!command) {
    console.error(`Alias "${alias}" not found in ${configFileName}.`);
    process.exit(1);
}

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing command: ${error.message}`);
        process.exit(1);
    }
    if (stderr) {
        console.error(`Error: ${stderr}`);
    }
    if (stdout) {
        console.log(stdout);
    }
});
