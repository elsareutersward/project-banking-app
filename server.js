const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");

const port = process.env.PORT || 8080;
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client/build")));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const CLIENT_ID = CLIENT_ID; // Add your own client id from Tink Link
const CLIENT_SECRET = CLIENT_SECRET; // Add your own client secret from Tink Link
const BASE = "https://api.tink.se/api/v1";


// Get access token
app.post("/callback", function(req, res) {
  getAccessToken(req.body.code)
  .then(response => getFinancialData(response.access_token))
  .then(response => {
    res.json({
      response
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: err.toString() });
  });
});


// Functions
async function getAccessToken(code) {
  const body = {
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code"
  };

  const response = await fetch(BASE + "/oauth/token", {
    method: "POST",
    body: Object.keys(body).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(body[key])).join("&"),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  });

  const token = await response.json();
  if (response.status !== 200) {
    throw new Error(token.errorMessage);
  }
  return token;
}

async function getFinancialData(token) {
  const [
    accountData,
    investmentData,
    transactionDataMonth,
    transactionDataYear,
  ] = await Promise.all([
    getAccountData(token),
    getInvestmentData(token),
    getTransactionDataMonth(token),
    getTransactionDataYear(token),
  ]);
  return {
    accountData,
    investmentData,
    transactionDataMonth,
    transactionDataYear,
  };
}

async function getAccountData(token) {
  const response = await fetch(BASE + "/accounts/list", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  
  const json = await response.json();
  if (response.status !== 200) {
    throw new Error(json.errorMessage);
  }
  return json;
}

async function getInvestmentData(token) {
  const response = await fetch(BASE + "/investments", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

  const json = await response.json();
  if (response.status !== 200) {
    throw new Error(json.errorMessage);
  }
  return json;
}

async function getTransactionDataMonth(token) {
  const response = await fetch(BASE + "/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ sort: "DATE", startDate: 1609459200000, endDate:  1612133999000 })
  });

  const json = await response.json();
  if (response.status !== 200) {
    throw new Error(json.errorMessage);
  }
  return json;
}

async function getTransactionDataYear(token) {
  const response = await fetch(BASE + "/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ sort: "DATE", startDate: 1577836800000, endDate: 1609455599000 })
  });

  const json = await response.json();
  if (response.status !== 200) {
    throw new Error(json.errorMessage);
  }
  return json;
}

app.listen(port, function() {
  console.log(`Server running on http://localhost:${port}`);
});
