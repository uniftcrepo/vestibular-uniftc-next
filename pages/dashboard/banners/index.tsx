import React from 'react';
import Base from '../../../Components/dashboard/containers/Base';
import Banners from '../../../Components/dashboard/pages/banners';
import { wrapper } from '../../../src/store/next-store';
import { getBannerView, getBanner } from "../../../src/store/modules/banner/actions";
import { direito5Curso, getCurso } from "../../../src/store/modules/curso/actions";
import { getFdi, getFdiTextoLegal } from "../../../src/store/modules/fdi/actions";
import {
  filtroConsultor,
  getCidades,
} from "../../../src/store/modules/consultor/actions";
import { END } from 'redux-saga';
import { NextPage } from 'next';
const dashboardBanner: NextPage = (props) => {
  return (
      <Base >
          <Banners/>
      </Base>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async () => {
      try {

        const initialState = {
          faculdade: "uniftc",
        };
        // HEADER FDI
        store.dispatch(getFdi(initialState))
        // BANNER
        store.dispatch(getBannerView());
        store.dispatch(getBanner());
        store.dispatch(getCidades());
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
export default dashboardBanner;