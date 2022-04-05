import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Tab,
  Tabs,
  Nav,
  Accordion,
  Card,
  Image,
} from "react-bootstrap";
import styled from "styled-components";
import Button from "./elementos/ButtonClickLink";
import ButtonConsultor from "./elementos/ButtonClickLinkConsultor";
import parse from "html-react-parser";
import { DATA } from "../src/producao-vestibular/utils/data";
import Formulario from "./elementos/form";
import { utms } from "../Components/functions/Utms";

import { useDispatch, useSelector } from "react-redux";
/* import { getFdi, getFdiTextoLegal } from "../../store/modules/fdi/actions";
import {  direito5Curso, getCurso } from "../../store/modules/curso/actions";
import { getConsultor } from "../../store/modules/consultor/actions"; */
/* import direito5 from "../public/imagens/direito-5.svg"; */
/* import direito5Mobile from "../public/imagens/mob/direito-5-mobile.svg"; */
import Consultor from "../src/producao-vestibular/utils/consultor";
import swal from "sweetalert";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalMatriucla from "./elementos/ModalMatricula";

import ConsultorMedicinaBanner from "../public/imagens/consultor_medicina_1200x400.png";
import ConsultorMedicinaBannerMobile from "../public/imagens/mob/consultor_medicina_640x738.png";

import {
  faPhoneAlt,
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  fab,
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare,
  faChevronUp,
  faChevronDown
);

export const Container = styled.div`
  .exceto_medicina,
  .condicoes_comercias {
    font-size: 10px;
  }
  @media screen and (min-width: 50px) and (max-width: 768px) {
    /*  width: 100vh; */
  }
`;

export const MegaRevisao = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  /*   > a > img {
    width: 93%;
    padding-left: 93px;
  } */
  @media screen and (min-width: 50px) and (max-width: 768px) {
    /*   > a > img {
    width: 100%;
    padding-left: 0;
  } */
  }
`;

export const Direito5 = styled.div`
  display: show;
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    left: 0;
  }
  .direito5-container {
    width: 40%;
    height: 200px;
    text-align: center;
    /* background: #000; */
    font-size: 30px;
    color: #fff;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 550px;
    right: 0;
  }

  .direito5-container div:nth-child(1) {
    font-size: 12px;
  }
  .direito5-container div:nth-child(5) a {
    font-size: 16px;
    color: #fff;
  }
  .direito5-container div:nth-child(5) div:nth-child(1) {
    font-size: 16px;
    color: #fff;
    margin-top: 11px;
  }
  .direito5-container div:nth-child(5) div:nth-child(2) {
    font-size: 16px;
    color: #fff;
    margin: 0px;
  }

  @media screen and (min-width: 50px) and (max-width: 768px) {
    display: none;
  }
`;

export const Direito5Mobile = styled.div`
  display: none;
  @media screen and (min-width: 50px) and (max-width: 768px) {
    display: block;
    position: relative;
    width: 100%;
    height: 470px;
    overflow: hidden;
    img {
      position: absolute;
      top: 0;
      /*  left: -9px; */
      width: 100%;
    }
    .direito5-container {
      /* width: 40%; */
      height: 100px;
      text-align: center;
      /* background: #000; */
      font-size: 30px;
      color: #fff;
      margin: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10px;
      right: 0;
    }
    .direito5-container div:nth-child(4) {
      margin: 28px;
    }
    .direito5-container div:nth-child(4) div {
      margin: -16px;
      text-decoration: underline;
    }

    .direito5-container div:nth-child(4) a,
    div:nth-child(5) a {
      font-size: 16px;
      color: #fff;
    }
  }
