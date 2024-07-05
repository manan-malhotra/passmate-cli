const readlineSync = require("readline-sync");
const axios = require("axios").default;

async function register() {
  const username = readlineSync.question("Enter your username: ");
  const password = readlineSync.question("Enter your password: ", {
    hideEchoBack: true,
  });
  try {
    const response = await axios.post(
      "https://passmate-alpha.vercel.app/api/user/register",
      {
        username,
        password,
      }
    );
    console.log(username + " registered successfully!");
    console.log("Please login again to continue");
  } catch (error) {
    console.error(
      "Register failed:",
      error.response ? error.response.data : error.message
    );
  }
}

module.exports = { register };
