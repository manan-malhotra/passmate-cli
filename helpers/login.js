const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");
const TOKEN_FILE = path.join(__dirname, ".passmatetoken.txt");
const axios = require("axios").default;
const { wrapper } = require("axios-cookiejar-support");
const tough = require("tough-cookie");

const cookieJar = new tough.CookieJar();
const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }));

async function login() {
  const username = readlineSync.question("Enter your username: ");
  const password = readlineSync.question("Enter your password: ", {
    hideEchoBack: true,
  });
  try {
    const response = await client.post(
      "https://passmate-alpha.vercel.app/api/user/login",
      {
        username,
        password,
      }
    );
    // console.log(response.data);
    // The token is now stored in the cookie jar
    const cookies = cookieJar.toJSON().cookies;
    const token = cookies.find((cookie) => cookie.key === "token")?.value;
    fs.writeFileSync(TOKEN_FILE, token);
    console.log(username + " logged in successfully!");
  } catch (error) {
    console.error(
      "Login failed:",
      error.response ? error.response.data : error.message
    );
  }
}

module.exports = { login };
