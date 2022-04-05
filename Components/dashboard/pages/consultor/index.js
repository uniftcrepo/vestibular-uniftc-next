import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import ReactLoading from "react-loading";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import styled from "styled-components";
import {
  getConsultor,
  getCidades,
  addConsultor,
  updateConsultor,
  removeConsultor,
} from "../../../../../store/modules/consultor/actions";
import { api } from "../../api";

import ReactPaginate from "react-paginate";

export const TopConteudoConsultor = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const TopTituloConsultor = styled.div`
  font-size: 21px;
  font-weight: 700;
  margin-bottom: 10px;
`;
export const ButtonConsultor = styled.div`
  > button {
    background: #ff1970;
    padding: 6px 20px;
    border: 1px solid #ff1970;
    cursor: pointer;
    border-radius: 4px;
    color: var(--cor-branca);
    margin-left: 20px;
  }
`;

export const ConteudoConsultor = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  background-color: #cccccc;
  border: 1px solid #dddddd;
  border-radius: 3px;
  > span {
    margin-top: 15px;
    margin-left: auto;
  }
`;
export const ConjuntoBotaoConsultor = styled.div`
  margin-right: 12px;
  margin-bottom: 10px;
  margin-top: auto;
  > button {
    background: #ff1970;
    padding: 6px 20px;
    border: 1px solid #ff1970;
    cursor: pointer;
    border-radius: 4px;
    color: var(--cor-branca);
    margin-left: 20px;
  }
`;
export const TituloConsultor = styled.p`
  font-size: 18px !important;
  margin-left: 20px;
  font-weight: 400;
  margin-top: 15px;
`;
export const TextoLegalConsultorLabel = styled.label`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0em;
  text-align: left;
  /* margin-top: 15px; */
`;
export const ImagePreview = styled.img`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 250px;
`;
export const ImagePreviewCrop = styled.div`
  /*  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 250px; */

  width: max(45px, min(170px, 22vw));
  height: max(45px, min(170px, 22vw));
  border: 3.75px solid #fff;
  /*   background: var(--gray);
  background-image: url('https://dj1symwmxvldi.cloudfront.net/r/56'); */
  border-radius: 50%;
  /*  bottom: max(-31px, -10vw); */
`;

export const ConjuntoBotaoConsultorModal = styled.div`
  margin-right: 12px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
  > div > button {
    background: #ff1970;
    padding: 6px 20px;
    border: 1px solid #ff1970;
    cursor: pointer;
    border-radius: 4px;
    color: var(--cor-branca);
    margin-left: 20px;
  }

  .excluir {
    background: #cccccc;
    border: 1px solid #cccccc;
    color: var(--cor-preta);
  }
