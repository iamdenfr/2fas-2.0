import { combineReducers } from 'redux';
import registerReducer from './registerreducer';
import loginReducer from './loginreducer';
import authReducer from './authreducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer
});

export default rootReducer;
