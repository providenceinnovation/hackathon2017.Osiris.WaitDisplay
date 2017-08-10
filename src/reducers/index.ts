import { combineReducers, Reducer } from 'redux';
import todos from './todos';
import waitTime from './waitTime';

export interface RootState {
  todos: TodoStoreState;
  waitTime: WaitTimeStoreState;
}

export default combineReducers<RootState>({
  todos,
  waitTime
});
