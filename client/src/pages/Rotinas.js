import React, { useEffect, useState, useRef } from 'react';
import './Login.css';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bandeiraBrasil from '../assets/bandeira-brasil.png';
import bandeiraReinoUnido from '../assets/bandeira-reinounido.png';
import folhaDireitaContrast from '../assets/folha-direitacontrast.png';
import folhaDireitaDark from '../assets/folha-direitadark.png';
import folhaEsquerdaContrast from '../assets/folha-esquerdacontrast.png';
import folhaEsquerdaDark from '../assets/folha-esquerdadark.png';

const textos = {
  pt: {
    paginaInicial: 'Página inicial',
    testes: 'Testes',
    entrar: 'Entrar',
    informacoesUsuario: 'Informações de Usuário',
    suasRotinas: 'Suas Rotinas',
    graficosConquistas: 'Gráficos e Conquistas',
    sair: 'Sair',
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
    TituloGas: 'Gás de Cozinha',
    PerguntaGas: 'Você utiliza gás encanado ou compra botijões?',
    SelecaoEncanado: 'Gás encanado',
    SelecaoBotijao: 'Botijão',
    PerguntaTipoBotijão: 'Qual tipo de botijão?',
    BotijaoP13: 'Comum P13',
    BotijaoP20: 'Médio P20',
    BotijaoP45: 'Grande P45',
    PerguntaDuracaoBotijao: 'Quanto tempo dura o gás que você compra?',
    MesesBotijao: 'meses',
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
    BotaoVoltar: 'Voltar',
    BotaoAvancar: 'Avançar',
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
    ErroNome: 'Por favor, insira um nome para sua rotina.',
    ErroDieta: 'Por favor, selecione uma dieta e preencha quantidades de porções de alimentos consumidos.',
    ErroOpcao: 'Por favor, selecione uma opção.',
    ErroTipoBotijao: 'Por favor, selecione um tipo de botijão de gás.',
    ErroMesGas: 'Por favor, digite quantos meses seu gás costuma durar.',
    ErroCombustivel: 'Por favor, selecione um tipo de combustível.',
    ErroLitrosCombustivel: 'Por favor, digite quantos litros de combustível você abastece por mês.',
    ErroQuilometrosEletrico: 'Por favor, digite quantos quilômetros você percorre durante um mês com seu veículo elétrico.',
    ErroUmVeiculo: 'Por favor, selecione pelo menos um veículo utilizado durante a semana.',
    SalvarRotina: 'Salvar Rotina',
    ErroSalvarRotinaBanco: 'Falha ao salvar rotina no banco de dados.',
    RotinaSalva: 'Rotina salva com sucesso!',
    ErroSalvarRotina: 'Erro ao salvar rotina.',
    Parabens: 'Parabéns por completar sua rotina sustentável! 🎉',
    Finalizado: 'Finalizado!',
    QuantidadePessoas: 'Quantas pessoas moram com você?',
    PessoasTooltip: 'Deixe um (1) se morar sozinho.',
  },
  en: {
    paginaInicial: 'Homepage',
    testes: 'Tests',
    entrar: 'Login',
    informacoesUsuario: 'User Information',
    suasRotinas: 'Your Routines',
    graficosConquistas: 'Charts and Achievements',
    sair: 'Logout',
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
    TituloGas: 'Cooking Gas',
    PerguntaGas: 'Do you use piped gas or buy gas cylinders?',
    SelecaoEncanado: 'Piped gas',
    SelecaoBotijao: 'Cylinder',
    PerguntaTipoBotijão: 'What type of cylinder?',
    BotijaoP13: 'Standard P13',
    BotijaoP20: 'Medium P20',
    BotijaoP45: 'Large P45',
    PerguntaDuracaoBotijao: 'How long does your gas cylinder last?',
    MesesBotijao: 'months',
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
    BotaoVoltar: 'Back',
    BotaoAvancar: 'Next',
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
    ErroNome: 'Please enter a name for your routine.',
    ErroDieta: 'Please select a diet and fill in the quantity of consumed food portions.',
    ErroOpcao: 'Please select an option.',
    ErroTipoBotijao: 'Please select a type of gas cylinder.',
    ErroMesGas: 'Please enter how many months your gas usually lasts.',
    ErroCombustivel: 'Please select a type of fuel.',
    ErroLitrosCombustivel: 'Please enter how many liters of fuel you use per month.',
    ErroQuilometrosEletrico: 'Please enter how many kilometers you travel in a month with your electric vehicle.',
    ErroUmVeiculo: 'Please select at least one vehicle used during the week.',
    SalvarRotina: 'Save Routine',
    ErroSalvarRotinaBanco: 'Failed to save routine to the database.',
    RotinaSalva: 'Routine saved successfully!',
    ErroSalvarRotina: 'Error saving routine.',
    Parabens: 'Congratulations on completing your sustainable routine! 🎉',
    Finalizado: 'Finished!',
    QuantidadePessoas: 'How many people live with you?',
    PessoasTooltip: 'Leave one (1) if you live alone.',
  },
};

