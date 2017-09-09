import { createStore,applyMiddleware } from 'redux';
import ReduxThunkMiddleware from 'redux-thunk'
import reducers from './reducers';

export default () => createStore(reducers,
  applyMiddleware(ReduxThunkMiddleware));
