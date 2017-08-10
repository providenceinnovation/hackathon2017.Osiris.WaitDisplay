let https = require('https');
const firebaseHost = 'osiris-26b00.firebaseio.com';
const testProviderId = 'wa2000test';
let getCurrentWaitTime = function (providerId) {
  console.log(`getting wait time for ${providerId}`);
  https.get(`https://${firebaseHost}/realtime/${providerId}/waitTime/value.json`, (res) => {
    console.log('statusCode:', res.statusCode);
    res.on('data', (d) => {
      process.stdout.write(d + '\n');
      var currentValue = parseInt(d.toString());
      let newValue = 0;
      if (!isNaN(currentValue) && currentValue <= 50) {
        newValue = currentValue + 10;
      }
      setNewWaitTime(providerId, newValue);
    });

  }).on('error', (e) => {
    console.error(e);
  });
};

let setNewWaitTime = function (providerId, newValue) {
  console.log(`updating wait time for provider ${providerId}`);
  let options = {
    hostname: firebaseHost,
    port: 443,
    path: `/realtime/${providerId}/waitTime/value.json`,
    method: 'PUT'
    // ,
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  };

  let req = https.request(options, function (res) {
    var str = ''
    res.on('data', function (chunk) {
      str += chunk
    })

    res.on('end', function () {
      console.log(str)
    })

  });

  var body = newValue.toString();
  // JSON.stringify({
  //   value: newValue
  // });

  req.end(body);

};
getCurrentWaitTime(testProviderId);