`;
const initialState = {
  nome: "",
  token: "",
  codigo: "",
  id_unidade: "",
  genero: "",
  foto: null,
  foto_nome: "Selecione o novo arquivo",
};

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  console.log(canvas.toDataURL());
  /*  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.download = "cropPreview.png";
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    "image/png",
    1
  ); */
}

function Consultor({ useSaga }) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const [show, setShow] = useState(false);
  const [tipoModal, setTipoModal] = useState(false);
  const [formConsultor, setFormConsultor] = useState(initialState);
  const [listaConsultor, setListaConsultor] = useState([]);
  const [imagemPreview, setImagemPreview] = useState(null);

  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const consultor = useSelector((state) => state.consultor.consultor);
  const cidades = useSelector((state) => state.consultor.cidades);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    canvas.toBlob((blob) => {
      let file = new File([blob], formConsultor.foto_nome, {
        type: "image/jpeg",
      });
      setFormConsultor({
        ...formConsultor,
        ["foto"]: file,
      });
    }, "image/jpeg");
  }, [completedCrop]);

  const pesquisarConsultor = (event) => {
    setSearchTerm(event.target.value.toUpperCase());
  };
  useEffect(() => {
    const results = consultor.filter((person) =>
      person.codigo.includes(searchTerm)
    );

    setListaConsultor(consultorOrdenadoNome(results));
    if (consultor) {
      setPageCount(Math.ceil(results.length / perPage));
      setData(consultorOrdenadoNome(consultor));
    }
  }, [searchTerm]);

  /* const callBanner = useCallback(() => dispatch(getBanner()), [
    dispatch,
    useSaga,
  ]); */
  const handleClose = () => setShow(false);

  //function salvarBanner() {

  /*  dispatch(updateBannerUpload(formData)); */
  /*  setFotos(banner); */
  // }
  /* const onRemove = (idBanner) => {
    if (window.confirm("Você deseja realmente remover essa imagem?")) {
      dispatch(removeBannerUpload(idBanner));
    }
  }; */
  const handleChange = (event) => {
    const { name, value, files, currentTarget } = event.target;
    if (name === "foto") {
      if (files && files.length > 0) {
        console.log('Estou em fotos');
        setImagemPreview(null);
        const reader = new FileReader();
        reader.addEventListener("load", () => setUpImg(reader.result));
        reader.readAsDataURL(files[0]);
        setFormConsultor({
          ...formConsultor,
          ["foto_nome"]: files[0].name,
          /*  ["foto"]: files[0], */
        });
      }
    } else {
      console.log('Estou fora fotos');
      setFormConsultor({
        ...formConsultor,
        [name]: value,
      });
    }
  };
  /*  function dataURLtoBlob(dataURL) {
    let array, binary, i, len;
    binary = atob(dataURL.split(',')[1]);
    array = [];
    i = 0;
    len = binary.length;
    while (i < len) {
      array.push(binary.charCodeAt(i));
      i++;
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png'
    });
  }; */

  const handleNovoAbaConsultor = () => {
    setTipoModal("NOVO");
    clearState();
    setShow(true);
    setImagemPreview(null);
  };
  const clearState = () => {
    setFormConsultor({ ...initialState });
  };

  const handleUpdateConsultor = (id) => {
    const consultorFilter = data.filter((elem) => elem.id === id);
    setImagemPreview(null);
    setFormConsultor({
      ...formConsultor,
      ["id"]: consultorFilter[0].id,
      ["nome"]: consultorFilter[0].nome,
      ["token"]: consultorFilter[0].token,
      ["codigo"]: consultorFilter[0].codigo,
      ["id_unidade"]: consultorFilter[0].id_unidade,
      ["genero"]: consultorFilter[0].genero,
      ["foto_nome"]: consultorFilter[0].foto || "Selecione o novo arquivo",
    });
    if (consultorFilter[0].foto) {
      setImagemPreview(
        `${api}/consultor/${consultorFilter[0].codigo}/${consultorFilter[0].foto}`
      );
    }
    setTipoModal("EDITAR");
    setShow(true);
  };

  const handleSalvarUpdateConsultor = () => {
    if (tipoModal === "NOVO") {
      dispatch(addConsultor(formConsultor));
      setShow(false);
    } else {
      console.log(formConsultor);
      setCompletedCrop(null);
      setUpImg(null);
      dispatch(updateConsultor(formConsultor));
      setShow(false);
    }
  };

  const handleRemoveAbaConsultor = (id) => {
    const consultorFilter = data.filter((elem) => elem.id === id);
    const genero = consultorFilter[0].genero === "Masculino" ? "" : "a";
    const letra = consultorFilter[0].genero === "Masculino" ? "e" : "a";

    confirmAlert({
      title: `Apagar consultor${genero}?`,
      message: `Você quer realmente ess${letra} consultor${genero}: ${consultorFilter[0].nome}?`,
      buttons: [
        {
          label: "SIM",
          onClick: () => {
            dispatch(removeConsultor(id));
            setShow(false);
          },
        },
        {
          label: "NAO",
        },
      ],
    });
  };
  useEffect(() => {
    dispatch(getConsultor());
    dispatch(getCidades());
  }, [dispatch]);

  const consultorOrdenadoNome = (dados) => {
    var consultorNome = dados.slice(0);
    consultorNome.sort(function (a, b) {
      var x = a.nome.toLowerCase();
      var y = b.nome.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    return consultorNome;
  };

  useEffect(() => {
    if (consultor) {
      let consultorOrder = consultorOrdenadoNome(consultor);
      setListaConsultor(consultorOrder.slice(offset, offset + perPage).sort());
      setPageCount(Math.ceil(consultor.length / perPage));

      //Ordenar por nome

      setData(consultorOrder);
    }
  }, [consultor]);

  /*   const carregarLista = () =>{
    const slice = consultor.slice(offsetPagination, offsetPagination + perPage)
    setpageCount(Math.ceil(listaConsultor.length / perPage))
    setListaConsultor(slice)
    console.log("offsetPagination:" + offsetPagination + "CurrentPage: " + currentPage)
    console.log(consultor)
  } */

  useEffect(() => {
    if (consultor) {
      const slice = data.slice(offset, offset + perPage);
      setPageCount(Math.ceil(data.length / perPage));
      setListaConsultor(slice);
    }
  }, [offset]);

  function handlePageClick(e) {
    let selectedPage = e.selected;
    setOffset(selectedPage * perPage);

    //carregarLista()
  }

  function Upload({ SubtituloUpload, tipo }) {
    return (
      <>
        <div className="SubTituloUpload">{SubtituloUpload}</div>
        <div className="BlocoUpload">
          <div className="input-group mb-3">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id={tipo}
                name={tipo}
                onChange={(e) => handleChange(e)}
              />
              <label className="custom-file-label" htmlFor={tipo}>
                {formConsultor.foto_nome}
              </label>
            </div>
          </div>
          {/* 
          <div className="BotaoUpload">
            <button onClick={() => salvarBanner()}>Upload</button>
          </div> */}
        </div>
      </>
    );
  }

  return (
    <div className="Pedidos full-width flex vertical">
      {/*  <div className="Titulo">Editando Consultor</div> */}
      <TopConteudoConsultor>
        <TopTituloConsultor>Gerenciando consultores</TopTituloConsultor>
        <ButtonConsultor>
          <button onClick={handleNovoAbaConsultor}>Novo Consultor</button>
        </ButtonConsultor>
      </TopConteudoConsultor>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>
            <TextoLegalConsultorLabel>
              {tipoModal != "NOVO" && <span>{tipoModal}</span>}
              {tipoModal == "NOVO" && <span>{tipoModal}</span>}
              -Consultor
            </TextoLegalConsultorLabel>
            {/*   <TextoLegalConsultorLabel>
              {tipoModal != "NOVO" && (
                <span>({formConsultor.nome_da_aba})</span>
              )}
            </TextoLegalConsultorLabel> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate /* validated={validated}  */ /* onSubmit={submitForm} */
          >
            <Row>
              <Col>
                {/*  <Form.Label>Lado Esquerdo</Form.Label> */}

                <Form.Group xs={12} lg={6}>
                  <TextoLegalConsultorLabel>Nome</TextoLegalConsultorLabel>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome consultor"
                    required
                    onChange={handleChange}
                    name="nome"
                    value={formConsultor.nome}
                  />

                  <Form.Control.Feedback type="invalid">
                    Preencha com seu nome!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group xs={12} lg={6}>
                  <TextoLegalConsultorLabel>Token</TextoLegalConsultorLabel>
                  <Form.Control
                    type="text"
                    placeholder="Digite o Token"
                    required
                    onChange={handleChange}
                    name="token"
                    value={formConsultor.token}
                  />

                  <Form.Control.Feedback type="invalid">
                    Preencha com seu token!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group xs={12} lg={6}>
                  <TextoLegalConsultorLabel style={{ fontSize: 12 }}>
                    Código(exemplo: vestibular.uniftc.edu.br/
                    <span style={{ color: "#FF1970" }}>ABC1234</span>)
                  </TextoLegalConsultorLabel>
                  <Form.Control
                    type="text"
                    placeholder="Digite o código do consultor"
                    value={formConsultor.codigo}
                    onChange={handleChange}
                    required
                    /* onBlur={validacaoCPF} */
                    name="codigo"
                    rows={4}
                  />
                  {/* <MensagemErro>{mensagemErroCpf}</MensagemErro> */}
                  <Form.Control.Feedback type="invalid">
                    Preencha com seu código do consutor!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group xs={12} lg={6}>
                  <TextoLegalConsultorLabel style={{ fontSize: 12 }}>
                    Unidade
                  </TextoLegalConsultorLabel>
                  <select
                    value={formConsultor.id_unidade}
                    onChange={handleChange}
                    required
                    name="id_unidade"
                    className="form-control"
                  >
                    <option
                      value="" /* selected={formConsultor.genero == option.value} */
                    >
                      Selecione sua Unidade...
                    </option>
                    {cidades &&
                      cidades.map((cidade) => {
                        return (
                          <option
                            key={cidade.id}
                            value={
                              cidade.id
                            } /* selected={formConsultor.id_unidade == cidade.id_unidade} */
                          >
                            {cidade.nome}
                          </option>
                        );
                      })}
                  </select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group xs={12} lg={6}>
                  <TextoLegalConsultorLabel style={{ fontSize: 12 }}>
                    Gênero
                  </TextoLegalConsultorLabel>
                  <select
                    value={formConsultor.genero}
                    onChange={handleChange}
                    required
                    name="genero"
                    className="form-control"
                  >
                    <option
                      value="" /* selected={formConsultor.genero == option.value} */
                    >
                      Selecione o Gênero...
                    </option>
                    <option
                      value="Masculino" /* selected={formConsultor.genero == option.value} */
                    >
                      Masculino
                    </option>
                    <option
                      value="Feminino" /* selected={formConsultor.genero == option.value} */
                    >
                      Feminino
                    </option>
                  </select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group xs={12} lg={6}>
                  <TextoLegalConsultorLabel style={{ fontSize: 12 }}>
                    Foto do(a) consultor(a)
                  </TextoLegalConsultorLabel>
                  <div className="UploadContainer">
                    <div>
                      <Upload
                        /*   SubtituloUpload={
                          "Upload de arquivo desktop (1200x400px)"
                        } */
                        tipo={"foto"}
                      />
                    </div>
                    <ReactCrop
                      src={upImg}
                      onImageLoaded={onLoad}
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                    />
                    {imagemPreview && (
                      <img
                        src={imagemPreview}
                        style={{
                          width: "max(45px, min(170px, 22vw))",
                          height: "max(45px, min(170px, 22vw))",
                          borderRadius: "50%",
                          border: "3.75px solid #fff",
                        }}
                      />
                    )}
                    {completedCrop !== null && (
                      <ImagePreviewCrop>
                        <canvas
                          ref={previewCanvasRef}
                          style={{
                            width: "max(45px, min(170px, 22vw))",
                            height: "max(45px, min(170px, 22vw))",
                            borderRadius: "50%",
                            border: "3.75px solid #fff",
                          }}
                        />
                      </ImagePreviewCrop>
                    )}
                  </div>
                  {/*  <button
                    type="button"
                    disabled={!completedCrop?.width || !completedCrop?.height}
                    onClick={() =>
                      generateDownload(previewCanvasRef.current, completedCrop)
                    }
                  >
                    Download cropped image
                  </button> */}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ConjuntoBotaoConsultorModal>
            <div>
              <Button variant="primary" onClick={handleSalvarUpdateConsultor}>
                SALVAR
              </Button>
            </div>
            <div>
              <Button
                className="excluir"
                onClick={() => handleRemoveAbaConsultor(formConsultor.id)}
              >
                EXCLUIR
              </Button>
            </div>
          </ConjuntoBotaoConsultorModal>
        </Modal.Footer>
      </Modal>
      <div>
        <p style={{ fontWeight: 700 }}>Consultores</p>
        <Row>
          <Col md={{ span: 2 }}>
            <Form.Control
              type="text"
              placeholder="Pesquisar por código"
              value={searchTerm}
              onChange={pesquisarConsultor}
              required
            />
          </Col>
        </Row>

        {listaConsultor &&
          listaConsultor.map((consultor) => {
            return (
              <ConteudoConsultor key={consultor.id}>
                <div>
                {consultor.foto && (
                    <img
                      src={`${api}/consultor/${consultor.codigo}/${consultor.foto}`}
                      style={{
                        width: "max(45px, min(59px, 22vw))",
                        height: "max(45px, min(58px, 22vw))",
                        borderRadius: "50%",
                        border: "3.75px solid #fff",
                        marginLeft: "10px"
                      }}
                    />
                  )}
                </div>
                <div>
                  <TituloConsultor>{consultor.nome}{consultor.id_unidade !== null && cidades.map(c =>{
                    if(c.id === consultor.id_unidade ){
                      return (<span> ({c.nome}) </span>)
                    }
                    
                  })}</TituloConsultor>
                </div>
                <span>Código: <a href={`https://vestibular.uniftc.edu.br/${consultor.codigo}`} target="_blank" >{consultor.codigo}</a></span>
                {/* <p className="body">{item.titulo}</p> */}
                <ConjuntoBotaoConsultor>
                  {/* item.id: {item.id} - index: {index} */}
                  <button
                    variant="primary"
                    onClick={() => handleUpdateConsultor(consultor.id)}
                  >
                    Editar
                  </button>
                  {/*  <button
                variant="primary"
                onClick={() => handleRemoveAbaConsultor(consultor.id, index)}
              >
                Excluir
              </button> */}
                </ConjuntoBotaoConsultor>
              </ConteudoConsultor>
            );
            /*  return(<div key={consultor.id} >{consultor.nome} <span>editar</span><span>excluir</span></div>) */
          })}

        <div></div>
      </div>
      <ReactPaginate
        previousLabel={"anterior"}
        nextLabel={"próximo"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Consultor;
