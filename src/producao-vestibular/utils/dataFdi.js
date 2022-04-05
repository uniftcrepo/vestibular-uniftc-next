
import axios from 'axios';

const JSONFDI = {

   "fdi": [
     {
        type: undefined,
        portfolioImage: 'Intake 20-1_VESTIBULAR_web banner_1920x500.png',
        portfolioImageMobile: 'Intake 20-1_VESTIBULAR_web banner_640x738.png',
        banner_form: 'background_vestibular_online.png',
        banner_form_mobile: 'background_vestibular_online_mob.png',
        titulo_fdi:'Movimente novas possibilidades: conecte-se com o mundo através do Vestibular Online',
        texto_fdi:'Conectividade, a palavra do momento. Derivada da conexão, ela traz a possibilidade de ligação, nexo, união e coerência com tudo aquilo ao qual você deseja estabelecer um vínculo. A conectividade te proporciona estar em um só lugar e em todos os outros que você queira. Ela otimiza o tempo, reduz distâncias e te convida para se inserir nessa nova era de inovação através de ferramentas digitais e tecnológicas. Aderir à conectividade vai além de um estar na moda. Através desse meio que vem se tornando essencial no cotidiano das pessoas, você pode caminhar com as novas tendências mundiais e movimentar os seus sonhos, propósitos e futuro profissional. Por que não? Nesse momento, nós te trazemos um produto inovador, prático e cômodo onde você se conecta com o seu desejo da graduação através do nosso Vestibular Online. Ele te oferece a segurança necessária para que você inicie a sua jornada profissional com grandes desafios, alinhados com as transformações globais. Fazer o Vestibular Online é descobrir que o futuro é aqui. Use a inovação a seu favor e mergulhe no seu propósito de vida. Inscreva-se agora mesmo:',
        color:'#002d4e',
        tipo:'regular'

     }, 
     {
         type: 'segunda-graduacao',
         portfolioImage: 'Intake 20-1_SG_web banner_1920x500.png',
         portfolioImageMobile: 'Intake 20-1_SG_web banner_640x738.png',
         banner_form: 'background_segunda_graduacao.png',
         banner_form_mobile: 'background_segunda_graduacao_mob.png',
         titulo_fdi:'Acredite em um novo movimento: protagonize o seu futuro de sucesso!',
         texto_fdi:'Seu futuro em movimento abre um leque de possibilidades para que você escolha por qual caminho trilhar a partir de agora. É tempo de ousar, acreditar nos seus mais profundos desejos e se permitir vivenciar os seus sonhos de protagonizar um novo campo profissional. Mais importante do que caminhar, é dar o passo certo. Fazer uma Segunda Graduação pode te proporcionar as grandes descobertas que você tanto procura. Com a gente, o processo seletivo é simples, prático e seguro. Basta preencher o formulário com a unidade e o curso da sua preferência, concluir a sua inscrição anexando os documentos necessários e realizar a sua matrícula de forma inteiramente online. Chegou a hora de se tornar o profissional que sempre sonhou. Chegou a sua hora de se tornar UniFTC!',
         color: '#002d4e',
         tipo:'regular'

      },
      {
         type: 'transferencia-externa',
         portfolioImage: 'Intake 20-1_TE_web banner_1920x500.png',
         portfolioImageMobile: 'Intake 20-1_TE_web banner_640x738.png',
         banner_form: 'background_transferencia_externa.png',
         banner_form_mobile: 'background_transferencia_externa_mob.png',
         titulo_fdi:'Liberte-se para o novo, inscreva-se na nossa Transferência Externa',
         texto_fdi:'Seu futuro em movimento grita por liberdade e pede para que você confie na sua vontade de ir atrás de tudo aquilo que te move, superando obstáculos e saboreando outras possibilidades que só a coragem da mudança pode te proporcionar. Investir em uma instituição que acredita em você e na sua formação completa é ser protagonista e livre para eleger o melhor para si. Liberdade é mudança, transformação, acolhimento e, sobretudo, confiança nos nossos sonhos e propósitos internos. Mude agora pelo seu futuro, integre esse novo movimento, seja UniFTC! Como realizar a minha transferência? Aqui você realiza a sua Transferência Externa de forma rápida, prática, segura e 100% online. Basta colocar o curso da sua preferência e a unidade da sua escolha, preencher o formulário, anexar os documentos necessários e realizar a sua matrícula.',
         color:'#90c040',
         tipo:'regular'
      },
      {
        type: 'enem',
        portfolioImage: 'Intake 20-1_ENEM_web banner_1920x500.png',
        portfolioImageMobile: 'Intake 20-1_ENEM_web banner_640x738.png',
        banner_form: 'background_enem.png',
        banner_form_mobile: 'background_enem_mob.png',
        titulo_fdi:'Voe com o seu potencial e movimente o futuro através da sua Nota Enem',
        texto_fdi:'O futuro já começou e o que ele pede da gente é movimento em torno da concretização dos nossos sonhos e aspirações. Chegou o momento de você abrir asas e alçar vôo em direção ao seu propósito de vida. Ingressar na graduação que sempre quis e se tornar um profissional preparado para o mercado de trabalho? Com a gente isso não só é possível, como também real. Portanto, você precisa adquirir uma visão ampla daquilo que realmente deseja e acreditar na sua capacidade de conquista. Ultrapasse limites, quebre barreiras, supere obstáculos e se permita a descobrir o novo a partir da graduação. Inscreva-se no nosso processo seletivo através da sua Nota Enem de forma rápida, prática e segura. Garanta a sua vaga no curso que sempre quis que nós te garantimos uma formação completa para que você enfrente todos os desafios da sua jornada profissional.',
        color:'#002d4e',
        tipo:'regular'
     },
     {
        type: 'online',
        portfolioImage: 'Intake 20-1_VESTIBULAR_web banner_1920x500.png',
        portfolioImageMobile: 'Intake 20-1_VESTIBULAR_web banner_640x738.png',
        banner_form: 'background_vestibular_online.png',
        banner_form_mobile: 'background_vestibular_online_mob.png',
        titulo_fdi:'Movimente novas possibilidades: conecte-se com o mundo através do Vestibular Online',
        texto_fdi:'Conectividade, a palavra do momento. Derivada da conexão, ela traz a possibilidade de ligação, nexo, união e coerência com tudo aquilo ao qual você deseja estabelecer um vínculo. A conectividade te proporciona estar em um só lugar e em todos os outros que você queira. Ela otimiza o tempo, reduz distâncias e te convida para se inserir nessa nova era de inovação através de ferramentas digitais e tecnológicas. Aderir à conectividade vai além de um estar na moda. Através desse meio que vem se tornando essencial no cotidiano das pessoas, você pode caminhar com as novas tendências mundiais e movimentar os seus sonhos, propósitos e futuro profissional. Por que não? Nesse momento, nós te trazemos um produto inovador, prático e cômodo onde você se conecta com o seu desejo da graduação através do nosso Vestibular Online. Ele te oferece a segurança necessária para que você inicie a sua jornada profissional com grandes desafios, alinhados com as transformações globais. Fazer o Vestibular Online é descobrir que o futuro é aqui. Use a inovação a seu favor e mergulhe no seu propósito de vida. Inscreva-se agora mesmo:',
        color:'#002d4e',
        tipo:'regular'
     },
     
     {
        type: 'medicina',
        portfolioImage: 'Intake 20-1_MEDICINA_web banner_1920X500.png',
        portfolioImageMobile: 'Intake 20-1_MEDICINA_web banner_640X738.png',
        banner_form: 'background_segunda_graduacao.png',
        banner_form_mobile: 'background_segunda_graduacao_mob.png',
        titulo_fdi:'Acrescente propósito no seu futuro profissional, descubra uma nova Medicina!',
        texto_fdi:'Propósitos dão sentido à vida. Sustentam os nossos valores, crenças, afetos e relações. Eles nos oferecem segurança, estabilidade emocional, equilíbrio financeiro, reconhecimento social. Propósitos revelam os nossos desejos e mostram o que podemos nos tornar: heróis e heroínas da nossa própria jornada. Nesse momento, um novo mundo está nascendo ao nosso redor e pede para que possamos preenchê-lo com movimento. Nesse momento, um novo mundo está nascendo ao nosso redor e pede por propósitos! Qual é o seu? Salvar vidas, ajudar pessoas, protagonizar grandes avanços e descobertas na sociedade? Se sim, há um caminho a ser seguido: o caminho da Medicina. Chegou a hora de você dar mais um passo em direção ao que sempre quis e ingressar no curso dos seus sonhos. Acredite nos seus propósitos, acredite em você. O seu futuro começa agora!',
        color: '#002d4e',
        tipo:'regular'
     },


     {
        type: 'corporativo',
        portfolioImage: 'Intake 20-1_COPORATIVO_web banner__1920X500.png',
        portfolioImageMobile: 'Intake 20-1_CORPORATIVO_web banner_640x738.png',
        banner_form: 'background_enem.png',
        banner_form_mobile: 'background_enem_mob.png',
        titulo_fdi:'Seu futuro profissional pede por propósito e persistência. Seu futuro profissional pede por um curso de graduação!',
        texto_fdi:'Você tem acompanhado as mudanças que estão ocorrendo no mundo. A transformação digital foi adianta. Novas habilidades e competências são necessárias para este novo mercado de trabalho. Manter seus conhecimentos atualizados faz parte de todos os diferenciais que você precisa, seja para conquistar uma promoção no trabalho ou então para iniciar sua sonhada carreira.',
        color:'#002d4e',
        tipo:"corporativo"
     },
    

     
    
   ]

};


