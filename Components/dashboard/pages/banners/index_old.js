import React, { useState, useEffect } from "react";
import { api } from "../../api";
import { useDispatch, useSelector } from "react-redux";

import ReactLoading from "react-loading";

import {
  updateBannerUpload,
  getBanner,
} from "../../../../../store/modules/banner/actions";

function Banners({ useSaga }) {
  /* const [bannerLink, setBannerLink] = useState(); */
  const [bannerUpload, setBannerUpload] = useState({
    desktopLabel: "Selecione o novo arquivo",
    mobileLabel: "Selecione o novo arquivo",
    imagemDesktop: [],
    imagemMobile: [],
    link: "",
  });

  const dispatch = useDispatch();

  const banner = useSelector((state) => state.banner.banner);
  const loading = useSelector((state) => state.banner.loading);
  const progress = useSelector((state) => state.banner.progress);

  /* const callBanner = useCallback(() => dispatch(getBanner()), [
    dispatch,
    useSaga,
  ]); */

  useEffect(() => {
    dispatch(getBanner());
    console.log(banner);
    if(banner){
      setBannerUpload({
        ...bannerUpload,
        ['link']: banner.length > 0 && banner[0].link || "",
      });
    }
   


   /*  callBanner(); */
  }, []);




  function salvarBanner() {
    const formData = new FormData();
    formData.append("desktopLabel", bannerUpload.desktopLabel);
    formData.append("mobileLabel", bannerUpload.mobileLabel);
    formData.append("imagemDesktop", bannerUpload.imagemDesktop);
    formData.append("imagemMobile", bannerUpload.imagemMobile);
    formData.append("link", bannerUpload.link);
    formData.append("faculdade", "uniftc");
    dispatch(updateBannerUpload(formData));
    /*  setFotos(banner); */
  }
  /* const onRemove = (idBanner) => {
    if (window.confirm("Você deseja realmente remover essa imagem?")) {
      dispatch(removeBannerUpload(idBanner));
    }
  }; */
  const handleChange = (event) => {
    /*  if (!event.target.files[0]) {
      return false;
    } */
    if (event.target.name === "desktopLabel") {
      setBannerUpload({
        ...bannerUpload,
        ["desktopLabel"]: event.target.files[0].name,
        ["imagemDesktop"]: event.target.files[0],
      });
    }
    if (event.target.name === "mobileLabel") {
      setBannerUpload({
        ...bannerUpload,
        ["mobileLabel"]: event.target.files[0].name,
        ["imagemMobile"]: event.target.files[0],
      });
    }
    if (event.target.name === "link") {
      setBannerUpload({
        ...bannerUpload,
        [event.target.name]: event.target.value,
      });
    }
  };

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
                {bannerUpload[tipo]}
              </label>
            </div>
          </div>{/* 
          <div className="BotaoUpload">
            <button onClick={() => salvarBanner()}>Upload</button>
          </div> */}
        </div>
      </>
    );
  }

  return (
    <div className="Pedidos full-width flex vertical">
      <div className="Titulo">Editando banners</div>
      <div className="BannerContainer">
        <div className="subTituloBanner">Banner sendo exibido atualmente</div>
        <div className="VisualizacaoBanners">
          <div className="BannerDesktop">
            <div>
            {banner.length > 0  && (loading ? <> <ReactLoading type={"spin"} color="#FF1970" /> <div>{progress && (`${progress}%`)}</div></> : <img src={`${api}/banners_desktop/${banner[0].banner}`} />)}
            </div>
            <div>Desktop</div>
          </div>
          <div className="BannerMobile">
            <div>
            {banner.length > 0 && (loading ? <> <ReactLoading type={"spin"} color="#FF1970" /> <div>{progress && (`${progress}%`)}</div></>: <img src={`${api}/banners_desktop/${banner[1].banner}`} />)}
            </div>
            <div>Mobile</div>
          </div>
        </div> 
        <div className="UrlDestino">URL de destino: {banner.length > 0  && (loading ? "Aguarde..." : <a href={banner[1].link} target="_blank">{banner[1].link}</a>  )}</div>
      </div>

      <div className="UploadContainer">
        <div>
          <div className="TituloUpload">
            Faça upload de novos arquivos e defina a URL de destino
          </div>
          <Upload
            SubtituloUpload={"Upload de arquivo desktop (1200x400px)"}
            tipo={"desktopLabel"}
          />
          <Upload
            SubtituloUpload={"Upload de arquivo mobile (640x768px)"}
            tipo={"mobileLabel"}
          />
          <label htmlFor="basic-url">URL de destino (opcional)</label>
          <div className="BlocoUpload">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="basic-url"
                name="link"
                aria-describedby="basic-addon3"
                placeholder="Digite a url, começando com http:// ou https://"
                value={bannerUpload.link}
                onChange={(e) => handleChange(e)}
              />
              <div className="BotaoConfirma">
                <button onClick={() => salvarBanner()}  >{loading ?  "Aguarde..." : "Confirmar"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banners;
