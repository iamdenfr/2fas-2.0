import { legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './index';
import { applyMiddleware } from 'redux';

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
