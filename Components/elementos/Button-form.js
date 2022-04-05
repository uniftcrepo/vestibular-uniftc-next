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
        /* margin-top: 40px; */
        align-items: center;
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
function ButtonResultado({texto, history}) {

    const nextPath = (path) => {
        window.location.assign(path);;
    }

    return (
      

            <ButtonFdi 
               onClick={() => nextPath(`https://www.uniftc.edu.br/graduacao/resultados-anteriores/`)} 
            >
               
                {texto}
                
            </ButtonFdi>
        
    );
}

export default ButtonResultado;