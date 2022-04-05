export function uploadFilesProgress(progress){
  return {
    type:'@banner/PROGRESS',
    payload:{
      progress
    }
  }
}
export function getBannerLoading(){
  return {
    type:'@banner/LOADING',
  }
}
export function getBanner(){
  return {
    type:'@banner/GET',
  }
}
export function addBannerUpload(banners){
  return {
    type:'@banner/ADD',
    payload:{
      banners
    }
  }
}
export function updateBannerUpload(banners){
  return {
    type:'@banner/UPDATE',
    payload:{
      banners
    }
  }
}
export function removeBannerUpload(data){
  return {
    type:'@banner/REMOVE',
    payload:{
      data
    }
  }
}
export function updateBannerSuccess(banner){
  return {
    type:'@banner/SUCCESS',
    payload:{
      banner
    }
  }
}
export function salvarBannerOrdenado(banner){
  return {
    type:'@banner/SAVEORDER',
    payload:{
      banner
    }
  }
}
export function updateBannerSuccessView(bannerView){
  return {
    type:'@bannerView/SUCCESS',
    payload:{
      bannerView
    }
  }
}
export function getBannerView(){
  return {
    type:'@bannerView/GET',
  }
}

export function updateBannerFailure(){
  return {
    type:'@banner/FAILURE',
  }
}


export function removeBanner(data){
  return {
    type:'@banner/REMOVE',
    payload:{
      data
    }
  }
}
export function removeBannerSuccess(id){
  return {
    type:'@banner/REMOVESUCCESS',
    payload:{
      id
    }
  }
}