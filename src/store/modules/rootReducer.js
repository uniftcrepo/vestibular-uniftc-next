import {combineReducers} from 'redux';
import auth from './auth/reducer';
import user from './user/reducer';
import banner from './banner/reducer';
import fdi from './fdi/reducer';
import consultor from './consultor/reducer';
import curso from './curso/reducer';

export default combineReducers({
  auth,
  user,
  banner,
  fdi,
  consultor,
  curso,
})
