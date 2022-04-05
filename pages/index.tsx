import React, { useEffect } from 'react';
import Banner from '../Components/Banner';
import ButtoesFdi from '../Components/ButtoesFdi';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import InformacoesUnidadeCursos from '../Components/InformacoesUnidadeCursos';
import Diferenciais from '../Components/Diferenciais';

/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import { wrapper } from '../src/store/next-store';
import { getBannerView } from "../src/store/modules/banner/actions";
import { direito5Curso, getCurso } from "../src/store/modules/curso/actions";
import { getFdi, getFdiTextoLegal } from "../src/store/modules/fdi/actions";
import {
  filtroConsultor,
  getCidades,
} from "../src/store/modules/consultor/actions";
import { END } from 'redux-saga';
import { NextPage } from 'next';

const Home: NextPage = (props) => {

  useEffect(() => {
    document.title = "Vestibular UNIFTC 2022.1 - Inscreva-se"
  }, [])
  return (
    <div className="App">
      <Header />
      <Banner consultorId={undefined}/>
      <ButtoesFdi  consultorId={undefined}/>
      <InformacoesUnidadeCursos />
      <Diferenciais />
      <Footer />
    </div>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async () => {
      try {

        const initialState = {
          /* id: 0, */
          faculdade: "uniftc",
        };
        // HEADER FDI
        store.dispatch(getFdi(initialState))
        // BANNER
        store.dispatch(getBannerView());
        store.dispatch(getCidades());
        /*  if (match.params.consultor !== undefined) {
           dispatch(filtroConsultor(match.params.consultor));
         } */
        // CONSULTOR
        store.dispatch(getFdiTextoLegal(initialState));
        store.dispatch(getCurso());
        store.dispatch(END);
        await store.sagaTask?.toPromise();
        return { props: {} }
      } catch (e) {
        return { props: {} }
      }

    }
)
export default Home;