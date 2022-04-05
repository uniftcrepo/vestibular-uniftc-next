import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import Button from "./ButtonClickLink";
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { cpfMask } from "./../functions/MaskCpf";
import validarCpf from "validar-cpf";
import { telMask } from "./../functions/MaskCelular";
import api from "../../src/services/api";

import swal from "sweetalert";
import Consultor from "../../src/producao-vestibular/utils/consultor";
import {  useSelector } from "react-redux";

export const MensagemErro = styled.div`
  color: #bd0f0f;
  margin-top: 27px;
  line-height: 17.1px;
`;

export const FormularioConsultor = styled.div`
  top: 0;
  right: 0;
  left: 0;
  max-width: 100%;
  width: 85%;
  .invalid-feedback{
    margin-top: 1.64rem;
  }

  .ou {
    text-align: center;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 100%;
    margin-top: 3px;
    margin-bottom: -12px;
  }

  @media screen and (min-width: 50px) and (max-width: 768px) {
    width: 100%;
    .ou {
      margin-top: -17px;
    }
  }
  .tituloForm {
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 17px;
  }
  .form-control,
  .my-1 .mr-sm-2 {
    margin-bottom: -12px !important;
  }
  .form-control::placeholder{
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 14px !important;
    line-height: 16px !important;
    color: #cccccc !important;
  }
  select {
    padding-left: 7px;
    
  }
`;

