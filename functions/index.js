const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const refToWatch = '/notrealtime/{providerId}/{serviceType}';
const updateTimePath = 'updateDateTime';
exports.logChange = functions.database.ref(refToWatch).onUpdate(event => {
  const eventSnapshot = event.data;
  const updateDateTimeSnapshot = eventSnapshot.child(updateTimePath);
  const original = event.data.val();

  if (!updateDateTimeSnapshot || updateDateTimeSnapshot.changed()) {
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
