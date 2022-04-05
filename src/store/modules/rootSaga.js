import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import banner from './banner/sagas';
import fdi from './fdi/sagas';
import consultor from './consultor/sagas';
import curso from './curso/sagas';

export default function* rootSaga() {
  return yield all([auth, user, banner, fdi, consultor, curso]);
}
