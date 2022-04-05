import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Accordion,
  Card,
  Image,
} from "react-bootstrap";
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { cpfMask } from "./functions/MaskCpf";
import validarCpf from "validar-cpf";
import { telMask } from "./functions/MaskCelular";
import swal from "sweetalert";
/* import backImage, {
  carregarUnidade,
  carregarUnidadeSemTratamento,
} from "../utils/dataFdi";
import consultor from "../utils/consultor"; */
import "../styled/styles_novo.scss";
import { DATA } from "../utils/data";
import movimenteSeuFuturo from "../imagens/movimente_seufuturo.png";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #0093ff;
  width: 1400px;
  margin: 40px auto;
  @media (max-width: 768px) {
    padding-top: 10px;
    width: 100%;
    margin: 0;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;
export const Textos = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 249px;
    height: 49px;
  }
  margin: 30px 134px 107px 90px;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

export const Titulo = styled.div`
  font-size: 24px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  color: #fff;
  width: 240px;
  height: 146px;
  margin-bottom: 42px;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

export const FormInformacoes = styled.div`
  /*  width:100%; */
  /*   margin-top: 30px; */
  margin-bottom: 30px;
  width: 1200px;
  margin-right: 90px;
  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
  
    button{
      width: 330px !important;
      margin-top: 10px !important;
    }
    cursor: pointer;
  }
  /* @media (max-width: 1264px) {
    width: 900px;
  } */
  button {
    width: 273px;
    color: #fff;
    font-weight: 100;
    font-size: 12px;
    font-weight: bold;
    border-radius: 5px;
    border: 2px;
    background-color: #da1f7d !important;
    padding: 10px 20px 10px 20px;
    cursor: pointer;
    margin-top: 31px;
  }
  label {
    color: #fff;
    font-size: 14px;
  }
  .form-group {
    margin-bottom: 0px;
    padding-top: 33px;
  }
`;

export const Termos = styled.div`
  font-size: 10px;
  color: #fff;
  text-align: center;
  margin-top: 10px;
  @media (max-width: 768px) {
    padding-bottom: 20px;
  }
`;

export const FormMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-items: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    .btn-link {
      color: #fff;
      font-size: 22px;
    }

    .card-header {
      background-color: #6dafe6;
    }
  }
  /* .card {
    width: min-content;
  } */
`;

export const MensagemErro = styled.div`
  color: #bd0f0f;
`;

