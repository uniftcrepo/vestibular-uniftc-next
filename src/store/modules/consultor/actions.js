export function getConsultor(){
  return {
    type:'@consultor/GET',
  }
}


export function filtroConsultor(id){
  return {
    type:'@consultor/FILTRO',
    payload:{
      id
    }
  }
}
export function filtroSucessoConsultor(consultor){
  return {
    type:'@consultor/SUCESSOFILTRO',
    payload:{
      consultor
    }
  }
}


export function addConsultor(data){
  return {
    type:'@consultor/CREATE',
    payload:{
      data
    }
  }
}
export function updateConsultor(consultor){
  return {
    type:'@consultor/UPDATE',
    payload:{
      consultor
    }
  }
}
export function salvarConsultor(data, textoLegal){
  return {
    type:'@consultor/SALVAR',
    payload:{
      data,
      textoLegal
    }
  }
}
export function removeConsultor(id){
  return {
    type:'@consultor/REMOVE',
    payload:{
      id
    }
  }
}
export function removeConsultorSuccess(id){
  return {
    type:'@consultor/REMOVESUCCESS',
    payload:{
      id
    }
  }
}

 export function updateConsultorSuccess(consultor){
  return {
    type:'@consultor/SUCCESS',
    payload:{
      consultor
    }
  }
}

export function getCidades(){
  return {
    type:'@cidades/GET',
  }
}
export function successCidades(cidades){
  return {
    type:'@cidades/SUCCESS',
    payload:{
      cidades
    }
  }
}