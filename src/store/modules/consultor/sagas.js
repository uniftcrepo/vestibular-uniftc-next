import { all, takeLatest, put, select, call } from "redux-saga/effects";

import { toast } from "react-toastify";
import api from "../../../services/api";
import {
  updateConsultorSuccess,
  removeConsultorSuccess,
  successCidades,
  filtroSucessoConsultor,
} from "./actions";
import Consultor from "../../../producao-vestibular/utils/consultor";

export const consultor = (state) => state.consultor.consultor;

export function* addConsultorSaga({ payload }) {
  try {
    /*   var config = {
      headers: {
        "Access-Control-Allow-Headers": "Authorization",
      },
    }; */
    const formData = new FormData();
    Object.keys(payload.data).forEach((index) => {
      formData.append(`${index}`, payload.data[index]);
    });
    const response = yield api.post(
      "/addConsultorVestibularUniftc",
      formData
    );
    if (response.status === 200) {
      toast.success("Consultor adicionado com sucesso!");

      yield put(updateConsultorSuccess(response.data));
    }
    //yield put(getBanner());
  } catch (error) {
    toast.error("Erro ao adicionar Consultor");
    //yield put(updateBannerFailure());
  }
}

export function* removeConsultorSaga({ payload }) {
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
    const id = payload.id;
    const response = yield api.delete(
      `/deleteConsultorVestibularUniftc/${id}`,
      { config }
    );
    /* yield put(updateBannerSuccess("")); */
    if (response.status === 200) {
      toast.success("Consultor deletado com sucesso!");
      yield put(removeConsultorSuccess(id));
    }
  } catch (error) {
    toast.error("Consultor não foi excluido tente novamente");
    //yield put(updateBannerFailure());
  }
}
export function* updateConsultorSaga({ payload }) {
  try {
    var config = {
      headers: {
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
      },
      datatType: "jsonp",
      withCredentials: true,
    };
    const formData = new FormData();
    Object.keys(payload.consultor).forEach((index) => {
      formData.append(`${index}`, payload.consultor[index]);
    });
    const response = yield api.post(
      "/updateConsultorVestibularUniftc",
      formData,
      { config }
    );

    if (response.status === 200) {
      yield put(updateConsultorSuccess(response.data));
      toast.success("Consultor foi atualizado com sucesso!");
    }
  } catch (error) {
    toast.error("Consultor não foi atualizado tente novamente");
    //yield put(updateBannerFailure());
  }
}
export function* getConsultorSaga() {
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
    const response = yield api.get(
      "/getConsultorVestibularUniftc",
      { config }
    );
    yield put(updateConsultorSuccess(response.data));
  } catch (error) {
    //toast.error('Banner não foi excluido tente novamente')
    //yield put(updateBannerFailure());
  }
}
export function* getCidadesSaga() {
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
    const response = yield api.get(
      "/getCidades",
      { config }
    );
    yield put(successCidades(response.data));
  } catch (error) {
    //toast.error('Banner não foi excluido tente novamente')
    //yield put(updateBannerFailure());
  }
}
export function* salvarConsultorSaga({ payload }) {
  try {
    //const response = yield call(api.post, 'uploadBannerVestibularUniftc', payload.data, {config});
    const responseForm = yield api.post(
      "/salvarConsultorVestibularUniftc",
      payload.data
    );

    const textoLegal = {};
    textoLegal["texto_legal"] = payload.textoLegal;
    textoLegal["faculdade"] = "uniftc";

    const responseTextoLegal = yield api.post(
      "/salvarConsultorTextoLegalVestibularUniftc",
      textoLegal
    );
    if (responseForm.status === 200 && responseTextoLegal.status === 200) {
      const uniftc = payload.data.filter((e) => {
        return e.faculdade === "uniftc";
      });
      yield put(updateConsultorSuccess(uniftc));
      toast.success("FDI alterada com  sucesso!");
    }
  } catch (error) {
    toast.error("Erro ao Salvar FDIS");
    //yield put(updateBannerFailure());
  }
}

export function* filtroConsultorSaga({ payload }) {
  yield call(getConsultorSaga)
  const consultorRecuperados = yield select(consultor);
    const [arrayConsultor] = Consultor(consultorRecuperados, payload.id);
    yield put(filtroSucessoConsultor(arrayConsultor));
}

export default all([
  takeLatest("@consultor/CREATE", addConsultorSaga),
  takeLatest("@consultor/REMOVE", removeConsultorSaga),
  takeLatest("@consultor/UPDATE", updateConsultorSaga),
  takeLatest("@consultor/SALVAR", salvarConsultorSaga),
  takeLatest("@consultor/GET", getConsultorSaga),
  takeLatest("@cidades/GET", getCidadesSaga),
  takeLatest("@consultor/FILTRO", filtroConsultorSaga),
]);
