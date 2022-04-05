import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Whatsapp from "../Components/elementos/ButtonWhatsapp";
import ButtonContatos from "../Components/elementos/ButtonContatos";
import SideBarWhatsapp from "../Components/elementos/SideBarWhatsapp";


import ModalMatriucla from "./elementos/ModalMatricula";


import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  faPhoneAlt,
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  fab,
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare
);

export const Rodape = styled.div`
  margin-top: 60px;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  color: #666666;
 .footer-container .links a:hover{
   color: #000;
   text-decoration-line: underline !important;
 }


  background-color: #fff;

  .footer_mobile {
    display: none;
  }
  .footer_desktop {
    display: block;
    height: 260px;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
  }

  .rodape {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    text-align: center;
    height: 60px;
    background-color: #fff;
    padding-top: 23px;
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    > span a{
      color:#000;
      text-decoration-line: underline !important;
    }
  }

  /* .footer .rede-sociais {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height:100%;
} */
  .rede-sociais .footer-contato,
  .footer-contato-texto {
    margin-top: 30px;
    font-size: 10px;
  }
  .rede-sociais .footer-contato a {
    margin-right: 17px;
  }
  .footer-container {
    padding-top: 50px;
  }
  .footer-container .grupo{
    display: grid;
    grid-template-columns: 242px 612px 164px;
  }

  .footer-container .links {
    display: grid;
    grid-template-columns: 292px 238px;
    margin-left: 40px;
  }

  .footer-fdi p:nth-child(1) {
    color: #000000;
    font-weight: bold;
  }
  .footer-fdi p,
  .veja-tambem p {
    margin-bottom: 13px !important;
  }

  .footer-fdi p a {
    color: #666666;
    text-decoration: none;
    font-size: 14px;
  }

  .veja-tambem div:nth-child(1) {
    color: #000000;
    margin-bottom: 14px;
    font-weight: bold;
  }
  .veja-tambem div:nth-child(2) a {
    color: #666666;
    text-decoration: none !important;
    font-size: 14px;
  }

  .atendimento .atendimento-title,
  .atendimento .atendimento-whatsapp,
  .atendimento .atendimento-contato {
    color: #505050;
    margin-bottom: 19px;
  }
  .atendimento .atendimento-title{
    color: #000;
    font-weight:bold;
  }
  .atendimento div:nth-child(3) a {
    color: #cccccc;
    text-decoration: none !important;
    margin-left: 19px;
  }

  /*FOOTER*/

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /*# sourceMappingURL=style.css.map */
  @media screen and (min-width: 50px) and (max-width: 768px) {
    padding-left: 6px;
    background-color: #fff;
    height: 608px;
    .footer_desktop{
      height:437px;
    }
    .footer-container .grupo {
      grid-template-columns: 1fr;
      grid-template-rows: 104px 165px 64px 150px; 
    }
    .rede-sociais {
      display: grid;
      grid-template-columns: 0px 194px 126px;
      row-gap: 20px;
    }
    .rede-sociais .footer-contato-texto {
      margin-top: unset;
    }
    .rede-sociais .footer-contato a {
      margin-top: 30px;
      margin-right: 14px;
      font-size: 10px;
    }
    .footer_novo .containerRodapeMobile {
      padding: 38px;
    }

    .footer_novo .logoRodapeMobile img {
      margin-left: -20px;
    }
    

    .texto-imes {
      color: #fff;
      font-weight: 400;
      font-size: 10px;
    }
    .footer-linha {
      border-color: #333333;
    }
    .footer-fdi p {
      color: #666666 !important;
      font-weight: 300;
      font-size: 12px;
    }

    .footer-fdi p a {
      color: #666666 !important;
      text-decoration: none;
      font-weight: 300;
      font-size: 12px;
    }
    .footer-contato {
      display: flex;
      flex-direction: row;
      margin-bottom: 25px;
    }
    .footer-container .links{
      grid-template-columns: 185px 154px;
      margin-left: unset;
      font-size: 12px;
    }
    .veja-tambem{
      font-size: 12px;
    }
    .veja-tambem div:nth-child(2) a{
      font-size: 12px;
    }
   

    .atendimento-title{
      grid-area: atendimento-title;
    }
    .atendimento-whatsapp{
      grid-area: atendimento-whatsapp;
    }

    .atendimento-contato{
      grid-area: atendimento-contato;
    }
    .atendimento{
      display: grid;
      grid-template-columns: 58% 32% 0%;
      grid-template-areas:
        "atendimento-title atendimento-title"
        "atendimento-whatsapp atendimento-contato"
        ;
    }


    .footer-fdi p:nth-child(1){
      color: #000 !important;
    }

    .rodape{
    }
  }
`;

