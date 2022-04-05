import produce from 'immer';
import { HYDRATE } from "next-redux-wrapper";
/* import axios from "axios";

async function initial(){

  const response = await axios.get(
    "https://www.uniftc.edu.br/slimapi/public/getBannerVestibularUniftc"
  );
  return response.data
} */
const INITIAL_STATE = {
  banner: [],
  bannerView:[],
  loading: false,
  progress: 0
};


export default function banner(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case HYDRATE:{
        const nextState = {
          ...draft, // use previous state
          ...action.payload.banner, // apply delta from hydration
        }
        if (draft.banner.banner) nextState.banner.banner = draft.banner.banner // preserve count value on client side navigation
        return nextState
      }
      case '@banner/PROGRESS':{
          draft.loading = true;
          draft.progress = action.payload.progress;
          break;
      }
      case '@banner/LOADING':{
          draft.loading = true;
          break;
      }
      case '@banner/UPDATE':{
          draft.banner = action.payload.banner;
          draft.loading = true;
          break;
      }
      case '@banner/SUCCESS':{
          //console.log(action.payload.banner)
          draft.banner = action.payload.banner;
          draft.loading = false;
          break;
      }
      case '@bannerView/SUCCESS':{
          draft.bannerView = action.payload.bannerView;
          draft.loading = false;
          break;
      }
      case '@banner/REMOVE':{
          const banner = state.banner.filter((elem) => elem.id !=  action.payload.data );
          draft.banner = banner;
          break;
      }
      case '@fdi/REMOVESUCCESS':{
        const banner = state.banner.filter((elem) => elem.id !=  action.payload.id );
        draft.fdi = banner;
        break;
    }
      case '@banner/FAILURE': {
        draft.banner = null;
        break;
      }
      default:
        return state;
    }
  })
}
