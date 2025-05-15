import React, { useEffect, useState } from 'react';
import './Login.css'; // Importando o CSS existente
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const Teste = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleInicioClick = () => {
    navigate('/');
  };
  const handleTestes = () => {
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

  const [dadosGrafico, setDadosGrafico] = useState([]);

  const avancarEtapa = () => {
    setMensagemErroTeste('');

    if (etapaAtual === 0 && !nomeRotina.trim()) {
      setMensagemErroTeste("Por favor, insira um nome para sua rotina.");
      return;
    }

    if (etapaAtual === 1 && !dieta) {
      setMensagemErroTeste("Por favor, selecione uma dieta e preencha quantidades de porções de alimentos consumidos.")
      return;
    }

    if (!tipoGas && etapaAtual === 2) {
      setMensagemErroTeste("Por favor, selecione uma opção.");
      return;
    } else if (tipoGas !== 'encanado' && etapaAtual === 2) {
      if (!tipoBotijao && etapaAtual === 2) {
        setMensagemErroTeste("Por favor, selecione um tipo de botijão de gás.");
        return;
      } else if (!tempoDuracaoGas && etapaAtual === 2) {
        setMensagemErroTeste("Por favor, digite quantos meses seu gás costuma durar.");
        return;
      }
    } else if (tipoGas === 'encanado' && etapaAtual === 2) {
      if (isNaN(Number(m3GasNatural)) || Number(m3GasNatural) <= 0) {
        setMensagemErroTeste('Por favor, digite um valor válido para o m³ da conta de gás natural.');
        return;
      }
    }

    if (!usaVeiculo && etapaAtual === 3) {
      setMensagemErroTeste("Por favor, selecione uma opção.");
      return;
    } else if (usaVeiculo !== 'nao' && etapaAtual === 3) {
      if (!possuiVeiculo && etapaAtual === 3) {
        setMensagemErroTeste("Por favor, selecione uma opção.");
        return;
      } else if (possuiVeiculo === 'proprio' && etapaAtual === 3) {
        if (!combustivel && etapaAtual === 3) {
          setMensagemErroTeste("Por favor, selecione um tipo de combustível.");
          return;
        } else if (combustivel !== 'Nenhum' && combustivel !== 'Elétrico' && !litrosCombustivel && etapaAtual === 3) {
          setMensagemErroTeste("Por favor, digite quantos litros de combustível você abastece por mês.");
          return;
        } else if (combustivel === 'Elétrico' && etapaAtual === 3 && (isNaN(Number(kmEletrico)) || Number(kmEletrico) <= 0) && etapaAtual === 3) {
          setMensagemErroTeste("Por favor, digite quantos quilômetros você percorre durante um mês com seu veículo elétrico.");
          return;
        }
      } else if (possuiVeiculo === 'publico' && etapaAtual === 3 && Object.keys(transportesPublicos).length === 0) {
        setMensagemErroTeste('Por favor, selecione pelo menos um veículo utilizado durante a semana.');
        return;
      }
    }

    if (etapaAtual === 4 && (isNaN(Number(kwhContaLuz)) || Number(kwhContaLuz) <= 0)) {
      setMensagemErroTeste('Por favor, digite um valor válido para o KWh da conta de luz.');
      return;
    }

    if (etapaAtual === 5 && (fezViagem === null)) {
      setMensagemErroTeste('Por favor, selecione se você fez alguma viagem no último mês.');
      return;
    } else if (etapaAtual === 5 && fezViagem === 'sim' && viagemInternacional === null) {
      setMensagemErroTeste('Por favor, selecione o tipo de viagem.');
      return;
    } else if (etapaAtual === 5 && fezViagem === 'sim' && Object.keys(veiculosViagem).length === 0) {
      setMensagemErroTeste('Por favor, selecione pelo menos um veículo utilizado na viagem.');
      return;
    }
    for (const veiculo in veiculosViagem) {
      if (veiculosViagem[veiculo] && (isNaN(Number(kmPorVeiculoViagem[veiculo])) || Number(kmPorVeiculoViagem[veiculo]) <= 0)) {
        setMensagemErroTeste(`Por favor, digite a distância percorrida para o veículo: ${veiculo}.`);
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
    'Carne bovina', 'Carne suína', 'Frango', 'Peixe',
    'Leite', 'Ovos', 'Leguminosas', 'Frutas e vegetais', 'Cereais integrais'
  ];

  const alimentosPermitidosPorDieta = {
    Onívora: alimentos, // todos
    Vegetariana: alimentos.filter(a => !['Carne bovina', 'Carne suína', 'Frango', 'Peixe'].includes(a)),
    Vegana: alimentos.filter(a => !['Carne bovina', 'Carne suína', 'Frango', 'Peixe', 'Leite', 'Ovos'].includes(a)),
    Pescetariana: alimentos.filter(a => !['Carne bovina', 'Carne suína', 'Frango'].includes(a)),
    Carnívora: ['Carne bovina', 'Carne suína', 'Frango', 'Peixe', 'Leite', 'Ovos']
  };

  const etapas = [
    {
      titulo: 'Nome da Rotina',
      conteudo: (
        <>
          <label className="pergunta">Digite o nome da sua rotina:</label>
          <input
            type="text"
            className="input-texto"
            value={nomeRotina}
            onChange={(e) => setNomeRotina(e.target.value)}
            placeholder="Ex: Semana Sustentável"
          />
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      )
    },
    {
      titulo: 'Alimentos',
      conteudo: (
        <>
          <label className="pergunta">Selecione a sua dieta:</label>
          <small className="ajuda">Caso sua dieta não esteja dentro das opções, selecione Onívora.</small>
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
            <option value="">Selecione...</option>
            <option value="Onívora">Onívora</option>
            <option value="Vegetariana">Vegetariana</option>
            <option value="Vegana">Vegana</option>
            <option value="Pescetariana">Pescetariana</option>
            <option value="Carnívora">Carnívora</option>
          </select>
          <label className="pergunta">Porções consumidas por semana:</label>
          <small className="ajuda">Considere que uma porção equivale a uma refeição média do alimento selecionado.</small>
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
      titulo: 'Gás de Cozinha',
      conteudo: (
        <>
          <label className="pergunta">Você utiliza gás encanado ou compra botijões?</label>
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
              Gás encanado
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
              Botijão
            </label>
          </div>
          {tipoGas === 'botijao' && (
            <>
              <label className="pergunta">Qual tipo de botijão?</label>
              <select
                className="input-texto"
                value={tipoBotijao}
                onChange={(e) => setTipoBotijao(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="P13">Comum P13</option>
                <option value="P20">Médio P20</option>
                <option value="P45">Grande P45</option>
              </select>
            </>
          )}
          {tipoGas === 'botijao' && (
            <>
              <label className="pergunta">Quanto tempo dura o gás que você compra?</label>
              <input
                type="number"
                min="1"
                className="spinner"
                value={tempoDuracaoGas}
                onChange={(e) => setTempoDuracaoGas(e.target.value)}
              /> meses
            </>
          )}
          {tipoGas === 'encanado' && (
            <>
              <label className="pergunta">Digite o valor em metros cúbicos (m³) da sua última conta de gás natural corrigido:</label>
              <input
                type="number"
                min="0"
                className="input-texto"
                value={m3GasNatural}
                onChange={(e) => setM3GasNatural(e.target.value)}
                placeholder="Ex: 25"
              />
            </>
          )}
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      )
    },
    {
      titulo: 'Veículos',
      conteudo: (
        <>
          <label className="pergunta">Você utiliza algum tipo de veículo durante a semana?</label>
          <div className="radio-group">
            <label><input type="radio" value="sim" checked={usaVeiculo === 'sim'} onChange={(e) => setUsaVeiculo(e.target.value)} /> Sim</label>
            <label><input type="radio" value="nao" checked={usaVeiculo === 'nao'} onChange={(e) => setUsaVeiculo(e.target.value)} /> Não</label>
          </div>
          {usaVeiculo === 'sim' && (
            <>
              <label className="pergunta">Você possui um veículo ou utiliza transporte público?</label>
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
                  /> Veículo próprio
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
                  /> Transporte público
                </label>
              </div>
              {possuiVeiculo === 'proprio' && (
                <>
                  <label className="pergunta">Tipo de combustível:</label>
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
                    <option value="">Selecione...</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Etanol">Etanol</option>
                    <option value="Elétrico">Veículo elétrico</option>
                    <option value="Nenhum">Não utiliza combustível</option>
                  </select>
                  {combustivel === 'Elétrico' && (
                    <>
                      <label className="pergunta">Km por semana com veículo elétrico:</label>
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
                      <label className="pergunta">Litros abastecidos por mês:</label>
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
                  <label className="pergunta">Transportes usados na semana:</label>
                  {['Ônibus', 'Ônibus elétrico', 'Metrô', 'Trem', 'Carro (app)', 'Motocicleta (app)'].map((tipo) => (
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
                          placeholder="Km semanais"
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
      titulo: 'Energia elétrica',
      conteudo: (
        <>
          <label className="pergunta">Digite o valor de KWh da sua última conta de energia elétrica:</label>
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
      titulo: 'Viagens',
      conteudo: (
        <>
          <label className="pergunta">Você fez alguma viagem no último mês?</label>
          <small className="ajuda pequeno">Considere viagens longas ou curtas, como viagens de carro de aplicativo, etc.</small>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="sim"
                checked={fezViagem === 'sim'}
                onChange={(e) => setFezViagem(e.target.value)}
              /> Sim.
            </label>
            <label>
              <input
                type="radio"
                value="nao"
                checked={fezViagem === 'nao'}
                onChange={(e) => setFezViagem(e.target.value)}
              /> Não.
            </label>
          </div>

          {fezViagem === 'sim' && (
            <>
              <label className="pergunta">Foi uma viagem internacional?</label>
              <small className="ajuda pequeno">Selecione "Sim." se fez mais de uma viagem diferente no último mês.</small>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="sim"
                    checked={viagemInternacional === 'sim'}
                    onChange={(e) => setViagemInternacional(e.target.value)}
                  /> Sim.
                </label>
                <label>
                  <input
                    type="radio"
                    value="nao"
                    checked={viagemInternacional === 'nao'}
                    onChange={(e) => setViagemInternacional(e.target.value)}
                  /> Não, foi uma viagem nacional.
                </label>
              </div>

              <label className="pergunta">Qual (ou quais) veículo(s) você utilizou para viajar?</label>
              <div className="checkbox-group">
                {['Carro', 'Carro elétrico', 'Moto', 'Ônibus', 'Metrô', 'Trem', 'Avião', 'Barco/cruzeiro'].map((veiculo) => (
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
      titulo: 'Calcular',
      conteudo: (
        <>
          <p className="pergunta">Clique em calcular para ver os resultados do seu teste!</p>

        </>
      ),
    },
    {
      titulo: 'Resultados',
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
        'Carne bovina': 6.136,
        'Carne suína': 1.149,
        'Frango': 0.591,
        'Peixe': 0.389,
        'Leite': 0.594,
        'Ovos': 0.186,
        'Leguminosas': 0.055,
        'Frutas e vegetais': 0.135,
        'Cereais integrais': 0.176
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
        'Ônibus': 0.016,
        'Ônibus elétrico': 0,
        'Metrô': 0.0035,
        'Trem': 0.019,
        'Carro (app)': 0.1268,
        'Motocicleta (app)': 0.0711
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
    if (!usaGasEncanado && tipoBotijao && tempoDuracaoGas) {
      const fator = fatores.gas[tipoBotijao];
      emissaoCarbonoBotijao = fator / tempoDuracaoGas;
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
      'Metrô': 0.0035,
      'Trem': 0.0019,
      'Ônibus': 0.016,
      'Carro': 0.1268,
      'Moto': 0.0711,
      'Carro elétrico': 0.0891,
      'Barco/cruzeiro': 0.250,
      'Avião': viagemInternacional === 'sim' ? 0.1542 : 0.10974,
    };

    // Cálculo de energia elétrica
    const emissaoEnergia = Number(kwhContaLuz) * fatorKwh;

    // Cálculo de gás encanado
    const emissaoGas = tipoGas === 'encanado' ? Number(m3GasNatural) * fatorGas : 0;

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
      dados.push({ categoria: 'Viagens', valor: emissaoViagens });
    }

    // Gás (natural ou botijão)
    const emissaoGas = resultados.testeData.gasNatural?.emissao || resultados.rotinaParaSalvar.emissoes.gas || 0;
    if (emissaoGas > 0) {
      dados.push({ categoria: 'Gás', valor: emissaoGas });
    }

    // Energia elétrica
    const emissaoEnergia = resultados.testeData.energiaEletrica?.emissao || 0;
    if (emissaoEnergia > 0) {
      dados.push({ categoria: 'Energia', valor: emissaoEnergia });
    }

    // Alimentos
    const emissaoAlimentos = resultados.testeData.emissaoAlimentos || 0;
    if (emissaoAlimentos > 0) {
      dados.push({ categoria: 'Alimentos', valor: emissaoAlimentos });
    }

    // Veículos (uso semanal)
    const emissaoVeiculos = resultados.testeData.emissaoVeiculos || 0;
    if (emissaoVeiculos > 0) {
      dados.push({ categoria: 'Veículos', valor: emissaoVeiculos });
    }

    return dados;
  };

  const renderTooltipContent = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '8px' }}>
          <strong>{`${name}: ${value.toFixed(2)} kgCO2`}</strong>
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


  return (
    <div className="rotinas-container">
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />
      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="header-right">
          <div className="header-links">
            <span className="navlink" onClick={handleInicioClick}>Página inicial</span>
            <span className="navlink" onClick={handleTestes}>Testes</span>
          </div>
          <button className="btn-entrar" onClick={handleLoginClick}>Entrar</button>
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
          <div>
            <div style={{ width: '100%', maxWidth: '600px', margin: '40px auto' }}>
              <BarChart width={600} height={300} data={dadosGrafico}>
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
            </div>
            <div>
              <p className="pergunta">
                Total de emissões: {calcularEmissoesSeparadas().testeData.emissaoTotal.toFixed(2)} kgCO2. Deseja salvar seu teste e acompanhar a evolução da sua pegada de carbono mensalmente? Cadastre-se agora gratuitamente!
              </p>
            </div>
          </div>
        )}
        <div className="botoes-navegacao">
          {etapaAtual > 0 && (
            <button className="botao secundario" onClick={voltarEtapa}>
              Voltar
            </button>
          )}
          {etapaAtual < etapasFiltradas.length - 2 && (
            <button className="botao primario" onClick={avancarEtapa}>
              Avançar
            </button>
          )}
          {etapaAtual === etapasFiltradas.length - 2 && (
            <button className="botao primario" onClick={(handleCalcular)}>
              Calcular
            </button>
          )}
          {etapaAtual === etapasFiltradas.length - 1 && (
            <button className="botao primario" onClick={(handleLoginClick)}>
              Cadastre-se
            </button>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 EcoBalance — Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default Teste;