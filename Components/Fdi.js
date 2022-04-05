import React, { useState, useEffect } from "react";
import { Row, Col, Tab, Nav, Accordion, Card } from "react-bootstrap";
import "../styled/styles_novo.scss";
import styled from "styled-components";
import Button from "./elementos/ButtonClickLink";
import { DATA } from "../utils/data";
import Select from "react-select";
import axios from "axios";
import { cpfMask } from "./functions/MaskCpf";
import validarCpf from "validar-cpf";
import { telMask } from "./functions/MaskCelular";
import swal from "sweetalert";
import Consultor from "../utils/consultor";
import Formulario from "./elementos/form";
/* import botao_de_inscricao_ate from "./../utils/dataFdi" */

import parse from "html-react-parser"
export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 768px) {
    /* width: 90vh; */
    margin: 0 10px;
  }
`;

export const FormInformacoes = styled.div`
  /*  width:100%; */
  margin-top: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;
export const MensagemErro = styled.div`
  color: #bd0f0f;
`;

export const Titulo = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  > p + p {
    color: #ccc;
    line-height: 15px;
  }

  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
    justify-content: center;

    > p + p {
      color: #ccc;
      line-height: 15px;
      font-size: 20px;
    }
  }
`;

export const ConteudoFdi = styled.div`
  width: 1400px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    width: 100vh;
    display: none;
  }
  
  @media (max-width: 987px) {
    display: none;
  }
  @media (max-width: 1430px) {
    width: 1000px;
  }

  /*   .nav-pills, .nav-pills .show>.nav-link{
      font-size:12px;
  } */
  .nav-pills .nav-link {
    color: #646465;
  }

  .nav-pills .nav-link.active {
    color: #646465;
    background-color: #eef0f1;
  }

  .tab-content {
    background-color: #eef0f1;

    .tab-pane p {
    }
  }

  .nav-link {
    color: #000;
    font-weight: bold;
  }

  .textoContainer {
    background-color: #eef0f1;
  }

  .Menu {
    margin-left: 15px;
    margin-bottom: 15px;
    font-weight: bold;
  }
`;

export const ConteudoFdiMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-items: center;
    align-items: center;
    /*  .btn-link {
      color: #fff;
    }

    .card-header {
      background-color: #6dafe6;
    } */
    margin-bottom: 40px;
  }

  @media (max-width: 1036px) {
    display: flex;
    margin-bottom: 30px;
  }
`;

export const TituloConteudo = styled.p`
  text-align: center;
  margin-top: 5px;
  font-weight: bold;
  color: #646465;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const ConteutoCursos = styled.div`
  /*  margin-top:20px;
  margin-bottom:20px; */
`;

export const ContainerCursosSeparacao = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  > div {
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  > div:first-child p {
    line-height: 20px;
    font-weight: bold;
    color: #646465;
    margin-top: revert;
  }
  > div:first-child p span {
    font-size: 18px;
  }
  > div:first-child p:first-child {
    color: #195c90;
    font-weight: bold;
    font-size: 20px;
  }
  > div:first-child p:nth-child(2) {
    font-weight: bold;
    font-size: 20px;
  }
  > div:first-child p:last-child {
    font-weight: bold;
    font-size: 12px;
  }
  .buttoesInscrevase {
    p {
      color: #12105d;
      font-weight: bold;
      margin-bottom: unset;
    }
  }

  > div span {
    font-size: 14px;
    font-weight: bold;
    line-height: 27px;
  }
  
  @media screen and (min-width: 768px) and (max-width: 1430px) {
    > div:first-child p {
      font-size: 14px;
      line-height: 15px;
    }

    > div:first-child p:last-child {
      font-size: 10px;
    }
    > div span {
      font-size: 12px;
    }
    > div:first-child p:nth-child(2) {
      font-weight: bold;
      font-size: 18px;
    }
  }
  @media screen and (min-width: 50px) and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div:first-child p {
      font-size: 20px;
      line-height: 32px;
    }

    > div:first-child p:last-child {
      font-size: 14px;
    }
    > div span {
      font-size: 12px;
    }
  }
`;

