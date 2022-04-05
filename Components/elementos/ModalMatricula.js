import React, { useState } from "react";
import styled from "styled-components";
import Button from "./ButtonClickLink";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
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
const ModalMatricula = ({
  id = "modal",
  onFecharModal,
  onAbreModal,
  tipo,
}) => {

  return (
    <ModalContainer>
      <Modal show={onAbreModal} onHide={onFecharModal} size="xl">
        {/* <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header> */}
        <Modal.Body>
          <TextoTituloModal>
            Faça sua matrícula agora! Você pode fazer sua matrícula pelos canais
            abaixo com comodidade e segurança. Escolha a opção que melhor te
            atende
          </TextoTituloModal>
          <ContainerBlocoModal>
            <BlocoModal background={"#0093ff"}>
              <div>Fale conosco e matricule-se</div>
              <div>
                <Button
                  borderColor="#f31970"
                  colorTexto="#fff"
                  cor="#f31970"
                  texto={"0800 056 6666"}
                  link={`Tel:08000566666`}
                  fonteSize="12px"
                  padding="10px 19px 14px 20px"
                  boxShadow="0 5px rgba(0,0,0,0.4)"
                  id={"matricula-ligacao"}
                  icon={<FontAwesomeIcon icon={faPhoneAlt} />}
                />
              </div>
            </BlocoModal>
            <BlocoModal>
              <div>Converse pelo WhatsApp</div>
              <div>
                {" "}
                <Button
                  borderColor="#f31970"
                  colorTexto="#fff"
                  cor="#f31970"
                  texto={"Matricule-se agora"}
                  link={`https://api.whatsapp.com/send?phone=5571988357245&text=Olá Rede UniFTC`}
                  fonteSize="12px"
                  padding="10px 19px 14px 20px"
                  boxShadow="0 5px rgba(0,0,0,0.4)"
                  id={"matricula-whatasapp"}
                />
              </div>
            </BlocoModal>
            <BlocoModal background={"#0093ff"}>
              <div>Matrícula Online</div>
              <div>
                {" "}
                <Button
                  borderColor="#f31970"
                  colorTexto="#fff"
                  cor="#f31970"
                  texto={"Clique e matricule-se"}
                  link={`https://matricula.uniftc.edu.br`}
                  fonteSize="12px"
                  padding="10px 19px 14px 20px"
                  boxShadow="0 5px rgba(0,0,0,0.4)"
                  id={"matricula-lyceum"}
                />
              </div>
            </BlocoModal>
          </ContainerBlocoModal>
        </Modal.Body>
        {/*    <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
      </Modal>
    </ModalContainer>
  );
};

export default ModalMatricula;
