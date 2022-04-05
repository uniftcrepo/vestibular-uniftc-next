import React from "react";
import { Image, Row, Col } from "react-bootstrap";
/* import ButtonIncrevase from "./elementos/Button-inscreva-se" */

import "../styled/styles_novo.scss";
import styled from "styled-components";
/* import backImage from "../utils/dataFdi"; */
import transferencia from "../imagens/transfira_seu_curso.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* margin-top: 30px; */
  /* margin-bottom: 30px; */
  background-color: #e5e5e5;
  padding: 70px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center; /* 
    width:100vh; */
    padding: 20px 0;
  }
`;

export const Texto = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 40px;
  }
`;
export const TextoMobile = styled.div`
  font-size: 36px;
  font-weight: bold;
  /* margin-right: 80px; */
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: unset;
    font-size: 18px;
  }
`;

export const Video = styled.div`
  /* margin-top: 8px; */
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const VideoMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Vocacao = styled.div`
  margin-right: 80px;

  > img {
    height: 400px;
  }
  @media (max-width: 768px) {
    >a img {
      width: 330px ;
    }
  }
`;

const Escolha = () => {
  return (
    /*  <section id="escolha"> */
    <Container id="escolha">
     <img src={transferencia} />;
    </Container>
    /*  </section> */
  );
};

export default Escolha;
