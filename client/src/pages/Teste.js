import React, { useState } from 'react';
import './Login.css'; // Importando o CSS existente
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

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
  const [rotinaSelecionada, setRotinaSelecionada] = useState('');
  const [kwhContaLuz, setKwhContaLuz] = useState(0);
  const [m3GasNatural, setM3GasNatural] = useState(0);
  const [fezViagem, setFezViagem] = useState(null);
  const [viagemInternacional, setViagemInternacional] = useState(null);
  const [veiculosViagem, setVeiculosViagem] = useState({});
  const [kmPorVeiculoViagem, setKmPorVeiculoViagem] = useState({});

  const avancarEtapa = () => {
    setMensagemErroTeste('');

    if (etapaAtual === 0) {
      if (!rotinaSelecionada) {
        setMensagemErroTeste('Por favor, selecione uma rotina.');
        return;
      }

      const usaGasEncanado = true;
      if (!usaGasEncanado) {
        setEtapaAtual(3);
        return;
      }
    }

    if (etapaAtual === 1) {
      if (isNaN(Number(kwhContaLuz)) || Number(kwhContaLuz) <= 0) {
        setMensagemErroTeste('Por favor, digite um valor válido para o KWh da conta de luz.');
        return;
      }
    }

    if (etapaAtual === 2) {
      if (isNaN(Number(m3GasNatural)) || Number(m3GasNatural) <= 0) {
        setMensagemErroTeste('Por favor, digite um valor válido para o m³ da conta de gás natural.');
        return;
      }
    }

    if (etapaAtual === 3) {
      if (fezViagem === null) {
        setMensagemErroTeste('Por favor, selecione se você fez alguma viagem no último mês.');
        return;
      }
      if (fezViagem === 'nao') {
        setEtapaAtual(etapasFiltradas.length - 1);
        return;
      }
    }

    if (etapaAtual === 4) {
      if (viagemInternacional === null) {
        setMensagemErroTeste('Por favor, selecione o tipo de viagem.');
        return;
      }
      if (Object.keys(veiculosViagem).length === 0) {
        setMensagemErroTeste('Por favor, selecione pelo menos um veículo utilizado na viagem.');
        return;
      }
      for (const veiculo in veiculosViagem) {
        if (veiculosViagem[veiculo] && (isNaN(Number(kmPorVeiculoViagem[veiculo])) || Number(kmPorVeiculoViagem[veiculo]) <= 0)) {
          setMensagemErroTeste(`Por favor, digite a distância percorrida para o veículo: ${veiculo}.`);
          return;
        }
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

  const etapas = [
    {
      titulo: 'Selecione sua rotina',
      conteudo: (
        <>
          <label className="pergunta">Selecione uma rotina para realizar um teste:</label>
          <select
            className="input-texto"
            value={rotinaSelecionada}
            onChange={(e) => setRotinaSelecionada(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="rotina1">Rotina 1 (Exemplo)</option>
            <option value="rotina2">Rotina 2 (Exemplo)</option>
            {/* Aqui você pode adicionar mais opções de rotinas fixas para este teste */}
          </select>
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      ),
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
      titulo: 'Gás Natural',
      conteudo: (
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
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      ),
    },
    {
      titulo: 'Viagens',
      conteudo: (
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

          <label className="pergunta">Qual (o quais) veículo(s) você utilizou para viajar?</label>
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
          {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
        </>
      ),
    },
    {
      titulo: 'Resultados',
      conteudo: (
        <>
          <p className="pergunta">Clique em calcular para ver os resultados do seu teste!</p>

        </>
      ),
    },
  ];


  const etapasFiltradas = etapas.filter((_, index) => {
    const usaGasEncanadoSimulado = true;
    if (!usaGasEncanadoSimulado && index === 1) return false;
    if (!usaGasEncanadoSimulado && index === 2) return false;
    return true;
  });

  const etapaAtualFiltrada = Math.min(etapaAtual, etapasFiltradas.length - 1);

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
        <div className="botoes-navegacao">
          {etapaAtual > 0 && (
            <button className="botao secundario" onClick={voltarEtapa}>
              Voltar
            </button>
          )}
          {etapaAtual < etapasFiltradas.length - 1 && (
            <button className="botao primario" onClick={avancarEtapa}>
              Avançar
            </button>
          )}
          {etapaAtual === etapasFiltradas.length - 1 && (
            <button className="botao primario" onClick={() => {

              console.log('Dados para cálculo:', {
                rotinaSelecionada,
                kwhContaLuz,
                m3GasNatural,
                fezViagem,
                viagemInternacional,
                veiculosViagem,
                kmPorVeiculoViagem
              });
              alert('Função de cálculo será implementada aqui.');
              // Após o cálculo, você pode redirecionar para uma página de resultados ou atualizar o estado para exibir os resultados.
            }}>
              Calcular
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