const Formulario = ({ params, url, concurso, consultor, faculdade, nomeAba, consultorId }) => {
  const [validated, setValidated] = useState(false);
/*   const [unidade, setUnidade] = useState();
  const [curso, setCurso] = useState("");
  const [turno, setTurno] = useState(""); */
  const [dataBD, setDataBD] = useState("");
/*   const [fdi, setFdi] = useState("");
  const [fdiFilterCompleto, setFdiFilterCompleto] = useState("");
  const [idConcurso, setIdConcurso] = useState("");

  const [unidadeSelecionada, setUnidadeSelecionada] = useState();
  const [turnoSelecionado, setTurnoSelecionado] = useState({
    label: "Turno...",
    value: "0",
  });
  const [cursoSelecionado, setCursoSelecionado] = useState({
    label: "Curso...",
    value: "",
  });
  const [fdiSelecionado, setFdiSelecionado] = useState({
    label: "Formas de ingresso...",
    value: "",
  });
  const [disabledTurno, setDisabledTurno] = useState(true);
  const [disabledCurso, setDisabledCurso] = useState(true);
  const [disabledFdi, setDisabledFdi] = useState(true); */

  const [mensagemErroCpf, setMensagemErroCpf] = useState("");
  const [mensagemErroEmail, setMensagemErroEmail] = useState("");
  const [mensagemErroTelefone, setMensagemErroTelefone] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [disabledEnviar, setDisabledEnviar] = useState(true);
  const [utm, setUtm] = useState();
  const [groupCidades, setGroupCidades] = useState();
  const [groupCursos, setGroupCursos] = useState("");
  const [codConcurso, setcodConcurso] = useState(concurso);
 
 /*  const [urlFdi, setUrlFdi] = useState();
  const [tipo, setTipo] = useState(); */
  const [formInscreva, setFormInscreva] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    unidade: "",
    cod_curso:"",
    curso: faculdade === "uniftc-medicina" ? "Medicina": "",
    turno: "",
    fdi: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    cod_consultor: "",
    id_consultor: "",
    formulario_de_inscricao: "vestibular_consultor",
    periodo_letivo: "2021.2",
  });



  const cursos = useSelector((state) => state.curso.todosOsCurso);
  const unidade = useSelector((state) => state.curso.unidade);
  const state = useSelector((state) => state);
  

  useEffect(() => {
    /*  carregarUnidade(); */
    if(mensagemErroTelefone=="" &&  mensagemErroEmail=="" && mensagemErroCpf==""){
      setDisabledEnviar(false)
    }else{
      setDisabledEnviar(true)
    }
  
  }, [mensagemErroTelefone, mensagemErroEmail, mensagemErroCpf ]);
  useEffect(() => {
    setTimeOutLoading();
  });
  useEffect(() => {
     //Direito 5.0
      /*  var data = DATA.cursosunidade;
 
       const arrayUrl = url.split("/");
       setUrlFdi(arrayUrl[1]);
 
       setDataBD(data);
 
       setUnidade(
         data.map((val) => {
           return { label: val.titulo, value: val.titulo };
         })
       ); */
       const nomeCidade = [];
       for (let obj of cursos) {
         if (!nomeCidade.includes(obj.nome_cidade)) {
           if(obj.id_cidade !== 12){
             nomeCidade.push(obj.nome_cidade);
           }
         }
       }
    
      setGroupCursos(cursos);
      /* setGroupCidades(nomeCidade); */
      if (consultorId !== undefined) {
        var consultorAluno = consultorId.includes("aluno")
          ? consultorId.replace("aluno", "")
          : consultorId;
  
        if (consultor) {
          const [arrayConsultor] = Consultor(consultor, consultorAluno);
          
          setFormInscreva({
            ...formInscreva,
            ["cod_consultor"]: arrayConsultor.codigoConsultor,
            ["id_consultor"]: arrayConsultor.idConsultor,
          });
          //console.log(arrayConsultor.codigoConsultor,  arrayConsultor.idConsultor, formInscreva)
        }
      } else {
        //console.log('Consultor não encontrado!')
        setFormInscreva({
          ...formInscreva,
          ["cod_consultor"]: null,
          ["id_consultor"]: null,
        });
      }
  }, [cursos]);

  const pergarUnidadeSelecionada = async (unidadeSelecionada) => {
    setFormInscreva({ ...formInscreva, ["unidade"]: unidadeSelecionada.label });
   /*  setCursoSelecionado(null);
    setCurso(null);
    setDisabledEnviar(true);
    setTurnoSelecionado(null);
    setFdiSelecionado(null);
    setDisabledCurso(false);
    setFdi(null);

    setUnidadeSelecionada(unidadeSelecionada); */
    //filtrar
    let turnoFilter = dataBD.filter((val) => {
      return val.unidade === unidadeSelecionada.label;
    });

    //ordena
    let turnosSort = turnoFilter.sort(function (a, b) {
      return a.turno > b.turno ? 1 : b.turno > a.turno ? -1 : 0;
    });

    //reduce

    let groupTurnos = turnosSort.reduce((init, current) => {
      if (init.length === 0 || init[init.length - 1] !== current.turno) {
        init.push(current.turno);
      }
      return init;
    }, []);

    let pegarunidade = dataBD.filter((x) => {
      return x.titulo == unidadeSelecionada.label;
    });

    let pegarCursos = pegarunidade.map((val) => {
      return val.texto;
    });

    let pegarCursoExato = pegarCursos.map((val) => {
      return val.map((v) => {
        return { label: v.cidade, value: v.cidade };
      });
    });
    console.log(pegarCursoExato);

   /*  setCurso(pegarCursoExato[0]); */
  };



  const submitForm = (e) => {
    e.preventDefault();
    setDisabledEnviar(false);
    pegarUrl();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      setMensagemErroCpf("");
      setMensagemErroEmail("");
      e.stopPropagation();
    } else {
      setLoading(true);
      //handleClose();
      //
    }

    setValidated(true);
  };

  function pegarUrl() {
    //Pegar UTMS

    //Modifica as utms midia e conteudo quando o codigo do consultor for adicionado
    var midia;
    var conteudo;
    if (consultorId !== undefined) {
      midia = "consultor";
      conteudo = consultorId;
    } else {
      midia = "acesso_direto";
      conteudo = "inscricao";
    }
    /* if (consultorId.includes("aluno")) {
      midia = "aluno";
      conteudo = consultorId.replace("aluno", "");
    } */

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
    if (hash.utm_source !== undefined) {
      setFormInscreva({
        ...formInscreva,
        ["utm_source"]: hash.utm_source,
        ["utm_medium"]: hash.utm_medium,
        ["utm_campaign"]: hash.utm_campaign,
        ["utm_content"]: hash.utm_content,
      });
      setUtm(
        "&utm_source=" +
          hash.utm_source +
          "&utm_medium=" +
          hash.utm_medium +
          "&utm_campaign=" +
          hash.utm_campaign +
          "&utm_content=" +
          hash.utm_content
      );
    } else {
      setUtm(
        "&utm_source=lp_ps&utm_medium=" +
          midia +
          "&utm_campaign=vestibular_2021_2&utm_content=" +
          conteudo
      );
      setFormInscreva({
        ...formInscreva,
        ["utm_source"]: "lp_ps",
        ["utm_medium"]: midia,
        ["utm_campaign"]: "vestibular_2021_2",
        ["utm_content"]: conteudo,
      });
    }
  }
  const handleChange = (event) => {
    if (event.target.name === "cpf") {
      event.target.value = cpfMask(event.target.value);
      if (event.target.value.length >= 14) {
        if (!validarCpf(event.target.value)) {
          setMensagemErroCpf("Cpf não é válido!");
        } else {
          setMensagemErroCpf("");
        }
      }
    }
    
    if (event.target.name === "cod_curso") {
      const cod_curso = event.target.value;
      const cidade = groupCursos.filter(x => x.cod_curso ===cod_curso)
      var cod_curso_direito5;
      if(cod_curso === "DIRCIC"){
        if(nomeAba === "Vestibular Online"){
          setcodConcurso(468);
          cod_curso_direito5 = 468;
        } 
        if(nomeAba === "Use sua nota no ENEM"){
          setcodConcurso(470);
          cod_curso_direito5 = 470;
        }
        
        if(nomeAba === "Segunda Graduação"){
          setcodConcurso(469);
          cod_curso_direito5 = 469;
        }
      }else{
        setcodConcurso(concurso)
        cod_curso_direito5 = concurso;
      }
      setFormInscreva({
        ...formInscreva,
        [event.target.name]: event.target.value,
        'unidade': cidade[0].nome_cidade,
        'curso': cidade[0].curso,
        "fdi": cod_curso_direito5 || codConcurso
      });
      return;
    }
   

    if (event.target.name === "telefone") {
      event.target.value = telMask(event.target.value);
      setDisabledEnviar(false);
    }
    setFormInscreva({
      ...formInscreva,
      [event.target.name]: event.target.value,
    });
  };
  const simulateNetworkRequest = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const setTimeOutLoading = () => {
    if (isLoading) {
      simulateNetworkRequest(1000).then(() => {
        gravarBanco();
      });
    }
  };
  const gravarBanco = async () => {
    /*   var config = {
      headers: {
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      datatType: "jsonp",
      withCredentials: true,
    }; */
    const data = await api.post(
      "/vestibular_online",
      { formInscreva } /* {config} */
    );
    var redirecionamento = "https://inscricao.uniftc.edu.br/login/";

   

    if (codConcurso && formInscreva.cpf && utm) {
      var tag = "?cpf=" + formInscreva.cpf + utm;

      redirecionamento = redirecionamento + codConcurso + tag;
    }

    if (data.data) {
      swal("Rede UNIFTC", "Dê continuidade a sua inscrição!", "success");
      simulateNetworkRequest(2500).then(() => {
        setLoading(false);
        window.location.replace(redirecionamento);
      });
    } else {
      /*  swal(
        "Rede UNIFTC",
        "Ocorreu um problema no servidor, tente novamente!",
        "error"
      ); */
      simulateNetworkRequest(2500).then(() => {
        setLoading(false);

        window.location.replace(redirecionamento);
      });
    }
  };

  const validacaoEmail = (e) => {
    const field = e.target.value;
    let usuario = field.substring(0, field.indexOf("@"));
    let dominio = field.substring(field.indexOf("@") + 1, field.length);
    if (
      usuario.length >= 1 &&
      dominio.length >= 3 &&
      usuario.search("@") == -1 &&
      dominio.search("@") == -1 &&
      usuario.search(" ") == -1 &&
      dominio.search(" ") == -1 &&
      dominio.search(".") != -1 &&
      dominio.indexOf(".") >= 1 &&
      dominio.lastIndexOf(".") < dominio.length - 1
    ) {
      setMensagemErroEmail("");
      setDisabledEnviar(false);
      async function validarEmail () {
        const emailvalidacao =  await axios.post("https://www.uniftc.edu.br/slimapi/public/consultarEnemEmail",{
        email: field
      })
        var json = JSON.parse(emailvalidacao.data);
        console.log(json)
        return json;

      }
      validarEmail().then(retorno =>{
        if(retorno){
          setMensagemErroEmail("");
          setDisabledEnviar(false);
        }else{
          //setFormInscreva({ ...formInscreva, ["email"]: " " });
          setMensagemErroEmail("Email inválido");
          setDisabledEnviar(true);
        }
      })
     

    } else {
      setFormInscreva({ ...formInscreva, ["email"]: " " });
      setMensagemErroEmail("Email inválido");
      setDisabledEnviar(true);
    }
  };

  const validacaoTelefone = (e) => {
    const LISTADDVALIDOS = [
      61, 62, 64, 65, 66, 67, 82, 71, 73, 74, 75, 77, 85, 88, 98, 99, 83, 81,
      87, 86, 89, 84, 79, 68, 96, 92, 97, 91, 93, 94, 69, 95, 63, 27, 28, 31,
      32, 33, 34, 35, 37, 38, 21, 22, 24, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      41, 42, 43, 44, 45, 46, 51, 53, 54, 55, 47, 48, 49,
    ];

    var telefone = e.target.value.replace(/[^\d]+/g, "");
    if (LISTADDVALIDOS.indexOf(parseInt(telefone.substr(0, 2))) > -1) {
      if (telefone.substr(2, 1) === "9") {
        if (telefone.substr(3, 1) !== "0") {
          if (telefone.length === 11) {
            /* return (this.optional(element) || true); */
            setMensagemErroTelefone("");
            setDisabledEnviar(false);
          } else {
            /*  setFormInscreva({ ...formInscreva, ["telefone"]: " " }); */
            setMensagemErroTelefone(
              "Por favor informe um número de telefone celular com DDD + 9 dígitos"
            );
            setDisabledEnviar(true);
          }
        } else {
          /*  setFormInscreva({ ...formInscreva, ["telefone"]: " " }); */
          setMensagemErroTelefone(
            "Por favor informe um número de telefone celular com DDD + 9 dígitos"
          );
          setDisabledEnviar(true);
        }
      } else {
        /* setFormInscreva({ ...formInscreva, ["telefone"]: " " }); */
        setMensagemErroTelefone(
          "Por favor informe um número de telefone celular com DDD + 9 dígitos"
        );
        setDisabledEnviar(true);
      }
    } else {
      /* setFormInscreva({ ...formInscreva, ["telefone"]: " " }); */
      setMensagemErroTelefone(
        "Por favor informe um número de telefone celular com DDD + 9 dígitos"
      );
      setDisabledEnviar(true);
    }
  };

  const validacaoCPF = (e) => {
    const cpf = e.target.value;

    if (mensagemErroCpf) {
      setFormInscreva({ ...formInscreva, ["cpf"]: "" });
    }
    if (cpf.length < 14) {
      setFormInscreva({ ...formInscreva, ["cpf"]: "" });
      setMensagemErroCpf("PREENCHA SEU CPF CORRETAMENTE!");
    } else {
      setMensagemErroCpf("");
    }
  };
  return (
    <FormularioConsultor>
      <div className="tituloForm">Inicie a sua inscrição</div>
      <Form noValidate validated={validated} onSubmit={submitForm}>
      {faculdade !== "uniftc-medicina" && (
        <Form.Group as={Col} xs={12} lg={12}>
          <Form.Control
            as="select"
            className="my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            onChange={handleChange}
            name="cod_curso"
            required
            value={formInscreva.cod_curso}
          >
            <option value=''>Selecione o curso</option>
            {unidade && unidade.map((cidade, idx)=>(
              <optgroup key={idx} label={cidade.value}>
              {cursos && cursos.filter(x =>
                x.nome_cidade === cidade.value
              ).map((value, key)=>(<option key={key} value={value.cod_curso}>{value.curso}</option>))}  
             
            </optgroup>
             ))}
          </Form.Control>
        </Form.Group>
      )}
        <Form.Group as={Col} xs={12} lg={12}>
          <Form.Control
            type="text"
            placeholder="Digite seu nome"
            required
            onChange={handleChange}
            name="nome"
            value={formInscreva.nome}
          />

          <Form.Control.Feedback type="invalid">
            Preencha com seu nome!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={12} lg={12}>
          <Form.Control
            type="text"
            placeholder="Digite seu CPF"
            value={formInscreva.cpf}
            onChange={handleChange}
            onBlur={validacaoCPF}
            name="cpf"
          />
          {mensagemErroCpf && (<MensagemErro>{mensagemErroCpf}</MensagemErro>)}
          <Form.Control.Feedback type="invalid">
            Preencha com seu cpf!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={12} lg={12}>
          <Form.Control
            type="email"
            placeholder="Digite seu e-mail"
            onChange={handleChange}
            required
            name="email"
            onBlur={validacaoEmail}
            value={formInscreva.email}
          />
          {mensagemErroEmail && (<MensagemErro>{mensagemErroEmail}</MensagemErro>)}
          <Form.Control.Feedback type="invalid">
            Preencha com seu email!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12} lg={12}>
          <Form.Control
            type="text"
            placeholder="Digite seu WhatsApp com DDD"
            onChange={handleChange}
            value={formInscreva.telefone}
            required
            name="telefone"
            onBlur={validacaoTelefone}
            maxLength="15"
          />
          {mensagemErroTelefone && (<MensagemErro>{mensagemErroTelefone}</MensagemErro>)}
          <Form.Control.Feedback type="invalid">
            Preencha com seu telefone!
          </Form.Control.Feedback>
        </Form.Group>

    

        <Form.Group as={Col} xs={12} lg={12}>
          <Button
            type="submit"
            variant="primary"
            disabled={disabledEnviar}
            className="enviar"
            id="#enviarcadastro"
            cor="#F31970"
            texto={isLoading ? "Aguarde…" : "Continuar inscrição"}
            tamanho={"100%"}
            borderSolid={"2px solid #F31970"}
            colorTexto={"#fff"}
            fonteSize={"18px"}
            padding={"0px 6px 0px 0px"}
            paddingMobile={"6px 22px 27px 20px"}
            height={"40px"}
            marginLeft={"unset"}
            marginTop={"unset"}
            componenteLink={false}
            link={"#"}
            fonteWeight={"500"}
            onClick={() => {}}
            tamanhoMobile={"100%"}
          />
          <div className="ou">ou</div>
        </Form.Group>
      </Form>
      <Col className="ButaoFormWhatsapp" xs={12} lg={12}>
        <Button
          cor="#25D366"
          texto={"Inscreva-se pelo WhatsApp"}
          tamanho={"100%"}
          borderSolid={"2px solid #25D366"}
          colorTexto={"#fff"}
          fonteSize={"14px"}
          padding={"0px 6px 0px 0px"}
          paddingMobile={"6px 18px 20px 20px"}
          height={"30px"}
          heightMobile={"37px"}
          marginLeft={"unset"}
          marginTop={"unset"}
          link={"https://api.whatsapp.com/send?phone=5571988357245#"}
          onClick={() => {}}
          fonteWeight={"500"}
          tamanhoMobile={"100%"}
        />
      </Col>
    </FormularioConsultor>
  );
};

export default Formulario;
