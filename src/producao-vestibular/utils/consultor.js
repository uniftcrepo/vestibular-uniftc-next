

const Consultor = (consultorList, idC) => {
    var retorno = consultorList.filter((val) => {
        return val.codigo === idC
    }).map((val) => {
        return { idConsultor: val.token, codigoConsultor: val.codigo, nomeConsultor: val.nome, fotoConsultor: val.foto, generoConsultor: val.genero  };
    })
    if (Object.keys(retorno).length === 0) {
        retorno = consultorList.map(() => {
            return { idConsultor: "", codigoConsultor: "errado" };
        })
    }
    return retorno
}

export default Consultor