import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import ButtoesFdi from '../Components/ButtoesFdi';
import Footer from '../Components/Footer';
/* import SSRProvider from 'react-bootstrap/SSRProvider'; */
import { wrapper } from '../src/store/next-store';
import { getBannerView } from "../src/store/modules/banner/actions";
import {
  filtroConsultor,
  getCidades,
} from "../src/store/modules/consultor/actions";
import { getFdi, getFdiTextoLegal } from "../src/store/modules/fdi/actions";
import {  direito5Curso, getCurso } from "../src/store/modules/curso/actions";
import { getConsultor } from "../src/store/modules/consultor/actions";
import { END } from 'redux-saga';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useSelector } from 'react-redux';
import { useRouter } from "next/router"
import { ParsedUrlQuery } from 'querystring';
const Consultor: NextPage = () => {
  const router = useRouter()
  const consultor = router.query.consultor
  useEffect(() => {
    document.title = "Vestibular UNIFTC 2022.1 - Inscreva-se"
  }, [])
  return (
    <div className="App">
     {/*  <SSRProvider> */}
        <Header />
        <Banner consultorId={consultor} />
        <ButtoesFdi consultorId={consultor}/>
        <Footer />
   {/*    </SSRProvider> */}
    </div>
  );
}


interface Params extends ParsedUrlQuery {
  consultor: string,
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      try {
        const initialState = {
          /* id: 0, */
          faculdade: "uniftc",
        };
        // HEADER FDI
        store.dispatch(getFdi(initialState))
        // BANNER
        const consultorid = params as Params
        store.dispatch(getBannerView());
        store.dispatch(getCidades());
        store.dispatch(filtroConsultor(consultorid.consultor));
        store.dispatch(getFdiTextoLegal(initialState));
        store.dispatch(getConsultor());
        store.dispatch(getCurso());
        store.dispatch(END);
        await store.sagaTask?.toPromise();
        return { props: {} }
      } catch (e) {
        return { props: {} }
      }

    }
)
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { consultor: 'FSA1051' }},
      { params: { consultor: 'VIC0005' }}
    ],
    fallback: false
  };
};

export default Consultor;