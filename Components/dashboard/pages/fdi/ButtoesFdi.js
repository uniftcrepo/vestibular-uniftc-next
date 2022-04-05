import React, { useEffect, useState } from "react";
import { Row, Col, Tab, Tabs, Nav, Accordion, Card } from "react-bootstrap";
import styled from "styled-components";
import Button from "../../../../pages/dashboard/components/elementos/ButtonClickLink";
import parse from "html-react-parser";
import { DATA } from "../../../../pages/dashboard/components/utils/data";
export const Container = styled.div`
  .exceto_medicina,
  .condicoes_comercias {
    font-size: 10px;
  }
  @media (max-width: 768px) {
    /*  width: 100vh; */
  }
`;

export const DivBotoes = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 1500px) {
    flex-wrap: wrap;
    flex-flow: row wrap;
    justify-content: center;
  }

  .nav-tabs .nav-item {
    margin-bottom: -2px;
    margin-left: 2px;
    padding-left: 21px;
    padding-right: 27px;
    font-size: 12px;
  }
  .nav {
    text-align: center;
  }
  .nav-tabs .nav-link.active {
    background: #1c3661;
    color: white;
  }
  .nav-tabs .nav-link {
    background: #0093ff;
    color: white;
  }
  .tab-content > .active {
     /* width: 1107px; */
    margin-right: -4px;
    border: 1px solid;
  }
