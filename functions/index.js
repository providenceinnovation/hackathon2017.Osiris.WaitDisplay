const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.logChange = functions.database.ref('/providers/{providerId}').onUpdate(event => {
  const eventSnapshot = event.data;
  var updateDateTimeSnapshot = eventSnapshot.child('updateDateTime');
  const original = event.data.val();

  if (!updateDateTimeSnapshot.changed()) {
    console.log('need to update the updateDateTime');
    const timestamp = event.timestamp;
    return event.data.ref.child('updateDateTime').set(timestamp);
  }
  if (original.waitTime) {
    console.log('logging', event.params.providerId, original.waitTime);
  } else {
    console.log('not wait time');
  }


});
