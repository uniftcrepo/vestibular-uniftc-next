import React from "react";
import styled from "styled-components";
import Link from 'next/link'
// import { Container } from './styles_novo';

export const ALink = styled.a`

`;

export const ButtonFdi = styled.button`
  width: ${(props) => (props.tamanho ? props.tamanho : "200px;")};
  height: ${(props) => (props.height ? props.height : "40px;")};
  color: ${(props) => (props.colorTexto ? props.colorTexto : "#fff;")};
  font-weight: 100;
  font-size: ${(props) => (props.fonteSize ? props.fonteSize : "12px;")};
  font-style: ${(props) => (props.fonteStyle ? props.fonteStyle : "normal;")};
  font-weight: ${(props) => (props.fonteWeight ? props.fonteWeight : "bold")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "5px")};
  border: ${(props) => (props.borderSolid ? props.borderSolid : "solid 2px;")};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "5px;")};
  border-color: ${(props) => (props.borderColor ? props.borderColor : "")};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "10px;")};
  background-color: ${(props) => props.cor};
  /* width: 100%; */
  box-shadow: ${(props) => (props.boxShadow ? props.boxShadow : "")};
  /* font-style: italic; */
  padding: ${(props) =>
    props.padding ? props.padding : "15px 20px 15px 20px"};
  cursor: pointer;
  >span{
    margin-right: 7px;
    color: black;
  }
  :hover {
    //opacity:0.9;
    background-color:${(props) => (props.hover ? props.hover : "#0093ff")};
    color: #fff;
  }
  @media screen and (min-width: 50px) and (max-width: 768px) {
    width: ${(props) => (props.tamanhoMobile ? props.tamanhoMobile : "220px;")};
    font-size: ${(props) => (props.fonteSizeMobile ? props.fonteSizeMobile : "14px")};
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : "20px")};
    margin-left: unset;
    margin-top: ${(props) => (props.marginTopMobile ? props.marginTopMobile : "unset;")};
    padding: ${(props) =>
    props.paddingMobile ? props.paddingMobile : "15px 20px 15px 20px"};
    height: ${(props) => (props.heightMobile ? props.heightMobile : "40px;")};
    
  }
`;


function Button({
  scrollPage,
  texto,
  cor,
  tamanho,
  fonteSize,
  padding,
  paddingMobile,
  link,
  tipo,
  id,
  colorTexto,
  borderSolid,
  borderColor,
  marginLeft,
  marginTop,
  boxShadow,
  icon,
  marginBottom,
  onClick,
  height,
  fonteWeight,
  tamanhoMobile,
  fonteSizeMobile,
  marginTopMobile,
  borderRadius,
  fonteStyle,
  heightMobile,
  hover,
  disabled,

}) {
  return (
   /*  <Link  href={{
      pathname: link || '/VIC0005',
    }} > */
    <ButtonFdi
      variant="primary"
      className="inscreva_agora_button"
      cor={cor}
      tamanho={tamanho}
      fonteSize={fonteSize}
      padding={padding}
      disabled={disabled}
     /*  onClick={() => nextPath(link)} */
      tipo={tipo}
      id={id}
      colorTexto={colorTexto}
      borderSolid={borderSolid}
      borderColor={borderColor}
      marginLeft={marginLeft}
      boxShadow={boxShadow}
      marginBottom={marginBottom}
      onClick={() => onClick()}
      height={height} 
      marginTop={marginTop}
      fonteWeight={fonteWeight}
      tamanhoMobile={tamanhoMobile}
      fonteSizeMobile={fonteSizeMobile}
      marginTopMobile={marginTopMobile}
      borderRadius={borderRadius}
      fonteStyle={fonteStyle}
      paddingMobile={paddingMobile}
      heightMobile={heightMobile}
      hover={hover}
    >
      <span>{icon && icon}</span>{texto}
    </ButtonFdi>
    /* </Link> */
  );
}

export default Button;