`;
export const DivBotaoMobile = styled.div`
  @media screen and (min-width: 50px) and (max-width: 768px) {
    display: show;
    padding: 20px 20px;
    .card-header {
      padding: 0.75rem 1.25rem;
      margin-bottom: 0;
      background-color: #0093ff;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      color: white;
    }
    .inscreva-se {
      padding-top: 10px;
      text-align: center;
    }
    .inscreva-ja-se {
      text-align: center;
    }

    .card {
      border: 2px solid #0093ff;
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

export const Texto = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  > h1 {
    font-size: 16px;
    color: #666666;
  }
  > div {
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
    color: #000000;
  }
`;

export const ConteutoCursos = styled.div`
  /*  margin-top:20px;
  margin-bottom:20px; */
`;

export const ContainerCursosSeparacao = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 1035px;
  color: #333;
  font-family: sans-serif;
  .titulo {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 15px;
    font-weight: bold;
  }
  .subtitulo {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 15px;
    font-weight: bold;
    .medicina_fdis {
      margin-left: 21px;
      margin-top: 10px;
    }
  }
  .texto_legal {
    font-size: 10px;
    color: #666;
    font-style: italic;
  }

  > div:first-child {
    text-align: justify;
    align-items: center;
    justify-content: center;
    margin-left: 40px;
  }
  .obs {
    text-decoration: underline;
  }

  p {
    line-height: 18px;
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  .buttoesInscrevase {
    p {
      color: #333;
      font-weight: bold;
      margin-bottom: 10px;
      /* margin-left: 70px; */
      text-align: center;
      margin-right: 76px;
      margin-top: revert;
      font-size: 18px;
    }
  }

  > div span {
    font-size: 14px;
    font-weight: bold;
    line-height: 27px;
  }

  .realize_a_prova{
    font-size: 14px;
    margin-top: 18px;
    margin-right: 71px;
    margin-left: 29px;
  }
  .textoAba{
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin-right: 60px;
  }

  @media screen and (min-width: 768px) and (max-width: 1430px) {
    > div:first-child p {
      font-size: 14px;
      line-height: 15px;
    }

    > div:first-child p:last-child {
      font-size: 10px;
    }
    > div span {
      font-size: 12px;
    }
    > div:first-child p:nth-child(2) {
      font-weight: bold;
      font-size: 18px;
    }
  }
  @media screen and (min-width: 50px) and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div:first-child p {
      font-size: 20px;
      line-height: 32px;
    }

    > div:first-child p:last-child {
      font-size: 14px;
    }
    > div span {
      font-size: 12px;
    }
  }
`;

const ButtoesFdi = ({ FDI, textoLegal }) => {
  const [concurso, setConcurso] = useState("299");
  const [habilitarzap, setHabilitarzap] = useState();
  const [habilitarform, setHabilitarform] = useState();
  const [habilitarbutaoinscricao, setHabilitarbutaoinscricao] = useState(true);
  const [validated, setValidated] = useState(false);
  const [atualizacaoFdi, setAtualizacaoFdi] = useState(FDI);



  useEffect(() => {
    setHabilitarbutaoinscricao(concurso === undefined ? false : true);
  }, [concurso]);

  const pegarConcurso = (id) => {
    setConcurso(id);
  };

  const time = () => {
    var today = new Date();
    if (today.getHours() > 6 && today.getHours() < 22) {
      setHabilitarzap(true);
    } else {
      setHabilitarzap(false);
    }
  };



  var url_atual = window.location.href;
  var parametrosDaUrl = url_atual.split("?")[1];
  var hash = {};
  if (parametrosDaUrl) {
    var listaDeParametros = parametrosDaUrl.split("&");

    for (var i = 0; i < listaDeParametros.length; i++) {
      var parametro = listaDeParametros[i].split("=");
      var chave = parametro[0];
      var valor = parametro[1];
      hash[chave] = valor;
    }
  }

  var utm;
  if (hash.utm_source !== undefined) {
    utm =
      "?utm_source=" +
      hash.utm_source +
      "&utm_medium=" +
      hash.utm_medium +
      "&utm_campaign=" +
      hash.utm_campaign +
      "&utm_content=" +
      hash.utm_content;
  } else {
    utm =
      "?utm_source=lp_ps&utm_medium=acesso_direto&utm_campaign=vestibular_2020_2&utm_content=inscricao";
  }

  const Botoes = ({
    idinscricao,
    idzap,
    linkzap,
    concurso,
    tamanho,
    fdi,
    prazo,
    prazo2,
    prazo3,
    prazo4,
    inscricoes_abertas,
    pre_prova,
    texto_pre_prova,
    gabarito,
    url_gabarito,
    recurso,
    url_recurso,
    prova,
    url_prova

  }) => {
        
    function botoesAgendados (){
      
      
      return (
        
        <div>
        {/*   {fdi === "7" && (
            <>
           <p className="inscreva-se">Confira o gabarito</p>
            <Button
              cor="#da1f7d"
              texto={"Confira o gabarito"}
              tamanho={tamanho}
              link={"https://uniftc.edu.br/arquivos/gabaritos/UNIFTC%202021.1_Gabarito_Prova0811.pdf"}
              id={idinscricao}
            /> */}
           {/*    <Button
              cor="#28a745"
              texto={"Formulário de abertura de recurso"}
              tamanho={tamanho}
              link={"https://forms.gle/cSqQgtzHMybC2zf17"}
              id={idinscricao}
            /> */}
       {/*    <div className="textoAba">Aguarde a divulgação do resultado e informações de matrícula até o dia 12/11.</div>
         
           </> 
          )} */}
           {inscricoes_abertas === "SIM" && (
             <>
             <p className="inscreva-se">Inscreva-se!</p>
              <Button
              cor="#da1f7d"
              texto={"INSCREVA-SE"}
              tamanho={tamanho}
              link={`http://inscricaoftcimes.crmeducacional.com/Login/${concurso}${utm}`}
              id={idinscricao}
            />
             <Button
                cor="#28a745"
                texto="INSCRIÇÃO PELO WHATSAPP"
                tamanho={tamanho}
                id={idzap}
                link={linkzap}
              />
            </>
          )}
          
          {pre_prova === "SIM" && (
            <div className="textoAba">{texto_pre_prova}</div>
          )}
          
          {gabarito === "SIM" &&(
            <>
          <div>
     {/*      <p className="inscreva-se">Confira o gabarito</p> */}
            <Button
              cor="#fff"
              texto={"Confira o gabarito da prova"}
              tamanho={tamanho}
              link={`https://www.uniftc.edu.br/slimapi/public/gabarito/${url_gabarito}`}
              id={idinscricao}
              target="_blank"
              borderSolid={'2px solid #0093ff'}
              colorTexto={'#0093ff'}
            />
          </div>
         {/*  <div className="textoAba">Aguarde a divulgação do resultado e informações de matrícula até o dia 12/11.</div> */}
          </>
         )}
           {recurso === "SIM" && (
             <>
            {/*  <p className="inscreva-se">Inscreva-se!</p> */}
              <Button
               cor="#fff"
              texto={"Formulário de recurso"}
              tamanho={tamanho}
              link={url_recurso}
              id={idinscricao}
              borderSolid={'2px solid #0093ff'}
              colorTexto={'#0093ff'}
            />
            </>
          )}
           {prova === "SIM" && (
             <>
            {/*  <p className="inscreva-se">Inscreva-se!</p> */}
              <Button
              cor="#fff"
              texto={"Clique e faça a prova"}
              tamanho={tamanho}
              link={url_prova}
              id={idinscricao}
              borderSolid={'2px solid #0093ff'}
              colorTexto={'#0093ff'}
            />
            </>
          )}
        </div>
         
       
       
        
      
       /*  <>
          <div className="textoAba">
            Acesse o ambiente e realize a prova a partir das 13:00
          </div>
          <div>
            <Button
              cor="#da1f7d"
              texto={"Clique e faça sua prova"}
              tamanho={tamanho}
              link={`https://bit.ly/VestibularSuperBolsa${utm}`}
            />
          </div>
         </>  */
        
      
       /*   <>
          <div>
          <p className="inscreva-se">Confira o gabarito</p>
            <Button
              cor="#da1f7d"
              texto={"Confira o gabarito"}
              tamanho={tamanho}
              link={"https://vestibular.uniftc.edu.br/medicina"}
              id={idinscricao}
            />
          </div>
          <div className="textoAba">Aguarde a divulgação do resultado e informações de matrícula até o dia 12/11.</div>
        
          </> */
        /*   <>
          <div>
          <p className="inscreva-se">Confira o gabarito</p>
            <Button
              cor="#da1f7d"
              texto={"Confira o gabarito"}
              tamanho={tamanho}
              link={"https://vestibular.uniftc.edu.br/medicina"}
              id={idinscricao}
            />
            <Button
              cor="#da1f7d"
              texto={"Formulário de abertura de recurso"}
              tamanho={tamanho}
              link={"https://forms.gle/cSqQgtzHMybC2zf17"}
              id={idinscricao}
            />
          </div>
          <div className="textoAba">Aguarde a divulgação do resultado e informações de matrícula até o dia 12/11.</div>
        
        </> */
          
      )
     }
    

    return (
      <div className="buttoesInscrevase">

       
        {!habilitarform && habilitarbutaoinscricao && (
           botoesAgendados()
        )}
        {habilitarform && fdi === "2" && (
          botoesAgendados()
        )}
     {/*    {habilitarzap && !habilitarform && !prazo2 && (
          <div>
            {fdi !== "2" && (
              <Button
                cor="#28a745"
                texto="INSCRIÇÃO PELO WHATSAPP"
                tamanho={tamanho}
                id={idzap}
                link={linkzap}
              />
            )}
          </div>
        )} */}

        
        
        {habilitarform && !habilitarbutaoinscricao && (
          <div>
            {fdi !== "2" && !prazo && (
              <Button
                cor="#28a745"
                texto="INSCRIÇÃO PELO WHATSAPP"
                tamanho={tamanho}
                id={idzap}
                link={linkzap}
              />
            )}
          </div>
        )}
      </div>
    );
  };
  return (
    <Container id="forma_de_ingresso" className="container">


      <Texto>
        <h1>VESTIBULAR UNIFTC</h1>
        <div>Escolha sua forma de ingresso</div>
      </Texto>

      <DivBotoes>
        

        <Tabs
          defaultActiveKey="first"
          transition={false}
          id="noanim-tab-example"
        >
          {" "}
          {FDI &&
            FDI.map((x) => {
              return (
                <Tab
                  eventKey={x.posicao}
                  title={parse(x.nome_da_aba)}
                  className="tabs_forma_de_ingresso"
                  key={x.posicao}
                >
                  <br />

                  <ContainerCursosSeparacao>
                    <Col lg={7}>
                      <br />

                      <p className="titulo">{parse(x.titulo)}</p>

                      <p className="subtitulo">{parse(x.subtitulo)}</p>

                      <div className="texto_legal">{parse(textoLegal)}</div>
                      <br />
                      {/* <div className="obs">Observação</div>
                      <span>{parse(x.textoadicional)}</span> */}
                    </Col>
                    <Col lg={5}>
                      <Botoes
                        idinscricao={"inscricaocrm-" + x.idinscricao}
                        idzap={"inscricaowhatsapp-" + x.idinscricao}
                        linkzap={x.linkzap}
                        concurso={x.concurso}
                        tamanho={"300px"}
                        fdi={x.id}
                        inscricoes_abertas={x.inscricoes_abertas_sim_nao}
                        pre_prova={x.pre_prova_sim_nao}
                        texto_pre_prova={x.texto_pre_prova}
                        gabarito={x.gabarito_sim_nao}
                        url_gabarito={x.url_gabarito}
                        recurso={x.recurso_sim_nao}
                        url_recurso={x.texto_recurso}
                        prova={x.prova_sim_nao}
                        url_prova={x.texto_prova}
                      />
                     
                    </Col>
                  </ContainerCursosSeparacao>
                  <br />
                  {/*  <TituloConteudo>
                            Você tem 40 minutos para fazer uma redação online{" "}
                          </TituloConteudo> */}
                </Tab>
              );
            })}
        </Tabs>
      </DivBotoes>
      {/* <DivBotoes>
        <Button
          texto="FAÇA O VESTIBULAR ONLINE"
          cor="#3a7cc3"
          scrollPage={"fdi"}
        />
        <Button
          texto="USE SUA NOTA DO ENEM DESDE 2010"
          cor="#314a65"
          scrollPage={"fdi"}
        />
        <Button
          texto="TRANSFIRA SEU CURSO PARA A UniFTC"
          cor="#1d5884"
          scrollPage={"fdi"}
        />
        <Button
          texto="SEGUNDA GRADUAÇÃO NA UniFTC"
          cor="#007bff"
          scrollPage={"fdi"}
        />
        <Button
          texto={`REINGRESSE NA UniFTC`}
          cor="#ea7d0d"
          tamanho={"180px"}
          scrollPage={"fdi"}
        />
        <Button
          texto="USE SUA APROVAÇÃO NOS VESTIBULARES DE 2019.2 E 2020.1"
          cor="#8508b9"
          fonteSize="11px"
          padding="10px 20px 10px 20px"
          scrollPage={"fdi"}
        />
      </DivBotoes> */}

      <DivBotaoMobile className="container">
        <Accordion defaultActiveKey="1">
          {FDI &&
            FDI.map((x) => {
              return (
                <Card key={x.posicao}>
                  <Accordion.Toggle as={Card.Header} eventKey={x.id}>
                    {parse(x.forma_de_ingresso)}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={x.id}>
                    <Card.Body>
                      <Col>
                        <br />

                        <p className="titulo">{parse(x.titulo)}</p>

                        <p className="subtitulo">{parse(x.subtitulo)}</p>

                        <div className="texto_legal">{parse(textoLegal)}</div>
                        <br />

                        {/* <div className="obs">Observação</div>
                        <span>{parse(x.textoadicional)}</span> */}
                      </Col>
                      <Botoes
                        idinscricao={"inscricaocrm-" + x.idinscricao}
                        idzap={"inscricaowhatsapp-" + x.idinscricao}
                        linkzap={x.linkzap}
                        concurso={x.concurso}
                        tamanho={"251px"}
                        fdi={x.id}
                        inscricoes_abertas={x.inscricoes_abertas_sim_nao}
                        pre_prova={x.pre_prova_sim_nao}
                        texto_pre_prova={x.texto_pre_prova}
                        gabarito={x.gabarito_sim_nao}
                        url_gabarito={x.url_gabarito}
                        recurso={x.recurso_sim_nao}
                        url_recurso={x.texto_recurso}
                        prova={x.prova_sim_nao}
                        url_prova={x.texto_prova}
                       /*  prazo={botao_de_inscricao_ate(x.botao_de_inscricao_ate)}
                        prazo2={botao_de_inscricao_ate(
                          x.botao_de_inscricao_ate2
                        )}
                        prazo3={botao_de_inscricao_ate(
                          x.botao_de_inscricao_ate3
                        )} */
                      />
                      
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
        </Accordion>
      </DivBotaoMobile>
    </Container >
  );
};

export default ButtoesFdi;
