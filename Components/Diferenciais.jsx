import React from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import { ImageLoad } from "../hooks/ImageLoad";

import { Link } from "react-scroll";
import Button from "./elementos/ButtonClickLink";

export const Container = styled.div`
 
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


  @media ${({ theme }) => theme.breakpoints.mobile} {
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
            <ImageLoad tipo="diferenciais" src={'/imagens/img-01.png'} />
          </div>

          <div className="d-lg-none d-md-none d-sm-none container foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/mob/mob-img-01.png'} />
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
              O <b>Projeto Pedag??gico da UniFTC</b> ?? destinado ?? forma????o e ao
              desenvolvimento de:
            </p>

            <ul className=" texto topicos">
              <li> Habilidades t??cnicas e comportamentais</li>
              <li> Capacidade de Gest??o e Lideran??a</li>
              <li> Uso da intelig??ncia emocional</li>
              <li> Racioc??nio para solucionar problemas complexos</li>
              <li> Trabalho em Equipe</li>
            </ul>

            <p className="texto">
              A nossa <b>Trilha de Aprendizagem</b> ?? ancorada no Curr??culo por{" "}
              <b>Compet??ncias</b>, na utiliza????o de{" "}
              <b>Ferramentas Tecnol??gicas e Digitais</b> e no uso de{" "}
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
            <ImageLoad tipo="diferenciais" src={'/imagens/mob/mob-img-02.png'} />
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
              Modelo de Educa????o Interprofissional em Sa??de{" "}
            </h3>
            <p className="texto">
              Os cursos da ??rea da Sa??de{" "}
              da UniFTC atuam sob o Modelo de Educa????o Interprofissional.
            </p>
            <p className="texto">
              Este m??todo une duas ou mais pr??ticas profissonais, em situa????es
              de aprendizagem e resolu????o de problemas, e centram as suas a????es
              em atividades conjuntas e espec??ficas para cada ??rea de
              conhecimento.
            </p>
            <p className="texto">
              Com a Educa????o Interprofissional, conseguimos articular melhor o
              ensino, a extens??o e a pesquisa junto ao alinhamento do nosso
              Projeto Pedag??gico Institucional, que expressa e prioriza a
              perspectiva da forma????o de profissionais ??ticos e comprometidos
              com a sociedade em que vivem.
            </p>
          </div>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/img-02.png'} />
          </div>
        </div>

        <br />

        <div className="row box3" id="box3">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Metodologias <br />
            Ativas
          </h3>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/img-03.png'} />
          </div>

          <div className="d-lg-none d-md-none d-sm-none container foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/mob/mob-img-03.png'} />
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
              O principal objetivo das Metodologias Ativas ?? a inser????o do
              estudante como o agente principal nos processos de aprendizagem.
            </p>
            <p className="texto">
              Atrav??s da utiliza????o das Metodologias Ativas, a UniFTC oferece as
              ferramentas necess??rias para que voc?? assuma o protagonismo em
              todo o processo de gera????o do conhecimento durante as aulas e nos
              espa??os de pr??ticas espec??ficas de cada ??rea.
            </p>
            <p className="texto">
              A metodologia de Sala de Aula Invertida, a Pr?? aula e a P??s aula,
              propiciam a prepara????o para os processos de aprendizado e tamb??m
              pr??ticas mais eficientes na troca de conhecimentos em grupo e
              viv??ncias extracurriculares, al??m de in??meros outros elementos que
              comp??em o cen??rio ideal para que voc?? esteja no centro da sua
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
            <ImageLoad tipo="diferenciais" src={'/imagens/mob/mob-img-04.png'} />
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
              atua atrav??s da presta????o de servi??os gratuitos aos estudantes a
              partir de orienta????es profissionais, estrutura????o de curr??culos e
              muito mais.
            </p>
            <p className="texto">
              Ele tem a fun????o de promover a????es cont??nuas de desenvolvimento e
              assessoramento da forma????o profissional do estudante, facilitando
              a rela????o do aluno com grandes empresas e segmentos corporativos
              atrav??s de est??gios e parcerias de pesquisa.
            </p>
            <p className="texto">
              O maior compromisso da UniFTC ?? o de lhe oferecer uma gradua????o
              atual e inovadora desde o primeiro semestre. Por isso, investimos
              tanto na sua forma????o acad??mica quanto profissional, passando pelo
              ensino te??rico de cada ??rea, experi??ncias pr??ticas e, claro, pelo
              planejamento de sua carreira e empregabilidade.
            </p>
          </div>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/img-04.png'} />
          </div>
        </div>

        <br />

        <div className="row box1" id="box1">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Ferramentas Tecnol??gicas de aux??lio ?? Aprendizagem
          </h3>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/img-05.png'} />
          </div>

          <div className="d-lg-none d-md-none d-sm-none  container foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/mob/mob-img-05.png'} />
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
              Ferramentas Tecnol??gicas de <br />
              aux??lio ?? Aprendizagem{" "}
            </h3>
            <p className="texto">
              Para caminhar em dire????o ao futuro ?? preciso estar presente no
              mundo a partir da conectividade. N??s acreditamos que a tecnologia
              contribui com as din??micas de ensino e, por isso, investimos em
              ferramentas disruptivas que auxiliam na sua aprendizagem. Todas as
              Unidades UniFTC possuem recursos multim??dia e conex??o wifi, as
              aulas s??o preparadas com planejamento did??tico, materiais digitais
              e simula????es de problemas no ambiente virtual. Criamos uma rede de
              comunica????o direta e interativa entre alunos x corpo docente x
              institui????o e lhe oferecemos instala????es com o m??ximo de conforto
              e conectividade, como a Sala Google, para que voc??
              se insira nas principais tend??ncias globais.
            </p>
          </div>
        </div>

        <br />

        <div className="row box2" id="box2">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Cl??nicas <br />
            Escola{" "}
          </h3>

          <div className="d-lg-none d-md-none d-sm-none container foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/mob/mob-img-06.png'} />
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

            <h3 className="d-none d-sm-block">Cl??nicas Escola </h3>
            <p className="texto">
              As Cl??nicas Escola da UniFTC atuam como projetos de extens??o
              universit??ria e disponibilizam atendimentos gratuitos ??? ou a
              pre??os acess??veis - para a comunidade. Atrav??s delas, voc??,
              estudante, tem a oportunidade de exercitar, por meio da pr??tica
              monitorada, todo o conhecimento que adquire em sala de aula. Ou
              seja, com as Cl??nicas Escola voc?? treina as suas habilidades e
              desenvolve as compet??ncias necess??rias que v??o desde o atendimento
              aos pacientes at?? as pr??ticas de gest??o de pesquisas e
              diagn??sticos. Esse ?? o nosso investimento para que voc?? se torne
              um profissional totalmente preparado para os desafios do mercado
              de trabalho.
            </p>
            <p className="texto">
              Fa??a um Giro Virtual
              pela nossa estrutura.
            </p>
          </div>

          <div className="col-md-5 col-sm-5 d-none d-sm-block container foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/img-06.png'} />
          </div>
        </div>

        <br />

        <div className="row box3" id="box3">
          <h3 className="d-lg-none d-md-none d-sm-none">
            Conta Google Ilimitada e Vital??cia
          </h3>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/img-07.png'} />
          </div>

          <div className="d-lg-none d-md-none d-sm-none container foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/mob/mob-img-07.png'} />
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
              Conta Google Ilimitada <br />e Vital??cia
            </h3>
            <p className="texto">
              Na UniFTC, seu conhecimento se amplia com uma conta google de
              espa??o ilimitado para armazenamento de mensagens e arquivos. E o
              melhor: essa conta ?? vital??cia, ou seja, ela continua para sempre
              com voc?? mesmo ap??s a conclus??o do seu curso. Salve todos os seus
              conte??dos, edite e compartilhe com quem voc?? quiser direto da
              nuvem. Trabalhos, pesquisas, arquivos, v??deo-aulas, armazene tudo
              isso de maneira ilimitada pelo tempo que voc?? precisar.
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
            <ImageLoad tipo="diferenciais" src={'/imagens/mob/mob-img-08.png'} />
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
              Durante toda sua forma????o profissional na UniFTC, voc?? ter??
              direito de uso de diversos produtos Microsoft. Est??o inclu??das
              nessa lista alguns dos principais softwares da gigante da
              inform??tica, como o sistema operacional Windows, o pacote Office,
              e at?? mesmo a plataforma Microsoft Imagine, um conjunto de
              ferramentas, softwares e servi??os profissionais de programa????o.
            </p>
          </div>

          <div className="col-md-5 col-sm-5 d-none d-sm-block foto">
            <ImageLoad tipo="diferenciais" src={'/imagens/img-01.png'} />
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
