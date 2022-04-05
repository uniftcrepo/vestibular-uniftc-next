import React,{ useEffect} from 'react';
import Banner from './Components/Banner';
import ButtoesFdi from './Components/ButtoesFdi';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Informacoes from './Components/Informacoes';
import Escolha from './Components/Escolha';
import Diferenciais from './Components/Diferenciais';
import InformacoesUnidadeCursos from './Components/InformacoesUnidadeCursos';

import 'bootstrap/dist/css/bootstrap.min.css';


const App = (props) => {

  useEffect(()=>{
    document.title="Vestibular UNIFTC 2022.1 - Inscreva-se"
  },[])
  return (
    <div className="App">
        <Header /> 
        <Banner {...props} />
        <ButtoesFdi {...props}/>
        {props.match.params.consultor === undefined && (<>
            <InformacoesUnidadeCursos {...props} />
      {/*   <Informacoes {...props} /> */}
        <Diferenciais {...props} />
        {/* <Escolha {...props} /> */}
      {/*  <Fdi {...props} /> */}
      </>)}
        <Footer />
    </div>
  );

}

export default App;
