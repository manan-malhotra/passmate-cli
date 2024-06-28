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
async function whoami() {
  const url = "http://localhost:3000/api/user/getProfile";
  const tokenName = "token";
  const tokenValue = loadToken();
  if (!tokenValue) {
    console.log("No token found. Please login first.");
    return;
  }
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
