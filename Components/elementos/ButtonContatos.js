import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ModalContatos from "./ModalContatos";

export const ModalContainer = styled.span`
  /*  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%; */
`;
export const Contatos = styled.span`
  position: relative;
  /*  padding: 0 180px; */
  cursor: pointer;
`;

const ButtonContatos = ({ tipo, mobile }) => {
  const imgs = ['/imagens/varios_contatos.svg', '/imagens/varios_contatos_hover.svg'];
  const [bcgImg, setBcgImg] = useState(imgs[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const buttonClick = (e) => {
    setBcgImg(bcgImg === imgs[0] ? imgs[1] : imgs[0]);
    setIsModalVisible(!isModalVisible);
    console.log(isModalVisible);

    if (mobile) {
      setBcgImg(imgs[0]);
    }
   
  };

  return (
    <>
      <ModalContainer>
        <Contatos

        /*  onClick={() => buttonClick(imgs[1], true)} */
        /*  onMouseLeave={() => buttonClick(imgs[0], false)} */
        >
          <img
            src={bcgImg}
            alt="bcgImage"
            onClick={(e) => buttonClick(e)}
            id="imagemContato"
           
          />
          {isModalVisible && !mobile && (
            <ModalContatos
              tipo={tipo}
              fecharModal={() => {
                setIsModalVisible(false)
                setBcgImg(imgs[0])
              }}

            />
          )}
        </Contatos>
      </ModalContainer>
    </>
  );
};
export default ButtonContatos;
