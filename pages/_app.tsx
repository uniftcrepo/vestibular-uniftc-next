import '../styles/globals.scss'
/* import 'swiper/swiper-bundle.min.css'; */
import 'bootstrap/dist/css/bootstrap.min.css';
/* import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './react-confirm-alert-local.css'; */
/* import '../public/static/RLDDFloatingItem.css' */
import '../styles/RLDDFloatingItem.module.css'
import "../styles/boardz.module.scss";
import 'react-loading-skeleton/dist/skeleton.css'
import React, { FC } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next';
import { wrapper }from '../src/store/next-store';
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
const MyApp: NextPage<AppProps> =({ Component, pageProps }: AppProps) =>{
  return (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
  )
}

export default wrapper.withRedux(MyApp);