`;

export const DivBotoes = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 1500px) {
    flex-wrap: wrap;
    flex-flow: row wrap;
    justify-content: center;
  }

  .nav-tabs .nav-item {
    margin-bottom: -2px;
    margin-left: 2px;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 12px;
  }
  .nav {
    text-align: center;
  }
  .nav-tabs .nav-link.active {
    background: #1c3661;
    color: white;
  }
  .nav-tabs .nav-link {
    background: #0093ff;
    color: white;
  }
  .tab-content > .active {
    width: 1107px;
    margin-right: -4px;
    /*  border: 1px solid; */
    background-color: #1c3661;
  }
`;
export const DivBotaoMobile = styled.div`
  @media screen and (min-width: 50px) and (max-width: 768px) {
    display: show;
    padding: 20px 0px;
    .card-header {
      padding: 0.75rem 1.25rem;
      margin-bottom: 0;
      background-color: #0093ff;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      color: white;
    }
    .inscreva-se {
      padding-top: 10px;
      text-align: center;
    }
    .inscreva-ja-se {
      text-align: center;
    }

    .card {
      border: 2px solid #0093ff;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
    }

    .card-body {
      background-color: #1c3661;
      color: #fff;
    }

    .titulo {
      font-size: 24px;
    }

    .subtitulo {
      font-size: 16px;
    }
    .texto_legal {
      font-style: italic;
      font-weight: normal;
      font-size: 10px;
      line-height: 14px;
      padding-left: 15px;
    }
    .buttoesInscrevase .gruposButtoesCMSEsqueda {
      display: flex;
      flex-direction: row;
      justify-content: center;
      > div {
        margin-right: 10px;
      }
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

export const Texto = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  > h1 {
    font-size: 16px;
    color: #666666;
  }
  > div {
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
    color: #000000;
  }
`;

export const ConteutoCursos = styled.div`
  /*  margin-top:20px;
  margin-bottom:20px; */
`;
export const QuadroSelecao = styled.div`
  border: 1px solid #000;
  display: flex;
  width: 100%;
  height: 327px;
  justify-content: center;
  flex-direction: column;
  .tituloQuadroSelecao {
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #333333;
    /* margin-top: 60px; */
    margin-bottom: 17px;
  }
  .buttonQuadroSelecao {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  @media screen and (min-width: 50px) and (max-width: 768px) {
    .buttonQuadroSelecao {
      flex-direction: column;
      align-items: center;
    }
  }
`;
export const ContainerCursosSeparacao = styled.div`
  /*   margin-top: 20px; */
  display: flex;
  flex-direction: row;
  width: 100%;
  color: #fff;
  font-family: sans-serif;
  /*  background-color: #fff; */
  .titulo {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 22px;
    font-weight: 700;
  }
  .subtitulo {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 43px;
    font-weight: 400;
    .medicina_fdis {
      margin-left: 21px;
      margin-top: 10px;
    }
  }
  .texto_legal {
    font-size: 10px;
    color: #fff;
    font-style: italic;
    line-height: 24px;
    margin-top: 98px;
  }

  > div:first-child {
    text-align: justify;
    align-items: center;
    justify-content: center;
    padding: 0 86px;
    /*  margin-left: 40px; */
  }
  .obs {
    text-decoration: underline;
  }

  p {
    line-height: 18px;
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  .buttoesInscrevase {
    .gruposButtoesCMSEsqueda {
      display: flex;
      flex-direction: row;

      > div {
        margin-right: 10px;
      }
    }

    p {
      color: #333;
      font-weight: bold;
      margin-bottom: 10px;
      /* margin-left: 70px; */
      text-align: center;
      margin-right: 76px;
      margin-top: revert;
      font-size: 18px;
    }
    .inscreva-se {
      color: #fff;
      text-align: left;
      font-weight: 400;
      font-size: 18px;
    }
  }

  > div span {
    font-size: 14px;
    font-weight: bold;
    line-height: 27px;
  }

  .realize_a_prova {
    font-size: 14px;
    margin-top: 18px;
    margin-right: 71px;
    margin-left: 29px;
  }
  .textoAba {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin-right: 60px;
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
      font-size: 24px;
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
    .buttoesInscrevase {
      margin-top: -14px;
    }
  }
`;

export const BotoesDepoisDoForm = styled.div`
  .inscreva-se {
    color: #fff;
    text-align: center;
    font-weight: 400;
    font-size: 18px;
  }
  .textoAba {
    text-align: center;
    margin-top: 10px;
    margin-right: unset;
  }
`;

const initialState = {
  /* id: 0, */
  faculdade: "uniftc",
};

