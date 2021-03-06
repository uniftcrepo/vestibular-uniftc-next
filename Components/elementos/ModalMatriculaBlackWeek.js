import React, { useState } from "react";
import styled from "styled-components";
import Button from "./ButtonClickLink";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import IMGMenuFechar from "../../public/imagens/Menu_Fechar.svg";
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

export const ModalContainer = styled.div`
  .modal-open {
    padding-right: 0px !important;
    overflow-y: scroll;
  }
`;

export const ContainerBlocoModal = styled.div`
  > p {
    text-align: center;
    color: #fff;
  }

  > p:nth-child(1) {
    margin-top: 20px;
  }

  > p:nth-child(1),
  p:nth-child(2) {
    font-size: 16px;
  }
  > p:nth-child(3),
  p:nth-child(4) {
    font-size: 13px;
    font-weight: 200;
  }
  > p:nth-child(5) {
    font-size: 9px;
  }

  /*   font-size: 24px;
  font-weight: 700;
  font-style: normal; */
  .MenuFechar {
    display: none;
  }

  @media screen and (min-width: 50px) and (max-width: 768px) {
    padding: 21px;
    > p:nth-child(1),
    p:nth-child(2) {
      font-size: 28px;
    }
    > p:nth-child(3),
    p:nth-child(4) {
      font-size: 16px;
    }
    > p:nth-child(5) {
      margin-top: 30%;
    }
    .MenuFechar {
      display: flex;
      margin-top: 15%;
      justify-content: center;
    }
  }

  

`;

const ModalMatriculaBlackWeek = ({
  id = "modal",
  onFecharModal,
  onAbreModal,
  tipo,
}) => {
  return (
    <ModalContainer>
      <Modal
        show={onAbreModal}
        onHide={onFecharModal}
        size="xl"
        className="blackweek"
      >
        {/* <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header> */}
        <Modal.Body>
          <ContainerBlocoModal>
            <p>Matr??cula R$20 + Bolsa de at?? 65%</p>
            <p>Black Week</p>

            <p>
              Voc?? achou que ficariamos de fora da Black Friday? Claro que n??o!
            </p>
            <p>
              Com a Black Week voc?? tem condi????es especiais para come??ar a
              movimentar o seu futuro!
            </p>

            <p>
              {" "}
              Condi????es v??lidas de 16/11/2021 a 30/11/2021. *Exceto Medicina.
              Consulte{" "}
              <a
                target="_blank"
                href="https://www.uniftc.edu.br/graduacao/edital-manual-e-regulamentos"
              >
                {" "}
                regulamento e condi????es
              </a>
            </p>
            <div className="MenuFechar">
              <img src={IMGMenuFechar} onClick={() => onFecharModal(false)} />
            </div>
          </ContainerBlocoModal>
        </Modal.Body>
      </Modal>
    </ModalContainer>
  );
};

export default ModalMatriculaBlackWeek;
