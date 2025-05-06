import React, { useEffect, useState } from 'react';
import './Login.css'; // Importando o CSS existente
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import { useNavigate } from 'react-router-dom';

const TesteLogado = () => {
  const navigate = useNavigate();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [mensagemErroTeste, setMensagemErroTeste] = useState('');
  const [rotinasCadastradas, setRotinasCadastradas] = useState([]);
  const [rotinaSelecionada, setRotinaSelecionada] = useState('');
  const [kwhContaLuz, setKwhContaLuz] = useState(0);
  const [m3GasNatural, setM3GasNatural] = useState(0);
  const [fezViagem, setFezViagem] = useState(null);
  const [viagemInternacional, setViagemInternacional] = useState(null);
  const [veiculosViagem, setVeiculosViagem] = useState({});
  const [kmPorVeiculoViagem, setKmPorVeiculoViagem] = useState({});

  useEffect(() => {
    // Verifica se o usuário está logado
    const usuario = localStorage.getItem("usuarioLogado");
    if (!usuario) {
      navigate("/login");
      return;
    }

    // Carrega as rotinas cadastradas do usuário
    const carregarRotinas = async () => {
      try {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        const response = await fetch(`http://localhost:3001/api/rotinas/usuario/${usuarioLogado._id}`);
        if (response.ok) {
          const data = await response.json();
          setRotinasCadastradas(data);
        } else {
          console.error('Erro ao carregar rotinas.');
          // Aqui você pode adicionar uma mensagem de erro para o usuário
        }
      } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
      }
    };

    carregarRotinas();
  }, [navigate]);

  const avancarEtapa = () => {
    setMensagemErroTeste(''); // Limpa mensagens de erro

    if (etapaAtual === 0) {
      if (!rotinaSelecionada) {
        setMensagemErroTeste('Por favor, selecione uma rotina.');
        return;
      }
      const rotina = rotinasCadastradas.find(r => r._id === rotinaSelecionada);
      if (rotina?.tipoGas !== 'encanado') {
        setEtapaAtual(3); // Pula para a etapa de viagens se não usa gás encanado
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
        setEtapaAtual(etapasFiltradas.length - 1); // Pula para a etapa final se não fez viagem
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

  const handleUsuarioAcesso = () => navigate('/info-cadastro');
  const handleCadastroRotina = () => navigate('/rotinas');

  const toggleVeiculoViagem = (veiculo) => {
    setVeiculosViagem((prev) => ({
      ...prev,
      [veiculo]: !prev[veiculo],
    }));
    setKmPorVeiculoViagem((prev) => ({
      ...prev,
      [veiculo]: prev[veiculo] || 0, // Inicializa com 0 se selecionado
    }));
  };

  const etapas = [
    {
      titulo: 'Selecione sua rotina',
      conteudo: (
        <>
          <label className="pergunta">Selecione uma rotina para realizar um teste:</label>
          {rotinasCadastradas.length > 0 ? (
            <select
              className="input-texto"
              value={rotinaSelecionada}
              onChange={(e) => setRotinaSelecionada(e.target.value)}
            >
              <option value="">Selecione...</option>
              {rotinasCadastradas.map((rotina) => (
                <option key={rotina._id} value={rotina._id}>{rotina.nome}</option>
              ))}
            </select>
          ) : (
            <>
              <p>Você ainda não possui rotinas cadastradas. Deseja cadastrar agora?</p>
              <button className="botao secundario" onClick={handleCadastroRotina}>
                Cadastrar Rotina
              </button>
            </>
          )}
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

  // Filtra as etapas com base nas condições (rotina selecionada e tipo de gás)
  const etapasFiltradas = etapas.filter((_, index) => {
    if (rotinasCadastradas.length === 0 && index > 0) return false; // Ignora etapas se não tem rotina
    const rotinaSelecionadaData = rotinasCadastradas.find(r => r._id === rotinaSelecionada);
    if (rotinaSelecionadaData?.tipoGas !== 'encanado' && index === 1) return false; // Ignora etapa de energia se não usa gás encanado
    if (rotinaSelecionadaData?.tipoGas !== 'encanado' && index === 2) return false; // Ignora etapa de gás natural se não usa gás encanado
    return true;
  });

  // Garante que o índice da etapa atual esteja dentro dos limites das etapas filtradas
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
            <span className="navlink">Página inicial</span>
            <span className="navlink">Testes</span>
          </div>
          <img src={avatar} alt="Avatar do usuário" className="icone-avatar" onClick={handleUsuarioAcesso} />
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
              // Aqui você chamaria a lógica de cálculo
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

export default TesteLogado;