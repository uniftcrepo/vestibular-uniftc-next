import React, { useState, useEffect } from "react";

import RLDD from "react-list-drag-and-drop/lib/RLDD";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
/* import InputColor from "react-input-color"; */
import {
  AddFdi,
  removeFdi,
  getFdi,
  updateFdi,
  salvarFdi,
  getFdiTextoLegal,
} from "../../../../../store/modules/fdi/actions";
import ButtoesFdi from "../fdi/ButtoesFdi";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./react-confirm-alert-local.css";
import BlockImg from "../../img/block.svg";
/* 
import { connect } from 'react-redux';
import * as actions from '../../actions/pedidos'; */
import styled from "styled-components";

export const Legend = styled.div`
  margin: 20px;
  width: 155px;
`;
export const Fieldset = styled.div`
  border: 3px solid;
`;
export const ContainerItemFdi = styled.div`
  border: 1px solid #cccccc;
  margin-bottom: 20px;
  background: #f7f7f7;
`;
export const ConteudoFdi = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;
export const ConjuntoBotaoFdi = styled.div`
  margin-right: 12px;
  margin-bottom: 10px;
  > button {
    background: #ff1970;
    padding: 6px 20px;
    border: 1px solid #ff1970;
    cursor: pointer;
    border-radius: 4px;
    color: var(--cor-branca);
    margin-left: 20px;
  }
`;

export const ConjuntoBotaoFdiModal = styled.div`
  margin-right: 12px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
  > div > button {
    background: #ff1970;
    padding: 6px 20px;
    border: 1px solid #ff1970;
    cursor: pointer;
    border-radius: 4px;
    color: var(--cor-branca);
    margin-left: 20px;
  }

  .excluir {
    background: #cccccc;
    border: 1px solid #cccccc;
    color: var(--cor-preta);
  }
`;

export const TituloFdi = styled.p`
  font-size: 18px !important;
  margin-left: 20px;
  font-weight: 400;
`;
export const Pdfview = styled.div`
  margin-top: 38px;
  > a {
    color: #ff1970;
  }
`;

export const TopConteudoFdi = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const TopTituloFdi = styled.div`
  font-size: 21px;
  font-weight: 700;
  margin-bottom: 10px;
`;
export const ButtonFdi = styled.div`
  > button {
    background: #ff1970;
    padding: 6px 20px;
    border: 1px solid #ff1970;
    cursor: pointer;
    border-radius: 4px;
    color: var(--cor-branca);
    margin-left: 20px;
  }
`;
export const TextoLegalFdiInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 560px;
  margin-bottom: 20px;
  div > input {
    background: #f7f7f7;
  }
`;
export const TextoLegalFdiLabel = styled.label`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0em;
  text-align: left;
  /* margin-top: 15px; */
