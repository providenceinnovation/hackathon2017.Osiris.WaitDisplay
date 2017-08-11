const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// exports.updateTimePath = functions.database.ref('/realtime/{providerId}/{serviceType}/value').onUpdate(
  //event => event.data.ref.parent.parent.set(event.timestamp)
// );
