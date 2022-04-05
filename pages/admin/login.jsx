import React,{useEffect} from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
// Lib para validação
import { wrapper } from '../../src/store/next-store';
import {signInRequest} from '../../src/store/modules/auth/actions';
import { getBannerView } from "../../src/store/modules/banner/actions";
import { direito5Curso, getCurso } from "../../src/store/modules/curso/actions";
import { getFdi, getFdiTextoLegal } from "../../src/store/modules/fdi/actions";
import {
  filtroConsultor,
  getCidades,
} from "../../src/store/modules/consultor/actions";
import { END } from 'redux-saga';
import {ContainerLogin, ContainerCard, LogoImage, Label, Input, Button} from "./stylesLogin"


function Login() {
  useEffect(()=>{
    document.title="CMS Vestibular UNIFTC"
  },[])
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const onSubmit = (data) => {
   
    dispatch(signInRequest(data.usuario, data.senha));
    reset();
  };

  return (
      <ContainerLogin >
        <ContainerCard className="container card card-container"  >
          <div className="card-body">
            <LogoImage className="card-title"><img src={'/imagens/logo.svg'} /></LogoImage>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <Label>Login</Label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="E-mail"
                  {...register("usuario", {
                    required: "Required",
                  })}
                />
                {errors.usuario && (
                  <div className="text-danger">Usuario é requerido</div>
                )}
              </div>
              <div className="form-group">
                <Label>Senha</Label>
                <Input
                  type="password"
                  className="form-control"
                  placeholder="Senha"
                  {...register("senha", {
                    required: "Required",
                  })}
                />
                {errors.senha && (
                  <div className="text-danger">Senha é requerida</div>
                )}
              </div>
              <Button type="submit" className="btn btn-primary">
              {loading ? 'Carregando...' : 'Entrar'}
              </Button>
            </form>
          </div>
        </ContainerCard>
      </ContainerLogin>
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
export default Login;
