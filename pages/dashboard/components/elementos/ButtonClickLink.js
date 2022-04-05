import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
// import { Container } from './styles_novo';

export const ButtonFdi = styled.button`
  width: ${(props) => (props.tamanho ? props.tamanho : "200px;")};
  color: ${(props) => (props.colorTexto ? props.colorTexto : "#fff;")};
  font-weight: 100;
  font-size: ${(props) => (props.fonteSize ? props.fonteSize : "12px;")};
  font-weight: bold;
  border-radius: 5px;
  border: ${(props) => (props.borderSolid ? props.borderSolid : "2px;")};
  margin-top: 5px;
  margin-left: 10px;
  background-color: ${(props) => props.cor};
  /* width: 100%; */
  /*  box-shadow: 0 6px 3px -2px gray; */
  /* font-style: italic; */
  padding: ${(props) =>
    props.padding ? props.padding : "15px 20px 15px 20px"};
  cursor: pointer;
  
  @media screen and (min-width: 50px) and (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 20px;
    margin-left: unset;
    
  }
`;
function Button({
  scrollPage,
  texto,
  cor,
  tamanho,
  fonteSize,
  padding,
  link,
  tipo,
  id,
  colorTexto,
  borderSolid,
  target
}) {
  const nextPath = (path) => {
    window.location.assign(path);
  };

  return (
    <a href={link} target={target}>
    <ButtonFdi
      variant="primary"
      className="inscreva_agora_button"
      cor={cor}
      tamanho={tamanho}
      fonteSize={fonteSize}
      padding={padding}
      /* onClick={() => nextPath(link)} */
      tipo={tipo}
      id={id}
      colorTexto={colorTexto}
      borderSolid={borderSolid}

    >
      {texto}
    </ButtonFdi>
    </a>
  );
}

export default Button;
