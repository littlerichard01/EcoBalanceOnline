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
        SelecioneTresPontinhos: 'Selecione...',
        TituloGas: 'Gás de Cozinha',
        PerguntaMetrosCubicos: 'Digite o valor em metros cúbicos (m³) da sua última conta de gás natural corrigido:',
        ExemploMetrosCubicos: 'Ex: 25',
        RespostaSim: 'Sim',
        RespostaNao: 'Não',
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
        Onibus: 'Ônibus',
        Metro: 'Metrô',
        Trem: 'Trem',
        Carro: 'Carro',
        CarroEletrico: 'Carro elétrico',
        Moto: 'Moto',
        Aviao: 'Avião',
        BarcoCruzeiro: 'Barco/Cruzeiro',
        ErroOpcao: 'Por favor, selecione uma opção.',
        ErroValorGas: 'Por favor, digite um valor válido para o m³ da conta de gás natural.',
        ErroQuilometrosEletrico: 'Por favor, digite quantos quilômetros você percorre durante um mês com seu veículo elétrico.',
        ErroValorKWh: 'Por favor, digite um valor válido para o KWh da conta de luz.',
        ErroSelecioneViagem: 'Por favor, selecione se você fez alguma viagem no último mês.',
        ErroTipoViagem: 'Por favor, selecione o tipo de viagem.',
        ErroUmViagem: 'Por favor, selecione pelo menos um veículo utilizado na viagem.',
        ErroDistancia: 'Por favor, digite a distância percorrida para o veículo: ',
        ErroDeConexão: 'Erro de conexão com o servidor.',
        ErroSalvarTeste: 'Erro ao salvar teste: ',
        ErroSalvar: 'Erro ao salvar teste.',
        TesteSalvo: 'Teste salvo com sucesso!',
        ErroUsuario: 'Erro ao recuperar usuário ou rotina.',
        CadastrarRotina: 'Cadastrar Rotina',
        AindaNaoTemRotinas: 'Você ainda não possui rotinas cadastradas. Deseja cadastrar agora?',
        SelecioneRotina: 'Selecione uma rotina para realizar um teste:',
        TituloRotinas: 'Selecione sua rotina',
        ErroRotina: 'Por favor, selecione uma rotina.',
        ErroConectarServidor: 'Erro ao conectar com o servidor:',
        ErroConectar: 'Erro ao conectar com o servidor.',
        ErroCarregarRotinas: 'Erro ao carregar rotinas.',
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
        SelecioneTresPontinhos: 'Select...',
        TituloGas: 'Cooking Gas',
        PerguntaMetrosCubicos: 'Enter the amount in cubic meters (m³) from your last corrected piped gas bill:',
        ExemploMetrosCubicos: 'E.g.: 25',
        RespostaSim: 'Yes',
        RespostaNao: 'No',
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
        Onibus: 'Bus',
        Metro: 'Subway',
        Trem: 'Train',
        Carro: 'Car',
        CarroEletrico: 'Electric car',
        Moto: 'Motorcycle',
        Aviao: 'Airplane',
        BarcoCruzeiro: 'Boat/Cruise',
        ErroOpcao: 'Please select an option.',
        ErroValorGas: 'Please enter a valid value for the cubic meters (m³) on your gas bill.',
        ErroValorKWh: 'Please enter a valid value for the KWh on your electricity bill.',
        ErroSelecioneViagem: 'Please select whether you took any trips last month.',
        ErroTipoViagem: 'Please select the type of trip.',
        ErroUmViagem: 'Please select at least one vehicle used during the trip.',
        ErroDistancia: 'Please enter the distance traveled for the selected vehicle:',
        ErroDeConexão: 'Connection error with the server.',
        ErroSalvarTeste: 'Error saving test:',
        ErroSalvar: 'Error saving test.',
        TesteSalvo: 'Test saved successfully!',
        ErroUsuario: 'Error retrieving user or routine.',
        CadastrarRotina: 'Register Routine',
        AindaNaoTemRotinas: 'You don’t have any routines registered yet. Would you like to register one now?',
        SelecioneRotina: 'Select a routine to take a test:',
        TituloRotinas: 'Select your routine',
        ErroRotina: 'Please select a routine.',
        ErroConectarServidor: 'Error connecting to the server:',
        ErroConectar: 'Error connecting to the server.',
        ErroCarregarRotinas: 'Error loading routines.',
    },
};

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
    const [idiomaSelecionado, setIdiomaSelecionado] = useState(() => {
        return localStorage.getItem('language') || 'pt'; // Usa o valor salvo ou define 'pt' como padrão
    });
    const [mostrarDropdownIdioma, setMostrarDropdownIdioma] = useState(false);

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



    useEffect((idiomaSelecionado) => {
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
                    console.error(textos[idiomaSelecionado]?.ErroCarregarRotinas);
                    toast.error(textos[idiomaSelecionado]?.ErroCarregarRotinas);
                }
            } catch (error) {
                console.error(textos[idiomaSelecionado]?.ErroConectarServidor, error);
                toast.error(textos[idiomaSelecionado]?.ErroConectar);
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
                setMensagemErroTeste(textos[idiomaSelecionado]?.ErroRotina);
                return;
            }
        }

        if (etapaAtual === 1) {
            if (isNaN(Number(kwhContaLuz)) || Number(kwhContaLuz) <= 0) {
                setMensagemErroTeste(textos[idiomaSelecionado]?.ErroValorKWh);
                return;
            }
        }

        if (etapaAtual === 2) {
            const rotinaSelecionadaData = rotinasCadastradas.find(r => r._id === rotinaSelecionada);
            if (rotinaSelecionadaData?.tipoGas === 'encanado') {
                if (isNaN(Number(m3GasNatural)) || Number(m3GasNatural) <= 0) {
                    setMensagemErroTeste(textos[idiomaSelecionado]?.ErroValorGas);
                    return;
                }
            }
        }

        if (etapaAtual === 3) {
            if (fezViagem === null) {
                setMensagemErroTeste(textos[idiomaSelecionado]?.ErroSelecioneViagem);
                return;
            }

            if (fezViagem === 'nao') {
                setEtapaAtual((prev) => prev + 1); // Avança normalmente
                return;
            }

            if (viagemInternacional === null) {
                setMensagemErroTeste(textos[idiomaSelecionado]?.ErroTipoViagem);
                return;
            }

            if (Object.keys(veiculosViagem).length === 0) {
                setMensagemErroTeste(textos[idiomaSelecionado]?.ErroUmViagem);
                return;
            }

            for (const veiculo in veiculosViagem) {
                if (veiculosViagem[veiculo] && (isNaN(Number(kmPorVeiculoViagem[veiculo])) || Number(kmPorVeiculoViagem[veiculo]) <= 0)) {
                    setMensagemErroTeste(`${textos[idiomaSelecionado]?.ErroDistancia} ${veiculo}.`);
                    return;
                }
            }
        }

        if (etapaAtual === 4) {
            if (viagemInternacional === null) {
                setMensagemErroTeste(textos[idiomaSelecionado]?.ErroTipoViagem);
                return;
            }
            if (Object.keys(veiculosViagem).length === 0) {
                setMensagemErroTeste(textos[idiomaSelecionado]?.ErroUmViagem);
                return;
            }
            for (const veiculo in veiculosViagem) {
                if (veiculosViagem[veiculo] && (isNaN(Number(kmPorVeiculoViagem[veiculo])) || Number(kmPorVeiculoViagem[veiculo]) <= 0)) {
                    setMensagemErroTeste(`${textos[idiomaSelecionado]?.ErroDistancia} ${veiculo}.`);
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
            titulo: textos[idiomaSelecionado]?.TituloRotinas,
            conteudo: (
                <>
                    <label className="pergunta">{textos[idiomaSelecionado]?.SelecioneRotina}</label>
                    {rotinasCadastradas.length > 0 ? (
                        <select
                            className="input-texto"
                            value={rotinaSelecionada}
                            onChange={(e) => setRotinaSelecionada(e.target.value)}
                        >
                            <option value="">{textos[idiomaSelecionado]?.SelecioneTresPontinhos}</option>
                            {rotinasCadastradas.map((rotina) => (
                                <option key={rotina._id} value={rotina._id}>{rotina.nome}</option>
                            ))}
                        </select>
                    ) : (
                        <>
                            <p>{textos[idiomaSelecionado]?.AindaNaoTemRotinas}</p>
                            <button className="botao primario" onClick={handleCadastroRotina}>
                                {textos[idiomaSelecionado]?.CadastrarRotina}
                            </button>
                        </>
                    )}
                    {mensagemErroTeste && <small className="feedback-error">{mensagemErroTeste}</small>}
                </>
            ),
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
            titulo: textos[idiomaSelecionado]?.TituloGas,
            conteudo: (
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
            titulo: textos[idiomaSelecionado]?.TituloResultados,
            conteudo: (
                <>
                    <p className="pergunta">{textos[idiomaSelecionado]?.CliqueEmCalcular}</p>
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
                toast.error(textos[idiomaSelecionado]?.ErroUsuario);
                return;
            }

            // Fatores fixos de emissão
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
            const emissaoEnergia = (Number(kwhContaLuz) * fatorKwh) / (rotinaData?.quantidadePessoas ? rotinaData.quantidadePessoas : 1);

            // Cálculo de gás (apenas se for encanado)
            const emissaoGas = rotinaData?.tipoGas === 'encanado' ? (Number(m3GasNatural) * fatorGas) / (rotinaData?.quantidadePessoas ? rotinaData.quantidadePessoas : 1) : 0;


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
                toast.success(textos[idiomaSelecionado]?.TesteSalvo);
                setTimeout(() => {
                    navigate('/graficos-conquistas');
                }, 2000);
            } else {
                toast.error(textos[idiomaSelecionado]?.ErroSalvar);
            }
        } catch (error) {
            console.error(textos[idiomaSelecionado]?.ErroSalvarTeste, error);
            toast.error(textos[idiomaSelecionado]?.ErroDeConexão);
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
                            src={avatar}
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
                            {textos[idiomaSelecionado]?.BotaoVoltar}
                        </button>
                    )}
                    {etapaAtual < etapasFiltradas.length - 1 && (
                        <button className="botao primario" onClick={avancarEtapa}>
                            {textos[idiomaSelecionado]?.BotaoAvancar}
                        </button>
                    )}
                    {etapaAtual === etapasFiltradas.length - 1 && (
                        <button className="botao primario" onClick={handleFinalizarTeste}>{textos[idiomaSelecionado]?.TituloCalcular}</button>
                    )}
                </div>
            </main>

            <footer className="footer">
                <p>{textos[idiomaSelecionado]?.rodape}</p>
            </footer>
        </div>
    );
};

export default TesteLogado;