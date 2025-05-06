import React, { useEffect, useState, useRef } from 'react';
import './Login.css';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rotinas = () => {
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

  const avancarEtapa = () => {
    if (!nomeRotina.trim()) {
      setMensagemErroRotina("Por favor, insira um nome para sua rotina.");
      return;
    }

    if (!dieta && etapaAtual == 1) {
      setMensagemErroRotina("Por favor, selecione uma dieta e preencha quantidades de porções de alimentos consumidos.")
      return;
    }

    if (!tipoGas && etapaAtual == 2) {
      setMensagemErroRotina("Por favor, selecione uma opção.");
      return;
    } else if (tipoGas !== 'encanado' && etapaAtual == 2) {
      if (!tipoBotijao && etapaAtual == 2) {
        setMensagemErroRotina("Por favor, selecione um tipo de botijão de gás.");
        return;
      } else if (!tempoDuracaoGas && etapaAtual == 2) {
        setMensagemErroRotina("Por favor, digite quantos meses seu gás costuma durar.");
        return;
      }
    }

    if (!usaVeiculo && etapaAtual == 3) {
      setMensagemErroRotina("Por favor, selecione uma opção.");
      return;
    } else if (usaVeiculo !== 'nao' && etapaAtual == 3) {
      if (!possuiVeiculo && etapaAtual == 3) {
        setMensagemErroRotina("Por favor, selecione uma opção.");
        return;
      } else if (possuiVeiculo == 'proprio' && etapaAtual == 3) {
        if (!combustivel && etapaAtual == 3) {
          setMensagemErroRotina("Por favor, selecione um tipo de combustível.");
          return;
        } else if (combustivel !== 'Nenhum' && combustivel !== 'Elétrico' && !litrosCombustivel && etapaAtual == 3) {
          setMensagemErroRotina("Por favor, digite quantos litros de combustível você abastece por mês.");
          return;
        } else if (combustivel === 'Elétrico' && etapaAtual == 3 && (isNaN(Number(kmEletrico)) || Number(kmEletrico) <= 0) && etapaAtual == 3) {
          setMensagemErroRotina("Por favor, digite quantos quilômetros você percorre durante um mês com seu veículo elétrico.");
          return;
        }
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
          {mensagemErroRotina && <small className="feedback-error">{mensagemErroRotina}</small>}
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
          {mensagemErroRotina && <small className="feedback-error">{mensagemErroRotina}</small>}
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
          {mensagemErroRotina && <small className="feedback-error">{mensagemErroRotina}</small>}
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
          {mensagemErroRotina && <small className="feedback-error">{mensagemErroRotina}</small>}
        </>
      )
    },
    {
      titulo: 'Finalizado!',
      conteudo: (
        <>
          <p className="pergunta">Parabéns por completar sua rotina sustentável! 🎉</p>
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
                  if (!res.ok) throw new Error('Erro ao salvar rotina.');
                  return res.json();
                })
                .then(data => {
                  toast.success("Rotina salva com sucesso!");
                  setTimeout(() => {
                    navigate('/suas-rotinas');
                  }, 2000);
                })
                .catch(err => {
                  console.error(err);
                  toast.error("Falha ao salvar rotina no banco de dados.");
                });
            }}
          >
            Salvar Rotina
          </button>
        </>
      )
    }
  ];

  const calcularEmissoesSeparadas = () => {
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
        'Carro (app)': 0.12688,
        'Motocicleta (app)': 0.0711
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
      emissaoCarbonoBotijao = fator / tempoDuracaoGas;
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

  return (
    <div className="rotinas-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

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



          <div ref={dropdownRef} className="dropdown-avatar-wrapper" style={{ position: 'relative' }}>
            <img
              src={avatar}
              alt="Avatar do usuário"
              className="icone-avatar"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
            {mostrarDropdown && (
              <div className="dropdown-menu show" style={{ position: 'absolute', right: 0, top: '100%', zIndex: 1000 }}>
                <button className="dropdown-item" onClick={handleUsuarioAcesso}>Informações de Usuário</button>
                <button className="dropdown-item" onClick={handleRotinas}>Suas Rotinas</button>
                <button className="dropdown-item" onClick={handleGráficosEConquistas}>Gráficos e Conquistas</button>
                <button className="dropdown-item text-danger" onClick={handleLogout}>Sair</button>
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
              Voltar
            </button>
          )}
          {etapaAtual < etapas.length - 1 && (
            <button className="botao primario" onClick={avancarEtapa}>
              Avançar
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

export default Rotinas;