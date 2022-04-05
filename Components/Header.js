import React, { useState, useEffect, forwardRef } from "react";
import { wrapper }from '../src/store/next-store';
import {
  Navbar,
  Nav,
  NavDropdown,

  Container,
  Row,
  Col,
  Dropdown,
  FormControl,
  Modal,
} from "react-bootstrap";
import Image from 'next/image';
import { Link } from "react-scroll";
import styled from "styled-components";
import logoTop from "../public/imagens/logo_top.svg";
/* import Whatsapp from "/imagens/entre_em_contato.svg";
import WhatsappHover from "/imagens/entre_em_contato_hover.svg"; */
import Contatos from "../public/imagens/varios_contatos.svg";
import Setinha from "../public/imagens/setinha.svg";
import IMGMenuContatos from "../public/imagens/Menu_contatos.svg";
import IMGMenuFaleWhatsapp from "../public/imagens/Menu_Fale_pelo_Whatsapp.svg";
import IMGMenuFechar from "../public/imagens/Menu_Fechar.svg";

import Whatsapp from "./elementos/ButtonWhatsapp";
import ButtonContatos from "./elementos/ButtonContatos";
import SideBarWhatsapp from "./elementos/SideBarWhatsapp";
import { utms } from "./functions/Utms";

import ModalMatriucla from "./elementos/ModalMatricula";
/* import "../styles/styles_novo.scss";
import "../styles/styles_drop.scss"; */
import telefone from "../public/imagens/telefone.svg";
import { useDispatch, useSelector } from "react-redux";

import { getFdi } from "../src/store/modules/fdi/actions";



export const HeaderSite = styled.header`
  margin: 20px;
  .navbar-light .navbar-nav .nav-link {
    color: #525252 !important;
    font-weight: bold;
  }
  .navbar-light .navbar-nav .nav-link:hover {
    color: orange !important;
  }
  /*  .navbar-light .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,<svg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'><path stroke='rgba(255,255,255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/></svg>");
  } */
`;

export const BarraImageTopo = styled.div`
  margin-left: 35%;

  @media screen and (min-width: 50px) and (max-width: 768px) {
    margin-left: 0%;
  }
`;
export const BarraMenuTopo = styled.div`
  /*  width: 100%;
  margin: 8px; */
  background-color: #1c3661;

  .navbar-collapse {
    .navbar-nav {
      width: 100%;
      display: flex;
      justify-content: space-evenly;

      a {
        font-size: 12px;
        margin: auto;
        color: #fff;
        cursor: pointer;
      }
    }
  }

  .GruposImgContatos,
  .MenuFechar {
    display: none;
  }

  @media screen and (min-width: 50px) and (max-width: 768px) {
    margin-right: 1px;
    margin-left: -16px;
    margin-bottom: -8px;
    width: 100vh;
    margin-top: -9px;
    .navbar-collapse .navbar-nav {
      display: flex;
      padding: 50px 50px 0 50px;
      /*  div {
        margin-top: 50px;
      } */
      a {
        font-size:18px;
      }
    }
    hr {
      color: #0093ff;
      background-color: #002b4f;
      height: 2;
    }

    .show,
    .collapse {
      height: 100vh;
    }
    .collapsing {
      height: 100vh;
    }
    .GruposImgContatos {
      display: block;
      img {
        margin-top: 10px;
      }
    }
    .MenuFechar {
      display: block;
      margin: 43px;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export const ConjuntoTop = styled.div`
  display: flex;
  flex-direction: row;
  .logoDiferencias {
    cursor: pointer;
  }
  > img {
    height: 60px;
    margin-top: 15px;
  }
  @media screen and (min-width: 50px) and (max-width: 768px) {
    .logoDiferencias > img {
      /* width: 70px; */
      height: 34px;
      margin-top: 15px;
      margin-left: -40px;
    }
  }
`;

export const ConjuntoButtonTel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div {
    font-size: 16px;
    color: #fff;
    margin-left: 10px;
  }

  .butaodesktop {
    display: show;
  }
  .butaomobile {
    display: none;
  }

  @media (max-width: 700px) {
    margin-left: 10px;
    > div {
      font-size: 10px;
    }

    .butaodesktop {
      display: none !important;
    }
    .butaomobile {
      display: block !important;
    }
  }
`;

export const BarraMenuTopo1 = styled.div`
  position: fixed;
  display: flex;
  padding: 10px;
  top: 0px;
  right: 0;
  left: 0;
  z-index: 1030;
  background: #fff;
  justify-content: space-between;
  height: 100px;
  align-items: center;
  @media screen and (min-width: 50px) and (max-width: 768px) {
    display: none;
  }
  padding-right: 0px !important;
`;

export const LogoTop = styled.span`
  /* padding: 0px 160px; */
  a {
    margin-left: 30px;
  }
  span {
    margin-left: 11px;
  }
`;

export const MenuTop = styled.span`
  padding-top: 6px;
  a {
    color: #1c3661;
  }
  a:hover {
    opacity:0.9;
    color: rgb(28 54 97);
  }
  img {
    padding-left: 5px;
  }
  .dropdown-item {
    color: black !important;
  }

  .dropdown {
    font-size: 14px;
    font-weight: 700;
    color: #1c3661;
  }
`;

export const ContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  .modal-open {
    padding-right: 0px !important;
    overflow-y: scroll;
  }
