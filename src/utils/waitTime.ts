import * as firebase from 'firebase/app';
require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyAK85QlhMVUyDgMZYaXDX3wWaTUnhHAoPo",
  authDomain: "osiris-26b00.firebaseapp.com",
  databaseURL: "https://osiris-26b00.firebaseio.com",
  projectId: "osiris-26b00",
  storageBucket: "osiris-26b00.appspot.com",
  messagingSenderId: "608884455613"
};

export function setupFirebase() {
  console.log('waitTime:setupFirebase:', firebaseConfig);
  firebase.initializeApp(firebaseConfig);
}

export function startListening(providerID: string, updateWaitTime) {
  const waitTimePath = `providers/${providerID}/waitTime`;
  console.log('waitTime:startListening: enable listener:' + waitTimePath);

  var waitTimeRef: firebase.database.Reference = firebase.database().ref(waitTimePath);
  console.log('waitTimeRef:', waitTimeRef);
  waitTimeRef.on('value', function(snapshot) {
    console.log('waitTimeRef.on:', snapshot);
    updateWaitTime(snapshot.val());
  });
}