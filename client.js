const crypto = require('crypto');
const axios = require('axios');
const https = require('https');
var currentDate = //'Thu, 29 Jun 2023 10:46 GMT';
new Date().toUTCString();
console.log(currentDate);
const API_ENDPOINT = 'https://googlenotificationwebapp.azurewebsites.net/api/notify';
let payload = {
  "from_userip":"1.2.3.4",
  "from_user":"12345",
  "from_username":"Saurabh Vibhute",
  "to_user":"Priyanka Gupta",
  "sentDateTime":""
};
const contentType = "application/json";
const ALOGRITHM = "sha256";
const ACCESS_ID = "e463a12d-5c86-2098-f5c0-5d49cd6bd322952a19e1";
const SECRET_KEY = "6bd69330-bda3-e9cf-60c2-bd4d60d32035e1f68287";
var signingData = JSON.stringify(payload) + "," + contentType + "," + "/api/notify" + "," + currentDate;
var hmac = crypto.createHmac(ALOGRITHM, SECRET_KEY);
var data = hmac.update(signingData);
var hmacdata = data.digest('base64');
console.log(hmacdata);
var headerData = "APIAuth " + ACCESS_ID + ":" + hmacdata;
const headers = {
  'Content-Type': contentType,
  'Authorization': headerData,
  'Content-Length': Buffer.byteLength(JSON.stringify(payload)),
  'Request-Date' : currentDate
};
// console.log(headers);
// axios.post(API_ENDPOINT, payload, {headers: headers})
//  .then((res)=> console.log("result :", res))
//  .catch((err)=> console.log(`err`, JSON.stringify(err)));

const options = {
  hostname: 'googlenotificationwebapp.azurewebsites.net',
  path: '/api/notify',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(payload)),
    'Authorization': headerData,
    'Request-Date': currentDate
  },
};

const makePost = () => {
  let data = '';

  const request = https.request(options, (response) => {
    response.setEncoding('utf8');

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      console.log(data);
    });
  });

  request.on('error', (error) => {
    console.error(error);
  });

  // Write data to the request body
  request.write(JSON.stringify(payload));

  request.end();
};

makePost();
