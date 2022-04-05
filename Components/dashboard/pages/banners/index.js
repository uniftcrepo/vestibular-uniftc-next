import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/* import RLDD from "react-list-drag-and-drop/lib/RLDD"; */
/* let RLDD;
if (typeof window !== 'undefined') {
  RLDD = require('react-list-drag-and-drop/lib/RLDD').default;
} */

import ReactLoading from "react-loading";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import {
  addBannerUpload,
  updateBannerUpload,
  getBanner,
  getBannerView,
  removeBanner,
  salvarBannerOrdenado
} from "../../../../src/store/modules/banner/actions";
import styled from "styled-components";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

import { Motion, spring } from "react-motion";
import range from "lodash.range";
export const Legend = styled.div`
  margin: 20px;
  width: 155px;
`;
export const Fieldset = styled.div`
  border: 3px solid;
`;
export const ContainerItemBanner = styled.div`
  border: 1px solid #cccccc;
  margin-bottom: 20px;
  background: #f7f7f7;
`;
export const ConteudoBanner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  //margin-top: 15px;
`;
export const ConjuntoBotaoBanner = styled.div`
  margin-right: 12px;
  margin-top: 11px;
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

export const ConjuntoBotaoBannerModal = styled.div`
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

export const TituloBanner = styled.p`
  font-size: 18px !important;
  margin: 0px;
  font-weight: 400;
  display: flex;
  p {
    padding-top: 15px;
    padding-left: 15px;
  }
  img {
    width: 12%;
  }
`;
export const Pdfview = styled.div`
  margin-top: 38px;
  > a {
    color: #ff1970;
  }
`;

export const TopConteudoBanner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const TopTituloBanner = styled.div`
  font-size: 21px;
  font-weight: 700;
  margin-bottom: 10px;
`;
export const ButtonBanner = styled.div`
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
export const TextoLegalBannerInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 560px;
  margin-bottom: 20px;
  div > input {
    background: #f7f7f7;
  }
`;
export const TextoLegalBannerLabel = styled.label`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0em;
  text-align: left;
  /* margin-top: 15px; */
`;
export const ButtonSimNao = styled.div`
  background-color: white;
  height: 35px;
  width: 185px;
  position: absolute;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 2px 2px 8px -2px #444444;
  /* margin-top: 20px; */
  margin-left: 15px;

  input[type="radio"] {
    display: none;
  }
  .label1 {
    display: block;
    height: 180px;
    width: 130px;
    background: linear-gradient(
      to bottom,
      white 0,
      white 90px,
      #ff1970 90px,
      #ff1970 180px
    );
    position: absolute;
    top: 0;
    color: #2c2c2c;
    transition: 0.5s;
  }
  .label2 {
    display: block;
    height: 180px;
    width: 95px;
    background: linear-gradient(
      to bottom,
      white 0,
      white 90px,
      #000000 90px,
      #000000 180px
    );
    position: absolute;
    top: 0;
    color: #2c2c2c;
    transition: 0.5s;
  }
  .label2 {
    right: 0;
  }
  span {
    cursor: pointer;
    display: flex;
    height: 42px;
    width: 88px;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 18px;
  }
  input:checked + label {
    background-position: 0 -90px;
    color: white;
    transition: 0.7s;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  /*  padding: 0 0 0 20px;
  margin: 0 20px;
  background: #ddd;
  direction: rtl; */
  width: 694px;
  > input {
    /* height: 20px; */
    margin: 0;
    padding-right: 30px;
    width: 100%;
  }
  > img {
    position: absolute;
    bottom: 7px;
    right: 5px;
    width: 24px;
    height: 24px;
  }
`;

const initialState = {
  desktopLabel: "Selecione o novo arquivo",
  mobileLabel: "Selecione o novo arquivo",
  imagemDesktop: [],
  imagemMobile: [],
  link: "",
  ordem: ""
};



function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const springConfig = { stiffness: 300, damping: 50 };
const itemsCount = 4;

class Banners extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topDeltaY: 0,
      mouseY: 0,
      isPressed: false,
      originalPosOfLastPressed: 0,
      order: range(itemsCount)
    };
  }

  
  componentDidMount() {
    window.addEventListener("touchmove", this.handleTouchMove);
    window.addEventListener("touchend", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  handleTouchStart = (key, pressLocation, e) => {
    console.log(key,pressLocation, e);
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  };

  handleTouchMove = (e) => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  };

  handleMouseDown = (pos, pressY, { pageY }) => {
    this.setState({
      topDeltaY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      originalPosOfLastPressed: pos
    });
  };

  handleMouseMove = ({ pageY }) => {
    const {
      isPressed,
      topDeltaY,
      order,
      originalPosOfLastPressed
    } = this.state;

    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = clamp(Math.round(mouseY / 100), 0, itemsCount - 1);
      let newOrder = order;

      if (currentRow !== order.indexOf(originalPosOfLastPressed)) {
        newOrder = reinsert(
          order,
          order.indexOf(originalPosOfLastPressed),
          currentRow
        );
      }

      this.setState({ mouseY: mouseY, order: newOrder });
    }
  };

  handleMouseUp = () => {
    this.setState({ isPressed: false, topDeltaY: 0 });
  };

  render() {
    const { mouseY, isPressed, originalPosOfLastPressed, order } = this.state;

    return (
      <div className="demo8">
        {range(itemsCount).map((i) => {
          const style =
            originalPosOfLastPressed === i && isPressed
              ? {
                  scale: spring(1.1, springConfig),
                  shadow: spring(16, springConfig),
                  y: mouseY
                }
              : {
                  scale: spring(1, springConfig),
                  shadow: spring(1, springConfig),
                  y: spring(order.indexOf(i) * 100, springConfig)
                };
          return (
            <Motion style={style} key={i}>
              {({ scale, shadow, y }) => (
                <div
                  onMouseDown={this.handleMouseDown.bind(null, i, y)}
                  onTouchStart={this.handleTouchStart.bind(null, i, y)}
                  className="demo8-item"
                  style={{
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${
                      2 * shadow
                    }px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: i === originalPosOfLastPressed ? 99 : i
                  }}
                >
                  {order.indexOf(i) + 1}
                </div>
              )}
            </Motion>
          );
        })}
      </div>
    );
  }
}

export default Banners;