export function backImage(fdi) {
  
   var retorno = JSONFDI.fdi.filter((val) => {
       if(fdi === 'vestibularonline' || fdi === 'vestibular-online' ){
          fdi = 'online'
       }
       if(fdi === 'segundagraduacao'){
          fdi = 'segunda-graduacao'
       }
       if(fdi === 'trasnferenciaexterna'){
          fdi = 'transferencia-externa'
       }
       return val.type === fdi 
    }).map((val)=>{
       return {background_top : val.portfolioImage,background_top_mobile:val.portfolioImageMobile, background_form :val.banner_form, background_form_mobile :val.banner_form_mobile, color: val.color, titulo_fdi: val.titulo_fdi, texto_fdi: val.texto_fdi};
    })

    if(Object.keys(retorno).length === 0){
     retorno = JSONFDI.fdi.filter((val) => {
        return val.type === undefined
     }).map((val)=>{
        return {background_top : val.portfolioImage,background_top_mobile:val.portfolioImageMobile, background_form :val.banner_form, background_form_mobile :val.banner_form_mobile, color: val.color, titulo_fdi: val.titulo_fdi, texto_fdi: val.texto_fdi};
     })
    }
     
    return retorno
   
}





export const carregarUnidade = async () => {

  
   const data = await carregarUnidadeSemTratamento()
   //setDataBD(response.data);

   //filtrar
   const dataFilter = data.filter((val) => {
      return val.unidade !== 'são paulo';
   })

   //ordena
   const dataSort = dataFilter.sort(function (a, b) {
      return (a.unidade > b.unidade) ? 1 : ((b.unidade > a.unidade) ? -1 : 0);
   });

   //reduce
   const groupCidades = dataSort.reduce((init, current) => {
      if (init.length === 0 || init[init.length - 1] !== current.unidade) {
         init.push(current.unidade);
      }
      return init;

   }, []);
  /*  setUnidade(groupCidades.map((val, key) => {
      return { label: val, value: key }
   })) */
   return await groupCidades;

}

export const carregarUnidadeSemTratamento = async () => {
   const response = await axios.get('https://www.uniftc.edu.br/slimapi/public/dadosForm/curso/unidade/fdi/turno/select');
   return await response.data
}

export const botao_de_inscricao_ate = (prazo) => {
   if (prazo === "indefinido") return false;

   // Inicializamos o objeto Date() com data e horário atual
   const date1 = new Date();
   // Inicializamos uma data no passado
   const date2 = new Date(prazo);

   // Verificamos se primeira data é igual, maior ou menor que a segunda
   if (date1.getTime() === date2.getTime()) {
     return true;
   } else if (date1.getTime() > date2.getTime()) {
     return true;
   }
   //console.log(prazo)
   return false;
 };



export default backImage;
