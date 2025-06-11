import React, { useEffect, useState } from 'react';
import './Login.css'; // Importando o CSS existente
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import bandeiraBrasil from '../assets/bandeira-brasil.png';
import bandeiraReinoUnido from '../assets/bandeira-reinounido.png';
import folhaDireitaContrast from '../assets/folha-direitacontrast.png';
import folhaDireitaDark from '../assets/folha-direitadark.png';
import folhaEsquerdaContrast from '../assets/folha-esquerdacontrast.png';
import folhaEsquerdaDark from '../assets/folha-esquerdadark.png';

const textos = {
  pt: {
    MensagemTotalAcima: "Sua pegada de carbono total está acima da média global:",
    MensagemTotalAbaixo: "Parabéns! Sua pegada de carbono está abaixo da média global:",
    AcimaDe: 'acima da média global de ',
    AbaixoDe: 'abaixo da média global de ',
    MensagemAcima: "Sua emissão nesta categoria está acima da média global:",
    MensagemAbaixo: "Ótima notícia! Sua emissão está abaixo da média global:",
    TituloMediaGlobal: 'Média global de emissões:',
    paginaInicial: 'Página inicial',
    testes: 'Testes',
    entrar: 'Entrar',
    nomeDaRotina: '',
    rodape: '© 2025 EcoBalance — Todos os direitos reservados',
    tema: 'Tema:',
    altoContraste: 'Alto Contraste:',
    idioma: 'Idioma',
    TituloNome: 'Nome da Rotina',
    PerguntaNome: 'Digite o nome da sua rotina:',
    PlaceHolderNome: 'Ex: Semana Sustentável',
    TituloAlimentos: 'Alimentos',
    SelecioneDieta: 'Selecione a sua dieta:',
    TooltipDieta: 'Caso sua dieta não esteja dentro das opções, selecione Onívora.',
    SelecioneTresPontinhos: 'Selecione...',
    DietaOnivora: 'Onivora',
    DietaVegetariana: 'Vegetariana',
    DietaVegana: 'Vegana',
    DietaPescetariana: 'Pescetariana',
    DietaCarnivora: 'Carnívora',
    PorcoesConsumidas: 'Porções consumidas por semana:',
    AjudaPorcoes: 'Considere que uma porção equivale a uma refeição média do alimento selecionado.',
    TituloGas: 'Gás',
    PerguntaGas: 'Você utiliza gás encanado ou compra botijões?',
    SelecaoEncanado: 'Gás encanado',
    SelecaoBotijao: 'Botijão',
    PerguntaTipoBotijão: 'Qual tipo de botijão?',
    BotijaoP13: 'Comum P13',
    BotijaoP20: 'Médio P20',
    BotijaoP45: 'Grande P45',
    PerguntaDuracaoBotijao: 'Quanto tempo dura o gás que você compra?',
    MesesBotijao: 'meses',
    PerguntaMetrosCubicos: 'Digite o valor em metros cúbicos (m³) da sua última conta de gás natural corrigido:',
    ExemploMetrosCubicos: 'Ex: 25',
    TitulosVeiculos: 'Veículos',
    PerguntaVeiculoSemana: 'Você utiliza algum tipo de veículo durante a semana?',
    RespostaSim: 'Sim',
    RespostaNao: 'Não',
    PerguntaVeiculoOuPublico: 'Você possui um veículo ou utiliza transporte público?',
    SelecaoVeiculoProprio: 'Veículo próprio',
    SelecaoPublico: 'Transporte público',
    PerguntaTipoCombustivel: 'Tipo de combustível:',
    SelecaoGasolina: 'Gasolina',
    SelecaoDiesel: 'Diesel',
    SelecaoEtanol: 'Etanol',
    SelecaoEletrico: 'Veículo elétrico',
    SelecaoNenhum: 'Não utiliza combustível',
    KmVeiculoEletrico: 'Km por semana com veículo elétrico:',
    LitrosPorMes: 'Litros abastecidos por mês:',
    TransportesSemana: 'Transportes usados na semana:',
    PlaceholderSemanal: 'Km semanais',
    TituloEnergiaEletrica: 'Energia elétrica',
    ContaDeEnergia: 'Digite o valor de KWh da sua última conta de energia elétrica:',
    TituloViagens: 'Viagens',
    PerguntaViagem: 'Você fez alguma viagem no último mês?',
    DicaViagens: 'Considere viagens longas ou curtas, como viagens de carro de aplicativo, etc.',
    PerguntaViagemInternacional: 'Foi uma viagem internacional?',
    DicaViagemInternacional: 'Selecione "Sim." se fez mais de uma viagem diferente no último mês.',
    NaoFoiInternacional: 'Não, foi uma viagem nacional.',
    VeiculosQueViajou: 'Qual (ou quais) veículo(s) você utilizou para viajar?',
    TituloCalcular: 'Calcular',
    CliqueEmCalcular: 'Clique em calcular para ver os resultados do seu teste!',
    TituloResultados: 'Resultados',
    BotaoVoltar: 'Voltar',
    BotaoAvancar: 'Avançar',
    BotaoCadastreSe: 'Cadastre-se',
    CarneBovina: 'Carne bovina',
    CarneSuina: 'Carne suína',
    Frango: 'Frango',
    Peixe: 'Peixe',
    Leite: 'Leite',
    Ovos: 'Ovos',
    Leguminosas: 'Leguminosas',
    FrutasEVegetais: 'Frutas e vegetais',
    CereaisIntegrais: 'Cereais integrais',
    Onibus: 'Ônibus',
    OnibusEletrico: 'Ônibus elétrico',
    Metro: 'Metrô',
    Trem: 'Trem',
    CarroApp: 'Carro (app)',
    MotocicletaApp: 'Motocicleta (app)',
    Carro: 'Carro',
    CarroEletrico: 'Carro elétrico',
    Moto: 'Moto',
    Aviao: 'Avião',
    BarcoCruzeiro: 'Barco/Cruzeiro',
    ErroNome: 'Por favor, insira um nome para sua rotina.',
    ErroDieta: 'Por favor, selecione uma dieta e preencha quantidades de porções de alimentos consumidos.',
    ErroOpcao: 'Por favor, selecione uma opção.',
    ErroTipoBotijao: 'Por favor, selecione um tipo de botijão de gás.',
    ErroMesGas: 'Por favor, digite quantos meses seu gás costuma durar.',
    ErroValorGas: 'Por favor, digite um valor válido para o m³ da conta de gás natural.',
    ErroCombustivel: 'Por favor, selecione um tipo de combustível.',
    ErroLitrosCombustivel: 'Por favor, digite quantos litros de combustível você abastece por mês.',
    ErroQuilometrosEletrico: 'Por favor, digite quantos quilômetros você percorre durante um mês com seu veículo elétrico.',
    ErroUmVeiculo: 'Por favor, selecione pelo menos um veículo utilizado durante a semana.',
    ErroValorKWh: 'Por favor, digite um valor válido para o KWh da conta de luz.',
    ErroSelecioneViagem: 'Por favor, selecione se você fez alguma viagem no último mês.',
    ErroTipoViagem: 'Por favor, selecione o tipo de viagem.',
    ErroUmViagem: 'Por favor, selecione pelo menos um veículo utilizado na viagem.',
    ErroDistancia: 'Por favor, digite a distância percorrida para o veículo: ',
    TextoConclusao1: 'Total de emissões: ',
    TextoConclusao2: 'Deseja salvar seu teste e acompanhar a evolução da sua pegada de carbono mensalmente? Cadastre-se agora gratuitamente!',
    TextoConclusao3: 'Média total de emissões: ',
    QuantidadePessoas: 'Quantas pessoas moram com você?',
    PessoasTooltip: 'Deixe um (1) se morar sozinho.',
  },
  en: {
    MensagemTotalAcima: "Your total carbon footprint is above the global average:",
    MensagemTotalAbaixo: "Congratulations! Your carbon footprint is below the global average:",
    AcimaDe: 'above the global average of ',
    AbaixoDe: 'below the global average of ',
    MensagemAcima: "Your emission in this category is above the global average:",
    MensagemAbaixo: "Great news! Your emission is below the global average:",
    TituloMediaGlobal: 'Global average emissions:',
    paginaInicial: 'Homepage',
    testes: 'Tests',
    entrar: 'Login',
    rodape: '© 2025 EcoBalance — All rights reserved',
    tema: 'Theme:',
    altoContraste: 'High Contrast:',
    idioma: 'Language',
    TituloNome: 'Routine Name',
    PerguntaNome: 'Enter the name of your routine:',
    PlaceHolderNome: 'E.g.: Sustainable Week',
    TituloAlimentos: 'Food',
    SelecioneDieta: 'Select your diet:',
    TooltipDieta: 'If your diet is not listed, select Omnivore.',
    SelecioneTresPontinhos: 'Select...',
    DietaOnivora: 'Omnivore',
    DietaVegetariana: 'Vegetarian',
    DietaVegana: 'Vegan',
    DietaPescetariana: 'Pescetarian',
    DietaCarnivora: 'Carnivore',
    PorcoesConsumidas: 'Portions consumed per week:',
    AjudaPorcoes: 'Consider one portion as an average meal of the selected food.',
    TituloGas: 'Gas',
    PerguntaGas: 'Do you use piped gas or buy gas cylinders?',
    SelecaoEncanado: 'Piped gas',
    SelecaoBotijao: 'Cylinder',
    PerguntaTipoBotijão: 'What type of cylinder?',
    BotijaoP13: 'Standard P13',
    BotijaoP20: 'Medium P20',
    BotijaoP45: 'Large P45',
    PerguntaDuracaoBotijao: 'How long does your gas cylinder last?',
    MesesBotijao: 'months',
    PerguntaMetrosCubicos: 'Enter the amount in cubic meters (m³) from your last corrected piped gas bill:',
    ExemploMetrosCubicos: 'E.g.: 25',
    TitulosVeiculos: 'Vehicles',
    PerguntaVeiculoSemana: 'Do you use any type of vehicle during the week?',
    RespostaSim: 'Yes',
    RespostaNao: 'No',
    PerguntaVeiculoOuPublico: 'Do you own a vehicle or use public transport?',
    SelecaoVeiculoProprio: 'Own vehicle',
    SelecaoPublico: 'Public transport',
    PerguntaTipoCombustivel: 'Fuel type:',
    SelecaoGasolina: 'Gasoline',
    SelecaoDiesel: 'Diesel',
    SelecaoEtanol: 'Ethanol',
    SelecaoEletrico: 'Electric vehicle',
    SelecaoNenhum: 'Does not use fuel',
    KmVeiculoEletrico: 'Km per week with electric vehicle:',
    LitrosPorMes: 'Liters fueled per month:',
    TransportesSemana: 'Transports used during the week:',
    PlaceholderSemanal: 'Weekly km',
    TituloEnergiaEletrica: 'Electricity',
    ContaDeEnergia: 'Enter the KWh value from your last electricity bill:',
    TituloViagens: 'Trips',
    PerguntaViagem: 'Did you take any trips last month?',
    DicaViagens: 'Consider both long and short trips, including ride-hailing apps, etc.',
    PerguntaViagemInternacional: 'Was it an international trip?',
    DicaViagemInternacional: 'Select "Yes" if you made more than one different trip last month.',
    NaoFoiInternacional: 'No, it was a national trip.',
    VeiculosQueViajou: 'Which vehicle(s) did you use to travel?',
    TituloCalcular: 'Calculate',
    CliqueEmCalcular: 'Click to calculate and see your test results!',
    TituloResultados: 'Results',
    BotaoVoltar: 'Back',
    BotaoAvancar: 'Next',
    BotaoCadastreSe: 'Sign up',
    CarneBovina: 'Beef',
    CarneSuina: 'Pork',
    Frango: 'Chicken',
    Peixe: 'Fish',
    Leite: 'Milk',
    Ovos: 'Eggs',
    Leguminosas: 'Legumes',
    FrutasEVegetais: 'Fruits and vegetables',
    CereaisIntegrais: 'Whole grains',
    Onibus: 'Bus',
    OnibusEletrico: 'Electric bus',
    Metro: 'Subway',
    Trem: 'Train',
    CarroApp: 'Car (ride-hailing app)',
    MotocicletaApp: 'Motorcycle (ride-hailing app)',
    Carro: 'Car',
    CarroEletrico: 'Electric car',
    Moto: 'Motorcycle',
    Aviao: 'Airplane',
    BarcoCruzeiro: 'Boat/Cruise',
    ErroNome: 'Please enter a name for your routine.',
    ErroDieta: 'Please select a diet and fill in the quantity of consumed food portions.',
    ErroOpcao: 'Please select an option.',
    ErroTipoBotijao: 'Please select a type of gas cylinder.',
    ErroMesGas: 'Please enter how many months your gas usually lasts.',
    ErroValorGas: 'Please enter a valid value for the cubic meters (m³) on your gas bill.',
    ErroCombustivel: 'Please select a type of fuel.',
    ErroLitrosCombustivel: 'Please enter how many liters of fuel you use per month.',
    ErroQuilometrosEletrico: 'Please enter how many kilometers you travel in a month with your electric vehicle.',
    ErroUmVeiculo: 'Please select at least one vehicle used during the week.',
    ErroValorKWh: 'Please enter a valid value for the KWh on your electricity bill.',
    ErroSelecioneViagem: 'Please select whether you took any trips last month.',
    ErroTipoViagem: 'Please select the type of trip.',
    ErroUmViagem: 'Please select at least one vehicle used during the trip.',
    ErroDistancia: 'Please enter the distance traveled for the selected vehicle:',
    TextoConclusao1: 'Total emissions: ',
    TextoConclusao3: 'Average total emissions:',
    TextoConclusao2: 'Would you like to save your test and track your carbon footprint progress monthly? Sign up now for free!',
    QuantidadePessoas: 'How many people live with you?',
    PessoasTooltip: 'Leave one (1) if you live alone.',
  },
};

