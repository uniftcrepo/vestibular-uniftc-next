import React, {useRef, useState, useEffect} from 'react';
import Titulo from '../Texto/Titulo';
import { api } from '../../api';
import { useDispatch, useSelector } from "react-redux";
import {
    updateBannerUpload,
    removeBannerUpload,
    getBanner,
  } from "../../../../../store/modules/banner/actions";
function BlocoImagensMultiples({onFileSelectSuccess, onRemove, tipo, imagens }){

        const fileInput = useRef(null);

        const [file, setFile] = useState(null);
        const [fileInputKey, setFileInputKey] = useState(Date.now());

        const handleFileInput = (e) => {
            const files = e.target.files[0]
            onFileSelectSuccess(files)
            setFile(URL.createObjectURL(files))
        }

      /*   const onRemove = () =>{
            setFile(null);
            setFileInputKey(Date.now())
        } */
        var imagen = "";
        var id ="";
        if(imagens.length){
           var retornoImagen = imagens.filter((p) => String(p.tipo).startsWith(tipo))
           if(retornoImagen.length){
            imagen = `${tipo}_${retornoImagen[0].banner}`;
            id = retornoImagen[0].id
           }
        }    


        return (
            <div className="Bloco-Imagem">
                <div className="flex horizontal">
                    <Titulo tipo="h3" titulo="Imagens" />
                </div>
                <div className="flex vertical">
                    <label><strong>Insira aqui uma nova imagem:&nbsp;</strong></label>
                    <input type="file" name={tipo} onChange={handleFileInput} key={fileInputKey}/>
                    <br />
                    <label><strong>Preview:&nbsp;</strong></label>
                    <div className="imagens-container">
                            <div className="imagem-container flex flex-center" style={{ backgroundImage: `url("${file}")` }}></div>
                    </div>
                </div>
                
                <hr /><br />
                <label><strong>Banner atual:&nbsp;</strong></label>
                <div className="imagens-container">
                  
                            <div 
                                className="imagem-container flex flex-center"
                                style={{ backgroundImage: `url("${api}/banners_desktop/${imagen}")` }}
                               >
                                <div className="imagem-remover flex flex-center" onClick={() => onRemove(id)}>
                                    <span>{"-"}</span>
                                </div>
                            </div>
                </div>
            </div>
        )
    
}

export default BlocoImagensMultiples;