import { handleActions } from 'redux-actions';
import * as Actions from '../constants/actions';

const initialState: WaitTimeStoreState = {
  waitTime: 'Not available',
};

export default handleActions<WaitTimeStoreState, WaitTimeData>({
  [Actions.UPDATE_WAIT_TIME]: (state, action) => {
    console.log('Actions.UPDATE_WAIT_TIME');
    return Object.assign({}, state, {
      waitTime: action.payload,
    });
  }
}, initialState);
