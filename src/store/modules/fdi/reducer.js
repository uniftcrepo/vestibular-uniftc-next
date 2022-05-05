import produce from 'immer';
import { HYDRATE } from "next-redux-wrapper";
/* import axios from "axios";

async function initial(){

  const response = await axios.get(
    "https://www.uniftc.edu.br/slimapi/public/getFdiVestibularUniftc"
  );
  return response.data
}

async function initialTextoLegal(){

  const response = await axios.get(
    "https://www.uniftc.edu.br/slimapi/public/getFdiTextoLegalVestibularUniftc"
  );
  return response.data
}



 */

const INITIAL_STATE = {
  fdi: [],
  textoLegal: [],
  loading: false,
};





export default function fdi(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case HYDRATE:{
        const nextState = {
          ...draft, // use previous state
          ...action.payload.fdi, // apply delta from hydration
        }
        if (draft.fdi.fdi){
          console.log('Loading HYDRATE:', draft.fdi.loading)
          nextState.fdi.fdi = draft.fdi.fdi // preserve count value on client side navigation
        } 
        return nextState
      }
      case '@fdi/CREATE':{
          
          /* draft.fdi.push(action.payload.data) */
          //draft.fdi = action.payload.fdi;
          break;
      }
      case '@fdi/SUCCESS':{
          //console.log('Estou Success FDI')
          /* const nuevo = action.payload.fdi.map((i) => Number(i.id));
          console.log(nuevo) */
          console.log('Loading SUCCESS:', false)
          draft.loading = false;
          draft.fdi = action.payload.fdi;
          break;
      }
      case '@fdi/LOADINGSUCCESS':{
          console.log('Loading LOADINGSUCCESS:', action.payload.loading)
          draft.loading = action.payload.loading;
          break;
      }
      case '@fdi/SUCESSTEXTOLEGAL':{
        
          /* const nuevo = action.payload.fdi.map((i) => Number(i.id));
          console.log(nuevo) */
          draft.textoLegal = action.payload.textoLegal;
          break;
      }
      case '@fdi/UPDATE':{
          
          for (var i=0; i<draft.fdi.length; i++) {
            
            if(draft.fdi[i].id === action.payload.fdi.id){
              draft.fdi[i].body = action.payload.fdi.body;
              draft.fdi[i].title = action.payload.fdi.title;

            }

          }
          //draft.fdi = action.payload.fdi;
          break;
      }
      case '@fdi/REMOVESUCCESS':{
          const fdiFilter = state.fdi.filter((elem) => elem.id !=  action.payload.id );
          draft.fdi = fdiFilter;
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
