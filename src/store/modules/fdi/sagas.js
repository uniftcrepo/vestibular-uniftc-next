import { all, takeLatest,  put } from "redux-saga/effects";
import api from "../../../services/api";
import { toast } from "react-toastify";

import { updateFdiSuccess, removeFdiSuccess, sucessoFdiTextoLegal } from "./actions";
export function* addFdiSaga({ payload }) {
  try {
  /*   var config = {
      headers: {
        "Access-Control-Allow-Headers": "Authorization",
      },
    }; */
    const formData = new FormData();
    /*  formData.append('index', 'payload[index]'); */
    Object.keys(payload.data).forEach((index) => {
      formData.append(`${index}`, payload.data[index]);
    });
 /*    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  } */
    
    //const response = yield call(api.post, 'uploadBannerVestibularUniftc', payload.data, {config});
    const response = yield api.post(
      "/addFdiVestibularUniftc",
      formData
    );
     if(response.status === 200){
      toast.success("FDI adicionado com sucesso!");
      const uniftc = response.data.filter(e =>{
        return e.faculdade === payload.data.faculdade
      })
      yield put(updateFdiSuccess(uniftc))
    }
    //yield put(getBanner());
  } catch (error) {
    toast.error("Erro ao adicionar FDI");
    //yield put(updateBannerFailure());
  }
}

export function* removeFdiSaga({ payload }) {
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
    const id = payload.data;
    const response = yield api.delete(
      `/deleteFdiVestibularUniftc/${id}`,
      { config }
    );
    /* yield put(updateBannerSuccess("")); */
    if (response.status === 200) {
      toast.success("FDI deletado com sucesso!");
      yield put(removeFdiSuccess(id));
    }
  } catch (error) {
    toast.error("FDI não foi excluido tente novamente");
    //yield put(updateBannerFailure());
  }
}
export function* updateFdiSaga({ payload }) {
  try {
    var config = {
      headers: {
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json"
      },
      datatType: "jsonp",
      withCredentials: true,
    };
    const formData = new FormData();
    Object.keys(payload.fdi).forEach((index) => {
      formData.append(`${index}`, payload.fdi[index]);
    });
    const response = yield api.post('https://www.uniftc.edu.br/slimapi/public/updateFdiVestibularUniftc', formData, {config});
   
    if(response.status === 200){
      const uniftc = response.data.filter(e =>{
        return e.faculdade === payload.fdi.faculdade
      })
      //console.log("Alterar FDI:", uniftc)
      yield put(updateFdiSuccess(uniftc))
      toast.success('FDI foi atualizado com sucesso!')
    }
  } catch (error) {
    toast.error('FDI não foi atualizado tente novamente')
    //yield put(updateBannerFailure());
  }
}
export function* getFdiSaga({ payload }) {
  try {
    //console.log(payload.tipoUnidade)
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
      "/getFdiVestibularUniftc",
      { config }
    );
    const uniftc = response.data.filter(e =>{
      return e.faculdade === payload.tipoUnidade.faculdade
    })
    yield put(updateFdiSuccess(uniftc));
  } catch (error) {
    //toast.error('Banner não foi excluido tente novamente')
    //yield put(updateBannerFailure());
  }
}

export function* salvarFdiSaga({ payload }) {
  try {
    //const response = yield call(api.post, 'uploadBannerVestibularUniftc', payload.data, {config});
    const responseForm = yield api.post(
      "/salvarFdiVestibularUniftc",
      payload.data
    );

    const textoLegal = {};
    textoLegal['texto_legal'] = payload.textoLegal;
    textoLegal['faculdade'] = payload.data[0].faculdade;

    const responseTextoLegal = yield api.post(
      "/salvarFdiTextoLegalVestibularUniftc",
      textoLegal
    );
    if (responseForm.status === 200 && responseTextoLegal.status === 200) {
      const uniftc = responseForm.data.filter(e =>{
        return e.faculdade === payload.data[0].faculdade
      })
      const textoLegalRetorno = responseTextoLegal.data.filter(e =>{
        return e.faculdade === payload.data[0].faculdade
      })
      //console.log("Alterar texto legal:", textoLegalRetorno)
      console.log("Alterar fdi incluir:", uniftc)
      yield put(updateFdiSuccess(uniftc));
      yield put(sucessoFdiTextoLegal(textoLegalRetorno));
      toast.success("FDI alterada com  sucesso!");
    }
  } catch (error) {
    toast.error("Erro ao Salvar FDIS");
    //yield put(updateBannerFailure());
  }
}

export function* getFdiTextoLegalSaga({ payload }) {
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
      "/getFdiTextoLegalVestibularUniftc",
      { config }
    );
    const uniftc = response.data.filter(e =>{
      return e.faculdade ===  payload.tipoUnidade.faculdade
    })
    yield put(sucessoFdiTextoLegal(uniftc));
  } catch (error) {
    //toast.error('Banner não foi excluido tente novamente')
    //yield put(updateBannerFailure());
  }
}

export default all([
  takeLatest("@fdi/CREATE", addFdiSaga),
  takeLatest("@fdi/REMOVE", removeFdiSaga),
  takeLatest("@fdi/UPDATE", updateFdiSaga),
  takeLatest("@fdi/SALVAR", salvarFdiSaga),
  takeLatest("@fdi/GET", getFdiSaga),
  takeLatest("@fdi/GETTEXTOLEGAL", getFdiTextoLegalSaga),
]);
