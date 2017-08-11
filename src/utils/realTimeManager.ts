import * as firebase from 'firebase/app';
require('firebase/database');

// TODO: Turn this bastardized file into a class

export const PROVIDER_ID_DENTAL: string = 'wa211134271';
export const PROVIDER_ID_WAITING_ROOM: string = 'wa211102164';
export const PROVIDER_ID_URGENT_CARE: string = 'wa211119151';

let serviceTypes: any = undefined;
let currentProvider: any = undefined;
let initialized: boolean = false;

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

function getRealTimePath(providerID: string) {
  return `realtime/${providerID}`;
}

export function setupFirebase() {
  console.log('waitTime:setupFirebase:', firebaseConfig);
  initialized = initialized || firebase.apps.length > 0;
  if (!initialized) {
    firebase.initializeApp(firebaseConfig);
    initialized = true;
  }
}

export function getProvider(providerID: string): Promise<any> {
  const refPath = getProviderPath(providerID);

  // wrapping the promise returned from firebase to get the snapshot val which
  // is likely overkill on hiding the details
  return new Promise(function(resolve, reject) {
    var ref: firebase.database.Reference = firebase.database().ref(refPath);

    ref.once('value').then((snapshot) => {
      currentProvider = snapshot.val();

      resolve(currentProvider);
    }).catch((e: Error) => {
      reject(e);
    });
  });
}

export async function getServiceTypes() : Promise<any> {
  const refPath = 'serviceTypes';

  // wrapping the promise returned from firebase to get the snapshot val which
  // is likely overkill on hiding the details
  return new Promise(function(resolve, reject) {
    var ref: firebase.database.Reference = firebase.database().ref(refPath);

    ref.once('value').then((snapshot) => {
      serviceTypes = snapshot.val();

      resolve(serviceTypes);
    }).catch((e: Error) => {
      reject(e);
    });
  });
}

export function startListener(providerID: string, serviceType: string, handleUpdate) {
  const refPath = `${getRealTimePath(providerID)}/${serviceType}`;

  console.log(`startListener:${refPath}`);

  var serviceTypeRef: firebase.database.Reference = firebase.database().ref(refPath);

  console.log('startListener:ref:', serviceTypeRef);

  serviceTypeRef.on('value', function(snapshot) {

    console.log(`startListener:on:${refPath}:${snapshot.val()}`);

    handleUpdate(snapshot.val());
  });
}

export function updateRealTimeValue(providerID: string, serviceType: string, value: any) {
  const refPath = `${getRealTimePath(providerID)}/${serviceType}`;

  console.log(`updateRealTimeValue:${refPath}:${value}`);

  firebase.database().ref(refPath).update({
    value: value
  }).then(() => {
    console.log(`updateRealTimeValue:${refPath}:success`);
  }).catch((e: Error) => {
    console.error(`updateRealTimeValue:${refPath}:error:${e}`);
  });
}

export function updateWaitTime(providerID: string, value: number) {
  return updateRealTimeValue(providerID, 'waitTime', value);
}

export function updateAcceptingNow(providerID: string, value: boolean) {
  return updateRealTimeValue(providerID, 'acceptingNow', value);
}
