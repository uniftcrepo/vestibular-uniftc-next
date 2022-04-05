import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// swiper bundle styles
import "swiper/swiper-bundle.min.css";
import styled from "styled-components";

import { api } from "../pages/dashboard/api";
import { useDispatch, useSelector } from "react-redux";
/* import { getBannerView } from "../../store/modules/banner/actions";
import {
  filtroConsultor,
  getCidades,
} from "../../store/modules/consultor/actions"; */

import BackgroundConsultor from "../public/imagens/consultor_background.svg";
/* import Consultor from "../utils/consultor"; */
import ModalMatriculaBlackWeek from "./elementos/ModalMatriculaBlackWeek";

SwiperCore.use([Pagination, Navigation]);
export const BannerDiv = styled.div`
  margin-top: 149px;

  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    width: 100% !important;
  }
  .swiper-slide-next,
  .swiper-slide-prev {
    opacity: 0.2;
  }
  .swiper-container {
    padding: 0px 0px 38px;
  }
  .swiper-slide img {
    display: block;
    /* width: 100%;
    height: 100%; */
    object-fit: cover;
  }

  /*  @media screen and (min-width: 1601px) and (max-width: 1920px) {
    
    .swiper-slide {
      width: 90% !important;
    }
  } */
  /*  @media screen and (min-width: 1200px) {
   
    .swiper-slide {
      width: 74% !important;
    }
  }
  @media screen and (min-width: 1440px) {
   
    .swiper-slide {
      width: 84% !important;
    }
  }
  @media screen and (min-width: 1600px) {
   
    .swiper-slide {
      width: 94% !important;
    }
  } */
  @media screen and (min-width: 50px) and (max-width: 768px) {
    margin-top: 65px;
  }
  > div {
    position: relative;
    flex-shrink: 0;
    width: 100%;
  }
`;

export const ConsultorNome = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  @media screen and (min-width: 50px) and (max-width: 768px) {
    font-size: 21px;
    line-height: 25px;
  }
`;
export const Complemento = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  @media screen and (min-width: 50px) and (max-width: 768px) {
    font-size: 12px;
  }
`;
export const Texto = styled.div`
  color: #fff;
  position: absolute;
  bottom: max(18px, -10vw);
  margin-left: 194px;
  z-index: 2;
  @media screen and (min-width: 50px) and (max-width: 768px) {
    margin-left: 94px;
    bottom: max(-1px, -10vw);
  }
`;
export const Avatar = styled.img`
  width: max(45px, min(170px, 22vw));
  height: max(45px, min(170px, 22vw));
  border: 3px solid #fff;
  border-radius: 50%;
  position: absolute;
  bottom: max(-31px, -10vw);
  /* background-repeat: no-repeat;
  background-position: center; */
  /* left: max(70px, -10vw); */
`;

const Banner = ({ consultorId}) => {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const banners = (bannerTipo, link = "#", consultor = []) => {
    /*  if(match.params.consultor === undefined){ */
    let modal = bannerTipo.includes("blackweed");
    if (link !== "") {
      return consultorId === undefined ? (
        <a href={link} key={bannerTipo}>
          <Image src={`${api}/banners_desktop/${bannerTipo}`} alt="" fluid />
        </a>
      ) : (
        <a href={link}>
          <div>
            <Image src={'/imagens/consultor_background.svg'} alt="" style={{ width: "100%" }} />
            <div className="container">
              <Texto>
                <ConsultorNome>{consultor.nomeConsultor}</ConsultorNome>
                <Complemento>
                  {consultor.generoConsultor === "Feminino"
                    ? "CONSULTORA"
                    : "CONSULTOR"}{" "}
                  UNIFTC
                </Complemento>
              </Texto>
              <Avatar
                src={`${api}/consultor/${consultor.codigoConsultor}/${consultor.fotoConsultor}`}
              />
            </div>
          </div>
        </a>
      );
    } else {
      return consultorId === undefined ? (
        <Image
          src={`${api}/banners_desktop/${bannerTipo}`}
          alt=""
          fluid
          onClick={modal ? handleShow : undefined}
          style={{
            cursor: modal ? "pointer" : "default",
          }}
          key={bannerTipo}
        />
      ) : (
        <div>
          <Image src={'/imagens/consultor_background.svg'} alt="" style={{ width: "100%" }} />
          <div className="container">
            <Texto>
              <ConsultorNome>{consultor.nomeConsultor}</ConsultorNome>
              <Complemento>
                {consultor.generoConsultor === "Feminino"
                  ? "CONSULTORA"
                  : "CONSULTOR"}{" "}
                UNIFTC
              </Complemento>
            </Texto>
            <Avatar
              src={`${api}/consultor/${consultor.codigoConsultor}/${consultor.fotoConsultor}`}
            />
          </div>
        </div>
      );
    }
  };


  
  const bannerView = useSelector((state) => state.banner.bannerView);
  const consultor = useSelector((state) => state.consultor.consultorFiltro);
  /* const cidades = useSelector((state) => state.consultor.cidades); */

  useEffect(() => {
    setIsMobile(window.innerWidth <= 500);
 
  }, []);

  return (
    <>
      <ModalMatriculaBlackWeek
        onAbreModal={show}
        onFecharModal={() => setShow(false)}
        size="xl"
      />
      <BannerDiv
      >
        {consultorId === undefined ? ( <Swiper
          slidesPerView={1}
          spaceBetween={10}
          /* loop={true} */
          pagination={{
            clickable: true,
          }}
          navigation={true}
          centeredSlides={true}
        >
          {bannerView &&
            bannerView
              .slice()
              .sort((a, b) => a.ordem - b.ordem)
              .map((b, index) => (
                  <React.Fragment key={Math.random()+index}>
                    {b.tipo === "desktop" && !isMobile && (
                      <SwiperSlide key={Math.random()+index}>
                        <div key={Math.random()+index} className="d-none d-lg-block d-sm-block d-print-block">
                          {banners(b.banner, b.link, consultor)}
                        </div>
                      </SwiperSlide>
                    )}

                    {b.tipo === "mobile" && isMobile && (
                      <SwiperSlide key={Math.random()+index}>
                        <div key={Math.random()+index} className="d-block d-sm-none">
                          {banners(b.banner, b.link, consultor)}
                        </div>
                      </SwiperSlide>
                    )}
                  </React.Fragment>
                
                ))}
        </Swiper>) :(
           
             <div>
               <Image src={'/imagens/consultor_background.svg'} alt="" style={{ width: "100%" }} />
               <div className="container">
                 <Texto>
                   <ConsultorNome>{consultor.nomeConsultor}</ConsultorNome>
                   <Complemento>
                     {consultor.generoConsultor === "Feminino"
                       ? "CONSULTORA"
                       : "CONSULTOR"}{" "}
                     UNIFTC
                   </Complemento>
                 </Texto>
                 <Avatar
                   src={`${api}/consultor/${consultor.codigoConsultor}/${consultor.fotoConsultor}`}
                 />
               </div>
             </div>
        )}
       
      </BannerDiv>
    </>
  );
};

export default Banner;
