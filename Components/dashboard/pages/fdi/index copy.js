import React, { useState, useEffect, useCallback } from "react";

import RLDD from "react-list-drag-and-drop/lib/RLDD";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InputColor from "react-input-color";
import {
  AddFdi,
  removeFdi,
  getFdi,
  updateFdi,
} from "../../../../../store/modules/fdi/actions";
import ButtoesFdi from "../fdi/ButtoesFdi";

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
export const TituloFdi = styled.p`
  font-size: 18px !important;
  margin-left: 20px;
  font-weight: 400;
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
  margin-top: 15px;
`;

const initialState = {
  id: 0,
  forma_de_ingresso: "",
  nome_da_aba: "",
  nome_no_acompanhamento: "",
  titulo: "",
  subtitulo: "",
  texto_legal: "",
  concurso: "",
  posicao: "",
  idinscricao: "",
  botaoConjuto: {
    primeiro: {
      texto_botao: "",
      cor_texto: "",
      cor_botao: "",
      show: false,
    },
    segundo: {
      texto_botao: "",
      cor_texto: "",
      cor_botao: "",
      show: false,
    },
    terceiro: {
      texto_botao: "",
      cor_texto: "",
      cor_botao: "",
      show: false,
    },
  },
  textoConjuto: {
    texto1: "",
    texto2: "",
    texto3: "",
  },
  componente: {
    componente_primeiro: "",
    componente_segundo: "",
    componente_terceiro: "",
  },
};

