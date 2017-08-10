import * as firebase from 'firebase/app';
require('firebase/database');

export const PROVIDER_ID_DEFAULT:string = 'wa211134271';


const firebaseConfig = {
  apiKey: "AIzaSyAK85QlhMVUyDgMZYaXDX3wWaTUnhHAoPo",
  authDomain: "osiris-26b00.firebaseapp.com",
  databaseURL: "https://osiris-26b00.firebaseio.com",
  projectId: "osiris-26b00",
  storageBucket: "osiris-26b00.appspot.com",
  messagingSenderId: "608884455613"
};

function getProviderPath(providerID: string) {
  return `providers/${providerID}`;
}

export function setupFirebase() {
  console.log('waitTime:setupFirebase:', firebaseConfig);
  firebase.initializeApp(firebaseConfig);
}

export function startListening(providerID: string, updateWaitTime) {
  const waitTimePath = `${getProviderPath(providerID)}/waitTime`;
  console.log('waitTime:startListening: enable listener:' + waitTimePath);

  var waitTimeRef: firebase.database.Reference = firebase.database().ref(waitTimePath);
  console.log('waitTimeRef:', waitTimeRef);
  waitTimeRef.on('value', function(snapshot) {
    console.log('waitTimeRef.on:', snapshot);
    updateWaitTime(snapshot.val());
  });
}

export function getProvider(providerID: string): Promise<any> {
  const providerPath = getProviderPath(providerID);

  // wrapping the promise returned from firebase to get the snapshot val which
  // is likely overkill on hiding the details
  return new Promise(function(resolve, reject) {
    var providerRef: firebase.database.Reference = firebase.database().ref(providerPath);
    providerRef.once('value').then((snapshot) => {
      resolve(snapshot.val());
    }).catch((e: Error) => {
      reject(e);
    });
  });
}

export function updateWaitTime(providerID: string, value: number) {
  const providerPath = getProviderPath(providerID);
  const updateValue = value;

  console.log(`waitTime:update:${providerPath}:waitTime:${updateValue}`);
  firebase.database().ref(providerPath).update({
    waitTime: updateValue
  }).then(() => {
    console.log('waitTime:update:waitTime:success');
  }).catch((e: Error) => {
    console.error('waitTime:update:waitTime:error:' + e);
  });
}

export function updateAcceptingNow(providerID: string, value: boolean) {
  const providerPath = getProviderPath(providerID);

  console.log(`waitTime:update:AcceptingNow:${providerPath}:acceptingNow:${value}`);
  firebase.database().ref(providerPath).update({
    acceptingNow: value
  }).then(() => {
    console.log('waitTime:update:AcceptingNow:success');
  }).catch((e: Error) => {
    console.error('waitTime:update:AcceptingNow:error:' + e);
  });
}