`;

export const TelefoneWhatzap = styled.div`
  @media screen and (min-width: 50px) and (max-width: 768px) {
    display: show;
    margin-right: 21px;
    margin-top: -14px;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

export const LogoUniftcMobile = styled.div`
  @media screen and (min-width: 50px) and (max-width: 768px) {
    display: show;
    img {
      width: 167px;
      height: 76px;
      margin-left: 20px;
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

export const LogosMobile = styled.div`
  @media screen and (min-width: 50px) and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-items: center;
    justify-content: space-around;
    width: 217px;
  }
`;

export const ContainerBlocoModal = styled.section`
  max-width: 100%;
  /* margin: 0 auto; */
  display: flex;
  /* border: 1px solid #ccc; */
  flex-direction: row;
  margin-top: 10px;
  @media screen and (min-width: 50px) and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const TextoTituloModal = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  @media screen and (min-width: 50px) and (max-width: 768px) {
    font-size: 20px;
  }
`;
export const BlocoModal = styled.div`
  flex: 1;
  /* margin: 5px; */
  background: ${(props) => (props.background ? props.background : "#1c3661;")};
  text-align: center;
  font-size: 1.5em;
  color: #fff;
  > div {
    font-size: 18px;
    margin: 27px 0;
  }
`;
const initialState = {
  /* id: 0, */
  faculdade: "uniftc",
};


const Header = () => {
  const [show, setShow] = useState(false);
  const [mostrarSideBar, setMostrarSideBar] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [profileState, setProfileState] = useState();
  const [value, setValue] = useState("");

  const [expanded, setExpanded] = useState(false);


  const navToggle = () => {
    setExpanded(expanded ? false : true);
  };

  const abrirSideBarWhatsapp = () => {
    setMostrarSideBar(!mostrarSideBar);
  }

  const closeNav = () => {
    setExpanded(false);
  };

/*   useEffect(() => {
    setProfileState(main);
  }, [main]);
 */
const fdiAbas = useSelector((state) => state.fdi.fdi);
  useEffect(() => {
  
    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
  }, []);

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <Image src={Setinha} />
    </a>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <section id="header">
      <ModalMatriucla onAbreModal={show} onFecharModal={() => setShow(false)} size="xl" />
      <BarraMenuTopo1>
        <ContainerTop className="container">
          

          <LogoTop>
            <img src={'/imagens/logo_top.svg'} className="img-responsive"  />
            <a
              href="https://api.whatsapp.com/send?phone=5571988357245&text=Ol%C3%A1,%20UNIFTC"
              className="vest-iniciar-conversa"
            >
              <Whatsapp />
            </a>
            <ButtonContatos />
          </LogoTop>
          <MenuTop>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                className={"acompanhar_inscricao"}
              >
                Acompanhar minha inscrição
              </Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu}>
                {fdiAbas &&
                  fdiAbas.map((x) => {
                    return (
                      <Dropdown.Item
                        key={x.posicao}
                        href={`https://inscricao.uniftc.edu.br/Login/${x.concurso}${utms()}`}
                        eventKey={x.posicao}
                        className="acompanhar-inscricao"
                      >
                        {x.nome_no_acompanhamento}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </MenuTop>
        </ContainerTop>
      </BarraMenuTopo1>

      <HeaderSite id="home">
        <Navbar
          fixed="top"
          expand="lg"
          className="topsecundario_novo"
          expanded={expanded}
        >
          <Navbar.Toggle
            aria-controls=" basic-navbar-nav"
            onClick={navToggle}
          ></Navbar.Toggle>
          <Navbar.Brand href="#home">
            <LogosMobile>
              <LogoUniftcMobile>
                <Image src={logoTop} />
              </LogoUniftcMobile>
            </LogosMobile>
          </Navbar.Brand>
          <TelefoneWhatzap>
            {" "}
            <a
              href="#"
              onClick={abrirSideBarWhatsapp}
            >
              <Image
                src={telefone}
                className="d-inline-block align-top vest-iniciar-conversa"
                alt="UNIFTC Whatsapp"
              />
            </a>
          </TelefoneWhatzap>
          <BarraMenuTopo className="container">
            <Navbar.Collapse>
              <Nav className="navbar-nav">
                <div>
                  <a
                    href="https://uniftc.minhaescolha.com.br" target="_blank"
                  >
                    Teste Vocacional
                  </a>
                </div>
                <hr />
                <div>
                  <a
                     onClick={
                      handleShow
                    }
                  >
                    Matrícula
                  </a>
                </div>
                <hr />
                <div>
                  <a href="https://www.uniftc.edu.br/graduacao/resultados" target="_blank">
                    Resultados
                  </a>
                </div>
                <hr />
                <div>
                  <a
                    target="_blank"
                    href="https://www.uniftc.edu.br/graduacao/edital-manual-e-regulamentos/"
                  >
                    Editais e regulamentos
                  </a>
                </div>
                <hr />
                <div className="GruposImgContatos">
                  <img src={'/imagens/Menu_Fale_pelo_Whatsapp.svg'} />
                  <img src={'/imagens/Menu_contatos.svg'} />
                </div>
                <div className="MenuFechar">
                  <img src={'/imagens/Menu_Fechar.svg'} onClick={closeNav}/>
                </div>
              </Nav>
            </Navbar.Collapse>
          </BarraMenuTopo>
        </Navbar>
       {/*  <SideBarWhatsapp onAbreSideBarWhatsapp={mostrarSideBar} fecharPainel={(val)=>setMostrarSideBar(val)}/> */}
      </HeaderSite>
    </section>
  );
};




export default Header;
