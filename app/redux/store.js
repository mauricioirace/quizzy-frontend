import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunkMiddleware from 'redux-thunk'
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunkMiddleware)));
