import produce from 'immer';
import { HYDRATE } from "next-redux-wrapper";
const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};
export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case HYDRATE:{
        const nextState = {
          ...draft, // use previous state
          ...action.payload.auth, // apply delta from hydration
        }
        if (draft.auth) nextState.auth = draft.auth// preserve count value on client side navigation
        return nextState
      }
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
        return state;
    }
  });
}
