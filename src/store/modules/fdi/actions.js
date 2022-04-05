export function getFdi(tipoUnidade){
  return {
    type:'@fdi/GET',
    payload:{
      tipoUnidade
    }
  }
}
export function getFdiTextoLegal(tipoUnidade){
  return {
    type:'@fdi/GETTEXTOLEGAL',
    payload:{
      tipoUnidade
    }
  }
}
export function sucessoFdiTextoLegal(textoLegal){
  return {
    type:'@fdi/SUCESSTEXTOLEGAL',
    payload:{
      textoLegal
    }
  }
}
export function AddFdi(data){
  return {
    type:'@fdi/CREATE',
    payload:{
      data
    }
  }
}
export function updateFdi(fdi){
  return {
    type:'@fdi/UPDATE',
    payload:{
      fdi
    }
  }
}
export function salvarFdi(data, textoLegal){
  return {
    type:'@fdi/SALVAR',
    payload:{
      data,
      textoLegal
    }
  }
}
export function removeFdi(data){
  return {
    type:'@fdi/REMOVE',
    payload:{
      data
    }
  }
}
export function removeFdiSuccess(id){
  return {
    type:'@fdi/REMOVESUCCESS',
    payload:{
      id
    }
  }
}

 export function updateFdiSuccess(fdi){
  return {
    type:'@fdi/SUCCESS',
    payload:{
      fdi
    }
  }
}
/*
export function updateBannerFailure(){
  return {
    type:'@banner/FAILURE',
  }
} */
