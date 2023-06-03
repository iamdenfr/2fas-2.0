import { combineReducers } from 'redux';
import registerReducer from './registerreducer';
import loginReducer from './loginreducer';
import authReducer from './authreducer';
import updateReducer from './updatereducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer,
  update: updateReducer,
});

export default rootReducer;
