import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImgHorario from "../../public/imagens/contato_horario.svg";
import { Modal, Row, Col, Form } from "react-bootstrap";
import Button from "./ButtonClickLink";
//import { DivBotaoMobile } from "~/admin/src/dashboard/pages/fdi/ButtoesFdi";
import swal from "sweetalert";
import axios from "axios";
import api from "../../src/services/api";
import { telMask } from "./../functions/MaskCelular";

export const MensagemErro = styled.div`
  color: #bd0f0f;
  margin-top: 27px;
  line-height: 17.1px;
`;
export const Formulario = styled.div`
  top: 0;
  right: 0;
  left: 0;
  max-width: 100%;
  width: 100%;
  .invalid-feedback {
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
  .form-control::placeholder {
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

const ModalBody = styled.div`
  .textoEsquerda {
    margin-left: 10px;
    > p:nth-child(1) {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
    }
    > p:nth-child(2) {
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
    }
  }
  .formDireita {
    margin-left: 50px;
    /* pretty radio */

    .form-check {
      padding-left: 0px;
    }

    label {
      font-size: 12px;
      margin-bottom: -10px;
    }

    .radio-item > input[type="radio"] {
      display: none;
      margin-bottom: -10px;
      /* margin-left: 25px; */
    }
    .radio-item > input[type="radio"] + *::before {
      content: "";
      display: inline-block;
      vertical-align: bottom;
      width: 1rem;
      height: 1rem;
      margin-right: 0.3rem;
      border-radius: 50%;
      border-style: solid;
      border-width: 0.1rem;
      border-color: #000;
    }
    .radio-item > input[type="radio"]:checked + * {
      color: #000;
      font-weight: 700;
    }
    .radio-item > input[type="radio"]:checked + *::before {
      background: radial-gradient(
        #f31970 0%,
        #f31970 40%,
        transparent 50%,
        transparent
      );
      border-color: teal;
    }

    .radio-item > input[type="radio"] + * {
      display: inline-block;
      padding: 0.5rem 1rem;
    }
  }
`;

const ModalTitle = styled.div`
  background-color: rgba(0, 147, 255, 0.95);
  border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  .modal-title {
    > div {
      color: #fff;
    }
    > div:nth-child(1) {
      font-weight: 400;
      font-size: 12px;
    }
    > div:nth-child(2) {
      font-weight: 700;
      font-size: 21px;
    }
  }
  .close {
    > span:nth-child(1) {
      padding: 0px 10px 3px 10px;
      border-radius: 50%;
      color: #fff;
      background-color: #1c3661;
      margin-top: 20px;
    }
    > span:nth-child(2) {
    }
  }
`;

export const Texto = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #666666;
`;

export const ContainerGrupTexto = styled.div`
  display: grid;
  grid-template-columns: 151px;
  padding-bottom: 35px;
`;

