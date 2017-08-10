'use strict';

let https = require('https');
const firebaseHost = 'osiris-26b00.firebaseio.com';
const testProviderId = 'wa2000test';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';
let getCurrentWaitTime = function (providerId, requestType, callback) {
  console.log(`getting wait time for ${providerId}`);
  https.get(`https://${firebaseHost}/realtime/${providerId}/waitTime/value.json`, (res) => {
    console.log('statusCode:', res.statusCode);
    res.on('data', (d) => {
      process.stdout.write(d + '\n');
      var currentValue = parseInt(d.toString());
      let newValue = isNaN(currentValue) ? 0 : currentValue;
      if (requestType === INCREMENT) {
        newValue += 10;
      } else {
        newValue -= 10;
      }
      setNewWaitTime(providerId, newValue, callback);
    });

  }).on('error', (e) => {
    console.error(e);
    callback(e, null);
  });
};

let setNewWaitTime = function (providerId, newValue, callback) {
  console.log(`updating wait time for provider ${providerId}`);
  let options = {
    hostname: firebaseHost,
    port: 443,
    path: `/realtime/${providerId}/waitTime/value.json`,
    method: 'PUT'
  };

  let req = https.request(options, function (res) {
    var str = '';
    res.on('data', function (chunk) {
      str += chunk
    });

    res.on('end', function () {
      console.log(str);
      callback(null, newValue);
    })
    res.on('error', (e) => {
      console.error(e);
      callback(e, null);
    });
  });

  var body = newValue.toString();

  req.end(body);

};

exports.handler = (event, context, callback) => {
  console.log('Received event:', event);
  let requestType;
  switch (event.clickType) {
    case 'DOUBLE':
      requestType = DECREMENT;
      break;
    case 'LONG':
      requestType = RESET;
      break;
    default:
      requestType = INCREMENT;
  }
  if (requestType === RESET) {
    setNewWaitTime(testProviderId, 0, callback);
  } else {
    getCurrentWaitTime(testProviderId, requestType, callback);
  }
};
