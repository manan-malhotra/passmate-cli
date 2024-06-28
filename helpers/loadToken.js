const fs = require("fs");
const path = require("path");
const TOKEN_FILE = path.join(__dirname, ".passmatetoken.txt");
function loadToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    return fs.readFileSync(TOKEN_FILE, "utf8");
  }
  return null;
}

module.exports = { loadToken };