const Teste = () => {
  const [idiomaSelecionado, setIdiomaSelecionado] = useState(() => {
    return localStorage.getItem('language') || 'pt'; // Usa o valor salvo ou define 'pt' como padrão
  });
  const [mostrarDropdownIdioma, setMostrarDropdownIdioma] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [altoContrasteAtivo, setAltoContrasteAtivo] = useState(false);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleInicioClick = () => {
    navigate('/');
  };
  const handleTesteClick = () => {
    navigate('/teste')
  }

  const [etapaAtual, setEtapaAtual] = useState(0);

  const [mensagemErroTeste, setMensagemErroTeste] = useState('');

  const [kwhContaLuz, setKwhContaLuz] = useState(0);
  const [m3GasNatural, setM3GasNatural] = useState(0);
  const [fezViagem, setFezViagem] = useState(null);
  const [viagemInternacional, setViagemInternacional] = useState(null);
  const [veiculosViagem, setVeiculosViagem] = useState({});
  const [kmPorVeiculoViagem, setKmPorVeiculoViagem] = useState({});

  const [nomeRotina, setNomeRotina] = useState('');
  const [dieta, setDieta] = useState('');
  const [porcoes, setPorcoes] = useState({});
  const [tipoGas, setTipoGas] = useState('');
  const [tipoBotijao, setTipoBotijao] = useState('');
  const [tempoDuracaoGas, setTempoDuracaoGas] = useState(0);
  const [usaVeiculo, setUsaVeiculo] = useState(null);
  const [possuiVeiculo, setPossuiVeiculo] = useState(null);
  const [combustivel, setCombustivel] = useState('');
  const [litrosCombustivel, setLitrosCombustivel] = useState(0);
  const [kmEletrico, setKmEletrico] = useState(0);
  const [transportesPublicos, setTransportesPublicos] = useState([]);
  const [kmTransportes, setKmTransportes] = useState({});
  const [quantidadePessoas, setQuantidadePessoas] = useState(1);

  const [dadosGrafico, setDadosGrafico] = useState([]);

  const avancarEtapa = () => {
    setMensagemErroTeste('');

    if (etapaAtual === 0 && !nomeRotina.trim()) {
      setMensagemErroTeste(textos[idiomaSelecionado]?.ErroNome);
      return;
    }

    if (etapaAtual === 1 && !dieta) {
      setMensagemErroTeste(textos[idiomaSelecionado]?.ErroDieta)
      return;
    }

    if (!tipoGas && etapaAtual === 2) {
      setMensagemErroTeste(textos[idiomaSelecionado]?.ErroOpcao);
      return;
    } else if (tipoGas !== 'encanado' && etapaAtual === 2) {
      if (!tipoBotijao && etapaAtual === 2) {
        setMensagemErroTeste(textos[idiomaSelecionado]?.ErroTipoBotijao);
        return;
      } else if (!tempoDuracaoGas && etapaAtual === 2) {
        setMensagemErroTeste(textos[idiomaSelecionado]?.ErroMesGas);
        return;
      }
    } else if (tipoGas === 'encanado' && etapaAtual === 2) {
      if (isNaN(Number(m3GasNatural)) || Number(m3GasNatural) <= 0) {
        setMensagemErroTeste(textos[idiomaSelecionado]?.ErroValorGas);
        return;
      }
    }

    if (!usaVeiculo && etapaAtual === 3) {
      setMensagemErroTeste(textos[idiomaSelecionado]?.ErroOpcao);
      return;
    } else if (usaVeiculo !== 'nao' && etapaAtual === 3) {
      if (!possuiVeiculo && etapaAtual === 3) {
        setMensagemErroTeste(textos[idiomaSelecionado]?.ErroOpcao);
        return;
      } else if (possuiVeiculo === 'proprio' && etapaAtual === 3) {
        if (!combustivel && etapaAtual === 3) {
          setMensagemErroTeste(textos[idiomaSelecionado]?.ErroCombustivel);
          return;
        } else if (combustivel !== 'Nenhum' && combustivel !== 'Elétrico' && !litrosCombustivel && etapaAtual === 3) {
          setMensagemErroTeste(textos[idiomaSelecionado]?.ErroLitrosCombustivel);
          return;
        } else if (combustivel === 'Elétrico' && etapaAtual === 3 && (isNaN(Number(kmEletrico)) || Number(kmEletrico) <= 0) && etapaAtual === 3) {
          setMensagemErroTeste(textos[idiomaSelecionado]?.ErroQuilometrosEletrico);
          return;
        }
      } else if (possuiVeiculo === 'publico' && etapaAtual === 3 && Object.keys(transportesPublicos).length === 0) {
        setMensagemErroTeste(textos[idiomaSelecionado]?.ErroUmVeiculo);
        return;
      }
    }

    if (etapaAtual === 4 && (isNaN(Number(kwhContaLuz)) || Number(kwhContaLuz) <= 0)) {
      setMensagemErroTeste(textos[idiomaSelecionado]?.ErroValorKWh);
      return;
    }

    if (etapaAtual === 5 && (fezViagem === null)) {
      setMensagemErroTeste(textos[idiomaSelecionado]?.ErroSelecioneViagem);
      return;
    } else if (etapaAtual === 5 && fezViagem === 'sim' && viagemInternacional === null) {
      setMensagemErroTeste(textos[idiomaSelecionado]?.ErroTipoViagem);
      return;
    } else if (etapaAtual === 5 && fezViagem === 'sim' && Object.keys(veiculosViagem).length === 0) {
      setMensagemErroTeste(textos[idiomaSelecionado]?.ErroUmViagem);
      return;
    }
    for (const veiculo in veiculosViagem) {
      if (veiculosViagem[veiculo] && (isNaN(Number(kmPorVeiculoViagem[veiculo])) || Number(kmPorVeiculoViagem[veiculo]) <= 0)) {
        setMensagemErroTeste(`${textos[idiomaSelecionado]?.ErroDistancia} ${veiculo}.`);
        return;
      }
    }

    setEtapaAtual((prev) => prev + 1);
  };

  const voltarEtapa = () => {
    setMensagemErroTeste('');
    setEtapaAtual((prev) => prev - 1);
  };

  const toggleVeiculoViagem = (veiculo) => {
    setVeiculosViagem((prev) => ({
      ...prev,
      [veiculo]: !prev[veiculo],
    }));
    setKmPorVeiculoViagem((prev) => ({
      ...prev,
      [veiculo]: prev[veiculo] || 0,
    }));
  };

  useEffect(() => {
    if (fezViagem === 'nao') {
      setVeiculosViagem({});
      setKmPorVeiculoViagem({});
      setViagemInternacional(null);
    }
  }, [fezViagem]);

  useEffect(() => {
    if (usaVeiculo === 'nao') {
      setPossuiVeiculo(null);
      setCombustivel('');
      setLitrosCombustivel(0);
      setKmEletrico(0);
      setTransportesPublicos([]);
      setKmTransportes({});
    }
  }, [usaVeiculo]);

  const toggleTransporte = (tipo) => {
    setTransportesPublicos((prev) => {
      if (prev.includes(tipo)) {
        const novosTransportes = prev.filter((t) => t !== tipo);
        const novosKmTransportes = { ...kmTransportes };
        delete novosKmTransportes[tipo]; // Zera o valor do transporte removido
        setKmTransportes(novosKmTransportes);
        return novosTransportes;
      } else {
        return [...prev, tipo];
      }
    });
  };

  const alimentos = [
    textos[idiomaSelecionado]?.CarneBovina, textos[idiomaSelecionado]?.CarneSuina, textos[idiomaSelecionado]?.Frango, textos[idiomaSelecionado]?.Peixe,
    textos[idiomaSelecionado]?.Leite, textos[idiomaSelecionado]?.Ovos, textos[idiomaSelecionado]?.Leguminosas, textos[idiomaSelecionado]?.FrutasEVegetais, textos[idiomaSelecionado]?.CereaisIntegrais
  ];

  const alimentosPermitidosPorDieta = {
    Onívora: alimentos, // todos
    Vegetariana: alimentos.filter(a => ![textos[idiomaSelecionado]?.CarneBovina, textos[idiomaSelecionado]?.CarneSuina, textos[idiomaSelecionado]?.Frango, textos[idiomaSelecionado]?.Peixe].includes(a)),
    Vegana: alimentos.filter(a => ![textos[idiomaSelecionado]?.CarneBovina, textos[idiomaSelecionado]?.CarneSuina, textos[idiomaSelecionado]?.Frango, textos[idiomaSelecionado]?.Peixe, textos[idiomaSelecionado]?.Leite, textos[idiomaSelecionado]?.Ovos].includes(a)),
    Pescetariana: alimentos.filter(a => ![textos[idiomaSelecionado]?.CarneBovina, textos[idiomaSelecionado]?.CarneSuina, textos[idiomaSelecionado]?.Frango].includes(a)),
    Carnívora: [textos[idiomaSelecionado]?.CarneBovina, textos[idiomaSelecionado]?.CarneSuina, textos[idiomaSelecionado]?.Frango, textos[idiomaSelecionado]?.Peixe, textos[idiomaSelecionado]?.Leite, textos[idiomaSelecionado]?.Ovos]
  };

  const etapas = [
    {
      titulo: textos[idiomaSelecionado]?.TituloNome,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaNome}</label>
          <input
            type="text"
            className="input-texto"
            value={nomeRotina}
            onChange={(e) => setNomeRotina(e.target.value)}
            placeholder={textos[idiomaSelecionado]?.PlaceHolderNome}
          />
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      )
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloAlimentos,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.SelecioneDieta}</label>
          <small className="ajuda">{textos[idiomaSelecionado]?.TooltipDieta}</small>
          <select
            className="input-texto"
            value={dieta}
            onChange={(e) => {
              const novaDieta = e.target.value;
              setDieta(novaDieta);

              const alimentosPermitidos = new Set(alimentosPermitidosPorDieta[novaDieta] || []);
              const novasPorcoes = { ...porcoes };

              alimentos.forEach((alimento) => {
                if (!alimentosPermitidos.has(alimento)) {
                  novasPorcoes[alimento] = 0;
                }
              });

              setPorcoes(novasPorcoes);
            }}
          >
            <option value="">{textos[idiomaSelecionado]?.SelecioneTresPontinhos}</option>
            <option value="Onívora">{textos[idiomaSelecionado]?.DietaOnivora}</option>
            <option value="Vegetariana">{textos[idiomaSelecionado]?.DietaVegetariana}</option>
            <option value="Vegana">{textos[idiomaSelecionado]?.DietaVegana}</option>
            <option value="Pescetariana">{textos[idiomaSelecionado]?.DietaPescetariana}</option>
            <option value="Carnívora">{textos[idiomaSelecionado]?.DietaCarnivora}</option>
          </select>
          <label className="pergunta">{textos[idiomaSelecionado]?.PorcoesConsumidas}</label>
          <small className="ajuda">{textos[idiomaSelecionado]?.AjudaPorcoes}</small>
          {alimentos.map((alimento) => {
            const permitido = alimentosPermitidosPorDieta[dieta]?.includes(alimento) ?? true;

            return (
              <div className="linha-porcao" key={alimento}>
                <span style={{ opacity: permitido ? 1 : 0.5 }}>{alimento}</span>
                <input
                  type="number"
                  min="0"
                  className="spinner"
                  disabled={!permitido}
                  value={porcoes[alimento] || 0}
                  onChange={(e) =>
                    setPorcoes({ ...porcoes, [alimento]: parseInt(e.target.value) })
                  }
                />
              </div>
            );
          })}
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      )
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloGas,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.QuantidadePessoas}</label>
          <input
            type="number"
            min={1}
            className="input-texto"
            value={quantidadePessoas}
            onChange={(e) => setQuantidadePessoas(Number(e.target.value))}
          />
          <small className="ajuda">{textos[idiomaSelecionado]?.PessoasTooltip}</small><br></br>
          <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaGas}</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="encanado"
                checked={tipoGas === 'encanado'}
                onChange={(e) => {
                  setTipoGas(e.target.value);
                  setM3GasNatural(0);          // Resetar m3
                }}
              />
              {textos[idiomaSelecionado]?.SelecaoEncanado}
            </label>
            <label>
              <input
                type="radio"
                value="botijao"
                checked={tipoGas === 'botijao'}
                onChange={(e) => {
                  setTipoGas('botijao');
                  setTipoBotijao('');         // Resetar seleção de tipo de botijão
                  setTempoDuracaoGas(0);      // Resetar duração
                }}
              />
              {textos[idiomaSelecionado]?.SelecaoBotijao}
            </label>
          </div>
          {tipoGas === 'botijao' && (
            <>
              <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaTipoBotijão}</label>
              <select
                className="input-texto"
                value={tipoBotijao}
                onChange={(e) => setTipoBotijao(e.target.value)}
              >
                <option value="">{textos[idiomaSelecionado]?.SelecioneTresPontinhos}</option>
                <option value="P13">{textos[idiomaSelecionado]?.BotijaoP13}</option>
                <option value="P20">{textos[idiomaSelecionado]?.BotijaoP20}</option>
                <option value="P45">{textos[idiomaSelecionado]?.BotijaoP45}</option>
              </select>
            </>
          )}
          {tipoGas === 'botijao' && (
            <>
              <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaDuracaoBotijao}</label>
              <input
                type="number"
                min="1"
                className="spinner"
                value={tempoDuracaoGas}
                onChange={(e) => setTempoDuracaoGas(e.target.value)}
              /> {textos[idiomaSelecionado]?.MesesBotijao}
            </>
          )}
          {tipoGas === 'encanado' && (
            <>
              <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaMetrosCubicos}</label>
              <input
                type="number"
                min="0"
                className="input-texto"
                value={m3GasNatural}
                onChange={(e) => setM3GasNatural(e.target.value)}
                placeholder={textos[idiomaSelecionado]?.ExemploMetrosCubicos}
              />
            </>
          )}
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      )
    },
    {
      titulo: textos[idiomaSelecionado]?.TitulosVeiculos,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaVeiculoSemana}</label>
          <div className="radio-group">
            <label><input type="radio" value="sim" checked={usaVeiculo === 'sim'} onChange={(e) => setUsaVeiculo(e.target.value)} /> {textos[idiomaSelecionado]?.RespostaSim}</label>
            <label><input type="radio" value="nao" checked={usaVeiculo === 'nao'} onChange={(e) => setUsaVeiculo(e.target.value)} /> {textos[idiomaSelecionado]?.RespostaNao}</label>
          </div>
          {usaVeiculo === 'sim' && (
            <>
              <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaVeiculoOuPublico}</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="proprio"
                    checked={possuiVeiculo === 'proprio'}
                    onChange={(e) => {
                      setPossuiVeiculo(e.target.value);
                      // Limpar transportes públicos quando muda para veículo próprio
                      setTransportesPublicos([]);
                      setKmTransportes({});
                    }}
                  /> {textos[idiomaSelecionado]?.SelecaoVeiculoProprio}
                </label>
                <label>
                  <input
                    type="radio"
                    value="publico"
                    checked={possuiVeiculo === 'publico'}
                    onChange={(e) => {
                      setPossuiVeiculo(e.target.value);
                      // Limpar dados de veículo próprio quando muda para transporte público
                      setCombustivel('');
                      setLitrosCombustivel(0);
                      setKmEletrico(0);
                    }}
                  /> {textos[idiomaSelecionado]?.SelecaoPublico}
                </label>
              </div>
              {possuiVeiculo === 'proprio' && (
                <>
                  <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaTipoCombustivel}</label>
                  <select
                    className="input-texto"
                    value={combustivel}
                    onChange={(e) => {
                      const novoCombustivel = e.target.value;
                      setCombustivel(novoCombustivel);
                      setLitrosCombustivel(0);
                      setKmEletrico(0);
                    }}
                  >
                    <option value="">{textos[idiomaSelecionado]?.SelecioneTresPontinhos}</option>
                    <option value="Gasolina">{textos[idiomaSelecionado]?.SelecaoGasolina}</option>
                    <option value="Diesel">{textos[idiomaSelecionado]?.SelecaoDiesel}</option>
                    <option value="Etanol">{textos[idiomaSelecionado]?.SelecaoEtanol}</option>
                    <option value="Elétrico">{textos[idiomaSelecionado]?.SelecaoEletrico}</option>
                    <option value="Nenhum">{textos[idiomaSelecionado]?.SelecaoNenhum}</option>
                  </select>
                  {combustivel === 'Elétrico' && (
                    <>
                      <label className="pergunta">{textos[idiomaSelecionado]?.KmVeiculoEletrico}</label>
                      <input
                        type="number"
                        min="0"
                        className="spinner"
                        value={kmEletrico}
                        onChange={(e) => setKmEletrico(e.target.value)}
                        disabled={combustivel === 'Nenhum'}
                      />
                    </>
                  )}

                  {combustivel !== 'Elétrico' && combustivel !== 'Nenhum' && (
                    <>
                      <label className="pergunta">{textos[idiomaSelecionado]?.LitrosPorMes}</label>
                      <input
                        type="number"
                        min="0"
                        className="spinner"
                        value={litrosCombustivel}
                        onChange={(e) => setLitrosCombustivel(e.target.value)}
                        disabled={combustivel === 'Nenhum'}
                      />
                    </>
                  )}
                </>
              )}
              {possuiVeiculo === 'publico' && (
                <>
                  <label className="pergunta">{textos[idiomaSelecionado]?.TransportesSemana}</label>
                  {[textos[idiomaSelecionado]?.Onibus, textos[idiomaSelecionado]?.OnibusEletrico, textos[idiomaSelecionado]?.Metro, textos[idiomaSelecionado]?.Trem, textos[idiomaSelecionado]?.CarroApp, textos[idiomaSelecionado]?.MotocicletaApp].map((tipo) => (
                    <div key={tipo} className="linha-porcao">
                      <label>
                        <input
                          type="checkbox"
                          checked={transportesPublicos.includes(tipo)}
                          onChange={() => toggleTransporte(tipo)}
                        />{' '}
                        {tipo}
                      </label>
                      {transportesPublicos.includes(tipo) && (
                        <input
                          type="number"
                          min="0"
                          placeholder={textos[idiomaSelecionado]?.PlaceholderSemanal}
                          className="spinner pequeno"
                          value={kmTransportes[tipo] || ''}
                          onChange={(e) =>
                            setKmTransportes({
                              ...kmTransportes,
                              [tipo]: parseInt(e.target.value),
                            })
                          }
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      )
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloEnergiaEletrica,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.ContaDeEnergia}</label>
          <input
            type="number"
            min="0"
            className="input-texto"
            value={kwhContaLuz}
            onChange={(e) => setKwhContaLuz(e.target.value)}
            placeholder="Ex: 150"
          />
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      ),
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloViagens,
      conteudo: (
        <>
          <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaViagem}</label>
          <small className="ajuda pequeno">{textos[idiomaSelecionado]?.DicaViagens}</small>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="sim"
                checked={fezViagem === 'sim'}
                onChange={(e) => setFezViagem(e.target.value)}
              /> {textos[idiomaSelecionado]?.RespostaSim}
            </label>
            <label>
              <input
                type="radio"
                value="nao"
                checked={fezViagem === 'nao'}
                onChange={(e) => setFezViagem(e.target.value)}
              /> {textos[idiomaSelecionado]?.RespostaNao}
            </label>
          </div>

          {fezViagem === 'sim' && (
            <>
              <label className="pergunta">{textos[idiomaSelecionado]?.PerguntaViagemInternacional}</label>
              <small className="ajuda pequeno">{textos[idiomaSelecionado]?.DicaViagemInternacional}</small>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="sim"
                    checked={viagemInternacional === 'sim'}
                    onChange={(e) => setViagemInternacional(e.target.value)}
                  /> {textos[idiomaSelecionado]?.RespostaSim}
                </label>
                <label>
                  <input
                    type="radio"
                    value="nao"
                    checked={viagemInternacional === 'nao'}
                    onChange={(e) => setViagemInternacional(e.target.value)}
                  /> {textos[idiomaSelecionado]?.NaoFoiInternacional}
                </label>
              </div>

              <label className="pergunta">{textos[idiomaSelecionado]?.VeiculosQueViajou}</label>
              <div className="checkbox-group">
                {[textos[idiomaSelecionado]?.Carro, textos[idiomaSelecionado]?.CarroEletrico, textos[idiomaSelecionado]?.Moto, textos[idiomaSelecionado]?.Onibus, textos[idiomaSelecionado]?.Metro, textos[idiomaSelecionado]?.Trem, textos[idiomaSelecionado]?.Aviao, textos[idiomaSelecionado]?.BarcoCruzeiro].map((veiculo) => (
                  <div key={veiculo} className="linha-checkbox-km">
                    <label>
                      <input
                        type="checkbox"
                        checked={veiculosViagem[veiculo] || false}
                        onChange={() => toggleVeiculoViagem(veiculo)}
                      /> {veiculo}
                    </label>
                    {veiculosViagem[veiculo] && (
                      <input
                        type="number"
                        min="0"
                        className="spinner pequeno"
                        placeholder="Km"
                        value={kmPorVeiculoViagem[veiculo] || ''}
                        onChange={(e) => setKmPorVeiculoViagem((prev) => ({ ...prev, [veiculo]: e.target.value }))}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      ),
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloCalcular,
      conteudo: (
        <>
          <p className="pergunta">{textos[idiomaSelecionado]?.CliqueEmCalcular}</p>

        </>
      ),
    },
    {
      titulo: textos[idiomaSelecionado]?.TituloResultados,
      conteudo: (
        <>

        </>
      ),
    },
  ];

  const calcularEmissoesSeparadas = () => {
    // Fatores rotina
    const fatores = {
      alimentos: {
        [textos[idiomaSelecionado]?.CarneBovina]: 6.136,
        [textos[idiomaSelecionado]?.CarneSuina]: 1.149,
        [textos[idiomaSelecionado]?.Frango]: 0.591,
        [textos[idiomaSelecionado]?.Peixe]: 0.389,
        [textos[idiomaSelecionado]?.Leite]: 0.594,
        [textos[idiomaSelecionado]?.Ovos]: 0.186,
        [textos[idiomaSelecionado]?.Leguminosas]: 0.055,
        [textos[idiomaSelecionado]?.FrutasEVegetais]: 0.135,
        [textos[idiomaSelecionado]?.CereaisIntegrais]: 0.176
      },
      gas: {
        P13: 35.711,
        P20: 54.94,
        P45: 123.615
      },
      combustiveis: {
        Gasolina: 2.31,
        Diesel: 2.68,
        Etanol: 1.44
      },
      transportes: {
        [textos[idiomaSelecionado]?.Onibus]: 0.016,
        [textos[idiomaSelecionado]?.OnibusEletrico]: 0,
        [textos[idiomaSelecionado]?.Metro]: 0.0035,
        [textos[idiomaSelecionado]?.Trem]: 0.019,
        [textos[idiomaSelecionado]?.CarroApp]: 0.1268,
        [textos[idiomaSelecionado]?.MotocicletaApp]: 0.0711
      },
      eletrico: 0.0891
    };

    // Calculo Alimentos
    let alimentosTotal = 0;
    Object.entries(porcoes).forEach(([alimento, quantidade]) => {
      const fator = fatores.alimentos[alimento] || 0;
      alimentosTotal += ((quantidade * fator) * 4);
    });

    // Calculo Gás Botijão
    let usaGasEncanado = tipoGas === 'encanado';
    let emissaoCarbonoBotijao = 0;
    if (!usaGasEncanado && tipoBotijao && tempoDuracaoGas && quantidadePessoas) {
      const fator = fatores.gas[tipoBotijao];
      emissaoCarbonoBotijao = (fator / tempoDuracaoGas) / quantidadePessoas;
    }

    // Calculo Veículos Rotina
    let veiculosTotal = 0;
    if (usaVeiculo === 'sim' && possuiVeiculo === 'proprio') {
      if (combustivel === 'Elétrico') {
        veiculosTotal += (kmEletrico * fatores.eletrico) * 4;
      } else {
        veiculosTotal += litrosCombustivel * (fatores.combustiveis[combustivel] || 0);
      }
    } else if (usaVeiculo === 'sim' && possuiVeiculo === 'publico') {
      transportesPublicos.forEach((tipo) => {
        const km = kmTransportes[tipo] || 0;
        const fator = fatores.transportes[tipo] || 0;
        veiculosTotal += km * fator;
      });
      veiculosTotal = veiculosTotal * 4;
    }

    // Fatores teste
    const fatorKwh = 0.0385;
    const fatorGas = 1.974;
    const fatoresVeiculo = {
      [textos[idiomaSelecionado]?.Metro]: 0.0035,
      [textos[idiomaSelecionado]?.Trem]: 0.0019,
      [textos[idiomaSelecionado]?.Onibus]: 0.016,
      [textos[idiomaSelecionado]?.Carro]: 0.1268,
      [textos[idiomaSelecionado]?.Moto]: 0.0711,
      [textos[idiomaSelecionado]?.CarroEletrico]: 0.0891,
      [textos[idiomaSelecionado]?.BarcoCruzeiro]: 0.250,
      [textos[idiomaSelecionado]?.Aviao]: viagemInternacional === 'sim' ? 0.1542 : 0.10974,
    };

    // Cálculo de energia elétrica
    const emissaoEnergia = (Number(kwhContaLuz) * fatorKwh) / (quantidadePessoas ? quantidadePessoas : 1);

    // Cálculo de gás encanado
    const emissaoGas = tipoGas === 'encanado' ? (Number(m3GasNatural) * fatorGas) / (quantidadePessoas ? quantidadePessoas : 1) : 0;

    // Cálculo de viagens
    const veiculosArray = Object.entries(veiculosViagem)
      .filter(([tipo, selecionado]) => selecionado)
      .map(([tipo]) => {
        const km = Number(kmPorVeiculoViagem[tipo]);
        const emissao = km * fatoresVeiculo[tipo];
        return { tipo, km, emissao };
      });

    // Cálculo de emissão total incluindo dados da rotina
    const emissaoTotal = emissaoEnergia + emissaoGas + veiculosArray.reduce((soma, v) => soma + v.emissao, 0) +
      (parseFloat(alimentosTotal.toFixed(2)) || 0) +
      (parseFloat(emissaoCarbonoBotijao.toFixed(2)) || 0) +
      (parseFloat(veiculosTotal.toFixed(2)) || 0);

    const rotinaParaSalvar = {
      usuarioId: null,
      nome: nomeRotina,
      dieta,
      porcoes,
      quantidadePessoas,
      tipoGas,
      tipoBotijao,
      tempoDuracaoGas: Number(tempoDuracaoGas),
      usaVeiculo,
      possuiVeiculo,
      combustivel,
      litrosCombustivel: Number(litrosCombustivel),
      kmEletrico: Number(kmEletrico),
      transportesPublicos,
      kmTransportes,
      emissoes: {
        alimentos: alimentosTotal,
        gas: usaGasEncanado ? null : emissaoCarbonoBotijao,
        veiculos: veiculosTotal
      }
    };

    // Dados de teste para enviar para o banco se o usuário fizer cadastro
    const testeData = {
      usuario: null,
      rotina: null,
      energiaEletrica: {
        kwh: Number(kwhContaLuz),
        emissao: emissaoEnergia
      },
      gasNatural: {
        m3: tipoGas === 'encanado' ? Number(m3GasNatural) : 0,
        emissao: emissaoGas
      },
      viagem: {
        fezViagem: fezViagem === 'sim',
        internacional: fezViagem === 'sim' ? viagemInternacional === 'sim' : false,
        veiculos: veiculosArray
      },
      emissaoAlimentos: alimentosTotal,
      emissaoGas: usaGasEncanado ? null : emissaoCarbonoBotijao,
      emissaoVeiculos: veiculosTotal,
      emissaoTotal: emissaoTotal
    };

    // Salvar no localStorage
    localStorage.setItem('rotinaAnonima', JSON.stringify(rotinaParaSalvar));
    localStorage.setItem('testeAnonimo', JSON.stringify(testeData));

    let conquistasObtidas = [];
    // 1. Conquista obtida de primeiro teste
    conquistasObtidas.push("primeiro_teste");

    // 2. Verificar "abaixo_media_mensal"
    const mediaGlobalMensal = 243.19; // Em quilos de CO₂ equivalente por mês
    if (emissaoTotal < mediaGlobalMensal) {
      conquistasObtidas.push("abaixo_media_mensal");
    }

    console.log(conquistasObtidas)
    // Salvar conquistas anônimas no localStorage
    localStorage.setItem("conquistasAnonimas", JSON.stringify(conquistasObtidas));

    return {
      rotinaParaSalvar,
      testeData
    };
  };

  const etapasFiltradas = etapas.filter((_, index) => {
    return true;
  });
  const etapaAtualFiltrada = Math.min(etapaAtual, etapasFiltradas.length - 1);

  const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

  const getGraficoData = (teste) => {
    const resultados = calcularEmissoesSeparadas();
    const dados = [];

    // Viagens
    const emissaoViagens = resultados.testeData.viagem?.veiculos?.reduce((acc, v) => acc + (v.emissao || 0), 0);
    if (emissaoViagens > 0) {
      dados.push({ categoria: textos[idiomaSelecionado]?.TituloViagens, valor: emissaoViagens });
    }

    // Gás (natural ou botijão)
    const emissaoGas = resultados.testeData.gasNatural?.emissao || resultados.rotinaParaSalvar.emissoes.gas || 0;
    if (emissaoGas > 0) {
      dados.push({ categoria: textos[idiomaSelecionado]?.TituloGas, valor: emissaoGas });
    }

    // Energia elétrica
    const emissaoEnergia = resultados.testeData.energiaEletrica?.emissao || 0;
    if (emissaoEnergia > 0) {
      dados.push({ categoria: textos[idiomaSelecionado]?.TituloEnergiaEletrica, valor: emissaoEnergia });
    }

    // Alimentos
    const emissaoAlimentos = resultados.testeData.emissaoAlimentos || 0;
    if (emissaoAlimentos > 0) {
      dados.push({ categoria: textos[idiomaSelecionado]?.TituloAlimentos, valor: emissaoAlimentos });
    }

    // Veículos (uso semanal)
    const emissaoVeiculos = resultados.testeData.emissaoVeiculos || 0;
    if (emissaoVeiculos > 0) {
      dados.push({ categoria: textos[idiomaSelecionado]?.TitulosVeiculos, valor: emissaoVeiculos });
    }

    return dados;
  };

  const renderTooltipContent = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { value } = payload[0];
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '8px', color: 'black' }}>
          <strong className='tooltips'>{`${value.toFixed(2)} kgCO2`}</strong>
        </div>
      );
    }
    return null;
  };

  const handleCalcular = () => {
    const resultados = calcularEmissoesSeparadas();
    const dados = getGraficoData(resultados); // usa os dados recém-calculados
    setDadosGrafico(dados); // atualiza o estado que renderiza o gráfico
    setMensagemErroTeste('');
    setEtapaAtual((prev) => prev + 1);
  };



  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setTemaEscuro(true);
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    const storedContrast = localStorage.getItem('highContrast');
    if (storedContrast === 'true') {
      setAltoContrasteAtivo(true);
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setIdiomaSelecionado(storedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', temaEscuro ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', temaEscuro);
  }, [temaEscuro]);

  useEffect(() => {
    localStorage.setItem('highContrast', altoContrasteAtivo);
    document.body.classList.toggle('high-contrast', altoContrasteAtivo);
  }, [altoContrasteAtivo]);

  useEffect(() => {
    localStorage.setItem('language', idiomaSelecionado);
  }, [idiomaSelecionado]);



  const toggleIdiomaDropdown = () => {
    setMostrarDropdownIdioma(!mostrarDropdownIdioma);
  };

  const handleIdiomaSelecionado = (idioma) => {
    setIdiomaSelecionado(idioma);
    localStorage.setItem('language', idioma); // Salva no localStorage
    setMostrarDropdownIdioma(false);
  };

  const toggleTema = () => {
    setTemaEscuro(!temaEscuro);
  };

  const toggleAltoContraste = () => {
    setAltoContrasteAtivo(!altoContrasteAtivo);
  };

  const dadosGraficoMediaGlobal = [
    { categoria: textos[idiomaSelecionado]?.TituloGas, valor: 18.1678775 },
    { categoria: textos[idiomaSelecionado]?.TituloEnergiaEletrica, valor: 5.8597 },
    { categoria: textos[idiomaSelecionado]?.TituloAlimentos, valor: 139.159 },
    { categoria: textos[idiomaSelecionado]?.TitulosVeiculos, valor: 80 },
  ];

  const gerarMensagensComparacao = () => {
    return dadosGrafico.map((itemUsuario) => {
      const itemMedia = dadosGraficoMediaGlobal.find((media) => media.categoria === itemUsuario.categoria);

      if (!itemMedia) return null; // Se não houver correspondência na média global, ignore

      const acimaDaMedia = itemUsuario.valor > itemMedia.valor;
      return {
        categoria: itemUsuario.categoria,
        mensagem: acimaDaMedia
          ? `${textos[idiomaSelecionado]?.MensagemAcima} ${itemUsuario.valor.toFixed(2)} kgCO2, ${textos[idiomaSelecionado]?.AcimaDe} ${itemMedia.valor.toFixed(2)} kgCO2.`
          : `${textos[idiomaSelecionado]?.MensagemAbaixo} ${itemUsuario.valor.toFixed(2)} kgCO2, ${textos[idiomaSelecionado]?.AbaixoDe} ${itemMedia.valor.toFixed(2)} kgCO2.`
      };
    }).filter(Boolean); // Remove valores nulos
  };

  const gerarMensagemTotal = () => {
    const totalUsuario = calcularEmissoesSeparadas().testeData.emissaoTotal;
    const totalMediaGlobal = 243.19; // Valor médio global fornecido

    return totalUsuario > totalMediaGlobal
      ? `${textos[idiomaSelecionado]?.MensagemTotalAcima} ${totalUsuario.toFixed(2)} kgCO2, ${textos[idiomaSelecionado]?.AcimaDe} ${totalMediaGlobal.toFixed(2)} kgCO2.`
      : `${textos[idiomaSelecionado]?.MensagemTotalAbaixo} ${totalUsuario.toFixed(2)} kgCO2, ${textos[idiomaSelecionado]?.AbaixoDe} ${totalMediaGlobal.toFixed(2)} kgCO2.`;
  };

  return (
    <div className={`rotinas-container ${temaEscuro ? 'dark-mode' : ''} ${altoContrasteAtivo ? 'high-contrast' : ''}`}>
      <img src={altoContrasteAtivo ? folhaEsquerdaContrast : temaEscuro ? folhaEsquerdaDark : folhaDireita} alt="Folha direita" className="folha folha-direita" />
      <img src={altoContrasteAtivo ? folhaDireitaContrast : temaEscuro ? folhaDireitaDark : folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="header-left-controls">
          <div className="dropdown-idioma">
            <div className="idioma-selecionado" onClick={toggleIdiomaDropdown}>
              <img
                src={idiomaSelecionado === 'pt' ? bandeiraBrasil : bandeiraReinoUnido}
                alt={idiomaSelecionado === 'pt' ? 'Português' : 'Inglês'}
                className="bandeira-idioma"
              />
              <span>{textos[idiomaSelecionado]?.idioma}</span>
              <i className="bi bi-chevron-down" style={{ marginLeft: '5px', fontSize: '0.8em', color: '#ffffff' }}></i>
            </div>
            {mostrarDropdownIdioma && (
              <div className="dropdown-menu-idioma show">
                {idiomaSelecionado !== 'pt' && (
                  <div className="dropdown-item-idioma" onClick={() => handleIdiomaSelecionado('pt')}>
                    <img src={bandeiraBrasil} alt="Português" className="bandeira-idioma-item" />
                    <span>Português</span>
                  </div>
                )}
                {idiomaSelecionado !== 'en' && (
                  <div className="dropdown-item-idioma" onClick={() => handleIdiomaSelecionado('en')}>
                    <img src={bandeiraReinoUnido} alt="Inglês" className="bandeira-idioma-item" />
                    <span>English</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="tema-contraste-controles">
            <div className="tema-controle">
              <span>{textos[idiomaSelecionado]?.tema}</span>
              <i
                className={`bi ${temaEscuro ? 'bi-moon-fill' : 'bi-sun-fill'}`}
                onClick={toggleTema}
                style={{ cursor: 'pointer', fontSize: '1.5em' }}
              ></i>
            </div>

            <div className="alto-contraste-container">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={altoContrasteAtivo}
                  onChange={toggleAltoContraste}
                />
                <span className="slider round"></span>
              </label>
              <span>{textos[idiomaSelecionado]?.altoContraste}</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="header-links">
            <span className="navlink" onClick={handleInicioClick}>{textos[idiomaSelecionado]?.paginaInicial}</span>
            <span className="navlink" onClick={handleTesteClick}>{textos[idiomaSelecionado]?.testes}</span>
          </div>
          <button className="btn-entrar" onClick={handleLoginClick}>{textos[idiomaSelecionado]?.entrar}</button>
        </div>
      </header>

      <main className="conteudo-rotinas">
        <div className="progresso-bolinhas">
          {etapasFiltradas.map((_, index) => (
            <span
              key={index}
              className={`bolinha ${index === etapaAtual ? 'ativa' : ''}`}
            ></span>
          ))}
        </div>
        <h2>{etapasFiltradas[etapaAtualFiltrada]?.titulo}</h2>
        <div className="formulario">{etapasFiltradas[etapaAtualFiltrada]?.conteudo}</div>
        {dadosGrafico.length > 0 && etapaAtual === etapasFiltradas.length - 1 && (
          <div className="graficos-container">
            {/* Gráfico do usuário */}
            <div className="grafico-usuario">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" />
                  <YAxis label={{ value: 'kgCO2', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={renderTooltipContent} />
                  <Bar dataKey="valor">
                    {dadosGrafico.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="texto-recomendacao">
              <p className="pergunta">
                {textos[idiomaSelecionado]?.TextoConclusao1} {calcularEmissoesSeparadas().testeData.emissaoTotal.toFixed(2)} kgCO2.
              </p>
            </div>

            {/* Gráfico de Média Global */}
            <div className="grafico-media-global">
              <h5 className="titulo-grafico-global">{textos[idiomaSelecionado]?.TituloMediaGlobal}</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosGraficoMediaGlobal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" />
                  <YAxis label={{ value: 'kgCO2', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={renderTooltipContent} />
                  <Bar dataKey="valor">
                    {dadosGrafico.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="texto-recomendacao">
              <p className="pergunta">
                {textos[idiomaSelecionado]?.TextoConclusao3} 243,19 kgCO2.
              </p>
            </div>

            <div className="comparacao-emissoes">
              {gerarMensagensComparacao().map((item, index) => (
                <p key={index} className="mensagem-comparacao">
                  <b>{item.categoria}</b>: {item.mensagem}
                </p>
              ))}
            </div>

            <div className="texto-recomendacao">
              <p className="pergunta">{gerarMensagemTotal()}</p>
            </div>

            <div className="texto-recomendacao">
              <p className="pergunta">
                {textos[idiomaSelecionado]?.TextoConclusao2}
              </p>
            </div>

          </div>
        )}

        <div className="botoes-navegacao">
          {etapaAtual > 0 && (
            <button className="botao secundario" onClick={voltarEtapa}>
              {textos[idiomaSelecionado]?.BotaoVoltar}
            </button>
          )}
          {etapaAtual < etapasFiltradas.length - 2 && (
            <button className="botao primario" onClick={avancarEtapa}>
              {textos[idiomaSelecionado]?.BotaoAvancar}
            </button>
          )}
          {etapaAtual === etapasFiltradas.length - 2 && (
            <button className="botao primario" onClick={(handleCalcular)}>
              {textos[idiomaSelecionado]?.TituloCalcular}
            </button>
          )}
          {etapaAtual === etapasFiltradas.length - 1 && (
            <button className="botao primario" onClick={(handleLoginClick)}>
              {textos[idiomaSelecionado]?.BotaoCadastreSe}
            </button>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>{textos[idiomaSelecionado]?.rodape}</p>
      </footer>
    </div>
  );
};

export default Teste;