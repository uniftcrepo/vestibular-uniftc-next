import produce from 'immer';
import { HYDRATE } from "next-redux-wrapper";


const INITIAL_STATE = {
  consultor: [],
  consultorFiltro:[],
  cidades: [],
};





export default function consultor(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case HYDRATE:{
        const nextState = {
          ...draft, // use previous state
          ...action.payload.consultor, // apply delta from hydration
        }
        if (draft.consultor.consultor) nextState.consultor.consultor = draft.consultor.consultor // preserve count value on client side navigation
        return nextState
      }
      case '@consultor/CREATE':{
          
          /* draft.consultor.push(action.payload.data) */
          //draft.consultor = action.payload.consultor;
          break;
      }
      case '@consultor/SUCCESS':{
        
          /* const nuevo = action.payload.consultor.map((i) => Number(i.id));
          console.log(nuevo) */
          draft.consultor = action.payload.consultor;
          break;
      }
      case '@consultor/SUCESSOFILTRO':{
        
          /* const nuevo = action.payload.consultor.map((i) => Number(i.id));
          console.log(nuevo) */
          draft.consultorFiltro = action.payload.consultor;
          break;
      }
      case '@cidades/SUCCESS':{
        
          /* const nuevo = action.payload.consultor.map((i) => Number(i.id));
          console.log(nuevo) */
          draft.cidades = action.payload.cidades;
          break;
      }
      case '@consultor/UPDATE':{
        
          for (var i=0; i<draft.consultor.length; i++) {
            
            if(draft.consultor[i].id === action.payload.consultor.id){
              draft.consultor[i].body = action.payload.consultor.body;
              draft.consultor[i].title = action.payload.consultor.title;

            }

          }
          //draft.consultor = action.payload.consultor;
          break;
      }
      case '@consultor/REMOVESUCCESS':{
          const consultorFilter = state.consultor.filter((elem) => elem.id !=  action.payload.id );
          draft.consultor = consultorFilter;
          break;
      }
      default:
        return state;
    }
  })
}