const Footer = () => {
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const fdiAbas = useSelector((state) => state.fdi.fdi);
  const [mostrarSideBar, setMostrarSideBar] = useState(false);
  const abrirSideBarWhatsapp = () => {
    setMostrarSideBar(!mostrarSideBar);
  }
  var isMobile
  useEffect(() => {
    isMobile = window.innerWidth <= 500;
  }, [dispatch]);
  return (
    <>
    <ModalMatriucla onAbreModal={show} onFecharModal={() => setShow(false)} size="xl" />
      <Rodape className=" ">
        <div className="container footer-container footer_desktop">
          <div className="grupo">
            <div className="rede-sociais">
              <div className="logo-rodape">
                <img src={'/imagens/logo_rodape.svg'} />
              </div>
              <div className="footer-contato">
                <a href="https://api.whatsapp.com/send?phone=5571988357245&amp;text=Ol%C3%A1,%20UNIFTC">
                  <img src={'/imagens/rodape_whatsapp.svg'} className="" />
                </a>
                <a
                  href="https://www.instagram.com/redeuniftc/"
                  target="_blank"
                >
                  <img src={'/imagens/rodape_linkdin.svg'} className="" />
                </a>
                <a
                  href="https://www.facebook.com/uniftcoficial"
                  target="_blank"
                >
                  <img src={'/imagens/rodape_facebook.svg'} className="" />
                </a>
                <a
                  href="https://www.linkedin.com/school/uniftc"
                  target="_blank"
                >
                  <img src={'/imagens/rodape_instagram.svg'} className="" />
                </a>
                <a
                  href="https://www.youtube.com/user/ftcdigital"
                  target="_blank"
                >
                  <img src={'/imagens/rodape_youtube.svg'} className="" />
                </a>
              </div>
              <div className="footer-contato-texto">
                IMES - Instituto Mantenedor de Ensino Superior da Bahia Ltda
                CNPJ 04.670.333/0001-89
              </div>
            </div>
            <div className="links">
              <div className="footer-fdi">
                <p>Vestibular UNIFTC 2022.1</p>
                <p>
                  <a
                    className="vestibular_uni"
                    href="https://www.uniftc.edu.br/graduacao/edital-manual-e-regulamentos/"
                  >
                    Editais e regulamentos
                  </a>
                </p>
                <p>
                  <a
                    className="vestibular_uni"
                    href="https://www.uniftc.edu.br/graduacao/resultados-anteriores/"
                  >
                    Resultados
                  </a>
                </p>
                <p>
                  <a
                    className="vestibular_uni"
                    href="#"
                    onClick={
                      ()=> handleShow()
                    }
                  >
                    Matrícula
                  </a>
                </p>
                <p>
                  <a
                    className="vestibular_uni "
                    href="https://uniftc.edu.br/convenios"
                  >
                    Convênios
                  </a>
                </p>
              </div>
              <div className="veja-tambem ">
                <div>Veja também</div>
                <div>
                  <p>
                    <a
                      className="vestibular_uni"
                      href="https://uniftc.edu.br/calculadoraenem"
                    >
                      Calculadora ENEM
                    </a>
                  </p>
                  <p>
                    <a
                      className="vestibular_uni"
                      href="https://transferencia.uniftc.edu.br"
                    >
                      Transferência Externa
                    </a>
                  </p>
                  <p>
                    <a
                      className="vestibular_uni"
                      href="https://suavocacao.uniftc.edu.br/"
                    >
                      Teste Vocacional
                    </a>
                  </p>
                  <p>
                    <a
                      className="vestibular_uni"
                      href="https://vestibular.uniftc.edu.br/medicina/"
                    >
                      Vestibular Medicina
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="atendimento">
              <div className="atendimento-title">Atendimento</div>
              <div className="atendimento-whatsapp">
                <a href="https://api.whatsapp.com/send?phone=5571988357245&amp;text=Ol%C3%A1,%20UNIFTC">
                  <Whatsapp />
                </a>
              </div>
              <div className="atendimento-contato">
                {isMobile ? (<a href="#" onClick={abrirSideBarWhatsapp} ><ButtonContatos mobile={true}  tipo={"footer"} /></a>): <ButtonContatos mobile={false} tipo={"footer"} />}
              </div>
            </div>
          </div>
        </div>
        <div className="rodape">
          <span><a href="https://uniftc.edu.br/politica-de-privacidade?_ga=2.215189139.566998821.1631561738-1789643399.1628102058">Políticas de Privacidade</a></span> • <span><a href="https://redeuniftc-privacy.my.onetrust.com/webform/72c77247-e798-4098-ac50-ef3cd6627021/f4306a95-7f68-40d4-a8e3-3a1a41d4d3d7">Solicitação do titular de dados</a></span>
        </div>
        
      </Rodape>
      {isMobile && <SideBarWhatsapp onAbreSideBarWhatsapp={mostrarSideBar} fecharPainel={(val)=>setMostrarSideBar(val)}/>}
    </>
  );
};

export default Footer;
