import {
  all,
  takeLatest,
  call,
  put,
  fork,
  take,
  takeEvery,
} from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import api from "../../../services/api";
import { toast } from "react-toastify";

import {
  updateBannerSuccess,
  updateBannerFailure,
  getBannerLoading,
  uploadFilesProgress,
  updateBannerSuccessView,
  removeBannerSuccess
} from "./actions";





function createUploader(files, tipo) {
  let emit;
  const chan = eventChannel((emitter) => {
    emit = emitter;
    return () => {};
  });
  let url = tipo === "NOVO" ? "/addBannerVestibularUniftc" : "updateBannerVestibularUniftc"
  /* const uploadPromise = upload(files, uploadProgressCb); */
  const uploadPromise = api.post(url, files, {
    onUploadProgress: ({ total, loaded }) => {
      const percentage = Math.round((loaded * 100) / total);
      emit(percentage);
      if (percentage === 100) emit(END);
    },
  });
  return [uploadPromise, chan];
}

function* uploadProgressWatcher(chan) {
  while (true) {
    // eslint-disable-line no-constant-condition

    const progress = yield take(chan);
    yield put(uploadFilesProgress(progress));
  }
}

function* updateBannerUploadSaga({ payload }) {
  try {
    yield put(getBannerLoading());
    const [uploadPromise, chan] = yield call(createUploader, payload.banners, "EDITAR");
    yield fork(uploadProgressWatcher, chan);
    const res = yield call(() => uploadPromise);
    if (res.status === 200) {
      const uniftc = res.data.filter((e) => {
        return e.faculdade === "uniftc";
      });
      yield put(updateBannerSuccess(uniftc));
      const response = yield call(api.get, "/getViewBannerVestibularUniftc");
      //console.log(response.data);
      var bannerView = response.data.filter((e) => {
        return e.faculdade === "uniftc";
      });
      yield put(updateBannerSuccessView(bannerView));
      toast.success("Banner atualizado com  sucesso");
    }
  } catch (error) {
    toast.error("Erro ao Banner perfil");
    yield put(updateBannerFailure());
  }
}
function* addBannerUploadSaga({ payload }) {
  try {
    yield put(getBannerLoading());
    const [uploadPromise, chan] = yield call(createUploader, payload.banners, "NOVO");
    yield fork(uploadProgressWatcher, chan);
    const res = yield call(() => uploadPromise);
    if (res.status === 200) {
      const uniftc = res.data.filter((e) => {
        return e.faculdade === "uniftc";
      });
      yield put(updateBannerSuccess(uniftc));
      const response = yield call(api.get, "/getViewBannerVestibularUniftc");
      //console.log(response.data);
      var bannerView = response.data.filter((e) => {
        return e.faculdade === "uniftc";
      });
      yield put(updateBannerSuccessView(bannerView));
      toast.success("Banner incluido com  sucesso");
    }
  } catch (error) {
    toast.error("Erro ao Banner perfil");
    yield put(updateBannerFailure());
  }
}


function* getBannerSaga() {
  try {
    //const response = yield call(api.get, 'getBannerVestibularUniftc');
    yield put(getBannerLoading());
    /*   yield takeEvery('@banner/LOADING');
  yield takeEvery(getBannerLoading()) */
    /*  const response = yield axios.get(
      "https://www.uniftc.edu.br/slimapi/public/getBannerVestibularUniftc"
    ); */
    const response = yield call(api.get, "/getBannerVestibularUniftc");
    //console.log(response.data);
    const uniftc = response.data.filter((e) => {
      return e.faculdade === "uniftc";
    });
    yield put(updateBannerSuccess(uniftc));
  } catch (error) {
    //toast.error('Banner não foi excluido tente novamente')
    //yield put(updateBannerFailure());
  }
}

function* getViewBannerSaga() {
  try {
    //const response = yield call(api.get, 'getBannerVestibularUniftc');
    yield put(getBannerLoading());
    /*   yield takeEvery('@banner/LOADING');
  yield takeEvery(getBannerLoading()) */
    /*  const response = yield axios.get(
      "https://www.uniftc.edu.br/slimapi/public/getBannerVestibularUniftc"
    ); */
    const response = yield call(api.get, "/getViewBannerVestibularUniftc");
    //console.log(response.data);
    const uniftc = response.data.filter((e) => {
      return e.faculdade === "uniftc";
    });
    yield put(updateBannerSuccessView(uniftc));
  } catch (error) {
    //toast.error('Banner não foi excluido tente novamente')
    //yield put(updateBannerFailure());
  }
}

// eslint-disable-next-line require-yield
export function* removeBannerSaga({ payload }) {
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
      `/removeBannerVestibularUniftc/${id}`,
      { config }
    );
    if (response.status === 200) {
      toast.success("FDI deletado com sucesso!");
      yield put(removeBannerSuccess(id));
    }
  } catch (error) {
    toast.error("FDI não foi excluido tente novamente");
    //yield put(updateBannerFailure());
  }
}

export function* salvarBannerOrdenadoSaga({ payload }) {
  try {
 
    const response = yield api.post(
      `/salvarBannerOrdenadoVestibularUniftc`,
      payload.banner
    );
    if (response.status === 200) {
      toast.success("Posicão alterada com sucesso!");
      yield put(updateBannerSuccess(payload.banner));
    }
  } catch (error) {
    toast.error("FDI não foi excluido tente novamente");
    //yield put(updateBannerFailure());
  }
}

export default all([
  takeLatest("@banner/UPDATE", updateBannerUploadSaga),
  takeLatest("@banner/ADD", addBannerUploadSaga),
  /* takeLatest("@banner/REMOVE", removeBannerUploadSaga), */
  takeLatest("@banner/GET", getBannerSaga),
  takeLatest("@bannerView/GET", getViewBannerSaga),
  takeLatest("@banner/REMOVE", removeBannerSaga),
  takeLatest("@banner/SAVEORDER", salvarBannerOrdenadoSaga),
]);
