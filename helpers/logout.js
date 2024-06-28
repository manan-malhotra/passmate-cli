const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");
const TOKEN_FILE = path.join(__dirname, ".passmatetoken.txt");

async function logout() {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      fs.unlinkSync(TOKEN_FILE);
    }
    console.log("logged out successfully!");
  } catch (error) {
    console.error(
      "Logout failed:",
      error.response ? error.response.data : error.message
    );
  }
}

module.exports = { logout };
