import React,{useState} from "react";
import styled from "styled-components";

import ImgWhatsapp from "../../public/imagens/contato_whatsapp_branco.svg";
import ImgChat from "../../public/imagens/contato_chat_branco.svg";
import ImgMessenger from "../../public/imagens/contato_messenger_branco.svg";
import ImgIG from "../../public/imagens/contato_ig_branco.svg";
import ImgEmail from "../../public/imagens/contato_email_branco.svg";
import Img0800 from "../../public/imagens/contato_0800_branco.svg";
import IMGMenuFechar from "../../public/imagens/Menu_Fechar.svg";
import swal from "sweetalert";

export const Container = styled.div`
  width: 360px;
  height: 436px;
  .MenuFechar {
    display: flex;
    margin-top: 177px;
    justify-content: center;
    }
`;

export const Title = styled.div`
  /* font-family: Roboto; */
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 16px;
  color: #fff;
  font-family: Helvetica;
  text-align: center;
`;
export const TitleLigue = styled.div`
  /* font-family: Roboto; */
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  margin-left: 27px;
`;

export const ContentContato = styled.div`
  display: grid;
  grid-template-columns: 120px 209px;
  row-gap: 20px;
  justify-items: center;
  align-items: center;
  padding: 30px 0 20px 39px;
`;

export const ContentContatoLigue = styled.div`
  display: grid;
  grid-template-columns: 139px 209px;
  row-gap: 20px;
  justify-items: center;
  align-items: center;
  padding: 14px 0 20px 29px;
`;

export const LigamosParaVoce = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;
export const ImgContato0800 = styled.img`
  margin-left: auto;
`;

function SideBarWhatsapp({ onAbreSideBarWhatsapp, fecharPainel }) {
  //console.log("SideBarWhatsapp:", onAbreSideBarWhatsapp)
  const simulateNetworkRequest = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const IGDirect = (e) => {
    e.preventDefault();
    //console.log("IGDirect");
    swal(
      "Rede UNIFTC",
      "Você será redirecionado para o perfil da Rede UNIFTC no Instagram, onde você pode falar conosco pelo Direct.",
      "success"
    );
    simulateNetworkRequest(2500).then(() => {
      window.location.replace("https://www.instagram.com/redeuniftc ");
    });
  };
  return (
    <>
      <nav
        className={
            onAbreSideBarWhatsapp ? "sidebarWhatsapp active " : "sidebarWhatsapp"
        }
      >
        <Container>
          <Title>Entre em contato conosco</Title>

          <ContentContato>
            <a href="https://wa.me/5571988357245" target="_blank">
              <img src={ImgWhatsapp} />
            </a>
            <a
              href="https://crcuniftc.sz.chat/webchat/v2/?cid=60da1a3403d240001174e483&host=https://crcuniftc.sz.chat"
              target="_blank"
            >
              <img src={ImgChat} />
            </a>
            <a href=" https://m.me/redeuniftc" target="_blank">
              <img src={ImgMessenger} />
            </a>
            <a href="#" onClick={IGDirect}>
              <img src={ImgIG} />
            </a>
            <a href="mailto:relacionamento@ftc.edu.br" target="_blank">
              <img src={ImgEmail} />
            </a>
          </ContentContato>
          <TitleLigue>Ligue</TitleLigue>
          <ContentContatoLigue>
            <ImgContato0800 href="Tel:08000566666" src={Img0800} />
            <LigamosParaVoce href="#">Ligamos para você</LigamosParaVoce>
          </ContentContatoLigue>
          <div className="MenuFechar">
                  <img src={IMGMenuFechar} onClick={()=> fecharPainel(false)}/>
         </div>
        </Container>
      </nav>
    </>
  );
}

export default SideBarWhatsapp;
