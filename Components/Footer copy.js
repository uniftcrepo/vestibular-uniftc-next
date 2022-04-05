import React, { useEffect } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import logoRodape from "../imagens/logo_rodape.png";
import styled from "styled-components";
import ButtonClickLink from "../Components/elementos/ButtonClickLink";
import { Link } from "react-scroll";
import logoBottom from "../imagens/logo_top.png";
import whatsapp from "../imagens/whatsapp.png";
import whatsapp0800 from "../imagens/whatsapp.svg";
import Contato from "../imagens/entre_em_contato.svg";
import instagram from "../imagens/instagram.png";
import facebook from "../imagens/facebook.png";
import telefone0800 from "../imagens/0800.svg";
import { DATA } from "../utils/data";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getFdi } from "../../store/modules/fdi/actions";
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

export const LogoFooter = styled.img`
  /*  margin-top: -221px;
  margin-bottom: -12px;
  margin-left: -23px; */
  margin-left: -23px;
  margin-top: -32px;
  @media screen and (min-width: 50px) and (max-width: 768px) {
    margin-top: unset !important;
    /*  display: none; */
  }
`;

export const ConjuntoBottom = styled.div`
  padding-top: 50px;
  width: 100%;

  .logoDiferencias {
    cursor: pointer;
  }
  > img {
    /*  height: 120px; */
    margin-top: -30px;
  }
`;

export const Vestibular = styled.div`
  @media (max-width: 700px) {
    margin-top: 20px;
  }

  .vestibular_uni {
    font-size: 12px;

    color: #666666;
    cursor: pointer;
    margin-bottom: 20px;
    text-decoration: none;
    :hover {
      color: #ffffff;
    }
  }

  .vestibular_uni_div {
    font-size: 12px;
    color: #666666;
    /* margin-left: auto; */
    margin-bottom: 20px;
  }
`;

export const Rodape = styled.div`
  height: 550px;
  @media (max-width: 700px) {
    /*  width: 100vh; */
    flex-direction: column;
    height: 800px;
  }
`;

export const Texto = styled.div`
  font-size: 10px;
  color: #cccccc;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  margin-top: -17px;
`;
export const LogoBottom = styled.div`
  justify-content: right;
`;

export const Linha = styled.hr`
  display: none;
  @media (max-width: 700px) {
    display: flex;
    margin-top: 40px;
    hr {
      border: 1;
      border-top: 1px solid rgba(0, 0, 0, 0.25);
    }
  }
`;

const Footer = () => {
  const dispatch = useDispatch();
  const fdiAbas = useSelector((state) => state.fdi.fdi);

  useEffect(() => {
    /* dispatch(getFdi()); */
    //console.log(fdiAbas);
  }, [dispatch]);
  return (
    <footer id="footer">
      <Rodape className="footer_novo">
        <Container>
          <ConjuntoBottom>
            <Row>
              <Col lg={5} xs={12}>
                <LogoBottom>
                  <LogoFooter
                    src={logoBottom}
                    className="item "
                    className="img-responsive"
                  />
                  <Texto>
                    IMES - Instituto Mantenedor de Ensino Superior da Bahia Ltda{" "}
                    <br />
                    CNPJ 04.670.333/000-89
                  </Texto>
                  <Linha />
                </LogoBottom>
              </Col>
              <Col lg={2} xs={12}>
                <Vestibular className="item">
                  <div className="vestibular_uni_div">
                    Vestibular UniFTC 2021.2
                  </div>
                  {fdiAbas &&
                    fdiAbas.map((x) => {
                      return (
                        <p key={Math.random()}>
                          <a
                            className="vestibular_uni"
                            href={`https://inscricao.uniftc.edu.br/Login/${x.concurso}`}
                          >
                            {x.nome_da_aba}
                          </a>
                        </p>
                      );
                    })}
                  <p>
                    <a
                      className="vestibular_uni"
                      href={`https://uniftc.edu.br/convenios/`}
                    >
                      Convênios
                    </a>
                  </p>
                  <p>
                    {" "}
                    <a
                      className="vestibular_uni vest-site-uniftc"
                      href="https://uniftc.edu.br/politica-de-privacidade"
                    >
                      Política de Privacidade
                    </a>
                  </p>
                  <p>
                    {" "}
                    <a
                      className="vestibular_uni vest-site-uniftc"
                      href="https://redeuniftc-privacy.my.onetrust.com/webform/72c77247-e798-4098-ac50-ef3cd6627021/f4306a95-7f68-40d4-a8e3-3a1a41d4d3d7"
                    >
                      Solicitação do titular de dados
                    </a>
                  </p>
                  <a
                    className="vestibular_uni vest-site-uniftc"
                    href="https://uniftc.edu.br"
                  >
                    Ir para o site da UniFTC
                  </a>
                </Vestibular>
              </Col>

              <Col lg={5} xs={12}>
                <Linha />
                <div className="interna-rodape-rede-sociais ">
                  <div className="menu-redes-sociais ">
                    <div className="contato">
                      <a href="https://api.whatsapp.com/send?phone=5571988357245&text=Ol%C3%A1,%20UNIFTC">
                        <Image
                          src={Contato}
                          className="img-responsive vest-iniciar-conversa"
                          fluid
                        />
                      </a>
                      <a
                        href="Tel:08000566666"
                        className="telefone0800 vest-ligar"
                      >
                        Ou ligue 0800 056 6666
                      </a>
                    </div>

                    <div className="icons-reede-sociais">
                      <a href="https://api.whatsapp.com/send?phone=5571988357245&text=Ol%C3%A1,%20UNIFTC">
                        <Image src={whatsapp} />
                      </a>

                      <a
                        href="https://www.instagram.com/uniftcsalvador/"
                        target="_blank"
                      >
                        <Image src={instagram} />
                      </a>
                      <a
                        href="https://www.facebook.com/uniftcoficial"
                        target="_blank"
                      >
                        <Image src={facebook} />
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </ConjuntoBottom>
        </Container>
      </Rodape>
    </footer>
  );
};

export default Footer;
