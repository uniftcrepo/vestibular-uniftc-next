import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
/* import history from '../../../services/history'; */
import api from '../../../services/api';
import 'react-toastify/dist/ReactToastify.min.css';

import route from 'next/router'

import { signInSuccess, signFailure } from './actions';



export function* signIn({ payload }) {

  try {
    const { usuario, senha } = payload;
    /* const response = yield call(api.post, 'sessions', {
      usuario,
      senha,
    }); */

    //const { token, user } = response.data;

      if (usuario === "zepequeno" &&  senha=== "uwoxlOvmaq$4tE2e") {
        toast.success('Usuário Logado!');
      } else {
        toast.error('Usuário inválido!', {
          position: toast.POSITION.TOP_CENTER
        });
        yield put(signFailure());
        return;
      }
    

    //api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess("564646546121377324", usuario));
  
    
    yield put(route.push('/dashboard/banners')); /* inside saga generator function*/
    console.log(usuario, senha);
  } catch (error) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });
    /* history.push('/'); */
  } catch (error) {
    toast.error('Falha no cadastro, verifique seus dados!');
    yield put(signFailure());
  }
}

export function setToken({payload}){
  if(!payload) return;

  const { token} = payload.auth;
  if(token){
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut(){
  /* history.push('/admin/login'); */
}
export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_OUT', signOut)
]);