function Fdi({ useSaga }) {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [tipoModal, setTipoModal] = useState(false);
  const [formFdi, setFormFdi] = useState(initialState);

  const dispatch = useDispatch();

  const fdi = useSelector((state) => state.fdi.fdi);

  const callFdi = useCallback(() => dispatch(getFdi()), [dispatch, useSaga]);

  useEffect(() => {
    /* setItems(fdi) */
    callFdi();
    setFormFdi({ ...formFdi, ["id"]: fdi.length + 1 });
    console.log(fdi);
    setItems(fdi);
  }, [callFdi]);

  const clearState = () => {
    setFormFdi({ ...initialState });
  };

  const handleClose = () => setShow(false);

  const handleNovoAbaFdi = () => {
    setTipoModal("NOVO");
    clearState();
    setShow(true);
  };

  const handleUpdateAbaFdi = (id) => {
    const fdiFilter = items.filter((elem) => elem.id === id);
    setFormFdi({
      ...formFdi,
      ["id"]: fdiFilter[0].id,
      ["forma_de_ingresso"]: fdiFilter[0].forma_de_ingresso,
      ["nome_da_aba"]: fdiFilter[0].nome_da_aba,
      ["titulo"]: fdiFilter[0].titulo,
      ["subtitulo"]: fdiFilter[0].subtitulo,
      ["texto_legal"]: fdiFilter[0].texto_legal,
      ["idinscricao"]: fdiFilter[0].idinscricao,
      ["concurso"]: fdiFilter[0].concurso,
    });
    setTipoModal("EDITAR");
    setShow(true);
  };

  const handleRemoveAbaFdi = (id) => {
    dispatch(removeFdi(id));
  };

  const showComponent = (id, campo) => {
    if (id === "texto" && campo === "primeiro")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          primeiro: {
            ...formFdi.botaoConjuto.primeiro,
            show: false,
            texto_botao: "",
            cor_botao: "",
            cor_texto: "",
          },
        },
        componente: { ...formFdi.componente, componente_primeiro: id },
      });
    if (id === "botao" && campo === "primeiro")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          primeiro: { ...formFdi.botaoConjuto.primeiro, show: true },
        },
        componente: { ...formFdi.componente, componente_primeiro: id },
      });

    if (id === "texto" && campo === "segundo")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          segundo: {
            ...formFdi.botaoConjuto.segundo,
            show: false,
            texto_botao: "",
            cor_botao: "",
            cor_texto: "",
          },
        },
        componente: { ...formFdi.componente, componente_segundo: id },
      });
    if (id === "botao" && campo === "segundo")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          segundo: { ...formFdi.botaoConjuto.segundo, show: true },
        },
        componente: { ...formFdi.componente, componente_segundo: id },
      });

    if (id === "texto" && campo === "terceiro")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          terceiro: {
            ...formFdi.botaoConjuto.terceiro,
            show: false,
            texto_botao: "",
            cor_botao: "",
            cor_texto: "",
          },
        },
        componente: { ...formFdi.componente, componente_terceiro: id },
      });
    if (id === "botao" && campo === "terceiro")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          terceiro: { ...formFdi.botaoConjuto.terceiro, show: true },
        },
        componente: { ...formFdi.componente, componente_terceiro: id },
      });
  };

  const handleChange = (event) => {
    setFormFdi({
      ...formFdi,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "texto1")
      setFormFdi({
        ...formFdi,
        textoConjuto: { ...formFdi.textoConjuto, texto1: event.target.value },
      });
    if (event.target.name === "texto2")
      setFormFdi({
        ...formFdi,
        textoConjuto: { ...formFdi.textoConjuto, texto2: event.target.value },
      });
    if (event.target.name === "texto3")
      setFormFdi({
        ...formFdi,
        textoConjuto: { ...formFdi.textoConjuto, texto3: event.target.value },
      });

    if (event.target.name === "textoButon1")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          primeiro: {
            ...formFdi.botaoConjuto.primeiro,
            texto_botao: event.target.value,
          },
        },
      });
    if (event.target.name === "textoButon2")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          segundo: {
            ...formFdi.botaoConjuto.segundo,
            texto_botao: event.target.value,
          },
        },
      });
    if (event.target.name === "textoButon3")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          terceiro: {
            ...formFdi.botaoConjuto.terceiro,
            texto_botao: event.target.value,
          },
        },
      });
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log(formFdi, fdi.length);
    if (tipoModal === "NOVO") {
      dispatch(AddFdi(formFdi));
    } else {
      dispatch(updateFdi(formFdi));
    }
    setShow(false);
  };

  const drawTexto = (label) => {
    var value = "";
    if (label === "texto1") value = formFdi.textoConjuto.texto1;
    if (label === "texto2") value = formFdi.textoConjuto.texto2;
    if (label === "texto3") value = formFdi.textoConjuto.texto3;

    return (
      <div>
        <label>Campo de Texto</label>
        <input
          type="text"
          className="form-control"
          name={label}
          onChange={handleChange}
          value={value}
        />
      </div>
    );
  };

  const setButtonComponent = (label, hex, butao) => {
    if (label === 1 && butao === "butao1")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          primeiro: { ...formFdi.botaoConjuto.primeiro, cor_texto: hex },
        },
      });
    if (label === 2 && butao === "butao1")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          segundo: { ...formFdi.botaoConjuto.segundo, cor_texto: hex },
        },
      });
    if (label === 3 && butao === "butao1")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          terceiro: { ...formFdi.botaoConjuto.terceiro, cor_texto: hex },
        },
      });

    if (label === 1 && butao === "butao2")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          primeiro: { ...formFdi.botaoConjuto.primeiro, cor_botao: hex },
        },
      });
    if (label === 2 && butao === "butao2")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          segundo: { ...formFdi.botaoConjuto.segundo, cor_botao: hex },
        },
      });
    if (label === 3 && butao === "butao2")
      setFormFdi({
        ...formFdi,
        botaoConjuto: {
          ...formFdi.botaoConjuto,
          terceiro: { ...formFdi.botaoConjuto.terceiro, cor_botao: hex },
        },
      });
  };

  const drawBotao1 = (botao, label) => {
    var value = "";
    if (label === "textoButon1")
      value = formFdi.botaoConjuto.primeiro.texto_botao;
    if (label === "textoButon2")
      value = formFdi.botaoConjuto.segundo.texto_botao;
    if (label === "textoButon3")
      value = formFdi.botaoConjuto.terceiro.texto_botao;

    return (
      <div>
        <label>Campo de Botão</label>
        <input
          type="text"
          className="form-control"
          placeholder="Texto interno"
          name={label}
          onChange={handleChange}
          value={value}
        />
        {/*   <input type="text" className="form-control" id="myId" placeholder="Color do texto" />
      <input type="text" className="form-control" id="myId" placeholder="Color do botão" /> */}
        <div>
          <label>Color do texto</label>
          <InputColor
            initialValue="#5e72e4"
            /*  onChange={(e) => setFormFdi({...formFdi, botaoConjuto1.cor_texto: e.hex})}  */
            onChange={(e) => setButtonComponent(botao, e.hex, "butao1")}
            placement="right"
          />
        </div>

        <div>
          <label>Color do botão</label>
          <InputColor
            initialValue="#5e72e4"
            onChange={(e) => setButtonComponent(botao, e.hex, "butao2")}
            placement="right"
          />
        </div>
      </div>
    );
  };

  function changeHandler(colors) {
    console.log(colors);
  }
  const itemRenderer = (item, index) => {
    return (
      <ContainerItemFdi className="item">
        <ConteudoFdi>
          <div>
            <TituloFdi>{item.forma_de_ingresso}</TituloFdi>
          </div>

          {/* <p className="body">{item.titulo}</p> */}
          <ConjuntoBotaoFdi>
            {/* item.id: {item.id} - index: {index} */}
            <button
              variant="primary"
              onClick={() => handleUpdateAbaFdi(item.id)}
            >
              Editar
            </button>
            <button
              variant="primary"
              onClick={() => handleRemoveAbaFdi(item.id)}
            >
              Excluir
            </button>
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
    setItems(reorderedItems);
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
            {tipoModal} ABA FDI{" "}
            {formFdi && <span>->({formFdi.forma_de_ingresso})</span>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate /* validated={validated}  */ onSubmit={submitForm}>
            <Row>
              <Col>
               {/*  <Form.Label>Lado Esquerdo</Form.Label> */}

                <Form.Group as={Col} xs={12} lg={12}>
                  <TextoLegalFdiLabel>Nome que será exibido na aba (máximo de 40 caracteres)</TextoLegalFdiLabel>
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
                  <TextoLegalFdiLabel style={{fontSize: 12}}>Nome que será exibido no menu de acompanhamento (máximo de 12 caracteres)</TextoLegalFdiLabel>
                  <Form.Control
                    as="text"
                    placeholder="texto_legal"
                    value={formFdi.texto_legal}
                    onChange={handleChange}
                    required
                    /* onBlur={validacaoCPF} */
                    name="texto_legal"
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
                <Button
                  type="submit"
                  variant="primary"
                  /*  disabled={disabledEnviar} */
                  className="enviar"
                  id="#enviarcadastro"
                >
                  SALVAR{/*  {isLoading ? "Aguarde…" : "ENVIAR"} */}
                </Button>
              </Col>

              <Col>
                <Form.Label>Lado Direito</Form.Label>
                <Form.Group as={Col} xs={12} lg={12}>
                  <Form.Label>concurso</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="concurso"
                    required
                    onChange={handleChange}
                    name="concurso"
                    value={formFdi.concurso}
                  />

                  <Form.Control.Feedback type="invalid">
                    Preencha com seu nome!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} xs={12} lg={12}>
                  <Form.Label>idinscricao</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="idinscricao"
                    value={formFdi.idinscricao}
                    onChange={handleChange}
                    required
                    /* onBlur={validacaoCPF} */
                    name="idinscricao"
                  />
                  {/* <MensagemErro>{mensagemErroCpf}</MensagemErro> */}
                  <Form.Control.Feedback type="invalid">
                    Preencha com seu cpf!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} lg={12}>
                  <fieldset className="border p-2">
                    <legend className="w-auto text-left">
                      Adicionar Campos
                    </legend>
                    <Row>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="Texto1"
                          name="campos1"
                          id="texto1"
                          checked={
                            formFdi.componente.componente_primeiro === "texto"
                          }
                          onClick={(e) => showComponent("texto", "primeiro")}
                          /*  onClick={(e) => setFormFdi(old => ({ ...old, componente:{...old.componente, primeiro: 1}}))} */
                          onChange={(e) => {}}
                        />
                        <Form.Check
                          type="radio"
                          label="Botão1"
                          name="campos1"
                          id="butao1"
                          checked={
                            formFdi.componente.componente_primeiro === "botao"
                          }
                          onClick={(e) => showComponent("botao", "primeiro")}
                          /*                           onClick={(e) => setFormFdi(old => ({ ...old, componente:{...old.componente, primeiro: 2}}))}
                           */ onChange={(e) => {}}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="Texto2"
                          name="campos2"
                          id="texto2"
                          checked={
                            formFdi.componente.componente_segundo === "texto"
                          }
                          onClick={(e) => showComponent("texto", "segundo")}
                          /*  onClick={(e) => setFormFdi(old => ({ ...old, componente:{...old.componente, segundo: 1}}))} */
                          onChange={(e) => {}}
                        />
                        <Form.Check
                          type="radio"
                          label="Botão2"
                          name="campos2"
                          id="butao2"
                          checked={
                            formFdi.componente.componente_segundo === "botao"
                          }
                          onClick={(e) => showComponent("botao", "segundo")}
                          /* onClick={(e) => setFormFdi(old => ({ ...old, componente:{...old.componente, segundo: 2}}))} */
                          onChange={(e) => {}}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="Texto3"
                          name="campos3"
                          id="texto3"
                          checked={
                            formFdi.componente.componente_terceiro === "texto"
                          }
                          onClick={(e) => showComponent("texto", "terceiro")}
                          /* onClick={(e) => setFormFdi(old => ({ ...old, componente:{...old.componente, terceiro: 1}}))} */
                          onChange={(e) => {}}
                        />
                        <Form.Check
                          type="radio"
                          label="Botão3"
                          name="campos3"
                          id="butao3"
                          checked={
                            formFdi.componente.componente_terceiro === "botao"
                          }
                          onClick={(e) => showComponent("botao", "terceiro")}
                          /* onClick={(e) => setFormFdi(old => ({ ...old, componente:{...old.componente, terceiro: 2}}))} */
                          onChange={(e) => {}}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        {formFdi.componente.componente_primeiro === "texto" &&
                          drawTexto("texto1")}
                        {formFdi.componente.componente_primeiro === "botao" &&
                          drawBotao1(1, "textoButon1")}
                      </Col>
                      <Col>
                        {formFdi.componente.componente_segundo === "texto" &&
                          drawTexto("texto2")}
                        {formFdi.componente.componente_segundo === "botao" &&
                          drawBotao1(2, "textoButon2")}
                      </Col>
                      <Col>
                        {formFdi.componente.componente_terceiro === "texto" &&
                          drawTexto("texto3")}
                        {formFdi.componente.componente_terceiro === "botao" &&
                          drawBotao1(3, "textoButon3")}
                      </Col>
                    </Row>
                  </fieldset>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            FECHAR
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
        </Modal.Footer>
      </Modal>
      <div>
        <RLDD
          /* cssClasses="example" */
          items={items}
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
            name="link"
            aria-describedby="basic-addon3"
            placeholder="Condições válidas até 15/03"
            onChange={(e) => handleChange(e)}
          />
          <ButtonFdi>
            <button /* onClick={() => salvarBanner()} */>Confirmar</button>
          </ButtonFdi>
        </div>
      </TextoLegalFdiInput>
      {/* </div> */}
      <div className="flex horizontal">
        <div className=" flex-1 flex vertical">
          <ButtoesFdi FDI={items} />
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
