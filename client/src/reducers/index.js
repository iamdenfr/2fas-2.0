import { combineReducers } from 'redux';
<<<<<<< Updated upstream
import authReducer from './authreducer';

const rootReducer = combineReducers({
  auth: authReducer
=======
import registerReducer from './registerreducer';
import loginReducer from './loginreducer';
import authReducer from './authreducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer
>>>>>>> Stashed changes
});

export default rootReducer;
