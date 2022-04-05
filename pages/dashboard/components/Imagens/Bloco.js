import React from 'react';
import Titulo from '../Texto/Titulo';
import { api } from '../../api';

class BlocoImagem extends React.Component {
    render(){
        const { handleSubmit, imagens, onRemove, tipo} = this.props
        
        var imagen = imagens.filter(p => String(p).startsWith(tipo));

        return (
            <div className="Bloco-Imagem">
                <div className="flex horizontal">
                    <Titulo tipo="h3" titulo="Imagens" />
                </div>
                <div className="flex vertical">
                    <label><strong>Insira aqui uma nova imagem:&nbsp;</strong></label>
                    <input type="file" name={tipo} onChange={handleSubmit}/>
                    
                </div>
                
                <hr /><br />
                <div className="imagens-container">
                  
                            <div 
                                className="imagem-container flex flex-center"
                                style={{ backgroundImage: `url("${api}/banners_desktop/${imagen}")` }}
                               >
                                <div className="imagem-remover flex flex-center" onClick={() => onRemove(imagen)}>
                                    <span>{"-"}</span>
                                </div>
                            </div>
                </div>
            </div>
        )
    }
}

export default BlocoImagem;