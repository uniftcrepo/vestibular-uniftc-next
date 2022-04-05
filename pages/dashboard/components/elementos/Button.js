import React from 'react';
import styled from 'styled-components';
import { Link } from "react-scroll";
// import { Container } from './styles_novo';


export const ButtonFdi = styled.button`
        width:${props => props.tamanho ? props.tamanho: "200px;"};
        color: #fff;
        font-weight: 100;
        font-size: ${props => props.fonteSize ? props.fonteSize: "12px;"};;
        font-weight: bold;
        /* border-radius: 5px; */
        border: 0px;
        margin-top: 40px;
        margin-left: 10px;
        background-color: ${props => props.cor};
        /* width: 100%; */
        box-shadow: 0 6px 3px -2px gray;
        font-style: italic;
        padding:${props => props.padding ? props.padding:"15px 20px 15px 20px"} ;
        cursor: pointer;
        @media screen and (min-width: 50px) and (max-width: 768px) {
            font-size: 15px;
            margin-bottom: 20px;
            margin-left:unset;
        }  
           
        
`;
function Button({scrollPage, texto, cor, tamanho, fonteSize, padding}) {
    return (
        <Link
            className="fdi_button_inscrevase"
            activeClass="active"
            to={scrollPage}
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
        >

            <ButtonFdi
                variant="primary"
                className="inscreva_agora_button"
                cor={cor}
                tamanho={tamanho}
                fonteSize={fonteSize}
                padding={padding}
                >
                 {texto}
            </ButtonFdi>
        </Link>
    );
}

export default Button;