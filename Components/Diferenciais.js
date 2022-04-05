import React from "react";
/* import background from "../imagens/background_diferenciais.png";
import seta_rosa from "../imagens/seta-rosa.png"; */
/* import "../styled/styles_novo.scss"; */
/* import "../styled/boardz.scss"; */
/* import "../styled/wing.min.css"; */
import styled, { css, createGlobalStyle } from "styled-components";
/* import Popover from "react-bootstrap/Popover";
import backImage from "../utils/dataFdi";
import OverlayTrigger from "react-bootstrap/OverlayTrigger"; */
/* import parse from "html-react-parser";
import { DATA } from "../utils/data";
import seta from "../imagens/aviaozinho.png";
*/
import { Link } from "react-scroll";
import Button from "./elementos/ButtonClickLink";

export const Container = styled.div`
  /*
body {	
    background-color: #1C3661;
    margin: 0;
    padding: 0;
    color: #000;
    font-family: 'Open Sans', sans-serif;
}
*/
 .row{
    margin-right: 0px;
    margin-left: 0px;
 }
  @font-face {
    font-family: "Roboto";
    src: url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,500;1,700;1,900&display=swap");
  }
  #corpo-centro {
    background-color: #1c3661;
    padding-bottom: 40px;
  }

  /***************************
        .Seja FTC
***************************/
  .campanha {
    /*  font-style: italic; */
    font-weight: 700;
    font-size: 48px;
    line-height: 45px;
    margin-top: 0px;
    margin-bottom: 110px;
    padding-top: 20px;
    background-color: #1c3661;
    position: relative;
  }

  .campanha p {
    /* font-style: italic; */
    font-weight: 700;
    font-size: 45px;
    line-height: 50px;
    color: #ffffff;
    text-align: left;
    padding-left: 47%;
    padding-top: 40px;
  }

  .ftc {
    text-align: center;
    color: #0d4e9c;
    font-size: 40px;
    font-weight: bold;
  }

 /*  #passaro {
    position: absolute;
    left: 11.5%;
    top: 259%;
    z-index: 1000;
  } */
  .marcador_titulo {
    color: #0093ff;
  }

  /****************************
BOX 1
****************************/

  .caixa {
    padding-left: 50px;
    padding-right: 50px;
    vertical-align: middle;
    text-align: left;
  }

  #box1 {
    background-color: #1c3661;
    text-align: right;
  }

  #box2 {
    background-color: #1c3661;
    text-align: center;
  }

  #box3 {
    background-color: #1c3661;
  }

  #box4 {
    background-color: #1c3661;
  }

  #box5 {
    background-color: #1c3661;
    margin-top: 70px;
    margin-bottom: 104px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  #box5 .box5Texto {
    align-self: center;
    color: #fff;
    font-size: 36px;
    font-style: italic;
    font-weight: bold;
    /* font-family: "Roboto"; */
  }

  #box5 .box5Button {
    margin-left: auto;
    margin-right: auto;
  }

  #box1 h3,
  #box3 h3 {
    /*  font-style: italic; */
    font-weight: 600;
    font-size: 36px;
    color: #ffffff;
    padding-left: 20px;
    margin-bottom: 30px;
    margin-top: 20px;
  }

  #box2 h3,
  #box4 h3 {
    /* font-style: italic; */
    font-weight: 600;
    font-size: 30px;
    line-height: 40px;
    color: #ffffff;
    padding-left: 35%;
    text-align: left;
    margin-bottom: 30px;
    margin-top: 20px;
  }

  #box1 .texto,
  #box3 .texto {
    /**/
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #ffffff;
    padding-right: 18%;
    padding-left: 20px;
  }

  #box1 .topicos,
  #box3 .topicos {
    /**/
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 32px;
    color: #ffffff;
    padding-right: 130px;
    padding-left: 20px;
  }

  #box2 .texto,
  #box4 .texto {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #ffffff;
    padding-left: 35%;
    text-align: left;
  }

  #box1 .foto,
  #box3 .foto {
    text-align: right;
  }

  #box2 .foto,
  #box4 .foto {
    text-align: left;
  }

  .marca_menor_dir {
    position: absolute;
    left: -2%;
    right: 0;
    top: 6%;
    bottom: 0%;
  }

  .marca_menor_esq {
    position: absolute;
    left: 24.5%;
    right: 0;
    top: 7%;
    bottom: 0%;
  }

  .marcador_texto {
    color: #f31970;
  }
    #passaro {
      position: absolute;
      left: calc((100% - 63rem) / 2);
      top:  -45%;
      z-index: 2;
    }

  @media screen and (min-height: 769px) and (max-height: 976px){
   /*  #passaro {
      position: absolute;
      left: calc((100% - 58rem) / 2);
      top: calc((100% + 288rem) / 2);
      z-index: 2;
    } */
  }

  @media screen and (min-width: 50px) and (max-width: 768px) {
    .campanha p {
      /*  font-style: italic; */
      font-weight: 900;
      font-size: 45px;
      line-height: 63px;
      color: #ffffff;
      text-align: center;
      padding-left: 6%;
      /*  margin-left: 20px;
      margin-right: 20px; */
    }

    .campanha {
      background-color: #1c3661;
      /*  margin-top: 488px; */
      margin-bottom: 20px;
      text-align: center;
    }

    #box1 h3,
    #box2 h3,
    #box3 h3,
    #box4 h3 {
      vertical-align: middle;
      margin-top: 30px;
      font-size: 30px;
      text-align: left;
      padding-left: 26%;
      line-height: 40px;
    }

    #box1 .texto,
    #box3 .texto {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      color: #ffffff;
      text-align: left;
      padding-right: 10%;
      padding-left: 10%;
    }

    #box2 .texto,
    #box4 .texto {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      color: #ffffff;
      text-align: left;
      padding-right: 10%;
      padding-left: 7%;
    }

    #box1 .topicos {
      /**/
      font-size: 14px;
      text-align: left;
      line-height: 24px;
    }

    .marca_menor_dir {
      position: absolute;
      left: 9%;
      right: 0;
      top: -83%;
      bottom: 0%;
    }

    .marca_menor_esq {
      position: absolute;
      left: 9%;
      right: 0;
      top: -71%;
      bottom: 0%;
    }

    .aviao_box3 {
      position: absolute;
      left: 9%;
      right: 0;
      top: -67%;
      bottom: 0%;
    }

    .aviao_box4 {
      position: absolute;
      left: 9%;
      right: 0;
      top: -57%;
      bottom: 0%;
    }

    .aviao_box5 {
      position: absolute;
      left: 9%;
      right: 0;
      top: -75%;
      bottom: 0%;
    }

    .aviao_box6 {
      position: absolute;
      left: 9%;
      right: 0;
      top: -72%;
      bottom: 0%;
    }

    .aviao_box7 {
      position: absolute;
      left: 9%;
      right: 0;
      top: -114%;
      bottom: 0%;
    }

    .aviao_box8 {
      position: absolute;
      left: 9%;
      right: 0;
      top: -139%;
      bottom: 0%;
    }

    #box1 .foto,
    #box2 .foto,
    #box3 .foto,
    #box4 .foto {
      text-align: center;
      z-index: 1;
    }

    .caixa {
      padding-left: 0px;
      padding-right: 0px;
      text-align: left;
    }

    .row {
      margin-right: unset;
      margin-left: unset;
    }
    #box5 {
      margin-bottom: 31px;
    }

    #box5 .box5Texto {
      font-size: 20px;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1000px) {
    #box1 h3,
    #box2 h3,
    #box3 h3,
    #box4 h3 {
      vertical-align: middle;
      margin-top: 30px;
      font-size: 30px;
    }

    #box1 .texto,
    #box2 .texto,
    #box3 .texto,
    #box4 .texto {
      text-align: center;
      margin-top: 20px;
      font-size: 18px;
      padding-left: 5px;
      padding-right: 5px;
      text-align: justify;
    }
  }

/*   @media screen and (min-width: 1001px) and (max-width: 1134px){
    #passaro {
      position: absolute;
      left: calc((100% - 58rem) / 2);
      top: calc((100% + 288rem) / 2);
      z-index: 2;
    }
  } 
   @media screen and (min-width: 1135px) and (max-width: 1440px){
    #passaro {
      position: absolute;
      left: calc((100% - 63rem) / 2);
      top: calc((100% + 255rem) / 2);
      z-index: 2;
    }
  }  */
  @media screen and (min-width: 1441px) and (max-width: 1920px){
    #box2 h3,
    #box4 h3 {
      /*  font-style: italic; */
      font-weight: 600;
      font-size: 36px;
      line-height: 40px;
      color: #ffffff;
      padding-left: 45%;
      text-align: left;
      margin-bottom: 30px;
    }

    #box2 .texto,
    #box4 .texto {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      color: #ffffff;
      padding-left: 45%;
      text-align: left;
    }

    #box1 .texto,
    #box3 .texto {
      /**/
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      color: #ffffff;
      padding-right: 35%;
      padding-left: 18px;
    }

    .marca_menor_dir {
      position: absolute;
      left: -2%;
      right: 0;
      top: 6%;
      bottom: 0%;
    }

    .marca_menor_esq {
      position: absolute;
      left: 37%;
      right: 0;
      top: 7%;
      bottom: 0%;
    }

  /*   #passaro {
      position: absolute;
      left: calc((100% - 63rem) / 2);
      top:  calc((100% + 259rem) / 2);
      z-index: 2;
    } */
  }
 
`;