const Informacoes = ({ match, location }) => {
  const [validated, setValidated] = useState(false);

  const [unidade, setUnidade] = useState();
  const [curso, setCurso] = useState("");
  const [turno, setTurno] = useState("");
  const [dataBD, setDataBD] = useState("");
  const [fdi, setFdi] = useState("");
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
  const [disabledFdi, setDisabledFdi] = useState(true);

  const [mensagemErroCpf, setMensagemErroCpf] = useState("");
  const [mensagemErroEmail, setMensagemErroEmail] = useState("");
  const [mensagemErroTelefone, setMensagemErroTelefone] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [disabledEnviar, setDisabledEnviar] = useState(true);
  const [utm, setUtm] = useState();
  const [groupCidades, setGroupCidades] = useState();
  const [urlFdi, setUrlFdi] = useState();
  const [tipo, setTipo] = useState();
  const [formInscreva, setFormInscreva] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    unidade: "",
    curso: "",
    turno: "",
    fdi: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    cod_consultor: "",
    id_consultor: "",
    formulario_de_inscricao: "vestibular_informacoes",
    periodo_letivo: "2020.2",
    valid_email: 0
  });

  useEffect(() => {
    /*  carregarUnidade(); */
    async function chamadaFetchCidade() {
      var data = DATA.cursosunidade;

      const arrayUrl = match.url.split("/");
      setUrlFdi(arrayUrl[1]);

      setDataBD(data);

      setUnidade(
        data.map((val) => {
          return { label: val.titulo, value: val.titulo };
        })
      );
    }
    chamadaFetchCidade();
   /*  if (match.params.consultor !== undefined) {
      const [arrayConsultor] = Consultor(match.params.consultor);

      setFormInscreva({
        ...formInscreva,
        ["cod_consultor"]: arrayConsultor.codigoConsultor,
        ["id_consultor"]: arrayConsultor.idConsultor,
      });
    } else {
      setFormInscreva({
        ...formInscreva,
        ["cod_consultor"]: null,
        ["id_consultor"]: null,
      });
    } */
  }, [match]);

  useEffect(() => {
    setTimeOutLoading();
  });

  const pergarUnidadeSelecionada = async (unidadeSelecionada) => {
    setFormInscreva({ ...formInscreva, ["unidade"]: unidadeSelecionada.label });
    setCursoSelecionado(null);
    setCurso(null);
    setDisabledEnviar(true);
    setTurnoSelecionado(null);
    setFdiSelecionado(null);
    setDisabledCurso(false);
    setFdi(null);

    setUnidadeSelecionada(unidadeSelecionada);
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

    setCurso(pegarCursoExato[0]);
  };

  const pergarCursoSelecionada = (cursoSelecionados) => {
    setFormInscreva({ ...formInscreva, ["curso"]: cursoSelecionados.label });
    setCursoSelecionado(cursoSelecionados);
  /*   setDisabledEnviar(false); */
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
    if (match.params.consultor !== undefined) {
      midia = "consultor";
      conteudo = match.params.consultor;
    } else {
      midia = "acesso_direto";
      conteudo = "inscricao";
    }

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
          "&utm_campaign=vestibular_2022_2&utm_content=" +
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

    if (event.target.name === "telefone") {
      event.target.value = telMask(event.target.value);
    }
    setFormInscreva({
      ...formInscreva,
      [event.target.name]: event.target.value,
    });

  };


  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };
  const setTimeOutLoading = () => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        gravarBanco();
      });
    }
  };
  const gravarBanco = async () => {
    const data = await axios.post(
      "https://www.uniftc.edu.br/slimapi/public/vestibular_online",
      { formInscreva }
    );

    if (data.data) {
      swal(
        "Rede UNIFTC",
        "Obrigado por se cadastrar. Você receberá um email com mais informações sobre a Uniftc.",
        "success"
      );
      /*   if (fdiFilterCompleto && idConcurso && formInscreva.cpf && utm) {
        const oferta = fdiFilterCompleto.filter((val) => {
          return val.id_concurso === idConcurso;
        });

        var tag =
          "?cpf=" +
          formInscreva.cpf +
          "&o=" +
          oferta[0].identificador_do_curso +
          utm;

        var redirecionamento =
          "https://inscricao.uniftc.edu.br/login/";
        redirecionamento = redirecionamento + idConcurso + tag;
        //console.log(redirecionamento);
        window.location.replace(redirecionamento);
      } */
    } else {
      /* swal(
        "Rede UNIFTC",
        "Ocorreu um problema no servidor, tente novamente!",
        "error"
      ); */
    }
  };

  const validacaoEmail = async (e) => {
    const email =  {
       email : e.target.value 
    }
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
      const data = await axios.post(
        "https://www.uniftc.edu.br/slimapi/public/consultarVestibularEmail",
        email 
      );
      if (data.data) {
        setFormInscreva({ ...formInscreva, ["valid_email"]: 1 });
        setDisabledEnviar(false);
      }else{
        setFormInscreva({ ...formInscreva, ["valid_email"]: 0 });
        setFormInscreva({ ...formInscreva, ["email"]: " " });
        setMensagemErroEmail("Email inválido");
        setDisabledEnviar(true);
      }
  
    } else {
      setFormInscreva({ ...formInscreva, ["email"]: " " });
      setMensagemErroEmail("Email inválido");
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

  const validacaoTelefone = (e) => {

    const LISTADDVALIDOS = [
       61, 62, 64, 65, 66, 67, 82, 71, 73, 74, 75, 77, 85, 88, 98, 99, 83, 81, 87,
       86, 89, 84, 79, 68, 96, 92, 97, 91, 93, 94, 69, 95, 63, 27, 28, 31, 32, 33,
       34, 35, 37, 38, 21, 22, 24, 11, 12, 13, 14, 15, 16, 17, 18, 19, 41, 42, 43,
       44, 45, 46, 51, 53, 54, 55, 47, 48, 49,
     ];
 
     var telefone = e.target.value
     .replace(/[^\d]+/g, ""); 
   if (LISTADDVALIDOS.indexOf(parseInt(telefone.substr(0, 2))) > -1) {
     if (telefone.substr(2, 1) === "9") {
       if (telefone.substr(3, 1) !== "0") {
         if (telefone.length === 11) {
           /* return (this.optional(element) || true); */
           setMensagemErroTelefone("");
           setDisabledEnviar(false);
         } else {
          /*  setFormInscreva({ ...formInscreva, ["telefone"]: " " }); */
           setMensagemErroTelefone("Por favor informe um número de telefone celular com DDD + 9 dígitos");
           setDisabledEnviar(true);
         }
       } else {
         /* setFormInscreva({ ...formInscreva, ["telefone"]: " " }); */
         setMensagemErroTelefone("Por favor informe um número de telefone celular com DDD + 9 dígitos");
         setDisabledEnviar(true);
       }
     } else {
       /* setFormInscreva({ ...formInscreva, ["telefone"]: " " }); */
       setMensagemErroTelefone("Por favor informe um número de telefone celular com DDD + 9 dígitos");
       setDisabledEnviar(true);
     }
   } else {
     /* setFormInscreva({ ...formInscreva, ["telefone"]: " " }); */
     setMensagemErroTelefone("Por favor informe um número de telefone celular com DDD + 9 dígitos");
     setDisabledEnviar(true);
    
   }
 
   };
 


  return (
    <Container className="container">
      <Textos>
        <Titulo>Quero me cadastrar para receber Informações da UniFTC</Titulo>
        {/*   <Image src={movimenteSeuFuturo} fluid/> */}
      </Textos>

      <FormInformacoes>
        <Form noValidate validated={validated} onSubmit={submitForm}>
          <Form.Row>
            <Form.Group as={Col} xs={12} lg={6}>
              <Form.Label>Onde você deseja estudar?</Form.Label>
              <Select
                id="cidades_form"
                allowCreate={true}
                backspaceRemoves={true}
                onChange={pergarUnidadeSelecionada}
                options={unidade}
                value={unidadeSelecionada}
                clearable={false}
                placeholder="Unidade..."
                className="cursos-por-unidade"
              />
              <Form.Control.Feedback type="invalid">
                Preencha com seu nome!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12} lg={6}>
              <Form.Label>Qual o seu curso de interesse?</Form.Label>
              <Select
                id="curso_form"
                allowCreate={true}
                backspaceRemoves={true}
                onChange={pergarCursoSelecionada}
                options={curso}
                value={cursoSelecionado}
                clearable={false}
                isDisabled={disabledCurso}
                placeholder="Curso..."
              />
              <Form.Control.Feedback type="invalid">
                Preencha com seu nome!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12} lg={6}>
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                placeholder="NOME"
                value={formInscreva.nome}
                onChange={handleChange}
                required
                onBlur={validacaoCPF}
                name="nome"
              />
              {/* <MensagemErro>{mensagemErroCpf}</MensagemErro> */}
              <Form.Control.Feedback type="invalid">
                Preencha com seu nome!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12} lg={6}>
              <Form.Label>WhatsApp:</Form.Label>
              <Form.Control
                type="text"
                placeholder="TELEFONE"
                value={formInscreva.telefone}
                onChange={handleChange}
                required
                name="telefone"
               /*  maxlength="15" 
                minlength="15" */
                onBlur={validacaoTelefone}
              />
             <MensagemErro>{mensagemErroTelefone}</MensagemErro>
              <Form.Control.Feedback type="invalid">
                Preencha com seu telefone!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12} lg={6}>
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                type="text"
                placeholder="EMAIL"
                value={formInscreva.email}
                onChange={handleChange}
                required
                onBlur={validacaoEmail}
                name="email"
              />
              <MensagemErro>{mensagemErroEmail}</MensagemErro>
              <Form.Control.Feedback type="invalid">
                Preencha com seu Email!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} xs={12} lg={6}>
              <Button
                type="submit"
                disabled={disabledEnviar}
                className="enviar"
              >
                {isLoading ? "Aguarde…" : "ENVIAR"}
              </Button>
              <Termos>
                Ao enviar o formulário você concorda com os Termos.
              </Termos>
            </Form.Group>
          </Form.Row>
        </Form>
      </FormInformacoes>
      {/* <FormMobile> 
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Quero me cadastrar para receber informações da UniFTC
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={submitForm}>
                  <Form.Row>
                    <Form.Group as={Col} xs={12} lg={2}>
                      <Form.Control
                        type="text"
                        placeholder="NOME"
                        value={formInscreva.nome}
                        onChange={handleChange}
                        required
                        onBlur={validacaoCPF}
                        name="nome"
                      />
                     
                      <Form.Control.Feedback type="invalid">
                        Preencha com seu nome!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} lg={2}>
                      <Form.Control
                        type="text"
                        placeholder="EMAIL"
                        value={formInscreva.email}
                        onChange={handleChange}
                        required
                        onBlur={validacaoEmail}
                        name="email"
                      />
                      <MensagemErro>{mensagemErroEmail}</MensagemErro>
                      <Form.Control.Feedback type="invalid">
                        Preencha com seu E-mail!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} lg={2}>
                      <Form.Control
                        type="text"
                        placeholder="TELEFONE"
                        value={formInscreva.telefone}
                        onChange={handleChange}
                        required
                        name="telefone"
                      />
                     
                      <Form.Control.Feedback type="invalid">
                        Preencha com seu telefone!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} lg={2}>
                      <Select
                        id="cidades_form"
                        allowCreate={true}
                        backspaceRemoves={true}
                        onChange={pergarUnidadeSelecionada}
                        options={unidade}
                        value={unidadeSelecionada}
                        clearable={false}
                        placeholder="Unidade..."
                      />
                      <Form.Control.Feedback type="invalid">
                        Preencha com seu nome!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} lg={2}>
                      <Select
                        id="curso_form"
                        allowCreate={true}
                        backspaceRemoves={true}
                        onChange={pergarCursoSelecionada}
                        options={curso}
                        value={cursoSelecionado}
                        clearable={false}
                        isDisabled={disabledCurso}
                        placeholder="Curso..."
                      />
                      <Form.Control.Feedback type="invalid">
                        Preencha com seu nome!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} lg={2}>
                      <Button
                        type="submit"
                        disabled={disabledEnviar}
                        className="enviar"
                        id="#enviarcadastroinformacoes"
                      >
                        {isLoading ? "Aguarde…" : "ENVIAR"}
                      </Button>
                      <Termos>Ao enviar o formulário você concorda com os Termos.</Termos>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </FormMobile>  */}
    </Container>
  );
};

export default Informacoes;
