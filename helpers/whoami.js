const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");
const TOKEN_FILE = path.join(__dirname, ".passmatetoken.txt");
const axios = require("axios").default;
const { wrapper } = require("axios-cookiejar-support");
const tough = require("tough-cookie");

const cookieJar = new tough.CookieJar();
const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }));
function loadToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    return fs.readFileSync(TOKEN_FILE, "utf8");
  }
  return null;
}
const addTokenToCookies = async (url, tokenName, tokenValue) => {
  const cookieString = `${tokenName}=${tokenValue}`;

  await cookieJar.setCookie(cookieString, url);
};
async function whoami() {
  const url = "http://localhost:3000/api/user/getProfile";
  const tokenName = "token";
  if (!tokenName) {
    console.log("No token found. Please login first.");
    return;
  }
  const tokenValue = loadToken();
  addTokenToCookies(url, tokenName, tokenValue).then(() => {
    client
      .get(url)
      .then((response) => {
        const data = response.data;
        console.log(data?.user?.username + " is currently logged in!");
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

module.exports = { whoami };