function Diferenciais() {
  return (
    <Container id="diferenciais">
      <div id="corpo-centro">
        <div className="row campanha">
          <p>
            Diferenciais da{" "}
            <span className="marcador_titulo">
              <br />
              UNIFTC
            </span>
          </p>

          <div id="passaro" className="d-none d-sm-block">
            <svg
              width="450"
              height="419"
              viewBox="0 0 450 419"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00674 78.4763L291.676 240L447.927 17.7927C453.587 9.73213 446.902 -1.06399 436.992 0.084534L14.2218 49.2621C-1.13417 51.0371 -5.34165 70.8752 8.00674 78.4763Z"
                fill="white"
              />
              <path
                d="M137 209L142.502 402.246C142.97 418.899 164.512 425.234 173.987 411.505L292.172 240.081L137 209Z"
                fill="#F31970"
              />
            </svg>
          </div>
        </div>

        <div className="row box1" id="box1">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Trilha de Aprendizagem
          </h3>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <img src={'/imagens/img-01.png'} />
          </div>

          <div className="d-lg-none d-md-none d-sm-none container foto">
            <img src={'/imagens/mob/mob-img-01.png'} />
          </div>

          <div className="col-md-7 col-sm-7 col-xs-12 caixa">
            <svg
              className="marca_menor_dir"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <h3 className="d-none d-sm-block">Trilha de Aprendizagem </h3>
            <p className="texto">
              O <b>Projeto Pedagógico da UniFTC</b> é destinado à formação e ao
              desenvolvimento de:
            </p>

            <ul className=" texto topicos">
              <li> Habilidades técnicas e comportamentais</li>
              <li> Capacidade de Gestão e Liderança</li>
              <li> Uso da inteligência emocional</li>
              <li> Raciocínio para solucionar problemas complexos</li>
              <li> Trabalho em Equipe</li>
            </ul>

            <p className="texto">
              A nossa <b>Trilha de Aprendizagem</b> é ancorada no Currículo por{" "}
              <b>Competências</b>, na utilização de{" "}
              <b>Ferramentas Tecnológicas e Digitais</b> e no uso de{" "}
              <b>Metodologias Ativas de aprendizado.</b>
            </p>
          </div>
        </div>

        <br />

        <div className="row box2" id="box2">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Entre no Movimento Digital FTC{" "}
          </h3>

          <div className="d-lg-none d-md-none d-sm-none container foto">
            <img src={'/imagens/mob/mob-img-02.png'} />
          </div>

          <div className="col-md-7 col-sm-7">
            <svg
              className="marca_menor_esq"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <h3 className="d-none d-sm-block">
              Modelo de Educação Interprofissional em Saúde{" "}
            </h3>
            <p className="texto">
              Os cursos da Área da Saúde{" "}
              da UniFTC atuam sob o Modelo de Educação Interprofissional.
            </p>
            <p className="texto">
              Este método une duas ou mais práticas profissonais, em situações
              de aprendizagem e resolução de problemas, e centram as suas ações
              em atividades conjuntas e específicas para cada área de
              conhecimento.
            </p>
            <p className="texto">
              Com a Educação Interprofissional, conseguimos articular melhor o
              ensino, a extensão e a pesquisa junto ao alinhamento do nosso
              Projeto Pedagógico Institucional, que expressa e prioriza a
              perspectiva da formação de profissionais éticos e comprometidos
              com a sociedade em que vivem.
            </p>
          </div>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <img src={'/imagens/img-02.png'} />
          </div>
        </div>

        <br />

        <div className="row box3" id="box3">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Metodologias <br />
            Ativas
          </h3>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <img src={'/imagens/img-03.png'} />
          </div>

          <div className="d-lg-none d-md-none d-sm-none container foto">
            <img src={'/imagens/mob/mob-img-03.png'} />
          </div>

          <div className="col-md-7 col-sm-7 col-xs-12 caixa">
            <svg
              className="marca_menor_dir d-none d-sm-block"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <svg
              className="aviao_box3 d-lg-none d-md-none d-sm-none"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <h3 className="d-none d-sm-block">Metodologias Ativas</h3>
            <p className="texto">
              O principal objetivo das Metodologias Ativas é a inserção do
              estudante como o agente principal nos processos de aprendizagem.
            </p>
            <p className="texto">
              Através da utilização das Metodologias Ativas, a UniFTC oferece as
              ferramentas necessárias para que você assuma o protagonismo em
              todo o processo de geração do conhecimento durante as aulas e nos
              espaços de práticas específicas de cada área.
            </p>
            <p className="texto">
              A metodologia de Sala de Aula Invertida, a Pré aula e a Pós aula,
              propiciam a preparação para os processos de aprendizado e também
              práticas mais eficientes na troca de conhecimentos em grupo e
              vivências extracurriculares, além de inúmeros outros elementos que
              compõem o cenário ideal para que você esteja no centro da sua
              aprendizagem.
            </p>
          </div>
        </div>

        <br />

        <div className="row box4" id="box4">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Centro de Carreiras{" "}
          </h3>

          <div className="d-lg-none d-md-none d-sm-none container foto">
            <img src={'/imagens/mob/mob-img-04.png'} />
          </div>

          <div className="col-md-7 col-sm-7 ">
            <svg
              className="marca_menor_esq d-none d-sm-block"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <svg
              className="aviao_box4 d-lg-none d-md-none d-sm-none"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <h3 className="d-none d-sm-block">Centro de Carreiras</h3>
            <p className="texto">
              O Centro de Carreiras da UniFTC
              atua através da prestação de serviços gratuitos aos estudantes a
              partir de orientações profissionais, estruturação de currículos e
              muito mais.
            </p>
            <p className="texto">
              Ele tem a função de promover ações contínuas de desenvolvimento e
              assessoramento da formação profissional do estudante, facilitando
              a relação do aluno com grandes empresas e segmentos corporativos
              através de estágios e parcerias de pesquisa.
            </p>
            <p className="texto">
              O maior compromisso da UniFTC é o de lhe oferecer uma graduação
              atual e inovadora desde o primeiro semestre. Por isso, investimos
              tanto na sua formação acadêmica quanto profissional, passando pelo
              ensino teórico de cada área, experiências práticas e, claro, pelo
              planejamento de sua carreira e empregabilidade.
            </p>
          </div>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <img src={'/imagens/img-04.png'} />
          </div>
        </div>

        <br />

        <div className="row box1" id="box1">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Ferramentas Tecnológicas de auxílio à Aprendizagem
          </h3>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <img src={'/imagens/img-05.png'} />
          </div>

          <div className="d-lg-none d-md-none d-sm-none  container foto">
            <img src={'/imagens/mob/mob-img-05.png'} />
          </div>

          <div className="col-md-7 col-sm-7 col-xs-12 caixa">
            <svg
              className="marca_menor_dir d-none d-sm-block"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <svg
              className="aviao_box5 d-lg-none d-md-none d-sm-none"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <h3 className="d-none d-sm-block">
              Ferramentas Tecnológicas de <br />
              auxílio à Aprendizagem{" "}
            </h3>
            <p className="texto">
              Para caminhar em direção ao futuro é preciso estar presente no
              mundo a partir da conectividade. Nós acreditamos que a tecnologia
              contribui com as dinâmicas de ensino e, por isso, investimos em
              ferramentas disruptivas que auxiliam na sua aprendizagem. Todas as
              Unidades UniFTC possuem recursos multimídia e conexão wifi, as
              aulas são preparadas com planejamento didático, materiais digitais
              e simulações de problemas no ambiente virtual. Criamos uma rede de
              comunicação direta e interativa entre alunos x corpo docente x
              instituição e lhe oferecemos instalações com o máximo de conforto
              e conectividade, como a Sala Google, para que você
              se insira nas principais tendências globais.
            </p>
          </div>
        </div>

        <br />

        <div className="row box2" id="box2">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Clínicas <br />
            Escola{" "}
          </h3>

          <div className="d-lg-none d-md-none d-sm-none container foto">
            <img src={'/imagens/mob/mob-img-06.png'} />
          </div>

          <div className="col-md-7 col-sm-7 ">
            <svg
              className="marca_menor_esq d-none d-sm-block"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <svg
              className="aviao_box6 d-lg-none d-md-none d-sm-none"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <h3 className="d-none d-sm-block">Clínicas Escola </h3>
            <p className="texto">
              As Clínicas Escola da UniFTC atuam como projetos de extensão
              universitária e disponibilizam atendimentos gratuitos – ou a
              preços acessíveis - para a comunidade. Através delas, você,
              estudante, tem a oportunidade de exercitar, por meio da prática
              monitorada, todo o conhecimento que adquire em sala de aula. Ou
              seja, com as Clínicas Escola você treina as suas habilidades e
              desenvolve as competências necessárias que vão desde o atendimento
              aos pacientes até as práticas de gestão de pesquisas e
              diagnósticos. Esse é o nosso investimento para que você se torne
              um profissional totalmente preparado para os desafios do mercado
              de trabalho.
            </p>
            <p className="texto">
              Faça um Giro Virtual
              pela nossa estrutura.
            </p>
          </div>

          <div className="col-md-5 col-sm-5 d-none d-sm-block container foto">
            <img src={'/imagens/img-06.png'} />
          </div>
        </div>

        <br />

        <div className="row box3" id="box3">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Conta Google Ilimitada e Vitalícia
          </h3>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <img src={'/imagens/img-07.png'} />
          </div>

          <div className="d-lg-none d-md-none d-sm-none container foto">
            <img src={'/imagens/mob/mob-img-07.png'} />
          </div>

          <div className="col-md-7 col-sm-7 col-xs-12 caixa">
            <svg
              className="marca_menor_dir d-none d-sm-block"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <svg
              className="aviao_box7 d-lg-none d-md-none d-sm-none"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <h3 className="hidden-xs d-none d-sm-block">
              Conta Google Ilimitada <br />e Vitalícia
            </h3>
            <p className="texto">
              Na UniFTC, seu conhecimento se amplia com uma conta google de
              espaço ilimitado para armazenamento de mensagens e arquivos. E o
              melhor: essa conta é vitalícia, ou seja, ela continua para sempre
              com você mesmo após a conclusão do seu curso. Salve todos os seus
              conteúdos, edite e compartilhe com quem você quiser direto da
              nuvem. Trabalhos, pesquisas, arquivos, vídeo-aulas, armazene tudo
              isso de maneira ilimitada pelo tempo que você precisar.
            </p>
          </div>
        </div>
        <br />

        <div className="row box4" id="box4">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Direito a <br />
            produtos <br />
            Microsoft{" "}
          </h3>

          <div className="d-lg-none d-md-none d-sm-none container foto">
            <img src={'/imagens/mob/mob-img-08.png'} />
          </div>

          <div className="col-md-7 col-sm-7 ">
            <svg
              className="marca_menor_esq d-none d-sm-block"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <svg
              className="aviao_box8 d-lg-none d-md-none d-sm-none"
              width="60"
              height="56"
              viewBox="0 0 60 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06757 10.4635L38.8902 32L59.7236 2.37235C60.4782 1.29762 59.5869 -0.141865 58.2656 0.0112712L1.89624 6.56828C-0.151222 6.80494 -0.71222 9.45002 1.06757 10.4635Z"
                fill="white"
              />
              <path
                d="M18.6206 28L19.3543 53.7662C19.4166 55.9866 22.2889 56.8312 23.5522 55.0007L39.3103 32.1442L18.6206 28Z"
                fill="#F31970"
              />
            </svg>

            <h3 className="d-none d-sm-block">
              Direito a produtos <br /> Microsoft
            </h3>
            <p className="texto">
              Durante toda sua formação profissional na UniFTC, você terá
              direito de uso de diversos produtos Microsoft. Estão incluídas
              nessa lista alguns dos principais softwares da gigante da
              informática, como o sistema operacional Windows, o pacote Office,
              e até mesmo a plataforma Microsoft Imagine, um conjunto de
              ferramentas, softwares e serviços profissionais de programação.
            </p>
          </div>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <img src={'/imagens/img-01.png'} />
          </div>
        </div>
        <div id="box5">
          <div className="box5Texto">Movimente o seu futuro com a UniFTC</div>
          <div className="box5Button">
            {" "}
            <Link
                  href="#"
                  className="nav-link-menu"
                  activeClass="active"
                  to="formaIngresso"
                  spy={true}
                  smooth={true}
                  offset={-155}
                  duration={400}
                  
                >
            <Button
              cor="#F31970"
              texto={"Quero me inscrever"}
              tamanho={"293px"}
              tamanhoMobile={"220px"}
              /*  link={url_matricula} */
              borderSolid={"2px solid #F31970"}
              colorTexto={"#fff"}
              fonteSize={"18px"}
              fonteSizeMobile={"12px"}
              padding={"0px 6px 0px 0px"}
              paddingMobile={"0px 6px 0px 0px"}
              height={"40px"}
              marginLeft={"unset"}
              marginTop={"unset"}
              marginTopMobile={"3px"}
              fonteWeight={"700"}
              borderRadius={"2px"}
              fonteStyle={"italic"}
              boxShadow={" inset 0px -2px 0px rgba(0, 0, 0, 0.25)"}
              onClick={()=>{}}
              hover={"#F31970"}
            />
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Diferenciais;
