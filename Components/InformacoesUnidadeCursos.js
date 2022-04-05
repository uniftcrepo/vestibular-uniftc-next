import React, { useEffect, useState, } from "react";
import { Row, Col, Form} from "react-bootstrap";

import styled from "styled-components";
import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {  filtarCurso, getCurso } from "../src/store/modules/curso/actions";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .nav-pills .nav-link.active {
    color: #000;
    background-color: #eef0f1;
  }

  .nav-link {
    color: #000;
    font-weight: bold;

    > img {
      width: 20px;
      margin-right: 15px;
    }
  }
  .tab-content {
    position: relative;
    justify-content: center;
    /*  width: 600px; */
    overflow: hidden;
    margin-top: -29px;
  }

  /*  .tab-content > .tab-pane {
    margin-right: 60px;
    margin-left: 60px; */

  li {
    padding: 4px;
  }

  li {
    float: left;
    width: 201px !important;
    display: inline-block;
  }
  li:nth-child(2n + 1) {
    margin: 3px 53px;
  }
  li:nth-child(2) ~ li {
    margin-top: 8px;
  }
  ul {
    margin-left: -85px;
  }
  /*  } */

  .textoContainer {
    /* background-color: #eef0f1; */
  }

  /*  .tab-pane img {
    width: 20px;
    margin-right: 15px;
  }
  .tab-pane p {
    margin-bottom: 40px;
    text-align: center;
    font-weight: bold;
  }
  .tab-pane ul li span {
    font-size: 10px;
    font-weight: 500;
  } */

  /* .tab-pane  */
  ul:last-child {
    margin-bottom: 40px;
  }
  /*  .tab-pane */
  ul li {
    margin: -15px;
    padding: 0px;
    width: 100%;
    /* font-weight: bold; */
  }

  .card-header img {
    width: 20px;
    margin-right: 15px;
  }
  @media (max-width: 1150px) {
    .nav-link {
      font-size: 12px;
    }
    ul {
      margin-left: -53px;
      margin-top: 14px;
    }
  }
  @media (max-width: 768px) {
    /* width: 90vh; */
    margin: 0 20px;
    .card-body span {
      font-size: 10px;
      font-weight: 800;
    }
  }

  #cidades_form {
  }
`;

export const Titulo = styled.div`
  /* margin-top: 30px; */
  margin-bottom: 10px;

  font-weight: bold;
  line-height: 0.5;
  > h2 {
    font-size: 48px;
    font-weight: bold;
    line-height: 1.1;
    > span {
      color: #0092ff;
    }
  }
  > div {
    font-size: 12px;
    color: #666666;
    font-weight: 100;
  }
  @media (max-width: 768px) {
    text-align: left;
    align-items: center;
    justify-content: center;
    > h2 {
      font-size: 18px;
      line-height: 0.1;
    }
  }
`;

export const SelecaoCursos = styled.div``;
export const ConteudoCursos = styled.div`
  /* width: 1300px; */
  align-items: center;
  justify-content: center;
  margin-top: 85px;
  margin-bottom: 95px;
  .form-label {
    margin-top: 20px;
    font-size: 16px;
  }
  .cursos-por-unidade {
    width: 70%;
    //z-index: 1000 !important;
  }

  .sua_vocacao {
    margin-top: 85px;
    width: 100%;
    display: block;
  }
  .sua_vocacao_mob {
    display: none;
  }
  @media (max-width: 768px) {
    /* width: 100vh; */
    /*  display: none; */
    .cursos-por-unidade {
      width: 100%;
    }
    .sua_vocacao {
      display: none;
    }
    .sua_vocacao_mob {
      display: block;
      width: 100%;
    }
  }
  @media (max-width: 1150px) {
    /* width: 900px; */
  }
  @media (max-width: 987px) {
    /*  width: 100vh; */
    /*     display: none; */
  }
`;
export const SuaVocacao = styled.div`
  margin-bottom: 119px;
  position: relative;
  z-index: 3;
  .sua_vocacao {
    width: 100%;
    display: block;
  }
  > div {
    display: none;
  }
  .sua_vocacao_mob {
    display: none;
  }
  @media (max-width: 768px) {
    margin-bottom: unset;
    /* width: 100vh; */
    /*  display: none; */
    .cursos-por-unidade {
      width: 100%;
    }
    .sua_vocacao {
      display: none;
    }
    .sua_vocacao_mob {
      display: block;
      width: 100%;
    }
    > div {
      display: block;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      padding: 20px;
    }
  }