const Rotinas = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  const [idiomaSelecionado, setIdiomaSelecionado] = useState(() => {
    return localStorage.getItem('language') || 'pt'; // Usa o valor salvo ou define 'pt' como padrão
  });
  const [mostrarDropdownIdioma, setMostrarDropdownIdioma] = useState(false);

  const location = useLocation();
  const rotinaCarregada = location.state?.rotina;

  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setMostrarDropdown(!mostrarDropdown);
  };

  const navigate = useNavigate();
  const handleInicioClick = () => {
    navigate('/home');
  };
  const handleUsuarioAcesso = () => {
    navigate('/info-cadastro')
  };

  const handleTestes = () => {
    navigate('/teste-logado')
  }

  const handleRotinas = () => {
    navigate('/suas-rotinas')
  }

  const handleGráficosEConquistas = () => {
    navigate('/graficos-conquistas')
  }

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  useEffect(() => {
    // Verifica se o usuário está logado
    const usuario = localStorage.getItem("usuarioLogado");
    if (!usuario) {
      navigate("/login");
      return; // evita continuar o código se não estiver logado
    }
  })

  const [etapaAtual, setEtapaAtual] = useState(0);
  const [mensagemErroRotina, setMensagemErroRotina] = useState('');

  const [nomeRotina, setNomeRotina] = useState(rotinaCarregada?.nome || '');
  const [dieta, setDieta] = useState(rotinaCarregada?.dieta || '');
  const [porcoes, setPorcoes] = useState(rotinaCarregada?.porcoes || {});
  const [tipoGas, setTipoGas] = useState(rotinaCarregada?.tipoGas || '');
  const [tipoBotijao, setTipoBotijao] = useState(rotinaCarregada?.tipoBotijao || '');
  const [tempoDuracaoGas, setTempoDuracaoGas] = useState(rotinaCarregada?.tempoDuracaoGas || 0);
  const [usaVeiculo, setUsaVeiculo] = useState(rotinaCarregada?.usaVeiculo || null);
  const [possuiVeiculo, setPossuiVeiculo] = useState(rotinaCarregada?.possuiVeiculo || null);
  const [combustivel, setCombustivel] = useState(rotinaCarregada?.combustivel || '');
  const [litrosCombustivel, setLitrosCombustivel] = useState(rotinaCarregada?.litrosCombustivel || 0);
  const [kmEletrico, setKmEletrico] = useState(rotinaCarregada?.kmEletrico || 0);
  const [transportesPublicos, setTransportesPublicos] = useState(rotinaCarregada?.transportesPublicos || []);
  const [kmTransportes, setKmTransportes] = useState(rotinaCarregada?.kmTransportes || {});
  const [quantidadePessoas, setQuantidadePessoas] = useState(rotinaCarregada?.quantidadePessoas || 1);

  const [temaEscuro, setTemaEscuro] = useState(false);
  const [altoContrasteAtivo, setAltoContrasteAtivo] = useState(false);

  const avancarEtapa = () => {
    if (!nomeRotina.trim()) {
      setMensagemErroRotina(textos[idiomaSelecionado]?.ErroNome);
      return;
    }

    if (!dieta && etapaAtual === 1) {
      setMensagemErroRotina(textos[idiomaSelecionado]?.ErroDieta)
      return;
    }

    if (!tipoGas && etapaAtual === 2) {
      setMensagemErroRotina(textos[idiomaSelecionado]?.ErroOpcao);
      return;
    } else if (tipoGas !== 'encanado' && etapaAtual === 2) {
      if (!tipoBotijao && etapaAtual === 2) {
        setMensagemErroRotina(textos[idiomaSelecionado]?.ErroTipoBotijao);
        return;
      } else if (!tempoDuracaoGas && etapaAtual === 2) {
        setMensagemErroRotina(textos[idiomaSelecionado]?.ErroMesGas);
        return;
      }
    }

    if (!usaVeiculo && etapaAtual === 3) {
      setMensagemErroRotina(textos[idiomaSelecionado]?.ErroOpcao)
      return;
    } else if (usaVeiculo !== 'nao' && etapaAtual === 3) {
      if (!possuiVeiculo && etapaAtual === 3) {
        setMensagemErroRotina(textos[idiomaSelecionado]?.ErroOpcao);
        return;
      } else if (possuiVeiculo === 'proprio' && etapaAtual === 3) {
        if (!combustivel && etapaAtual === 3) {
          setMensagemErroRotina(textos[idiomaSelecionado]?.ErroCombustivel);
          return;
        } else if (combustivel !== 'Nenhum' && combustivel !== 'Elétrico' && !litrosCombustivel && etapaAtual === 3) {
          setMensagemErroRotina(textos[idiomaSelecionado]?.ErroLitrosCombustivel);
          return;
        } else if (combustivel === 'Elétrico' && etapaAtual === 3 && (isNaN(Number(kmEletrico)) || Number(kmEletrico) <= 0) && etapaAtual === 3) {
          setMensagemErroRotina(textos[idiomaSelecionado]?.ErroQuilometrosEletrico);
          return;
        }
      } else if (possuiVeiculo === 'publico' && etapaAtual === 3 && Object.keys(transportesPublicos).length === 0) {
        setMensagemErroRotina(textos[idiomaSelecionado]?.ErroUmVeiculo);
        return;
      }
    }

    setMensagemErroRotina(""); // limpa erro se tudo certo
    setEtapaAtual((prev) => prev + 1);
  }
  const voltarEtapa = () => {
    setMensagemErroRotina(""); // limpa erro se tudo certo
    setEtapaAtual((prev) => prev - 1);
  }

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
          {mensagemErroRotina && <small className="feedback-error">{mensagemErroRotina}</small>}
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
                  value={porcoes[alimento] || ''}
                  onChange={(e) =>
                    setPorcoes({ ...porcoes, [alimento]: parseInt(e.target.value) })
                  }
                />
              </div>
            );
          })}
          {mensagemErroRotina && <small className="feedback-error">{mensagemErroRotina}</small>}
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
          {mensagemErroRotina && <small className="feedback-error">{mensagemErroRotina}</small>}
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
          {mensagemErroRotina && <small className="feedback-error">{mensagemErroRotina}</small>}
        </>
      )
    },
    {
      titulo: textos[idiomaSelecionado]?.Finalizado,
      conteudo: (
        <>
          <p className="pergunta">{textos[idiomaSelecionado]?.Parabens}</p>
          <button
            className="botao"
            onClick={() => {
              const resultados = calcularEmissoesSeparadas();
              const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

              const rotinaParaSalvar = {
                usuarioId: usuarioLogado._id,
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
                  alimentos: resultados.alimentos.emissaoCarbonoTotal,
                  gas: resultados.gas.usaGasEncanado ? null : resultados.gas.emissaoCarbonoBotijao,
                  veiculos: resultados.veiculos.emissaoCarbonoTotal
                }
              };
                fetch('https://ecobalance-backend.onrender.com/api/rotinas', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(rotinaParaSalvar)
              })
                .then(res => {
                  if (!res.ok) throw new Error(textos[idiomaSelecionado]?.ErroSalvarRotina);
                  return res.json();
                })
                .then(data => {
                  toast.success(textos[idiomaSelecionado]?.RotinaSalva);
                  setTimeout(() => {
                    navigate('/suas-rotinas');
                  }, 2000);
                })
                .catch(err => {
                  console.error(err);
                  toast.error(textos[idiomaSelecionado]?.ErroSalvarRotinaBanco);
                });
            }}
          >
            {textos[idiomaSelecionado]?.SalvarRotina}
          </button>
        </>
      )
    }
  ];

  const calcularEmissoesSeparadas = () => {
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

    // Alimentos
    let alimentosTotal = 0;
    Object.entries(porcoes).forEach(([alimento, quantidade]) => {
      const fator = fatores.alimentos[alimento] || 0;
      alimentosTotal += ((quantidade * fator) * 4);
    });

    // Gás
    let usaGasEncanado = tipoGas === 'encanado';
    let emissaoCarbonoBotijao = 0;
    if (!usaGasEncanado && tipoBotijao && tempoDuracaoGas) {
      const fator = fatores.gas[tipoBotijao];
      emissaoCarbonoBotijao = (fator / tempoDuracaoGas) / quantidadePessoas;
    }

    // Veículos
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

    return {
      alimentos: { emissaoCarbonoTotal: parseFloat(alimentosTotal.toFixed(2)) },
      gas: {
        usaGasEncanado,
        ...(usaGasEncanado ? {} : { emissaoCarbonoBotijao: parseFloat(emissaoCarbonoBotijao.toFixed(2)) })
      },
      veiculos: { emissaoCarbonoTotal: parseFloat(veiculosTotal.toFixed(2)) }
    };
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const toggleIdiomaDropdown = () => {
    setMostrarDropdownIdioma(!mostrarDropdownIdioma);
  };

  const handleIdiomaSelecionado = async (idioma) => {
    setIdiomaSelecionado(idioma);
    localStorage.setItem('language', idioma);
    setMostrarDropdownIdioma(false);

    if (usuario._id) {
      try {
        const response = await fetch(`https://ecobalance-backend.onrender.com/api/usuarios/${usuario._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idioma }), // só o idioma
        });

        if (!response.ok) {
          throw new Error("Erro ao atualizar idioma");
        }

        console.log(`Idioma atualizado para ${idioma} no servidor`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleTema = () => {
    setTemaEscuro(!temaEscuro);
  };

  const toggleAltoContraste = () => {
    setAltoContrasteAtivo(!altoContrasteAtivo);
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

  return (
    <div className={`rotinas-container ${temaEscuro ? 'dark-mode' : ''} ${altoContrasteAtivo ? 'high-contrast' : ''}`}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

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
            <span className="navlink" onClick={handleTestes}>{textos[idiomaSelecionado]?.testes}</span>
          </div>
          <div ref={dropdownRef} className="dropdown-avatar-wrapper" style={{ position: 'relative' }}>
            <img
              src={`/avatars/avatar${usuario.avatarSelecionado}.png`}
              alt="Avatar do usuário"
              className="icone-avatar"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
            {mostrarDropdown && (
              <div className="dropdown-menu show" style={{ position: 'absolute', right: 0, top: '100%', zIndex: 1000 }}>
                <button className="dropdown-item" onClick={handleUsuarioAcesso}>{textos[idiomaSelecionado]?.informacoesUsuario}</button>
                <button className="dropdown-item" onClick={handleRotinas}>{textos[idiomaSelecionado]?.suasRotinas}</button>
                <button className="dropdown-item" onClick={handleGráficosEConquistas}>{textos[idiomaSelecionado]?.graficosConquistas}</button>
                <button className="dropdown-item text-danger" onClick={handleLogout}>{textos[idiomaSelecionado]?.sair}</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="conteudo-rotinas">
        <div className="progresso-bolinhas">
          {etapas.map((_, index) => (
            <span
              key={index}
              className={`bolinha ${index === etapaAtual ? 'ativa' : ''}`}
            ></span>
          ))}
        </div>
        <h2>{etapas[etapaAtual].titulo}</h2>
        <div className="formulario">{etapas[etapaAtual].conteudo}</div>
        <div className="botoes-navegacao">
          {etapaAtual > 0 && (
            <button className="botao secundario" onClick={voltarEtapa}>
              {textos[idiomaSelecionado]?.BotaoVoltar}
            </button>
          )}
          {etapaAtual < etapas.length - 1 && (
            <button className="botao primario" onClick={avancarEtapa}>
              {textos[idiomaSelecionado]?.BotaoAvancar}
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

export default Rotinas;