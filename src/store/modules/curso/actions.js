export function getCurso(){
  return {
    type:'@curso/GET',
  }
}

export function filtarCurso(nome){
  return {
    type:'@curso/FILTAR',
    payload:{
      nome
    }
  }
}

export function successCurso(curso){
  return {
    type:'@curso/SUCCESS',
    payload:{
      curso
    }
  }
}
export function direito5Curso(nomeAba){
  return {
    type:'@curso/DIREITO5',
    payload:{
      nomeAba
    }
  }
}

export function successFiltroCurso(curso){
  return {
    type:'@curso/SUCCESSFILTRO',
    payload:{
      curso
    }
  }
}