`;
export const TituloConteudo = styled.p`
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const ConteutoCursos = styled.div`
  /*  margin-top:20px;
  margin-bottom:20px; */
`;

export const ConteudoCursosMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    .card-body {
      padding: 3px 40px;
    }
  }
  @media (max-width: 987px) {
    display: flex;
    .card-body {
      padding: 3px 40px;
    }
  }
`;

const { Option } = components;
const IconOption = (props) => (
  <Option {...props}>
    <img src={'/imagens/seta.ico'} style={{ width: 12 }} alt={props.data.label} />{" "}
    {props.data.label}
  </Option>
);
const InformacoesUnidadeCursos = () => {
  /* const [unidade, setUnidade] = useState(); */
 /*  const [dataBD, setDataBD] = useState("");
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(); */

  const dispatch = useDispatch();
  const cursosInfo = useSelector((state) => state.curso.curso);
  const unidade = useSelector((state) => state.curso.unidade);
  
  useEffect(() => {
   /*  pergarUnidadeSelecionada({
      label: "Todos os cursos",
      value: "Todos os cursos",
    }); */

  }, [dispatch]);

  const pergarUnidadeSelecionada =  (unidadeSelecionada) => {
   dispatch(filtarCurso(unidadeSelecionada.label))
  };

  const ValueContainer = ({ children, ...props }) => {
    
    return (
      components.ValueContainer && (
        <components.ValueContainer {...props}>
          {!!children && (
            <img
              src={'/imagens/seta.ico'}
              style={{ position: "absolute", left: 6, width: 12 }}
            />
          )}
          {children}
        </components.ValueContainer>
      )
    );
  };

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <i className="fa fa-search" aria-hidden="true" />
        </components.DropdownIndicator>
      )
    );
  };

  const styles = {
    valueContainer: (base) => ({
      ...base,
      paddingLeft: 24,
    }),
  };

  return (
    <>
      <Container id="cursos">
        <ConteudoCursos className="container">
          <Row>
            <Col lg={5} xs={12}>
              <Titulo>
                <h2>
                  Cursos da <span>UniFTC</span>
                </h2>
              </Titulo>
              <Form.Label>Onde você deseja estudar? Filtre a lista:</Form.Label>
              <SelecaoCursos>
                <Select
                  id="cidades_form"
                  instanceId="cidades_form"
                  allowCreate={true}
                  backspaceRemoves={true}
                  onChange={pergarUnidadeSelecionada}
                  options={unidade}
                  /*  value={unidadeSelecionada} */
                  clearable={false}
                  isMulti={false}
                  isSearchable={true}
                  /* classNamePrefix="vyrill" */
                  placeholder="Escolha"
                  className="cursos-por-unidade"
                  /* components={{ Option: IconOption }} */
                  components={{
                    /* DropdownIndicator, */ ValueContainer,
                    Option: IconOption,
                  }}
                  styles={styles}
                />
                <Form.Control.Feedback type="invalid">
                  Preencha com seu nome!
                </Form.Control.Feedback>
              </SelecaoCursos>
            </Col>
            <Col lg={7} xs={12}>
              {cursosInfo &&
                cursosInfo.map((x, index) => (
                  <ul key={index}>
                    <li>{x.curso}</li>
                  </ul>
                ))}
            </Col>
          </Row>
        </ConteudoCursos>
      </Container>
      <SuaVocacao>
        <a href="https://uniftc.minhaescolha.com.br ">
          <img src={'/imagens/sua_vocacao.svg'} className="sua_vocacao container" />
        </a>
        <div>
          Ainda em dúvida de qual curso escolher? Faça nosso teste vocacional
        </div>
        <a href="https://uniftc.minhaescolha.com.br ">
          <img src={'/imagens/mob/sua_vocacao-mobile.svg'} className="sua_vocacao_mob" />
        </a>
      </SuaVocacao>
    </>
  );
};

export default InformacoesUnidadeCursos;
