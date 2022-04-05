import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";
const INITIAL_STATE = {
  todosOsCurso: [],
  curso: [],
  unidade: [],
  nomeAba: ""
};

function filtro(dado) {
  const nomeCidade = [];
  for (let obj of dado) {
    if (!nomeCidade.includes(obj.nome_cidade)) {
      if (obj.id_cidade !== 12) {
        nomeCidade.push(obj.nome_cidade);
      }
    }
  }
  return nomeCidade;
}

export default function curso(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:{
        const nextState = {
          ...draft, // use previous state
          ...action.payload.curso, // apply delta from hydration
        }
        if (draft.curso.curso) {
          nextState.curso.curso = draft.curso.curso
         } // preserve count value on client side navigation
        return nextState
      }
      case "@curso/SUCCESS": {
        const cursoAgrupados = action.payload.curso.reduce((obj, pet) => {
          if (!obj[pet.curso]) {
            obj[pet.curso] = 1;
          } else {
            obj[pet.curso]++;
          }
          return obj;
        }, []);
        draft.curso = Object.keys(cursoAgrupados).map((x, index) => {
          return { curso: x };
        });
        /*  let groupCursos = cursosSort.reduce((acc, it) => {
          acc[it.curso] = acc[it.curso] + 1 || 1;
          return acc;
      }, {}); */

        draft.todosOsCurso = action.payload.curso;

        draft.unidade = filtro(action.payload.curso)
          .map((cidade) => {
            return { label: cidade, value: cidade };
          }).filter((cidade) => {
             if(state.nomeAba === "Vestibular Online" || state.nomeAba === "Use sua nota no ENEM" || state.nomeAba === "Segunda Graduação"){
              return cidade;
             }else{
              return (
                cidade.value !== "Camaçari" &&
                cidade.value !== "Nossa Senhora do Socorro" &&
                cidade.value !== "Caucaia" &&
                cidade.value !== "Porto Seguro" &&
                cidade.value !== "Caruaru" 
              );
             }
             
            
          });
          //console.log(draft.unidade, state.nomeAba)
        break;
      }
      case "@curso/SUCCESSFILTRO": {
        draft.curso = action.payload.curso;

        break;
      }
      case "@curso/DIREITO5": {
       
        draft.nomeAba = action.payload.nomeAba;

        break;
      }

      default:
        return state;
    }
  });
}
