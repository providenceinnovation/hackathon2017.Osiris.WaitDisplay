import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import * as Actions from '../constants/actions';
import * as firebase from 'firebase/app';

const providerID: string = 'wa211134271';

export const updateWaitTime = createAction<string>(Actions.UPDATE_WAIT_TIME);

export function startListening () {
    // Current implementation is just for proof of concept. Original logic needs to be added back.
    return (dispatch: Dispatch<any>) => {
      const waitTimePath = `providers/${providerID}/waitTime`;
      console.log('startListening: enable listener:' + waitTimePath);

      var waitTimeRef: firebase.database.Reference = firebase.database().ref(waitTimePath);
      waitTimeRef.on('value', function(snapshot) {
        dispatch(updateWaitTime(snapshot.val()));
      });
    };
}