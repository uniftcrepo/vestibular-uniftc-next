import { all, takeLatest,  put, select } from "redux-saga/effects";

import { toast } from "react-toastify";
import api from "../../../services/api";

import { successCurso, successFiltroCurso } from "./actions";


export const cursos = (state) => state.curso.todosOsCurso;

export function* getCursoSaga() {
  try {
    var config = {
      headers: {
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      datatType: "jsonp",
      withCredentials: true,
    };
    const {data} = yield api.get(
      "/getCidadeVestibular"
    );
  
    yield put(successCurso(data));
  } catch (error) {
    //toast.error('Banner não foi excluido tente novamente')
    //yield put(updateBannerFailure());
  }
}
export function* filtrarCursoSaga({payload}) {

    const cursoRecuperados = yield select(cursos);
    let pegarunidade = cursoRecuperados.filter((x) => {
      return x.nome_cidade === payload.nome;
    });
    yield put(successFiltroCurso(pegarunidade));
  
}



export default all([
  takeLatest("@curso/GET", getCursoSaga),
  takeLatest("@curso/FILTAR", filtrarCursoSaga),
]);