`;
export const ButtonSimNao = styled.div`
  background-color: white;
  height: 35px;
  width: 185px;
  position: absolute;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 2px 2px 8px -2px #444444;
  /* margin-top: 20px; */
  margin-left: 15px;

  input[type="radio"] {
    display: none;
  }
  .label1 {
    display: block;
    height: 180px;
    width: 130px;
    background: linear-gradient(
      to bottom,
      white 0,
      white 90px,
      #ff1970 90px,
      #ff1970 180px
    );
    position: absolute;
    top: 0;
    color: #2c2c2c;
    transition: 0.5s;
  }
  .label2 {
    display: block;
    height: 180px;
    width: 95px;
    background: linear-gradient(
      to bottom,
      white 0,
      white 90px,
      #000000 90px,
      #000000 180px
    );
    position: absolute;
    top: 0;
    color: #2c2c2c;
    transition: 0.5s;
  }
  .label2 {
    right: 0;
  }
  span {
    cursor: pointer;
    display: flex;
    height: 42px;
    width: 88px;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 18px;
  }
  input:checked + label {
    background-position: 0 -90px;
    color: white;
    transition: 0.7s;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  /*  padding: 0 0 0 20px;
  margin: 0 20px;
  background: #ddd;
  direction: rtl; */
  width: 694px;
  > input {
    /* height: 20px; */
    margin: 0;
    padding-right: 30px;
    width: 100%;
  }
  > img {
    position: absolute;
    bottom: 7px;
    right: 5px;
    width: 24px;
    height: 24px;
  }
`;

const initialState = {
  /* id: 0, */
  faculdade: "uniftc-medicina",
  forma_de_ingresso: "",
  nome_da_aba: "",
  nome_no_acompanhamento: "",
  titulo: "",
  subtitulo: "",
  texto_legal: "",
  posicao: "",
  ordem: "",
  idinscricao: "",

  inscricoes_abertas_sim_nao: "NAO",
  concurso: "",

  pre_prova_sim_nao: "NAO",
  texto_pre_prova: "",

  gabarito_sim_nao: "NAO",
  url_gabarito: "Upload do arquivo do gabarito",
  link_gabarito: "",

  recurso_sim_nao: "NAO",
  texto_recurso: "",

  prova_sim_nao: "NAO",
  texto_prova: "",

  matricula_sim_nao: "NAO",
  texto_matricula: "",
};

function Fdi({ useSaga }) {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [tipoModal, setTipoModal] = useState(false);
  const [formFdi, setFormFdi] = useState(initialState);
  /*   const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); */
  const [textoLegal, setTextoLegal] = useState("");

  /*  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  } */
  const dispatch = useDispatch();

  const fdi = useSelector((state) => state.fdi.fdi);
  const textoLegalSaga = useSelector((state) => state.fdi.textoLegal);

  useEffect(() => {
    /* setItems(fdi) */
    dispatch(getFdi(initialState));
    dispatch(getFdiTextoLegal(initialState));
    if (fdi) {
      setFormFdi({ ...formFdi, ["id"]: fdi.length + 1 });
      setItems(fdi);
    }
    /*  if(textoLegalSaga){
      console.log(textoLegalSaga[0].texto_legal)
      setTextoLegal(textoLegalSaga[0].texto_legal);
    } */
    if (textoLegalSaga.length > 0) {
      setTextoLegal(textoLegalSaga[0].texto_legal);
    }
  }, []);

  useEffect(() => {
    if (fdi) {
      setItems(fdi);
      if (textoLegalSaga.length > 0) {
        setTextoLegal(textoLegalSaga[0].texto_legal);
        //console.log(textoLegalSaga);
      }
      
    }
  }, [fdi, textoLegalSaga]);

  const clearState = () => {
    setFormFdi({ ...initialState });
  };

  const handleClose = () => setShow(false);

  const handleNovoAbaFdi = () => {
    setTipoModal("NOVO");
    clearState();
    setShow(true);
  };

  const handleUpdateAbaFdi = (id, posicao) => {
    const fdiFilter = items.filter((elem) => elem.id === id);

    setFormFdi({
      ...formFdi,
      ["id"]: fdiFilter[0].id,
      ["forma_de_ingresso"]: fdiFilter[0].forma_de_ingresso,
      ["nome_da_aba"]: fdiFilter[0].nome_da_aba,
      ["nome_no_acompanhamento"]: fdiFilter[0].nome_no_acompanhamento,
      ["titulo"]: fdiFilter[0].titulo,
      ["subtitulo"]: fdiFilter[0].subtitulo,
      ["texto_legal"]: fdiFilter[0].texto_legal,
      ["idinscricao"]: fdiFilter[0].idinscricao,
      ["concurso"]: fdiFilter[0].concurso,
      ["posicao"]: fdiFilter[0].posicao,
      ["ordem"]: posicao + 1,
      ["inscricoes_abertas_sim_nao"]: fdiFilter[0].inscricoes_abertas_sim_nao,
      ["pre_prova_sim_nao"]: fdiFilter[0].pre_prova_sim_nao,
      ["texto_pre_prova"]: fdiFilter[0].texto_pre_prova,
      ["gabarito_sim_nao"]: fdiFilter[0].gabarito_sim_nao,
      ["url_gabarito"]: fdiFilter[0].url_gabarito,
      ["link_gabarito"]: fdiFilter[0].link_gabarito,
      ["recurso_sim_nao"]: fdiFilter[0].recurso_sim_nao,
      ["texto_recurso"]: fdiFilter[0].texto_recurso,
      ["prova_sim_nao"]: fdiFilter[0].prova_sim_nao,
      ["texto_prova"]: fdiFilter[0].texto_prova,
      ["matricula_sim_nao"]: fdiFilter[0].matricula_sim_nao,
      ["texto_matricula"]: fdiFilter[0].texto_matricula,
    });
    setTipoModal("EDITAR");
    setShow(true);
  };

  const handleSalvarUpdateFdi = () => {
    if (tipoModal === "NOVO") {
      dispatch(AddFdi(formFdi));
      setShow(false);
    } else {
      const updateItem = [...items];

      updateItem[formFdi.ordem - 1] = formFdi;
      dispatch(updateFdi(formFdi));
      /*  setItems(updateItem); */
      setShow(false);
    }
  };

  const handleRemoveAbaFdi = (id) => {
    const fdiFilter = items.filter((elem) => elem.id === id);

    confirmAlert({
      title: "Apagar FDI?",
      message: `Você quer realmente para essa FDI: ${fdiFilter[0].nome_da_aba}?`,
      buttons: [
        {
          label: "SIM",
          onClick: () => {
            dispatch(removeFdi(id));
            setShow(false);
          },
        },
        {
          label: "NAO",
          /* onClick: () => alert('Click No') */
        },
      ],
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    /*   
    const form = [...formFdi];
    const formData = new FormData();
    console.log(form)
    form.forEach((index, array) => {
      console.log(index, array)
    })
    if (tipoModal === "NOVO") {
      dispatch(AddFdi(formFdi));
    } else {
      dispatch(updateFdi(formFdi));
    }
    setShow(false); */
  };

  const salvarAlteracaoFdi = () => {
    dispatch(salvarFdi(items, textoLegal));
  };

  function changeHandler(colors) {
    console.log(colors);
  }
  const itemRenderer = (item, index) => {
    return (
      <ContainerItemFdi className="item">
        <ConteudoFdi>
          <div>
            <TituloFdi>{item.nome_da_aba}</TituloFdi>
          </div>

          {/* <p className="body">{item.titulo}</p> */}
          <ConjuntoBotaoFdi>
            {/* item.id: {item.id} - index: {index} */}
            <button
              variant="primary"
              onClick={() => handleUpdateAbaFdi(item.id, index)}
            >
              Editar
            </button>
            {/*  <button
              variant="primary"
              onClick={() => handleRemoveAbaFdi(item.id, index)}
            >
              Excluir
            </button> */}
          </ConjuntoBotaoFdi>
        </ConteudoFdi>
      </ContainerItemFdi>
    );
  };

  const handleRLDDChange = (reorderedItems) => {
    /* const retorno = reorderedItems.map((item, index) =>{
        item.id = index;
        
    }) */
    /*  for (var i=0; i<reorderedItems.length; i++) {
       
        reorderedItems[i].id = i;   
    }
    console.log(reorderedItems); */
    console.log(reorderedItems);
    dispatch(salvarFdi(reorderedItems, textoLegal));
    setItems(reorderedItems);
  };

  const ButaoSimOuNao = ({ label, nome, checkedSim, checkedNao }) => {
    return (
      <>
        <TextoLegalFdiLabel style={{ marginLeft: 15 }}>
          {label}
        </TextoLegalFdiLabel>
        <ButtonSimNao>
          <input
            type="radio"
            name={nome}
            id={`${nome}1`}
            checked={checkedSim}
            onChange={handleChange}
            value="SIM"
          />
          <label htmlFor={`${nome}1`} className="label1">
            <span>SIM</span>
          </label>
          <input
            type="radio"
            name={nome}
            id={`${nome}2`}
            checked={checkedNao}
            onChange={handleChange}
            value="NAO"
          />
          <label htmlFor={`${nome}2`} className="label2">
            <span>NÃO</span>
          </label>
        </ButtonSimNao>
      </>
    );
  };
  const handleChange = (event) => {
    const { name, value, files, currentTarget } = event.target;

    if (name === "concurso") {
      setFormFdi({
        ...formFdi,
        [name]: value.replace(/[^\d\s-/]/g, ""),
      });
    } else {
      setFormFdi({
        ...formFdi,
        [name]: value,
      });
    }

    if (name === "gabarito") {
      setFormFdi({
        ...formFdi,
        ["url_gabarito"]: files[0].name,
        ["link_gabarito"]: files[0],
      });
    }
  };
  const Upload = ({ SubtituloUpload, tipo, disabled }) => {
    return (
      <>
        <TextoLegalFdiLabel>{SubtituloUpload} </TextoLegalFdiLabel>
        <div className="BlocoUpload">
          <div className="input-group mb-3">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id={tipo}
                name={tipo}
                onChange={(e) => handleChange(e)}
                disabled={disabled}
              />
              <label className="custom-file-label" htmlFor={tipo}>
                {formFdi.url_gabarito}
              </label>
            </div>
          </div>
          {/* 
          <div className="BotaoUpload">
            <button onClick={() => salvarBanner()}>Upload</button>
          </div> */}
        </div>
      </>
    );
  };

  return (
    <div className="Pedidos full-width flex vertical">
      {/* <div className="Card"> */}
      {/* <DetalhesDoPedido /> */}
      <TopConteudoFdi>
        <TopTituloFdi>Editando informações de formas de ingresso</TopTituloFdi>
        <ButtonFdi>
          <button onClick={handleNovoAbaFdi}>Nova aba</button>
        </ButtonFdi>
      </TopConteudoFdi>
      <TopTituloFdi>Abas de formas de ingresso</TopTituloFdi>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>
            <TextoLegalFdiLabel>{tipoModal} ABA FDI </TextoLegalFdiLabel>
            <TextoLegalFdiLabel>
              {tipoModal != "NOVO" && <span>({formFdi.nome_da_aba})</span>}
            </TextoLegalFdiLabel>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate /* validated={validated}  */ /* onSubmit={submitForm} */
          >
            <Row>
              <Col>
                {/*  <Form.Label>Lado Esquerdo</Form.Label> */}

                <Form.Group as={Col} xs={12} lg={12}>
                  <TextoLegalFdiLabel>
                    Nome que será exibido na aba (máximo de 40 caracteres)
                  </TextoLegalFdiLabel>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome que aparecerá na aba"
                    required
                    onChange={handleChange}
                    name="nome_da_aba"
                    value={formFdi.nome_da_aba}
                  />

                  <Form.Control.Feedback type="invalid">
                    Preencha com seu nome!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} lg={12}>
                  <TextoLegalFdiLabel>Título</TextoLegalFdiLabel>
                  <Form.Control
                    type="text"
                    placeholder="Digite o título"
                    required
                    onChange={handleChange}
                    name="titulo"
                    value={formFdi.titulo}
                  />

                  <Form.Control.Feedback type="invalid">
                    Preencha com seu nome!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} xs={12} lg={12}>
                  <TextoLegalFdiLabel style={{ fontSize: 12 }}>
                    Nome que será exibido no menu de acompanhamento (máximo de
                    12 caracteres)
                  </TextoLegalFdiLabel>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome que aparecerá no menu de acompanham"
                    value={formFdi.nome_no_acompanhamento}
                    onChange={handleChange}
                    required
                    /* onBlur={validacaoCPF} */
                    name="nome_no_acompanhamento"
                    rows={4}
                  />
                  {/* <MensagemErro>{mensagemErroCpf}</MensagemErro> */}
                  <Form.Control.Feedback type="invalid">
                    Preencha com seu cpf!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} lg={12}>
                  <TextoLegalFdiLabel>Subtitulo</TextoLegalFdiLabel>
                  <Form.Control
                    type="text"
                    placeholder="Digite o subtítulo"
                    value={formFdi.subtitulo}
                    onChange={handleChange}
                    required
                    /* onBlur={validacaoCPF} */
                    name="subtitulo"
                  />
                  {/* <MensagemErro>{mensagemErroCpf}</MensagemErro> */}
                  <Form.Control.Feedback type="invalid">
                    Preencha com seu cpf!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col xl="3" lg="3">
                    <ButaoSimOuNao
                      label={"As inscrições estão abertas?"}
                      nome={"inscricoes_abertas_sim_nao"}
                      checkedSim={
                        formFdi.inscricoes_abertas_sim_nao === "SIM"
                          ? true
                          : false
                      }
                      checkedNao={
                        formFdi.inscricoes_abertas_sim_nao === "NAO"
                          ? true
                          : false
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Group as={Col} xs={12} xl={6} lg={7}>
                      <TextoLegalFdiLabel>
                        Número do concurso no CRM (geralmente 3 dígitos)
                      </TextoLegalFdiLabel>
                      <InputContainer>
                        {formFdi.inscricoes_abertas_sim_nao === "NAO" ? (
                          <img src={BlockImg} />
                        ) : (
                          ""
                        )}
                        <Form.Control
                          type="text"
                          placeholder={
                            formFdi.inscricoes_abertas_sim_nao === "NAO"
                              ? "Número está desabilitado"
                              : "Número"
                          }
                          required
                          onChange={handleChange}
                          name="concurso"
                          value={formFdi.concurso}
                          maxLength={3}
                          disabled={
                            formFdi.inscricoes_abertas_sim_nao === "NAO"
                              ? "disabled"
                              : ""
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha com seu nome!
                        </Form.Control.Feedback>
                      </InputContainer>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col xl="3" lg="3">
                    <ButaoSimOuNao
                      label={"Está em momento pré-prova?"}
                      nome={"pre_prova_sim_nao"}
                      checkedSim={
                        formFdi.pre_prova_sim_nao === "SIM" ? true : false
                      }
                      checkedNao={
                        formFdi.pre_prova_sim_nao === "NAO" ? true : false
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Group as={Col} xs={12} xl={7} lg={7}>
                      <TextoLegalFdiLabel>
                        Texto para alertar o candidato sobre quando ocorrerá a
                        prova
                      </TextoLegalFdiLabel>
                      <InputContainer>
                        {formFdi.pre_prova_sim_nao === "NAO" ? (
                          <img src={BlockImg} />
                        ) : (
                          ""
                        )}
                        <Form.Control
                          type="text"
                          placeholder="O link da prova estará disponível a partir das 12:30 do d"
                          required
                          onChange={handleChange}
                          name="texto_pre_prova"
                          value={formFdi.texto_pre_prova}
                          disabled={
                            formFdi.pre_prova_sim_nao === "NAO"
                              ? "disabled"
                              : ""
                          }
                        />

                        <Form.Control.Feedback type="invalid">
                          Preencha com seu nome!
                        </Form.Control.Feedback>
                      </InputContainer>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col xl="3" lg="3">
                    <ButaoSimOuNao
                      label={"Exibir botão de gabarito?"}
                      nome={"gabarito_sim_nao"}
                      checkedSim={
                        formFdi.gabarito_sim_nao === "SIM" ? true : false
                      }
                      checkedNao={
                        formFdi.gabarito_sim_nao === "NAO" ? true : false
                      }
                    />
                  </Col>
                  <Col>
                    <InputContainer>
                      {formFdi.gabarito_sim_nao === "NAO" ? (
                        <img src={BlockImg} />
                      ) : (
                        ""
                      )}
                      <div className="form-group col-xl-11 col-lg-7">
                        <Upload
                          SubtituloUpload={"Upload do arquivo do gabarito"}
                          tipo={"gabarito"}
                          disabled={
                            formFdi.gabarito_sim_nao === "NAO" ? "disabled" : ""
                          }
                          style={{ width: 694 }}
                        />
                      </div>
                    </InputContainer>
                  </Col>
                  {formFdi.url_gabarito !== "Upload do arquivo do gabarito" && (
                    <Col>
                      <Pdfview>
                        <a
                          href={`https://www.uniftc.edu.br/slimapi/public/gabarito/${formFdi.url_gabarito}`}
                          target="_blank"
                        >
                          (Visualize seu gabarito!)
                        </a>
                      </Pdfview>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col xl="3" lg="3">
                    <ButaoSimOuNao
                      label={"Exibir botão de recurso?"}
                      nome={"recurso_sim_nao"}
                      checkedSim={
                        formFdi.recurso_sim_nao === "SIM" ? true : false
                      }
                      checkedNao={
                        formFdi.recurso_sim_nao === "NAO" ? true : false
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Group as={Col} xl={7} lg={7}>
                      <TextoLegalFdiLabel>URL do formulário</TextoLegalFdiLabel>
                      <InputContainer>
                        {formFdi.recurso_sim_nao === "NAO" ? (
                          <img src={BlockImg} />
                        ) : (
                          ""
                        )}
                        <Form.Control
                          type="text"
                          placeholder="Digite a URL do formulário de recurso"
                          required
                          onChange={handleChange}
                          name="texto_recurso"
                          value={formFdi.texto_recurso}
                          disabled={
                            formFdi.recurso_sim_nao === "NAO" ? "disabled" : ""
                          }
                        />

                        <Form.Control.Feedback type="invalid">
                          Preencha com seu nome!
                        </Form.Control.Feedback>
                      </InputContainer>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col xl="3" lg="3">
                    <ButaoSimOuNao
                      label={"Exibir botão de fazer prova?"}
                      nome={"prova_sim_nao"}
                      checkedSim={
                        formFdi.prova_sim_nao === "SIM" ? true : false
                      }
                      checkedNao={
                        formFdi.prova_sim_nao === "NAO" ? true : false
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Group as={Col} xl={7} lg={7}>
                      <TextoLegalFdiLabel>
                        URL do ambiente da prova
                      </TextoLegalFdiLabel>
                      <InputContainer>
                        {formFdi.prova_sim_nao === "NAO" ? (
                          <img src={BlockImg} />
                        ) : (
                          ""
                        )}
                        <Form.Control
                          type="text"
                          placeholder="Digite a URL do ambiente da prova"
                          required
                          onChange={handleChange}
                          name="texto_prova"
                          value={formFdi.texto_prova}
                          disabled={
                            formFdi.prova_sim_nao === "NAO" ? "disabled" : ""
                          }
                        />

                        <Form.Control.Feedback type="invalid">
                          Preencha com seu nome!
                        </Form.Control.Feedback>
                      </InputContainer>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xl="3" lg="3">
                <ButaoSimOuNao
                  label={"Exibir botão de fazer matrícula?"}
                  nome={"matricula_sim_nao"}
                  checkedSim={
                    formFdi.matricula_sim_nao === "SIM" ? true : false
                  }
                  checkedNao={
                    formFdi.matricula_sim_nao === "NAO" ? true : false
                  }
                />
              </Col>
            </Row>

            <Row style={{marginTop: "45px"}}>
              <Col>
                <Form.Group as={Col} xl={2} lg={3}>
                  <TextoLegalFdiLabel>Id - Inscrição</TextoLegalFdiLabel>
                  <Form.Control
                    type="text"
                    placeholder="Id - Inscrição"
                    required
                    onChange={handleChange}
                    name="idinscricao"
                    value={formFdi.idinscricao}
                  />

                  <Form.Control.Feedback type="invalid">
                    Preencha com id para botão!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* </Row> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ConjuntoBotaoFdiModal>
            <div>
              <Button variant="primary" onClick={handleSalvarUpdateFdi}>
                SALVAR
              </Button>
            </div>
            <div>
              <Button
                className="excluir"
                onClick={() => handleRemoveAbaFdi(formFdi.id)}
              >
                EXCLUIR
              </Button>
            </div>
          </ConjuntoBotaoFdiModal>
        </Modal.Footer>
      </Modal>

      <div>
        <RLDD
          /* cssClasses="example" */
          items={items && items}
          itemRenderer={itemRenderer}
          onChange={handleRLDDChange}
        />
      </div>
      <TopTituloFdi>Texto legal (aplicável a todas as FDI's)</TopTituloFdi>
      <TextoLegalFdiLabel>Texto legal</TextoLegalFdiLabel>
      <TextoLegalFdiInput>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="basic-url"
            name="texto_legal"
            placeholder="Condições válidas até 15/03"
            value={textoLegal}
            onChange={(e) => {
              setTextoLegal(e.target.value);
            }}
          />
          <ButtonFdi>
            <button onClick={() => salvarAlteracaoFdi()}>Confirmar</button>
          </ButtonFdi>
        </div>
      </TextoLegalFdiInput>
      {/* </div> */}
      <div className="flex horizontal">
        <div className=" flex-1 flex vertical">
          {items && <ButtoesFdi FDI={items} textoLegal={textoLegal} />}
        </div>
      </div>
    </div>
  );
}

/* const mapStateToProps = state => ({
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Pedido); */
export default Fdi;