export const ContainerTexto = styled.div`
  font-size: 12px;
  display: grid;
  grid-template-columns: 17px 115px;
  margin-top: 13px;
`;
export const TextoHorarioGrupo = styled.span`
  margin-left: 11px;
`;
export const TextoDiasSemana = styled.div`
  font-weight: 700;
`;
export const TextoHorarioSemana = styled.div`
  font-weight: 400;
  line-height: 14px;
`;
const ModalLigamosParaVoce = ({ onAbreModal, onFecharModal }) => {
  const [mensagemErroTelefone, setMensagemErroTelefone] = useState("");
  
  const [semana, setSemana] = useState(["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]);

  const [validated, setValidated] = useState(false);
  const [disabledEnviar, setDisabledEnviar] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [comboDia, setComboDia] = useState([]);
  const [comboHora, setComboHora] = useState([]);
  const [formLigaParamim, setFormLigaParamim] = useState({
    nome: "",
    telefone: "",
    ligue_me: "",
    dia: "",
    hora: "",
    hora_inicio:"",
    hora_fim:"",
    faculdade: "uniftc"
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "dia") {
      let dataAtual = new Date();
      let ano = dataAtual.getFullYear();
      let diaSelecionado = value.split("/");
      let newDate = new Date(ano, diaSelecionado[1] - 1, diaSelecionado[0])
      let dia = newDate.getDay()


      let diaSemanaMarcado = semana[dia];

      let segundaASexta =["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00"];
      let sabado =["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00"];
    
      setComboHora(diaSemanaMarcado === "Sábado" ? sabado : segundaASexta )
    }
    
    if(name === "dia"){
      let dataAtual = new Date();
      let ano = dataAtual.getFullYear();
      setFormLigaParamim({
        ...formLigaParamim,
        ["dia"]: value.concat(`/${ano}`),
      });
      return false;
    }
    if(name === "hora"){
      let horaCompleta =  value
      let horaCompletaArray = horaCompleta.split(' - ');
      //console.log(horaCompletaArray[0], horaCompletaArray[1])
      setFormLigaParamim({
        ...formLigaParamim,
        ["hora"]: horaCompleta,
        ["hora_inicio"]: horaCompletaArray[0],
        ["hora_fim"]: horaCompletaArray[1],
      });
      return false;
    }

    if (name === "telefone") {
      event.target.value = telMask(value);
    }
    
    setFormLigaParamim({
      ...formLigaParamim,
      [name]: event.target.value,
    });
  };

  const messages = (tipo, telefone) =>{
    let msg;
    switch (tipo) {
      case "MeligueAgoraForaDoHorario":
        msg = "A sua solicitação foi recebida e será processada assim que a Central de Atendimento retomar o seu funcionamento. Obrigado."
        break;
      case "MeligueAgoraDentroDoHorario":
        msg = `A sua solicitação foi recebida e em breve você será contactado(a) através do número ${telefone}. Obrigado.`
        break;
      case "MeligueDepois" :
        msg = `A sua solicitação foi recebida e você será contactado(a) no momento escolhido através do número ${telefone}. Obrigado.`
        break; 
      default:
        break;
    }
    return msg
  }

  useEffect(() => {
    //console.log(formLigaParamim);
    // eslint-disable-next-line no-unused-expressions
    formLigaParamim.ligue_me === "agora" ? setComboHora([]): ""
  }, [formLigaParamim]);

  useEffect(() => {
    setTimeOutLoading();
  });
  useEffect(() => {
    function getWeekDaysInMonth(month, year, dia) {
      //console.log("Weekdays for", new Date(year, month, 1).toString());
      return new Array(new Date(year, month + 1, 0).getDate())
        .fill()
        .map((n, i) => {
          const weekDay = new Date(year, month, ++i).getDay();
          return weekDay > 0 && weekDay < 7 && i;
        })
        .filter((val) => !!val)
        .filter((val) => val >= dia)
        .map((val) => {
          let zeroMonth = "";
          let zeroDay = "";
          zeroMonth = month >= 10 ? " " : "0";
          zeroDay = val >= 10 ? " " : "0";

          return zeroDay + val + "/" + zeroMonth  + (month + 1);
        });
    }

    var dataAtual = new Date();
    var mes = dataAtual.getMonth();
    var ano = dataAtual.getFullYear();
    var dia = dataAtual.getDate();

    const diaMesFiltrado = getWeekDaysInMonth(mes, ano, dia);
    setComboDia(diaMesFiltrado);
    setComboHora([]);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisabledEnviar(false);
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setLoading(true);
      //handleClose();
      //
    }

    setValidated(true);
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

    var dataAtual = new Date();
    // eslint-disable-next-line no-unused-expressions
    var diaSemanaMarcado = semana[dataAtual.getDay()]
    const horasSegundaASexta = dataAtual.getHours() > 8 && dataAtual.getHours() < 22 ? true : false ;
    const horasSabado= dataAtual.getHours() > 8 && dataAtual.getHours() < 14 ? true : false;
  
    var dataDiaHora = diaSemanaMarcado === "Sábado" ? horasSabado : horasSegundaASexta;
    
    let tipoMensagem;
    let textoDaMensagem;
   
    if(formLigaParamim.ligue_me === "agora"){
      // eslint-disable-next-line no-unused-expressions
      tipoMensagem = dataDiaHora ? "MeligueAgoraDentroDoHorario" : "MeligueAgoraForaDoHorario"
      textoDaMensagem = messages(tipoMensagem, formLigaParamim.telefone)
    }else{
      textoDaMensagem = messages("MeligueDepois", formLigaParamim.telefone)
    }
    const data = await api.post(
      "/vestibular_ligamos_pra_vc",
      { formLigaParamim } /* {config} */
    ); 

    swal("Rede UNIFTC",textoDaMensagem, "success");
    simulateNetworkRequest(2500).then(() => {
      setLoading(false);
      //window.location.replace(redirecionamento);
    });

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

  return (
    <>
    <Modal size="lg" show={onAbreModal} onHide={onFecharModal}>
      <ModalTitle>
        <Modal.Header closeButton>
          <Modal.Title>
            <div>ATENDIMENTO</div>
            <div>Ligamos para você que quer ingressar na Rede UNIFTC</div>
          </Modal.Title>
        </Modal.Header>
      </ModalTitle>
      <Modal.Body>
        <ModalBody>
          <Row>
            <Col md={{ span: 5 }} className="textoEsquerda">
              <p>Deixe o seu contato e ligaremos para você.</p>
              <p>
                Canal exclusivo para candidatos que desejam ingressar na Rede
                UNIFTC.
              </p>
              <Texto>
                Horário de funcionamento da Central de Relacionamento com o
                Candidato:
              </Texto>
              <ContainerGrupTexto>
                <ContainerTexto>
                  <img src={ImgHorario} />
                  <TextoHorarioGrupo>
                    <TextoDiasSemana>Segunda a Sexta</TextoDiasSemana>
                    <TextoHorarioSemana>8h às 20h</TextoHorarioSemana>
                  </TextoHorarioGrupo>
                </ContainerTexto>
                <ContainerTexto>
                  <img src={ImgHorario} />
                  <TextoHorarioGrupo>
                    <TextoDiasSemana>Sábado</TextoDiasSemana>
                    <TextoHorarioSemana>8h às 14h</TextoHorarioSemana>
                  </TextoHorarioGrupo>
                </ContainerTexto>
              </ContainerGrupTexto>
            </Col>
            <Col md={{ span: 6 }} className="formDireita">
              <Formulario>
                <Form noValidate validated={validated} onSubmit={submitForm}>
                  <Form.Group>
                    <Form.Check
                      type="radio"
                      label="Ligue-me o quanto antes"
                      name="ligue_me"
                      id="formHorizontalRadios1"
                      className="radio-item"
                      onChange={handleChange}
                      value="agora"
                    />
                    <Form.Check
                      type="radio"
                      label="Escolher um dia e horário para receber a ligação"
                      name="ligue_me"
                      id="formHorizontalRadios2"
                      className="radio-item"
                      onChange={handleChange}
                      value="depois"
                    />
                  </Form.Group>
                  {formLigaParamim.ligue_me === "depois" && (
                    <>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={12}
                        controlId="formGridState"
                      >
                        <Form.Control
                          as="select"
                          defaultValue="Selecione o dia..."
                          className="my-1 mr-sm-2"
                          name="dia"
                          onChange={handleChange}
                          required
                        >
                          <option>Selecione o dia...</option>
                          {comboDia.map((val, idx) => {
                            if(idx < 2){
                              return <option key={idx} value={val}>
                                {val}
                              </option>
                            }
                          })}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={12}
                        controlId="formGridState"
                      >
                        <Form.Control
                          as="select"
                          defaultValue="Selecione o horário..."
                          className="my-1 mr-sm-2"
                          name="hora"
                          required
                          onChange={handleChange}
                        >
                          <option>Selecione o horário...</option>
                        {comboHora && comboHora.map((val, idx) =>(
                            <option key={idx} value={val}>
                            {val}
                          </option>
                        ))}
                        </Form.Control>
                      </Form.Group>
                    </>
                  )}
                  <Form.Group as={Col} xs={12} lg={12}>
                    <Form.Control
                      type="text"
                      placeholder="Digite o seu nome"
                      required
                      name="nome"
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Preencha com seu nome!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} lg={12}>
                    <Form.Control
                      type="text"
                      placeholder="Digite o seu telefone celular com DDD"
                      required
                      onChange={handleChange}
                      name="telefone"
                      onBlur={validacaoTelefone}
                      maxLength="15"
                    />
                    {mensagemErroTelefone && (
                      <MensagemErro>{mensagemErroTelefone}</MensagemErro>
                    )}
                    <Form.Control.Feedback type="invalid">
                      Preencha com seu telefone!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} lg={12}>
                    <Button
                      type="button"
                      variant="primary"
                      className="enviar"
                      disabled={disabledEnviar}
                      texto={isLoading ? "Aguarde…" : "Enviar"}
                      id="#enviarcadastro"
                      cor="#F31970"
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
                      fonteWeight={"500"}
                      onClick={() => {}}
                      tamanhoMobile={"100%"}
                    />
                  </Form.Group>
                </Form>
              </Formulario>
            </Col>
          </Row>
        </ModalBody>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default ModalLigamosParaVoce;