const ButtoesFdi = ({consultorId}) => {
  const [isMobile, setIsMobile] = useState();
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const [concurso, setConcurso] = useState("299");
  const [habilitarzap, setHabilitarzap] = useState();
  const [habilitarform, setHabilitarform] = useState();
  const [habilitarbutaoinscricao, setHabilitarbutaoinscricao] = useState(true);
  const [habilitarQuadro, setHabilitarQuadro] = useState(true);
  const [atualizacaoFdi, setAtualizacaoFdi] = useState(DATA.fdiatualizacao);
  const [token, setToken] = useState();
  const [idx, setIdx] = useState([]);
  const [tipoUnidadeSelecionada, setTipoUnidadeSelecionada] = useState("");

  const dispatch = useDispatch();
  const fdiAbas = useSelector((state) => state.fdi.fdi);
  const textoLegalSaga = useSelector((state) => state.fdi.textoLegal);
  const consultor = useSelector((state) => state.consultor.consultor);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 500)
  }, []);


  useEffect(() => {
  /*   dispatch(direito5Curso(token));
    dispatch(getCurso()); */
    /* console.log() */
  }, [token]);



  useEffect(() => {
    if (consultorId !== undefined) {
      if (Object.keys(consultor).length !== 0) {
        const [arrayConsultor] = Consultor(consultor, consultorId);
       
        document.title = arrayConsultor.nomeConsultor + " - Consultor UNIFTC";
        if (arrayConsultor.codigoConsultor === "errado") {
          setHabilitarform(false);
          setHabilitarQuadro(false);
          swal(
            "Rede UNIFTC",
            `Código (${consultorId}) do consultor não encontrado! `,
            "error"
          );
        } else {
          setHabilitarform(true);
        }
      }
    } else {
      setHabilitarform(false);
      setHabilitarQuadro(false);
    }
  }, [consultor]);

  const QuadroSelecaoChange = (tipoUnidade) => {
    setHabilitarQuadro(false);
    if (tipoUnidade === "uniftc-medicina") {
      setTipoUnidadeSelecionada(tipoUnidade);
      dispatch(getFdi({ faculdade: "uniftc-medicina" }));
    }
  };

  useEffect(() => {
    //token && console.log(token);
    setHabilitarbutaoinscricao(concurso === undefined ? false : true);
  }, [concurso]);

  /*   const pegarConcurso = (id) => {
    setConcurso(id);
  }; */

  const time = () => {
    var today = new Date();
    if (today.getHours() > 6 && today.getHours() < 22) {
      setHabilitarzap(true);
    } else {
      setHabilitarzap(false);
    }
    var strData = "31/07/2020";
    var partesData = strData.split("/");
    var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    if (data < new Date()) setAtualizacaoFdi(DATA.fdiatualizacao);
  };


  const habilitarFormInscricao = (x) => {
    if (x.inscricoes_abertas_sim_nao === "SIM") {
      return (
        <Formulario
          concurso={x.concurso}
          consultor={consultor}
          consultorId={consultorId}
          faculdade={x.faculdade}
          nomeAba={x.nome_da_aba}
        />
      );
    } else {
      return (
        <BotoesDepoisDoForm>
          {" "}
          {x.gabarito_sim_nao === "SIM" && (
            <>
              <div>
                <p className="inscreva-se">Veja também</p>
                <Button
                  texto={"Confira o gabarito da prova"}
                  tamanho={"290px"}
                  link={`https://www.uniftc.edu.br/slimapi/public/gabarito/${x.url_gabarito}`}
                  id={x.idinscricao}
                  target="_blank"
                  cor="#1C3661"
                  tamanhoMobile={"150px"}
                  borderSolid={"2px solid #0093ff"}
                  colorTexto={"#0093ff"}
                  fonteSize={"18px"}
                  fonteSizeMobile={"12px"}
                  padding={"0px 6px 0px 0px"}
                  height={"40px"}
                  marginLeft={"17%"}
                  marginTop={"unset"}
                  marginTopMobile={"3px"}
                />
              </div>
            </>
          )}
          <div>
            {x.recurso_sim_nao === "SIM" && (
              <>
                <Button
                  texto={"Formulário de recurso"}
                  tamanho={"290px"}
                  link={x.texto_recurso}
                  id={x.idinscricao}
                  target="_blank"
                  cor="#1C3661"
                  tamanhoMobile={"150px"}
                  borderSolid={"2px solid #0093ff"}
                  colorTexto={"#0093ff"}
                  fonteSize={"18px"}
                  fonteSizeMobile={"12px"}
                  padding={"0px 6px 0px 0px"}
                  height={"40px"}
                  marginLeft={"17%"}
                  marginTop={"10px"}
                  marginTopMobile={"3px"}
                />
              </>
            )}
          </div>
          <div>
            {x.pre_prova_sim_nao === "SIM" && (
              <div className="textoAba">{x.texto_pre_prova}</div>
            )}
          </div>
        </BotoesDepoisDoForm>
      );
    }
  };

  const Botoes = ({
    idinscricao,
    idzap,
    linkzap,
    concurso,
    tamanho,
    fdi,
    prazo,
    prazo2,
    prazo3,
    inscricoes_abertas,
    pre_prova,
    texto_pre_prova,
    gabarito,
    url_gabarito,
    recurso,
    url_recurso,
    prova,
    url_prova,
    matricula,
    url_matricula,
  }) => {
    function botoesAgendados() {
      return (
        <div className="gruposButtoesCMSEsqueda">
          
          {prova === "SIM" && (
            <div>
              <p className="inscreva-se">Já se inscreveu?</p>
              <Button
                cor="#1C3661"
                texto={"Faça agora sua prova"}
                tamanho={"220px"}
                tamanhoMobile={"210px"}
                link={`${url_prova}${utms()}`}
                id={idinscricao}
                borderSolid={"2px solid #0093ff"}
                paddingMobile={"9px 20px 15px 20px"}
                colorTexto={"#0093ff"}
                fonteSize={"18px"}
                fonteSizeMobile={"12px"}
                padding={"3px 6px 0px 0px"}
                height={"40px"}
                marginLeft={"unset"}
                marginTop={"unset"}
                marginTopMobile={"3px"}
              />
            </div>
          )}
          {matricula === "SIM" && (
            <div>
              <p className="inscreva-se">Foi aprovado?</p>
              <Button
                cor="#1C3661"
                texto={"Matricule-se"}
                tamanho={"220px"}
                tamanhoMobile={"210px"}
                /*  link={url_matricula} */
                id={idinscricao}
                borderSolid={"2px solid #0093ff"}
                colorTexto={"#0093ff"}
                fonteSize={"18px"}
                fonteSizeMobile={"12px"}
                padding={"3px 6px 0px 0px"}
                height={"40px"}
                marginLeft={"unset"}
                marginTop={"unset"}
                marginTopMobile={"3px"}
                onClick={() => handleShow()}
              />
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="buttoesInscrevase">
        {!habilitarform && habilitarbutaoinscricao && botoesAgendados()}
        {habilitarform && fdi === "2" && botoesAgendados()}
      
        {habilitarform && !habilitarbutaoinscricao && (
          <div>
            {fdi !== "3" && !prazo && (
              <Button
                cor="#28a745"
                texto="INSCRIÇÃO PELO WHATSAPP"
                tamanho={tamanho}
                id={idzap}
                link={linkzap}
              />
            )}
          </div>
        )}
      </div>
    );
  };
  return (
    <div id="formaIngresso">
      <ModalMatriucla
        onAbreModal={show}
        onFecharModal={() => setShow(false)}
        size="xl"
      />

      <Container id="forma_de_ingresso" className="container">
        <Texto>
          <h1>VESTIBULAR UNIFTC</h1>
          <div>Escolha sua forma de ingresso</div>
        </Texto>
        <DivBotoes>
          {habilitarQuadro && (
            <QuadroSelecao>
              <div className="tituloQuadroSelecao">
                Qual o seu curso de interesse?
              </div>
              <div className="buttonQuadroSelecao">
                <div>
                  <ButtonConsultor
                    cor="#DA1F7D"
                    texto={"Medicina"}
                    tamanho={"330px"}
                    /* link={`https://vestibular.uniftc.edu.br/medicina/${consultorId}`} */
                    /* id={idinscricao} */
                    /* target="_blank" */
                    /*  borderSolid={"2px solid #0093ff"} */
                    colorTexto={"#fff"}
                    fonteSize={"18px"}
                    padding={"5px 20px 8px 20px"}
                    onClick={() => QuadroSelecaoChange("uniftc-medicina")}
                  />
                </div>
                <div>
                  {" "}
                  <ButtonConsultor
                    cor="#DA1F7D"
                    texto={"Outros cursos"}
                    tamanho={"330px"}
                    /*  
                  link={`https://www.uniftc.edu.br/slimapi/public/gabarito/${url_gabarito}`}
                  id={idinscricao} */
                    target="_blank"
                    /*  borderSolid={"2px solid #0093ff"} */
                    colorTexto={"#fff"}
                    fonteSize={"18px"}
                    padding={"5px 20px 8px 20px"}
                    onClick={() => QuadroSelecaoChange()}
                  />
                </div>
              </div>
            </QuadroSelecao>
          )}
          {!habilitarQuadro && (
            <Tabs
              activeKey={token}
              onSelect={(k) => setToken(k)}
              transition={false}
              id="noanim-tab-example"
            >
              {" "}
              {fdiAbas &&
                fdiAbas.map((x) => {
                  return (
                    <Tab
                      key={Math.random()}
                      eventKey={x.nome_da_aba}
                      title={parse(x.nome_da_aba)}
                      tabClassName="tabs_forma_de_ingresso"
                    >
                      <br />

                      <ContainerCursosSeparacao>
                        <Col lg={7}>
                          <br />

                          <p className="titulo">{parse(x.titulo)}</p>

                          <p className="subtitulo">{parse(x.subtitulo)}</p>

                          <Botoes
                            idinscricao={"inscricaocrm-" + x.idinscricao}
                            idzap={"inscricaowhatsapp-" + x.idinscricao}
                            linkzap={
                              "https://api.whatsapp.com/send?phone=5571988357245"
                            }
                            concurso={x.concurso}
                            tamanho={"300px"}
                            fdi={x.id}
                            inscricoes_abertas={x.inscricoes_abertas_sim_nao}
                            pre_prova={x.pre_prova_sim_nao}
                            texto_pre_prova={x.texto_pre_prova}
                            gabarito={x.gabarito_sim_nao}
                            url_gabarito={x.url_gabarito}
                            recurso={x.recurso_sim_nao}
                            url_recurso={x.texto_recurso}
                            prova={x.prova_sim_nao}
                            url_prova={x.texto_prova}
                            matricula={x.matricula_sim_nao}
                            url_matricula={x.texto_matricula}
                          />

                          <div className="texto_legal">
                            {" "}
                            {textoLegalSaga.length > 0 &&
                              x.faculdade !== "uniftc-medicina" && (
                                <>
                                  <p>
                                    {parse(textoLegalSaga[0].texto_legal)}
                                    *Exceto medicina. Consulte{" "}
                                    <a href="https://www.uniftc.edu.br/graduacao/edital-manual-e-regulamentos">
                                      regulamento e condições
                                    </a>
                                  </p>
                                </>
                              )}
                          </div>
                          <br />
                        </Col>
                        <Col lg={5}>{habilitarFormInscricao(x)}</Col>
                      </ContainerCursosSeparacao>
                      <br />
                    </Tab>
                  );
                })}
            </Tabs>
          )}
        </DivBotoes>
      

        <DivBotaoMobile className="container">
          {habilitarQuadro && (
            <QuadroSelecao>
              <div className="tituloQuadroSelecao">
                Qual o seu curso de interesse?
              </div>
              <div className="buttonQuadroSelecao">
                <div>
                  <Button
                    cor="#DA1F7D"
                    texto={"Medicina"}
                    tamanho={"255px"}
                    /*    link={`https://vestibular.uniftc.edu.br/medicina/${consultorId}`} */
                    /* id={idinscricao} */
                    target="_blank"
                    /*  borderSolid={"2px solid #0093ff"} */
                    colorTexto={"#fff"}
                    fonteSize={"18px"}
                    padding={"8px 20px 8px 20px"}
                    paddingMobile={"9px 20px 8px 20px"}
                    onClick={() => QuadroSelecaoChange("uniftc-medicina")}
                  />
                </div>
                <div>
                  {" "}
                  <Button
                    cor="#DA1F7D"
                    texto={"Outros cursos"}
                    tamanho={"255px"}
                    /*  
                  link={`https://www.uniftc.edu.br/slimapi/public/gabarito/${url_gabarito}`}
                  id={idinscricao} */
                    target="_blank"
                    /*  borderSolid={"2px solid #0093ff"} */
                    colorTexto={"#fff"}
                    fonteSize={"18px"}
                    padding={"8px 20px 8px 20px"}
                    paddingMobile={"9px 20px 8px 20px"}
                    onClick={() => QuadroSelecaoChange()}
                  />
                </div>
              </div>
            </QuadroSelecao>
          )}
          {!habilitarQuadro && (
            <Accordion defaultActiveKey="1">
              {fdiAbas &&
                fdiAbas.map((x, index) => {
                  return (
                    <Card key={Math.random()}>
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey={x.id}
                        className={"collapsed"}
                        onClick={() => {
                          if (idx.includes(index))
                            setIdx(idx.filter((i) => i !== index));
                          else setIdx([...idx, index]);
                        }}
                      >
                        {parse(x.nome_da_aba)}
                        {idx.includes(index) ? (
                          <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronDown} />
                        )}
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        className={"collapsed"}
                        eventKey={x.id}
                      >
                        <Card.Body>
                          <Col>
                            <br />

                            <p className="titulo">{parse(x.titulo)}</p>

                            <p className="subtitulo">{parse(x.subtitulo)}</p>

                            <br />

                          </Col>

                          <Col>{habilitarFormInscricao(x)}</Col>
                          <Botoes
                            idinscricao={"inscricaocrm-" + x.idinscricao}
                            idzap={"inscricaowhatsapp-" + x.idinscricao}
                            linkzap={
                              "https://api.whatsapp.com/send?phone=5571988357245"
                            }
                            concurso={x.concurso}
                            tamanho={"251px"}
                            inscricoes_abertas={x.inscricoes_abertas_sim_nao}
                            pre_prova={x.pre_prova_sim_nao}
                            texto_pre_prova={x.texto_pre_prova}
                            gabarito={x.gabarito_sim_nao}
                            url_gabarito={x.url_gabarito}
                            recurso={x.recurso_sim_nao}
                            url_recurso={x.texto_recurso}
                            prova={x.prova_sim_nao}
                            url_prova={x.texto_prova}
                          />

                          <div className="texto_legal">
                            {" "}
                            {textoLegalSaga.length > 0 &&
                              x.faculdade !== "uniftc-medicina" && (
                                <>
                                  <p>
                                    {parse(textoLegalSaga[0].texto_legal)}
                                    *Exceto medicina. Consulte{" "}
                                    <a href="https://www.uniftc.edu.br/graduacao/edital-manual-e-regulamentos/?_ga=2.247517447.1011758842.1618231824-1226540173.1608305503">
                                      regulamento e condições
                                    </a>
                                  </p>
                                </>
                              )}
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  );
                })}
            </Accordion>
          )}
        </DivBotaoMobile>
        {/* {consultorId === undefined && ( */}

        {tipoUnidadeSelecionada !== "uniftc-medicina" ? (
          <>
            <Direito5>
              <img src={'/imagens/direito-5.svg'} />
              <div className="direito5-container">
                <div>INSCREVA-SE</div>
                <div>
                  <Button
                    cor="#fff0"
                    fonteSize={"18px"}
                    texto={"Vestibular Online"}
                    tamanho={"272px"}
                    padding={"6px 20px 6px 20px"}
                    /*   tamanho={tamanho}
                link={url_prova}
                id={idinscricao} */
                    borderSolid={"2px solid #fff"}
                    link={
                      `https://inscricao.uniftc.edu.br/Login/468${utms()}`
                    }
                  />
                </div>
                <div>
                  <Button
                    cor="#fff0"
                    colorTexto="#fff"
                    fonteSize={"18px"}
                    tamanho={"272px"}
                    padding={"6px 20px 6px 20px"}
                    texto={"Usar nota do ENEM"}
                    /*   tamanho={tamanho}
                id={idinscricao} */
                    borderSolid={"2px solid #fff"}
                    link={
                      `https://inscricao.uniftc.edu.br/Login/470${utms()}`
                    }
                  />
                </div>
                <div>
                  <Button
                    cor="#fff0"
                    fonteSize={"18px"}
                    tamanho={"272px"}
                    padding={"6px 20px 6px 20px"}
                    texto={"Segunda Graduação"}
                    /*   tamanho={tamanho}
                link={url_prova}
                id={idinscricao} */
                    borderSolid={"2px solid #fff"}
                    link={
                      `https://inscricao.uniftc.edu.br/Login/469${utms()}`
                    }
                  />
                </div>
                <div>
                  <div>
                    <a href="https://api.whatsapp.com/send?phone=5571988357245&text=Ol%C3%A1,%20UNIFTC">
                      Inscrever pelo WhatsApp
                    </a>
                  </div>
                  <div>
                    <a href="https://materiais.uniftc.edu.br/direito-5">
                      Saiba mais sobre Direito 5.0
                    </a>
                  </div>
                </div>
              </div>
            </Direito5>

            <Direito5Mobile>
              <img src={'/imagens/mob/direito-5-mobile.svg'} />
              <div className="direito5-container">
                <div>
                  <Button
                    cor="#fff0"
                    fonteSize={"18px"}
                    texto={"Vestibular Online"}
                    tamanho={"272px"}
                    padding={"6px 20px 6px 20px"}
                    paddingMobile={"7px 18px 20px 20px"}
                    /*   tamanho={tamanho}
                link={url_prova}
                id={idinscricao} */
                    borderSolid={"2px solid #fff"}
                    marginBottom={"5px"}
                    link={
                      `https://inscricao.uniftc.edu.br/Login/468${utms()}`
                    }
                  />
                </div>
                <div>
                  <Button
                    cor="#fff0"
                    colorTexto="#fff"
                    fonteSize={"18px"}
                    tamanho={"272px"}
                    padding={"6px 20px 6px 20px"}
                    paddingMobile={"7px 18px 20px 20px"}
                    texto={"Usar nota do ENEM"}
                    /*   tamanho={tamanho}
                id={idinscricao} */
                    borderSolid={"2px solid #fff"}
                    marginBottom={"5px"}
                    link={
                      `https://inscricao.uniftc.edu.br/Login/470${utms()}`
                    }
                  />
                </div>
                <div>
                  <Button
                    cor="#fff0"
                    fonteSize={"18px"}
                    tamanho={"272px"}
                    padding={"6px 20px 6px 20px"}
                    texto={"Segunda Graduação"}
                    paddingMobile={"7px 18px 20px 20px"}
                    /*   tamanho={tamanho}
                id={idinscricao} */
                    borderSolid={"2px solid #fff"}
                    marginBottom={"5px"}
                    link={
                      `https://inscricao.uniftc.edu.br/Login/469${utms()}`
                    }
                  />
                </div>
                <div>
                  <div>
                    <a href="https://api.whatsapp.com/send?phone=5571988357245&text=Ol%C3%A1,%20UNIFTC">
                      Inscrever pelo WhatsApp
                    </a>
                  </div>
                  <div>
                    <a href="https://materiais.uniftc.edu.br/direito-5">
                      Saiba mais sobre Direito 5.0
                    </a>
                  </div>
                </div>
              </div>
            </Direito5Mobile>
          </>
        ) : (
          <>
            <MegaRevisao>
              {!isMobile ? (
                <a target="_blank" href="https://medicina.uniftc.edu.br">
                  <Image src={ConsultorMedicinaBanner} fluid />
                </a>
              ) : (
                <a target="_blank" href="https://medicina.uniftc.edu.br">
                  <Image src={ConsultorMedicinaBannerMobile} fluid />
                </a>
              )}
            </MegaRevisao>
          </>
        )}
        {/*    )} */}
      </Container>
      {/* {consultorId === undefined && (
      
      )} */}
    </div>
  );
};


export default ButtoesFdi;
