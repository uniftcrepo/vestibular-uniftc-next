import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import styled from 'styled-components';
import axios from 'axios';
import { cpfMask } from './functions/MaskCpf';
import validarCpf from 'validar-cpf';
import { telMask } from './functions/MaskCelular';
import swal from 'sweetalert';
import backImage, { carregarUnidade, carregarUnidadeSemTratamento } from '../utils/dataFdi';

import "../styled/styles_novo.scss"
import { useDispatch, useSelector } from "react-redux";
import {
    getConsultor,
  } from "../../store/modules/consultor/actions";


export const Section = styled.section`
       background-image: url(${props => require(`../imagens/${props.background[0].background_form}`)});  
       background-size: cover;
       top: 0;
       right: 0;
       left: 0;
       max-width: 100%;
       
       @media screen and (min-width: 50px) and (max-width: 768px) {
         background-image: url(${props => require(`../imagens/mob/${props.background[0].background_form_mobile}`)});  
         background-size: cover;
         top: 0;
         right: 0;
         left: 0;
         max-width: 100%;
       }
       .invalid-feedback{
          color: #fff !important;
       }
`;
export const MensagemErro = styled.div`
      color: #fff;
`



const Corpo = ({ match, location }) => {


   const [validated, setValidated] = useState(false);



   const [unidade, setUnidade] = useState();
   const [curso, setCurso] = useState('');
   const [turno, setTurno] = useState('');
   const [dataBD, setDataBD] = useState('');
   const [fdi, setFdi] = useState('');
   const [fdiFilterCompleto, setFdiFilterCompleto] = useState('');
   const [idConcurso, setIdConcurso] = useState('');

   const [unidadeSelecionada, setUnidadeSelecionada] = useState();
   const [turnoSelecionado, setTurnoSelecionado] = useState({ label: 'Turno...', value: "0" });
   const [cursoSelecionado, setCursoSelecionado] = useState({ label: 'Curso...', value: "" });
   const [fdiSelecionado, setFdiSelecionado] = useState({ label: 'Formas de ingresso...', value: "" });
   const [disabledTurno, setDisabledTurno] = useState(true);
   const [disabledCurso, setDisabledCurso] = useState(true);
   const [disabledFdi, setDisabledFdi] = useState(true);

   const [mensagemErroCpf, setMensagemErroCpf] = useState("");
   const [mensagemErroEmail, setMensagemErroEmail] = useState("");
   const [isLoading, setLoading] = useState(false);
   const [disabledEnviar, setDisabledEnviar] = useState(true);
   const [utm, setUtm] = useState();
   const [groupCidades, setGroupCidades] = useState();
   const [urlFdi, setUrlFdi] = useState();
   const [tipo, setTipo] = useState();
   const [formInscreva, setFormInscreva] = useState({
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      unidade: '',
      curso: '',
      turno: '',
      fdi: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      cod_consultor: '',
      id_consultor: '',
      formulario_de_inscricao: 'vestibular',
      periodo_letivo: '2020.2',
   })
   const dispatch = useDispatch();
   const consultor = useSelector((state) => state.consultor.consultor);
   useEffect(() => {
       dispatch(getConsultor());
     }, [dispatch]);

   console.log(consultor) 

   useEffect(() => {
      /*  carregarUnidade(); */
      async function chamadaFetchCidade() {
         var data = await carregarUnidadeSemTratamento();
         var groupCidades = await carregarUnidade();
         const arrayUrl = match.url.split("/");
         setUrlFdi(arrayUrl[1]);

         if (arrayUrl[1] === "corporativo") {
            //Pega somente cursos do corporativo 
            data = data.filter((val) => {
               return val.id_concurso === "317" || val.id_concurso === "318" || val.id_concurso === "319" || val.id_concurso === "320";
            });
         } else {
            //Não pega os cursos do corporativo
            data = data.filter((val) => {
               return val.id_concurso !== "317" && val.id_concurso !== "318" && val.id_concurso !== "319" && val.id_concurso !== "320";
            });
         }

         if (arrayUrl[1]  === "medicina") {
            data = data.filter((val) => {
               return val.curso == "Medicina";
            });

            groupCidades = groupCidades.filter((val) => {
               return val == "salvador paralela"
            })
         } else {
            data = data.filter((val) => {
               return val.curso != "Medicina";
            });
         }

         setDataBD(data);

         if (groupCidades) {
            setUnidade(groupCidades.map((val, key) => {
               return { label: val, value: key }
            }))
         }
      }
      chamadaFetchCidade();
      if (match.params.consultor !== undefined) {
        if(consultor){
        /*  const [arrayConsultor] = Consultor(consultor, match.params.consultor)

         setFormInscreva({
            ...formInscreva,
            ['cod_consultor']: arrayConsultor.codigoConsultor,
            ['id_consultor']: arrayConsultor.idConsultor
         }) */
        }
        

      } else {
         setFormInscreva({
            ...formInscreva,
            ['cod_consultor']: null,
            ['id_consultor']: null
         })
      }

   }, [match]);

   useEffect(() => {
      setTimeOutLoading();
   });


 


   const pergarUnidadeSelecionada = async (unidadeSelecionada) => {

      setFormInscreva({ ...formInscreva, ['unidade']: unidadeSelecionada.label })
      setCursoSelecionado(null)
      setCurso(null)
      setDisabledEnviar(true)
      setTurnoSelecionado(null)
      setFdiSelecionado(null)
      setFdi(null)
      setDisabledTurno(false)
      setDisabledCurso(true)
      setDisabledFdi(true)
      setUnidadeSelecionada(unidadeSelecionada)
      //filtrar
      let turnoFilter = dataBD.filter((val) => {
         return val.unidade === unidadeSelecionada.label;
      });

      //ordena
      let turnosSort = turnoFilter.sort(function (a, b) {
         return (a.turno > b.turno) ? 1 : ((b.turno > a.turno) ? -1 : 0);
      });

      //reduce

      let groupTurnos = turnosSort.reduce((init, current) => {
         if (init.length === 0 || init[init.length - 1] !== current.turno) {
            init.push(current.turno);
         }
         return init;
      }, []);


      setTurno(groupTurnos.map((val, key) => {
         return { label: val, value: key }
      }));

   }
   const pergarTurnoSelecionada = (turnoSelecionado) => {
      setFormInscreva({ ...formInscreva, ['turno']: turnoSelecionado.label })
      setCursoSelecionado(null)
      setCurso(null)
      setTurnoSelecionado(turnoSelecionado)
      setDisabledEnviar(true)
      setFdiSelecionado(null)
      setFdi(null)
      setDisabledCurso(false)
      setDisabledFdi(true)
      //filtrar
      let cursoFilter = dataBD.filter((val) => {
         return val.turno === turnoSelecionado.label && val.unidade === unidadeSelecionada.label;
      });

      //ordena
      let cursosSort = cursoFilter.sort(function (a, b) {
         return (a.curso > b.curso) ? 1 : ((b.curso > a.curso) ? -1 : 0);
      });

      //reduce

      let groupCursos = cursosSort.reduce((init, current) => {
         if (init.length === 0 || init[init.length - 1] !== current.curso) {
            init.push(current.curso);
         }
         return init;
      }, []);

      setCurso(groupCursos.map((val, key) => {
         return { label: val, value: key }
      }));

   }
   const pergarCursoSelecionada = (cursoSelecionados) => {
      setFormInscreva({ ...formInscreva, ['curso']: cursoSelecionados.label })
      setCursoSelecionado(cursoSelecionados)
      setDisabledEnviar(true)
      setFdiSelecionado(null)
      setFdi(null)
      setDisabledFdi(false)
      //filtrar
      let fdiFilter = dataBD.filter((val) => {
         return val.turno === turnoSelecionado.label && val.unidade === unidadeSelecionada.label && val.curso === cursoSelecionados.label;
      });

      setFdiFilterCompleto(fdiFilter);



      setFdi(fdiFilter.map((val, key) => {
         return { label: val.concurso, value: val.id_concurso }
      }));

   }
   const pergarFdiSelecionada = (fdiSelecionados) => {
      setFormInscreva({ ...formInscreva, ['fdi']: fdiSelecionados.value })

      setIdConcurso(fdiSelecionados.value)
      setFdiSelecionado(fdiSelecionados)
      setDisabledEnviar(false)
   }

   const submitForm = (e) => {
      e.preventDefault();
      setDisabledEnviar(false)
      pegarUrl();
      const form = e.currentTarget;

      if (form.checkValidity() === false) {
         setMensagemErroCpf('')
         setMensagemErroEmail('')
         e.stopPropagation();
      } else {
         setLoading(true);
         //handleClose();
         //
      }

      setValidated(true);


   }


   function pegarUrl() {
      //Pegar UTMS


      //Modifica as utms midia e conteudo quando o codigo do consultor for adicionado
      var midia;
      var conteudo;
      if (match.params.consultor !== undefined) {
         midia = "consultor";
         conteudo = match.params.consultor;
      } else {
         midia = "acesso_direto";
         conteudo = "inscricao";
      }

      var url_atual = window.location.href;
      var parametrosDaUrl = url_atual.split("?")[1];
      var hash = {}
      if (parametrosDaUrl) {
         var listaDeParametros = parametrosDaUrl.split("&")

         for (var i = 0; i < listaDeParametros.length; i++) {
            var parametro = listaDeParametros[i].split("=");
            var chave = parametro[0];
            var valor = parametro[1];
            hash[chave] = valor;
         }
      }
      if (hash.utm_source !== undefined) {
         setFormInscreva({ ...formInscreva, ['utm_source']: hash.utm_source, ['utm_medium']: hash.utm_medium, ['utm_campaign']: hash.utm_campaign, ['utm_content']: hash.utm_content })
         setUtm("&utm_source=" + hash.utm_source + "&utm_medium=" + hash.utm_medium + "&utm_campaign=" + hash.utm_campaign + "&utm_content=" + hash.utm_content)
      } else {
         setUtm("&utm_source=lp_ps&utm_medium=" + midia + "&utm_campaign=vestibular_2021_2&utm_content=" + conteudo)
         setFormInscreva({ ...formInscreva, ['utm_source']: 'lp_ps', ['utm_medium']: midia, ['utm_campaign']: 'vestibular_2021_2', ['utm_content']: conteudo })
      }
   }
   const handleChange = (event) => {
      if (event.target.name === 'cpf') {
         event.target.value = cpfMask(event.target.value)
         if (event.target.value.length >= 14) {
            if (!validarCpf(event.target.value)) {
               setMensagemErroCpf("Cpf não é válido!")

            } else {
               setMensagemErroCpf("");
            }

         }
      }

      if (event.target.name === 'telefone') {
         event.target.value = telMask(event.target.value)
      }
      setFormInscreva({ ...formInscreva, [event.target.name]: event.target.value })
   }
   const simulateNetworkRequest = () => {
      return new Promise(resolve => setTimeout(resolve, 2000));
   }
   const setTimeOutLoading = () => {
      if (isLoading) {
         simulateNetworkRequest().then(() => {
            setLoading(false);
            gravarBanco();

         });
      }
   }
   const gravarBanco = async () => {
      const data = await axios.post('https://www.uniftc.edu.br/slimapi/public/vestibular_online', { formInscreva });

      if (data.data) {
         swal("Rede UNIFTC", "Sua inscrição foi realizada com sucesso!", "success");
         if (fdiFilterCompleto && idConcurso && formInscreva.cpf && utm) {
            const oferta = fdiFilterCompleto.filter((val) => {
               return val.id_concurso === idConcurso
            });

            var tag = "?cpf=" + formInscreva.cpf + "&o=" + oferta[0].identificador_do_curso + utm;

            var redirecionamento = "https://inscricao.uniftc.edu.br/login/";
            redirecionamento = redirecionamento + idConcurso + tag;
            //console.log(redirecionamento);
            window.location.replace(redirecionamento);
         }
      } else {
         swal("Rede UNIFTC", "Ocorreu um problema no servidor, tente novamente!", "error");
      }

   }

   const validacaoEmail = (e) => {
      const field = e.target.value
      let usuario = field.substring(0, field.indexOf("@"));
      let dominio = field.substring(field.indexOf("@") + 1, field.length);
      if ((usuario.length >= 1) &&
         (dominio.length >= 3) &&
         (usuario.search("@") == -1) &&
         (dominio.search("@") == -1) &&
         (usuario.search(" ") == -1) &&
         (dominio.search(" ") == -1) &&
         (dominio.search(".") != -1) &&
         (dominio.indexOf(".") >= 1) &&
         (dominio.lastIndexOf(".") < dominio.length - 1)) {

         setMensagemErroEmail("")
      }
      else {
         setFormInscreva({ ...formInscreva, ['email']: " " })
         setMensagemErroEmail("Email inválido")
      }
   }
   const validacaoCPF = (e) => {
      const cpf = e.target.value;

      if (mensagemErroCpf) {
         setFormInscreva({ ...formInscreva, ['cpf']: "" })
      }
      if (cpf.length < 14) {
         setFormInscreva({ ...formInscreva, ['cpf']: "" })
         setMensagemErroCpf('PREENCHA SEU CPF CORRETAMENTE!')
      } else {
         setMensagemErroCpf('')
      }
   }
   return (

      <Section id="corpo" background={backImage(urlFdi )} >
         <Container>
            <div className="formulario">
               <Row className="text-center ">
                  <Col className="interna-texto">
                     <p>QUER ESTUDAR NA UNIFTC?</p>
                     <p>PREENCHA SUAS INFORMAÇÕES NO <b>FORMULÁRIO ABAIXO</b></p>
                  </Col>

                  <Form noValidate validated={validated} onSubmit={submitForm}>
                     <Container>
                        <Form.Row>
                           <Form.Group as={Col} xs={12} lg={4}>
                              <Form.Control
                                 type="text"
                                 placeholder="Nome"
                                 required
                                 onChange={handleChange}
                                 name="nome"
                                 value={formInscreva.nome}
                              />

                              <Form.Control.Feedback type="invalid">Preencha com seu nome!</Form.Control.Feedback>
                           </Form.Group>

                           <Form.Group as={Col} xs={12} lg={4}>
                              <Form.Control
                                 type="text"
                                 placeholder="CPF"
                                 value={formInscreva.cpf}
                                 onChange={handleChange}
                                 required
                                 onBlur={validacaoCPF}
                                 name="cpf" />
                              <MensagemErro>{mensagemErroCpf}</MensagemErro>
                              <Form.Control.Feedback type="invalid">Preencha com seu cpf!</Form.Control.Feedback>

                           </Form.Group>

                           <Form.Group as={Col} xs={12} lg={4}>
                              <Form.Control
                                 type="email"
                                 placeholder="E-mail"
                                 onChange={handleChange}
                                 required
                                 name="email"
                                 onBlur={validacaoEmail}
                                 value={formInscreva.email} />
                              <MensagemErro>{mensagemErroEmail}</MensagemErro>
                              <Form.Control.Feedback type="invalid">Preencha com seu email!</Form.Control.Feedback>
                           </Form.Group>
                           <Form.Group as={Col} xs={12} lg={4}>
                              <Form.Control
                                 type="text"
                                 placeholder="Telefone"
                                 onChange={handleChange}
                                 value={formInscreva.telefone}
                                 required
                                 name="telefone" />
                              <Form.Control.Feedback type="invalid">Preencha com seu telefone!</Form.Control.Feedback>
                           </Form.Group>

                           <Form.Group as={Col} xs={12} lg={4}>

                              <Select
                                 id="cidades_form"
                                 allowCreate={true}
                                 backspaceRemoves={true}
                                 onChange={pergarUnidadeSelecionada}
                                 options={unidade}
                                 value={unidadeSelecionada}
                                 clearable={false}
                                 placeholder="Unidade..."
                              />
                              <Form.Control.Feedback type="invalid">Preencha com seu nome!</Form.Control.Feedback>
                           </Form.Group>

                           <Form.Group as={Col} xs={12} lg={4}>
                              <Select
                                 id="turno_form"
                                 isOptionDisabled='yes'
                                 allowCreate={true}
                                 backspaceRemoves={true}
                                 onChange={pergarTurnoSelecionada}
                                 options={turno}
                                 value={turnoSelecionado}
                                 clearable={false}
                                 isDisabled={disabledTurno}
                                 placeholder="Turno..." />
                              <Form.Control.Feedback type="invalid">Preencha com seu nome!</Form.Control.Feedback>
                           </Form.Group>
                           <Form.Group as={Col} xs={12} lg={4}>
                              <Select
                                 id="curso_form"
                                 allowCreate={true}
                                 backspaceRemoves={true}
                                 onChange={pergarCursoSelecionada}
                                 options={curso}
                                 value={cursoSelecionado}
                                 clearable={false}
                                 isDisabled={disabledCurso}
                                 placeholder="Curso..." />
                              <Form.Control.Feedback type="invalid">Preencha com seu nome!</Form.Control.Feedback>
                           </Form.Group>
                           <Form.Group as={Col} xs={12} lg={4}>
                              <Select
                                 id="fdi_form"
                                 allowCreate={true}
                                 backspaceRemoves={true}
                                 onChange={pergarFdiSelecionada}
                                 options={fdi}
                                 isDisabled={disabledFdi}
                                 value={fdiSelecionado}
                                 clearable={false}
                                 placeholder="Formas de ingresso..." />
                              <Form.Control.Feedback type="invalid">Preencha com seu nome!</Form.Control.Feedback>
                           </Form.Group>



                           <Form.Group as={Col} xs={12} lg={4} >
                              <Button type="submit" variant="primary" disabled={disabledEnviar} className="enviar">
                                 {isLoading ? 'Aguarde…' : 'ENVIAR'}
                              </Button>
                           </Form.Group>
                        </Form.Row>
                     </Container>

                  </Form>


               </Row>
            </div>
         </Container>
      </Section>
   );
}


export default Corpo;
