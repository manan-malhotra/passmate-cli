const readlineSync = require("readline-sync");
const axios = require("axios").default;
const { wrapper } = require("axios-cookiejar-support");
const tough = require("tough-cookie");
const { loadToken } = require("./loadToken");
const cookieJar = new tough.CookieJar();
const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }));
const addTokenToCookies = async (url, tokenName, tokenValue) => {
  const cookieString = `${tokenName}=${tokenValue}`;
  await cookieJar.setCookie(cookieString, url);
};
async function addPass() {
  const url = "http://localhost:3000/api/store/addPass";
  const tokenName = "token";
  const tokenValue = loadToken();
  if (!tokenValue) {
    console.log("No token found. Please login first.");
    return;
  }
  const key = readlineSync.question(
    "Enter a key(friendly name that will be displayed): "
  );
  const username = readlineSync.question("Enter your username: ");
  const password = readlineSync.question("Enter your password: ");

  await addTokenToCookies(url, tokenName, tokenValue);
  try {
    const response = await client.post(
      "http://localhost:3000/api/store/addPass",
      {
        key,
        username,
        password,
      }
    );
    console.log("Pass added successfully!");
  } catch (error) {
    console.error(
      "Add Pass failed:",
      error.response ? error.response.data : error.message
    );
  }
}

module.exports = { addPass };
