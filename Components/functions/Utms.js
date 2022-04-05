export const utms = () => {
if (typeof window !== "undefined") {
var url_atual = window.location.href;
var parametrosDaUrl = url_atual.split("?")[1];
var hash = {};
if (parametrosDaUrl) {
  var listaDeParametros = parametrosDaUrl.split("&");

  for (var i = 0; i < listaDeParametros.length; i++) {
    var parametro = listaDeParametros[i].split("=");
    var chave = parametro[0];
    var valor = parametro[1];
    hash[chave] = valor;
  }
}

var utm;
if (hash.utm_source !== undefined) {
  utm =
    "?utm_source=" +
    hash.utm_source +
    "&utm_medium=" +
    hash.utm_medium +
    "&utm_campaign=" +
    hash.utm_campaign +
    "&utm_content=" +
    hash.utm_content;
} else {
  utm =
    "?utm_source=lp_ps&utm_medium=acesso_direto&utm_campaign=vestibular_2022_2&utm_content=inscricao";
}
return utm;
}
}