const Fdi = ({ match }) => {
  const [concurso, setConcurso] = useState("299");
  const [habilitarzap, setHabilitarzap] = useState();
  const [habilitarform, setHabilitarform] = useState();
  const [habilitarbutaoinscricao, setHabilitarbutaoinscricao] = useState(true);
  const [validated, setValidated] = useState(false);
  const [atualizacaoFdi, setAtualizacaoFdi] = useState(DATA.fdiatualizacao);

  useEffect(() => {
    if (match.params.consultor !== undefined) {
      setHabilitarform(true);
    } else {
      setHabilitarform(false);
    }
    /* time(); */
  }, []);

  useEffect(() => {
    setHabilitarbutaoinscricao(concurso === undefined ? false : true);
  }, [concurso]);

  const pegarConcurso = (id) => {
    setConcurso(id);
  };

/*   const time = () => {
    var today = new Date();
    if (today.getHours() > 8 && today.getHours() < 21) {
      setHabilitarzap(true);
    } else {
      setHabilitarzap(false);
    }
    var strData = "31/07/2020";
    var partesData = strData.split("/");
    var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    if(data < new Date()) setAtualizacaoFdi(DATA.fdiatualizacao);
  }; */


  


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
  }else{
    utm ="?utm_source=lp_ps&utm_medium=acesso_direto&utm_campaign=vestibular_2021_2&utm_content=inscricao"
  }

  const Botoes = ({ idinscricao, idzap, linkzap, concurso, prazo }) => {
    console.log(prazo)
    return (
      <div className="buttoesInscrevase">
        <p>INSCREVA-SE AGORA</p>
        {concurso == undefined && <p>LIGUE 0800 056 6666</p>}
        {!habilitarform && habilitarbutaoinscricao &&(
          <div>
            <Button
              cor="#da1f7d"
              texto="FICHA DE INSCRIÇÃO"
              tamanho="300px"
              link={`https://inscricao.uniftc.edu.br/Login/${concurso}${utm}`}
              id={idinscricao}
            />
          </div>
        )}
        {habilitarzap && !habilitarform && (
          <div>
            <Button
              cor="#28a745"
              texto="INSCRIÇÃO PELO WHATSAPP"
              tamanho="300px"
              id={idzap}
              link={linkzap}
            />
          </div>
        )}
        {habilitarform && !habilitarbutaoinscricao && (
          <div>
            <Button
              cor="#28a745"
              texto="INSCRIÇÃO PELO WHATSAPP"
              tamanho="300px"
              id={idzap}
              link={linkzap}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <Container id="fdi">
      <Titulo>
        <p>Formas de Ingresso</p>
        {habilitarzap && <p>Ficha de Inscrição ou por Whatsapp</p>}
      </Titulo>

      <ConteudoFdi>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col lg={3} xs={12}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav className="Menu">Escolha uma forma de ingresso</Nav>
                </Nav.Item>
                {DATA &&
                  atualizacaoFdi.map((x) => {
                    return (
                      <Nav.Item key={x.evento}>
                        <Nav.Link
                          eventKey={x.posicao}
                          onClick={() => pegarConcurso(x.concurso)}
                        >
                          {x.nome}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
              </Nav>
            </Col>
            <Col lg={9} xs={12} className="textoContainer">
              <Tab.Content>
                {DATA &&
                  atualizacaoFdi.map((x) => {
                    return (
                      <Tab.Pane eventKey={x.posicao}>
                        <ConteutoCursos key={x.posicao}>
                          <br />

                          <ContainerCursosSeparacao>
                            <Col>
                              <span>{x.textoadicional}</span>
                              <br/>
                              
                              <p>{parse(x.matricula)}</p>
                              <p>Condição Válida de {x.condicaoespecial}</p>
                              {/* <p>
                                Primeiro semestre (2020.2):{x.primeirosemestre}
                              </p>
                              <p>Demais semestres: {x.demaissemestres}</p>
                              <p>{x.descontoespecial}</p> */}
                              <p>
                                *Exceto medicina. Será cobrada a taxa de matrícula de R$ 49,90
                                para os matriculados por esta condição especial. 
                                Consulte regras e condições no regulamento disponível neste site.
                              </p>
                            </Col>
                            <Col>
                              <Botoes
                                idinscricao={"inscricaocrm-" + x.idinscricao}
                                idzap={"inscricaowhatsapp-" + x.idinscricao}
                                linkzap={x.linkzap}
                                concurso={x.concurso}
                                prazo={x.botao_de_inscricao_ate}
                              />
                              {habilitarform && habilitarbutaoinscricao && (
                                <Formulario {...match} concurso={concurso} />
                              )}
                            </Col>
                          </ContainerCursosSeparacao>
                          <br />
                         {/*  <TituloConteudo>
                            Você tem 40 minutos para fazer uma redação online{" "}
                          </TituloConteudo> */}
                        </ConteutoCursos>
                      </Tab.Pane>
                    );
                  })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </ConteudoFdi>
      <ConteudoFdiMobile>
        <Accordion defaultActiveKey="0">
          {DATA &&
            atualizacaoFdi.map((x) => {
              return (
                <Card key={x.posicao}>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={x.evento}
                    onClick={() => pegarConcurso(x.concurso)}
                  >
                    {x.nome}
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey={x.evento}>
                    <ConteutoCursos>
                      <br />

                      <ContainerCursosSeparacao>
                        <div>
                          <span>{x.textoadicional}</span>
                         
                          <p>{parse(x.matricula)}</p>
                          <p>Condição Válida de {x.condicaoespecial}</p>
                          {/* <p>Primeiro semestre (2020.2):{x.primeirosemestre}</p>
                          <p>Demais semestres: {x.demaissemestres}</p> */}
                          <p>
                            *Exceto medicina. Será cobrada a taxa de matrícula de R$ 49,90
                            para os matriculados por esta condição especial. 
                            Consulte regras e condições no regulamento disponível neste site.
                          </p>
                        </div>

                        <div>
                          <Botoes
                            idinscricao={"inscricaocrm-" + x.idinscricao}
                            idzap={"inscricaowhatsapp-" + x.idinscricao}
                            linkzap={x.linkzap}
                            concurso={x.concurso}
                          />
                          {habilitarform && habilitarbutaoinscricao && (
                            <Formulario {...match} concurso={concurso} />
                          )}
                        </div>
                      </ContainerCursosSeparacao>
                      <br />
                      {/* <TituloConteudo>
                        Você tem 40 minutos para fazer uma redação online{" "}
                      </TituloConteudo> */}
                    </ConteutoCursos>
                  </Accordion.Collapse>
                </Card>
              );
            })}
        </Accordion>
      </ConteudoFdiMobile>
    </Container>
  );
};

export default Fdi;
