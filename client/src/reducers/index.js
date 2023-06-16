import { combineReducers } from 'redux';
import registerReducer from './registerreducer';
import loginReducer from './loginreducer';
import authReducer from './authreducer';
import updateReducer from './updateuserreducer';
import deleteReducer from './deleteuserreducer';
import getUserReducer from './getuserreducer';
import adminReducer from './adminreducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer,
  updateUser: updateReducer,
  deleteUser: deleteReducer,
  getUser: getUserReducer,
  admin: adminReducer,
});

export default rootReducer;
