#!/usr/bin/env node
const touchid = require("macos-touchid");

const { login } = require("./helpers/login");
const { register } = require("./helpers/register");
const { logout } = require("./helpers/logout");
const { whoami } = require("./helpers/whoami");
console.log("Welcome to the CLI Login Tool!");
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Please provide a valid command");
  console.log("Use passmate -help for more information");
  process.exit(1);
}

const command = args[0];
switch (command) {
  case "register":
    register();
    break;
  case "login":
    const token = login();
    break;
  case "logout":
    logout();
    break;
  case "whoami":
    whoami();
    break;
  case "addpass":
    // addpass();
    break;
  case "viewpass":
    // viewpass()
    break;
  case "-help":
  case "help":
  case "-h":
    console.log("Available commands:");
    console.log("  register");
    console.log("  sudo login");
    console.log("  whoami");
    console.log("  addpass");
    console.log("  viewpass");
    console.log("  logout");
    break;
  default:
    console.log(`Unknown command: ${command}`);
    console.log("Use passmate -help for more information");
    process.exit(1);
}
