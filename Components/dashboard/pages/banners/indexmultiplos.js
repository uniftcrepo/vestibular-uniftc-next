import React, { useState, useCallback, useEffect } from "react";

import BlocoImagens from "../../components/Imagens/Bloco";
import BlocoImagensMultiples from "../../components/Imagens/BlocoMultiples";

import AlertGeral from "../../components/Alert/Geral";
/* import Voltar from '../../components/Links/Voltar'; */
import { useDispatch, useSelector } from "react-redux";
/*import * as actions from '../../actions/pedidos'; */
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import {
  updateBannerUpload,
  removeBannerUpload,
  getBanner,
} from "../../../../../store/modules/banner/actions";

function Banners({useSaga}) {
  /*  componentWillMount(){
        const { usuario } = this.props;
        const { id } = this.props.match.params;
        if(!usuario) return null;
        this.props.getPedido(id, usuario.loja);
    }

    componentWillUnmount(){
        this.props.limparPedido();
    } */

  const [fotos, setFotos] = useState([]);
  const [aviso, setAviso] = useState();
  const [erros, setErros] = useState([]);
  const [tipo, setTipo] = useState([]);
  const [linkMedicinaDesktop, setLinkMedicinaDesktop] = useState();
  const [linkMedicinaMobile, setLinkMedicinaMobile] = useState();
  const [linkVestibularDesktop, setLinkVestibularDesktop] = useState();
  const [linkVestibularMobile, setLinkVestibularMobile] = useState();

  const [fileMedicinaDesktop, setFileMedicinaDesktop] = useState();
  const [fileMedicinaMobile, setFileMedicinaMobile] = useState();
  const [fileVestibularDesktop, setFileVestibularDesktop] = useState();
  const [fileVestibularMobile, setFileVestibularMobile] = useState();
  
  const [idMedicinaDesktop, setIdMedicinaDesktop] = useState();
  const [idMedicinaMobile, setIdMedicinaMobile] = useState();
  const [idVestibularDesktop, setIdVestibularDesktop] = useState();
  const [idVestibularMobile, setIdVestibularMobile] = useState();

  const dispatch = useDispatch();

  const banner = useSelector((state) => state.banner.banner);

  const callBanner = useCallback(() => dispatch(getBanner()), [
    dispatch, useSaga
  ]);
  
  

  useEffect(() => {
     //dispatch(getBanner());
    callBanner();

    
    if(banner){
    console.log(banner)
    const md = banner.filter((p) =>
      String(p.tipo).startsWith("medicina_desktop")
    );
    setLinkMedicinaDesktop(md.length ? md[0].link : "");
    setIdMedicinaDesktop(md.length ? md[0].id : "")

    const mm = banner.filter((p) =>
      String(p.tipo).startsWith("medicina_mobile")
    );
    setLinkMedicinaMobile(mm.length ? mm[0].link : "");
    setIdMedicinaMobile(mm.length ? mm[0].id : "");
    const vd = banner.filter((p) =>
      String(p.tipo).startsWith("vestibular_desktop")
    );
    setLinkVestibularDesktop(vd.length ? vd[0].link : "");
    setIdVestibularDesktop(vd.length ? vd[0].id : "");
    const vm = banner.filter((p) =>
      String(p.tipo).startsWith("vestibular_mobile")
    );
    setLinkVestibularMobile(vm.length ? vm[0].link : "");
    setIdVestibularMobile(vm.length ? vm[0].id : "")
  }else{
    setFotos([])
  }
  }, [callBanner]);


  



  const onRemove = (idBanner) => {
    if (window.confirm("Você deseja realmente remover essa imagem?")) {
      dispatch(removeBannerUpload(idBanner));
    }
  };

  /*  const handleUploadFoto = (ev) => {
    console.log(ev);
    const data = new FormData();
    data.append(ev.target.name, ev.target.files[0]);
    dispatch(updateBannerUpload(data));
  }; */

  /*  function renderImagens(tipo) {
    return (
      <div className="dados-de-imagens">
        <BlocoImagens
          imagens={banner || []}
          handleSubmit={handleUploadFoto}
          onRemove={onRemove}
          tipo={tipo}
        />
      </div>
    );
  } */

  function salvarBanner() {
   
    const data = new FormData();

    fileMedicinaDesktop && data.append("medicina_desktop", fileMedicinaDesktop);
    data.append("medicina_desktop_link", linkMedicinaDesktop);
    data.append("id_medicina_desktop", idMedicinaDesktop);

    fileMedicinaMobile && data.append("medicina_mobile", fileMedicinaMobile);
    data.append("medicina_mobile_link", linkMedicinaMobile);
    data.append("id_medicina_mobile", idMedicinaMobile);

    fileVestibularDesktop && data.append("vestibular_desktop", fileVestibularDesktop);
    data.append("vestibular_desktop_link", linkVestibularDesktop);
    data.append("id_vestibular_desktop", idVestibularDesktop);

    fileVestibularMobile && data.append("vestibular_mobile", fileVestibularMobile);
    data.append("vestibular_mobile_link", linkVestibularMobile);
    data.append("id_vestibular_mobile", idVestibularMobile);

    dispatch(updateBannerUpload(data));
    console.log("Salvar banner", banner)
    setFotos(banner);
  }

  return (
    <div className="Pedidos full-width flex vertical">
          <div className="Card flex horizontal">
            <div className="Sub-Card flex-1 flex vertical">
              Medicina Desktop
              {/* {renderImagens("medicina_desktop")} */}
              <BlocoImagensMultiples
                onFileSelectSuccess={(file) => setFileMedicinaDesktop(file)}
                tipo="medicina_desktop"
                onRemove={onRemove}
                imagens={banner || []}
              />
              <label>
                <strong>Link da imagen:&nbsp;</strong>
              </label>
              <input
                type="text"
                name="medicina_desktop_imagen_link"
                value={linkMedicinaDesktop || ""}
                onChange={(e) => setLinkMedicinaDesktop(e.target.value)}
              />
            </div>
            <div className="Sub-Card flex-1 flex vertical">
              Medicina Mobile
              <BlocoImagensMultiples
                onFileSelectSuccess={(file) => setFileMedicinaMobile(file)}
                tipo="medicina_mobile"
                onRemove={onRemove}
                imagens={banner || []}
              />
              <label>
                <strong>Link da imagen:&nbsp;</strong>
              </label>
              <input
                type="text"
                name="medicina_mobile_imagen_link"
                value={linkMedicinaMobile || ""}
                onChange={(e) => setLinkMedicinaMobile(e.target.value)}
              />
            </div>
          </div>
          <div className="flex horizontal">
            <div className="Sub-Card flex-1 flex vertical">
              Vestibular Desktop
              <BlocoImagensMultiples
                onFileSelectSuccess={(file) => setFileVestibularDesktop(file)}
                tipo="vestibular_desktop"
                onRemove={onRemove}
                imagens={banner || []}
              />
              <label>
                <strong>Link da imagen:&nbsp;</strong>
              </label>
              <input
                type="text"
                name="vestibular_desktop_imagen_link"
                value={linkVestibularDesktop || ""}
                onChange={(e) => setLinkVestibularDesktop(e.target.value)}
              />
            </div>
            <div className="Sub-Card flex-1 flex vertical">
              Vestibular Mobile
              <BlocoImagensMultiples
                onFileSelectSuccess={(file) => setFileVestibularMobile(file)}
                tipo="vestibular_mobile"
                onRemove={onRemove}
                imagens={banner || []}
              />
              <label>
                <strong>Link da imagen:&nbsp;</strong>
              </label>
              <input
                type="text"
                name="vestibular_mobile_imagen_link"
                value={linkVestibularMobile || ""}
                onChange={(e) => setLinkVestibularMobile(e.target.value)}
              />
            </div>
          </div>

          <button onClick={()=>salvarBanner()}>Salvar</button>
    </div>
  );
}

/* const mapStateToProps = state => ({
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Pedido); */
export default Banners;
