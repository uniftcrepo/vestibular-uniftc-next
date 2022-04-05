import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { cpfMask } from "./../functions/MaskCpf";
import validarCpf from "validar-cpf";
import { telMask } from "./../functions/MaskCelular";
import swal from "sweetalert";
import backImage, {
  carregarUnidade,
  carregarUnidadeSemTratamento,
} from "../../utils/dataFdi";
import consultor from "../../utils/consultor";
import { DATA } from "../../utils/data";

export const MensagemErro = styled.div`
  color: #bd0f0f;
`;

export const FormularioConsultor = styled.div`
  top: 0;
  right: 0;
  left: 0;
  max-width: 100%;
  width:85%;
  @media screen and (min-width: 50px) and (max-width: 768px) {
    width:100%;
  }
`;

const Formulario = ({ params, url, concurso } ) => {
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
    formulario_de_inscricao: "vestibular_consultor",
    periodo_letivo: "2020.2",
  });
  
  useEffect(() => {
    
    /*  carregarUnidade(); */
    async function chamadaFetchCidade() {
      var data = DATA.cursosunidade;

      const arrayUrl = url.split("/");
      setUrlFdi(arrayUrl[1]);

      setDataBD(data);

      setUnidade(
        data.map((val) => {
          return { label: val.titulo, value: val.titulo };
        })
      );
    }
    chamadaFetchCidade();
    if (params.consultor !== undefined) {

      var consultorAluno = params.consultor.includes("aluno") ? params.consultor.replace("aluno", "") : params.consultor
     
      const [arrayConsultor] = consultor(consultorAluno);

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
    }
  }, [params]);

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
    setDisabledEnviar(false);
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
    if (params.consultor !== undefined) {
      midia = "consultor";
      conteudo = params.consultor;
    } else {
      midia = "acesso_direto";
      conteudo = "inscricao";
    }
    if(params.consultor.includes("aluno")){
      midia = "aluno";
      conteudo = params.consultor.replace("aluno", "");
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
          "&utm_campaign=vestibular_2020_2&utm_content=" +
          conteudo
      );
      setFormInscreva({
        ...formInscreva,
        ["utm_source"]: "lp_ps",
        ["utm_medium"]: midia,
        ["utm_campaign"]: "vestibular_2020_2",
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
    const data = await axios.post(
      "https://www.uniftc.edu.br/slimapi/public/vestibular_online",
      { formInscreva }
    );
    var redirecionamento =
    "https://inscricaoftcimes.crmeducacional.com/login/";
    if (concurso && formInscreva.cpf && utm) {
      var tag =
        "?cpf=" +
        formInscreva.cpf + utm;

      redirecionamento = redirecionamento + concurso + tag;
      
    }

    if (data.data) {
      swal(
        "Rede UNIFTC",
        "Dê continuidade a sua inscrição!",
        "success"
      );
      simulateNetworkRequest(2500).then(() => {
        setLoading(false);
        window.location.replace(redirecionamento);
      })
    } else {
     /*  swal(
        "Rede UNIFTC",
        "Ocorreu um problema no servidor, tente novamente!",
        "error"
      ); */
      simulateNetworkRequest(2500).then(() => {
        setLoading(false);
        
        window.location.replace(redirecionamento);
      })
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
    } else {
      setFormInscreva({ ...formInscreva, ["email"]: " " });
      setMensagemErroEmail("Email inválido");
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
      <Form noValidate validated={validated} onSubmit={submitForm}>
        <Form.Group as={Col} xs={12} lg={12}>
          <Form.Control
            type="text"
            placeholder="Nome"
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
            placeholder="CPF"
            value={formInscreva.cpf}
            onChange={handleChange}
            required
            onBlur={validacaoCPF}
            name="cpf"
          />
          <MensagemErro>{mensagemErroCpf}</MensagemErro>
          <Form.Control.Feedback type="invalid">
            Preencha com seu cpf!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={12} lg={12}>
          <Form.Control
            type="email"
            placeholder="E-mail"
            onChange={handleChange}
            required
            name="email"
            onBlur={validacaoEmail}
            value={formInscreva.email}
          />
          <MensagemErro>{mensagemErroEmail}</MensagemErro>
          <Form.Control.Feedback type="invalid">
            Preencha com seu email!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12} lg={12}>
          <Form.Control
            type="text"
            placeholder="Telefone"
            onChange={handleChange}
            value={formInscreva.telefone}
            required
            maxlength="15" 
            name="telefone"
          />
          <Form.Control.Feedback type="invalid">
            Preencha com seu telefone!
          </Form.Control.Feedback>
        </Form.Group>

       {/*  <Form.Group as={Col} xs={12} lg={12}>
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
        <Form.Group as={Col} xs={12} lg={12}>
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
        </Form.Group> */}

        <Form.Group as={Col} xs={12} lg={12}>
          <Button
            type="submit"
            variant="primary"
            disabled={disabledEnviar}
            className="enviar"
            id="#enviarcadastro"
          >
            {isLoading ? "Aguarde…" : "ENVIAR"}
          </Button>
        </Form.Group>
      </Form>
    </FormularioConsultor>
    
  );
};

export default Formulario;
