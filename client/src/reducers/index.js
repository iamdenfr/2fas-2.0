import { combineReducers } from 'redux';
import authReducer from './authreducer';
import loginReducer from './loginreducer';

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer
});

export default rootReducer;
