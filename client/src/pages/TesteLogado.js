import React, { useEffect, useState, useRef } from 'react';
import './Login.css'; // Importando o CSS existente
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bandeiraBrasil from '../assets/bandeira-brasil.png';
import bandeiraReinoUnido from '../assets/bandeira-reinounido.png';

const TesteLogado = () => {
    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    const dropdownRef = useRef(null);
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
    const [temaEscuro, setTemaEscuro] = useState(false);
    const [altoContrasteAtivo, setAltoContrasteAtivo] = useState(false);
    const [idiomaSelecionado, setIdiomaSelecionado] = useState('pt');
    const [mostrarDropdownIdioma, setMostrarDropdownIdioma] = useState(false);

    const toggleDropdown = () => {
        setMostrarDropdown(!mostrarDropdown);
    };

    const handleInicioClick = () => {
        navigate('/home');
    };
    const handleTestes = () => {
        navigate('/teste-logado');
    };
    const handleUsuarioAcesso = () => {
        navigate('/info-cadastro');
    };
    const handleRotinas = () => {
        navigate('/suas-rotinas');
    };
    const handleGráficosEConquistas = () => {
        navigate('/graficos-conquistas');
    };
    const handleLogout = () => {
        localStorage.removeItem("usuarioLogado");
        navigate("/login");
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
        setMostrarDropdownIdioma(false);
    };

    const toggleTema = () => {
        setTemaEscuro(!temaEscuro);
    };

    const toggleAltoContraste = () => {
        setAltoContrasteAtivo(!altoContrasteAtivo);
    };

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
                    toast.error("Erro ao carregar rotinas.");
                }
            } catch (error) {
                console.error('Erro ao conectar com o servidor:', error);
                toast.error("Erro ao conectar com o servidor.");
            }
        };

        carregarRotinas();
    }, [navigate]);

    useEffect(() => {
        if (fezViagem === 'nao') {
            setVeiculosViagem({});
            setKmPorVeiculoViagem({});
            setViagemInternacional(null);
        }
    }, [fezViagem]);

    useEffect(() => {
        if (rotinaSelecionada) {
            setEtapaAtual(0);
            setMensagemErroTeste('');
            setKwhContaLuz(0);
            setM3GasNatural(0);
            setFezViagem(null);
            setViagemInternacional(null);
            setVeiculosViagem({});
            setKmPorVeiculoViagem({});
        }
    }, [rotinaSelecionada]);

    const avancarEtapa = () => {
        setMensagemErroTeste(''); // Limpa mensagens de erro

        if (etapaAtual === 0) {
            if (!rotinaSelecionada) {
                setMensagemErroTeste('Por favor, selecione uma rotina.');
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
            const rotinaSelecionadaData = rotinasCadastradas.find(r => r._id === rotinaSelecionada);
            if (rotinaSelecionadaData?.tipoGas === 'encanado') {
                if (isNaN(Number(m3GasNatural)) || Number(m3GasNatural) <= 0) {
                    setMensagemErroTeste('Por favor, digite um valor válido para o m³ da conta de gás natural.');
                    return;
                }
            }
        }

        if (etapaAtual === 3) {
            if (fezViagem === null) {
                setMensagemErroTeste('Por favor, selecione se você fez alguma viagem no último mês.');
                return;
            }

            if (fezViagem === 'nao') {
                setEtapaAtual((prev) => prev + 1); // Avança normalmente
                return;
            }

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

    const handleCadastroRotina = () => navigate('/rotinas');

    const toggleVeiculoViagem = (veiculo) => {
        setVeiculosViagem((prev) => {
            const novoEstado = { ...prev, [veiculo]: !prev[veiculo] };

            // Se o veículo foi desmarcado, remove o campo de km correspondente
            if (!novoEstado[veiculo]) {
                setKmPorVeiculoViagem((prevKm) => {
                    const novoKm = { ...prevKm };
                    delete novoKm[veiculo];
                    return novoKm;
                });
            }

            return novoEstado;
        });
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
        if (rotinaSelecionadaData?.tipoGas !== 'encanado' && index === 2) return false; // Ignora etapa de gás natural se não usa gás encanado
        return true;
    });

    // Garante que o índice da etapa atual esteja dentro dos limites das etapas filtradas
    const etapaAtualFiltrada = Math.min(etapaAtual, etapasFiltradas.length - 1);

    const handleFinalizarTeste = async () => {
        try {
            const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
            const rotinaData = rotinasCadastradas.find(r => r._id === rotinaSelecionada);

            if (!usuarioLogado || !rotinaData) {
                toast.error("Erro ao recuperar usuário ou rotina.");
                return;
            }

            // Fatores fixos de emissão
            const fatorKwh = 0.0385;
            const fatorGas = 1.974;
            const fatoresVeiculo = {
                'Metrô': 0.0035,
                'Trem': 0.0019,
                'Ônibus': 0.0160,
                'Carro': 0.1268,
                'Moto': 0.0711,
                'Carro elétrico': 0.0891,
                'Barco/cruzeiro': 0.250,
                'Avião': viagemInternacional === 'sim' ? 0.1542 : 0.10974,
            };

            // Cálculo de energia elétrica
            const emissaoEnergia = Number(kwhContaLuz) * fatorKwh;

            // Cálculo de gás (apenas se for encanado)
            const emissaoGas = rotinaData?.tipoGas === 'encanado' ? Number(m3GasNatural) * fatorGas : 0;


            // Cálculo de viagem
            const veiculosArray = Object.entries(veiculosViagem)
                .filter(([tipo, selecionado]) => selecionado)
                .map(([tipo]) => {
                    const km = Number(kmPorVeiculoViagem[tipo]);
                    const emissao = km * fatoresVeiculo[tipo];
                    return { tipo, km, emissao };
                });

            // Cálculo de emissão total incluindo dados da rotina
            const emissaoTotal = emissaoEnergia + emissaoGas + veiculosArray.reduce((soma, v) => soma + v.emissao, 0) +
                (rotinaData.emissoes?.alimentos || 0) +
                (rotinaData.emissoes?.gas || 0) +
                (rotinaData.emissoes?.veiculos || 0);

            const testeData = {
                usuario: usuarioLogado._id,
                rotina: rotinaSelecionada,
                energiaEletrica: {
                    kwh: Number(kwhContaLuz),
                    emissao: emissaoEnergia
                },
                gasNatural: {
                    m3: rotinaSelecionada?.tipoGas === 'encanado' ? Number(m3GasNatural) : 0,
                    emissao: emissaoGas
                },
                viagem: {
                    fezViagem: fezViagem === 'sim',
                    internacional: fezViagem === 'sim' ? viagemInternacional === 'sim' : false,
                    veiculos: veiculosArray
                },
                emissaoAlimentos: rotinaData.emissoes?.alimentos || 0,
                emissaoGas: rotinaData.emissoes?.gas || 0,
                emissaoVeiculos: rotinaData.emissoes?.veiculos || 0,
                emissaoTotal
            };
            const response = await fetch("http://localhost:3001/api/testes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(testeData),
            });

            if (response.ok) {
                toast.success("Teste salvo com sucesso!");
                setTimeout(() => {
                    navigate('/graficos-conquistas');
                }, 2000);
            } else {
                toast.error("Erro ao salvar o teste.");
            }
        } catch (error) {
            console.error("Erro ao salvar teste:", error);
            toast.error("Erro de conexão com o servidor.");
        }
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

    useEffect(() => {
        function handleClickOutsideIdioma(event) {
            if (mostrarDropdownIdioma && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMostrarDropdownIdioma(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutsideIdioma);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideIdioma);
        };
    }, [mostrarDropdownIdioma, dropdownRef]);

    return (
        <div className={`rotinas-container ${temaEscuro ? 'dark-mode' : ''} ${altoContrasteAtivo ? 'high-contrast' : ''}`}>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

            <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
            <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />
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
                            <span>{idiomaSelecionado === 'pt' ? 'Português' : 'Inglês'}</span>
                            <i className="bi bi-chevron-down" style={{ marginLeft: '5px', fontSize: '0.8em' }}></i>
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
                                        <span>Inglês</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="tema-contraste-controles">
                        <div className="tema-controle">
                            <span>Tema:</span>
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
                            <span>Alto Contraste:</span>
                        </div>
                    </div>
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
                        <button className="botao primario" onClick={handleFinalizarTeste}>Calcular</button>
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