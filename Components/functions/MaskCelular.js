
export const telMask = v => {
    return v
    .replace(/\D/g,"")             //Remove tudo o que não é dígito
    .replace(/^(\d{2})(\d)/g,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d)(\d{4})$/,"$1-$2")    //Coloca hífen entre o quarto e o quinto dígitos
    
  }