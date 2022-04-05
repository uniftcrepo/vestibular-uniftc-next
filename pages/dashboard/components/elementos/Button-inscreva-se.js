import React from 'react';
import styled from 'styled-components';
import { Link } from "react-scroll";
// import { Container } from './styles_novo';


export const ButtonFdi = styled.button`
        color: #fff;
        font-weight: 100;
        font-size: 20px;
        font-weight: bold;
        border-radius: 5px;
        border: 0px;
        margin-top: 40px;
        margin-left: 30px;
        background-color: #489ad6;
        /* width: 100%; */
        box-shadow: 0 6px 3px -2px gray;
        font-style: italic;
        padding: 10px 55px 10px 55px;
        @media screen and (min-width: 50px) and (max-width: 768px) {
            font-size: 15px;
            margin-bottom: 20px;
            margin-left:unset;
        }  
           
        
`;
function ButtonIncrevase() {
    return (
        <Link
            className="fdi_button_inscrevase"
            activeClass="active"
            to="corpo"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
        >

            <ButtonFdi
                variant="primary"
                className="inscreva_agora_button">
                INSCREVA-SE AGORA MESMO 
            </ButtonFdi>
        </Link>
    );
}

export default ButtonIncrevase;