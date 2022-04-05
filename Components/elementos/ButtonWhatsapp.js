import React, { useState } from "react";
import styled from "styled-components";

export const Whatsapp = styled.span`

`;

const ButtonWhatsapp = () => {
  const imgs = ['/imagens/entre_em_contato.svg', '/imagens/entre_em_contato_hover.svg'];
  const [bcgImg, setBcgImg] = useState(imgs[0]);
  return (
    <Whatsapp
      onMouseEnter={() => setBcgImg(imgs[1])}
      onMouseLeave={() => setBcgImg(imgs[0])}
    >
       <img src={bcgImg} alt="bcgImage" />
    </Whatsapp>
  );
};
export default ButtonWhatsapp;
