#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const touchid = require("macos-touchid");

const TOKEN_FILE = path.join(__dirname, ".passmatetoken.txt");

console.log("Welcome to the CLI Login Tool!");
const args = process.argv.slice(2);
console.log(process.argv);
if (args.length === 0) {
  console.log(
    "Please provide a command: register, login, logout, whoami, addpass, viewpass"
  );
  process.exit(1);
}

const command = args[0];
switch (command) {
  case "register":
    // register();
    break;
  case "login":
    // login();
    break;
  case "logout":
    // logout();
    break;
  case "whoami":
    // whoami();
    break;
  case "addpass":
    // addpass();
    break;
  case "viewpass":
    // viewpass()
    break;
  default:
    console.log(`Unknown command: ${command}`);
    console.log('Use "register", "login", "logout", or "check-session".');
    process.exit(1);
}
