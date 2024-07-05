const readlineSync = require("readline-sync");
const axios = require("axios").default;
const { wrapper } = require("axios-cookiejar-support");
const tough = require("tough-cookie");
const { loadToken } = require("./loadToken");
const touchid = require("macos-touchid");
const os = require("os");

const cookieJar = new tough.CookieJar();
const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }));
const addTokenToCookies = async (url, tokenName, tokenValue) => {
  const cookieString = `${tokenName}=${tokenValue}`;
  await cookieJar.setCookie(cookieString, url);
};
function isMacOS() {
  return os.platform() === "darwin";
}
async function viewPass() {
  const url = "https://passmate-alpha.vercel.app/api/store/getPass";
  const tokenName = "token";
  const tokenValue = loadToken();
  if (!tokenValue) {
    console.log("No token found. Please login first.");
    return;
  }
  const key = readlineSync.question(
    "Enter your key(friendly name that you entered during adding your pass): "
  );

  await addTokenToCookies(url, tokenName, tokenValue);
  try {
    const response = await client.post(
      "https://passmate-alpha.vercel.app/api/store/getPass",
      {
        key,
      }
    );
    if (isMacOS() && touchid.canAuthenticate() === true) {
      touchid.authenticate("verify your pass", function (err, didAuthenticate) {
        if (!didAuthenticate) {
          console.log("Authentication failed. Try again.");
          return;
        }
        console.log("Username is: " + response.data?.data?.username);
        console.log("Password is: " + response.data?.data?.password);
      });
    } else {
      console.log("Username is: " + response.data?.data?.username);
      console.log("Password is: " + response.data?.data?.password);
    }
  } catch (error) {
    console.error(
      "View Pass failed:",
      error.response ? error.response.data : error.message
    );
  }
}

module.exports = { viewPass };
