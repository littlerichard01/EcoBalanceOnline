import React, { useEffect, useState, useRef } from 'react';
import './Login.css'; // Importando o CSS existente
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bandeiraBrasil from '../assets/bandeira-brasil.png';
import bandeiraReinoUnido from '../assets/bandeira-reinounido.png';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { FaFacebook, FaLinkedin, FaThreads, FaXTwitter } from "react-icons/fa6"; // FaXTwitter para o antigo Twitter (X)
import folhaDireitaContrast from '../assets/folha-direitacontrast.png';
import folhaDireitaDark from '../assets/folha-direitadark.png';
import folhaEsquerdaContrast from '../assets/folha-esquerdacontrast.png';
import folhaEsquerdaDark from '../assets/folha-esquerdadark.png';

const textos = {
    pt: {
        ConquistaObtida: 'Conquista obtida!',
        MensagemConvite: "Acesse o Eco Balance e calcule sua pegada de carbono também!",
        MensagemCompartilhar: "Minha pegada de carbono foi de",
        meusGraficos: 'Meus Gráficos',
        MensagemTotalAcima: "Sua pegada de carbono total está acima da média global:",
        MensagemTotalAbaixo: "Parabéns! Sua pegada de carbono está abaixo da média global:",
        AcimaDe: 'acima da média global de ',
        AbaixoDe: 'abaixo da média global de ',
        MensagemAcima: "Sua emissão nesta categoria está acima da média global:",
        MensagemAbaixo: "Ótima notícia! Sua emissão está abaixo da média global:",
        TituloMediaGlobal: 'Média global de emissões:',
        TituloAlimentos: 'Alimentos',
        TitulosVeiculos: 'Veículos',
        TextoConclusao1: 'Total de emissões: ',
        TextoConclusao2: 'Gostaria de compartilhar sua pegada de carbono?',
        TextoConclusao3: 'Média total de emissões: ',
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
        TituloGas: 'Gás',
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
        ConquistaObtida: 'Achievement obtained!',
        MensagemConvite: "Visit Eco Balance and calculate your carbon footprint too!",
        MensagemCompartilhar: "My carbon footprint was",
        meusGraficos: 'My Charts',
        MensagemTotalAcima: "Your total carbon footprint is above the global average:",
        MensagemTotalAbaixo: "Congratulations! Your carbon footprint is below the global average:",
        AcimaDe: 'above the global average of ',
        AbaixoDe: 'below the global average of ',
        MensagemAcima: "Your emission in this category is above the global average:",
        MensagemAbaixo: "Great news! Your emission is below the global average:",
        TituloMediaGlobal: 'Global average emissions:',
        TituloAlimentos: 'Food',
        TitulosVeiculos: 'Vehicles',
        TextoConclusao1: 'Total emissions: ',
        TextoConclusao3: 'Average total emissions:',
        TextoConclusao2: 'Would you like to share your carbon footprint?',
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
        TituloGas: 'Gas',
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
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

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

    const [dadosGrafico, setDadosGrafico] = useState([]);
    const [total, setTotal] = useState();

    const toggleIdiomaDropdown = () => {
        setMostrarDropdownIdioma(!mostrarDropdownIdioma);
    };

    const handleIdiomaSelecionado = async (idioma) => {
        setIdiomaSelecionado(idioma);
        localStorage.setItem('language', idioma);
        setMostrarDropdownIdioma(false);

        if (usuario._id) {
            try {
                const response = await fetch(`http://localhost:3001/api/usuarios/${usuario._id}`, {
                // const response = await fetch(`https://ecobalance-backend.onrender.com/api/usuarios/${usuario._id}`, {
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
                // const response = await fetch(`https://ecobalance-backend.onrender.com/api/rotinas/usuario/${usuarioLogado._id}`);
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
        {
            titulo: textos[idiomaSelecionado]?.TituloResultados,
            conteudo: (
                <>

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

    const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

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
                // const response = await fetch("https://ecobalance-backend.onrender.com/api/testes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(testeData),
            });

            let conquistasObtidas = [];

            // 1. Verificar "primeiro_teste"
            const resTestes = await fetch(`http://localhost:3001/api/testes/usuario/${usuarioLogado._id}`);
            // const resTestes = await fetch(`https://ecobalance-backend.onrender.com/api/testes/usuario/${usuarioLogado._id}`);
            const testesUsuario = await resTestes.json();

            if (testesUsuario.length >= 1) {
                conquistasObtidas.push("primeiro_teste");
            }

            // 2. Verificar "reducao_individual"
            if (testesUsuario.length >= 2) {
                const penultimoTeste = testesUsuario[testesUsuario.length - (testesUsuario.length - 1)];
                console.log(emissaoTotal)
                console.log(penultimoTeste.emissaoTotal)
                if (penultimoTeste.emissaoTotal > emissaoTotal) {
                    conquistasObtidas.push("reducao_individual");
                }
            }

            // 3. Verificar "abaixo_media_mensal"
            const mediaGlobalMensal = 243.19; // Em quilos de CO₂ equivalente por mês
            if (emissaoTotal < mediaGlobalMensal) {
                conquistasObtidas.push("abaixo_media_mensal");
            }

            // 4. 2 testes consecutivos
            const penultimoTeste = testesUsuario[testesUsuario.length - (testesUsuario.length - 1)];
            const antePenultimoTeste = testesUsuario[testesUsuario.length - (testesUsuario.length - 2)];
            if (testesUsuario.length >= 3) {
                console.log(emissaoTotal)
                console.log(penultimoTeste.emissaoTotal)
                if (antePenultimoTeste.emissaoTotal > penultimoTeste.emissaoTotal && penultimoTeste.emissaoTotal > emissaoTotal) {
                    conquistasObtidas.push("reducao_individual_2");
                }
            }

            // 5. Verificar "abaixo_media_mensal" II
            if (testesUsuario.length >= 2 && emissaoTotal < mediaGlobalMensal && penultimoTeste.emissaoTotal < mediaGlobalMensal) {
                conquistasObtidas.push("abaixo_media_mensal_2");
            }

            console.log(conquistasObtidas)
            console.log(usuarioLogado)

            // Se houver conquistas, atualizar no backend
            if (conquistasObtidas.length > 0) {
                await fetch(`http://localhost:3001/api/usuarios/${usuarioLogado._id}/conquistas`, {
                    // await fetch(`https://ecobalance-backend.onrender.com/api/usuarios/${usuarioLogado._id}/conquistas`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ conquistas: conquistasObtidas }),
                });

                // Atualizar localStorage se necessário
                if (!usuarioLogado.conquistas) usuarioLogado.conquistas = [];

                conquistasObtidas.forEach(nome => {
                    const conquistaExistente = usuarioLogado.conquistas.find(c => c.nome === nome);
                    if (conquistaExistente && !conquistaExistente.ativa) {
                        conquistaExistente.ativa = true;
                        conquistaExistente.data = new Date().toISOString();
                        toast.success(textos[idiomaSelecionado]?.ConquistaObtida);
                    }
                });

                console.log(usuarioLogado)
                console.log("CHEGOU AQUI")
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            }

            if (response.ok) {
                toast.success(textos[idiomaSelecionado]?.TesteSalvo);
                const dadosGraficoAtualizado = [
                    { categoria: textos[idiomaSelecionado]?.TituloGas, valor: testeData.gasNatural?.emissao > 0 ? testeData.gasNatural.emissao : testeData.emissaoGas },
                    { categoria: textos[idiomaSelecionado]?.TituloEnergiaEletrica, valor: testeData.energiaEletrica.emissao },
                    { categoria: textos[idiomaSelecionado]?.TituloAlimentos, valor: testeData.emissaoAlimentos },
                ];

                if (testeData?.emissaoVeiculos > 0) {
                    dadosGraficoAtualizado.push({
                        categoria: textos[idiomaSelecionado]?.TitulosVeiculos,
                        valor: testeData.emissaoVeiculos
                    });
                }

                // Se o usuário **realmente fez uma viagem**, adiciona ao gráfico
                if (testeData.viagem.fezViagem) {
                    dadosGraficoAtualizado.push({
                        categoria: textos[idiomaSelecionado]?.TituloViagens,
                        valor: testeData.viagem.veiculos.reduce((acc, v) => acc + v.emissao, 0)
                    });
                }

                setDadosGrafico(dadosGraficoAtualizado);
                setTotal(emissaoTotal)
                setEtapaAtual((prev) => prev + 1);
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
        const totalUsuario = total;
        const totalMediaGlobal = 243.19; // Valor médio global fornecido

        return totalUsuario > totalMediaGlobal
            ? `${textos[idiomaSelecionado]?.MensagemTotalAcima} ${totalUsuario.toFixed(2)} kgCO2, ${textos[idiomaSelecionado]?.AcimaDe} ${totalMediaGlobal.toFixed(2)} kgCO2.`
            : `${textos[idiomaSelecionado]?.MensagemTotalAbaixo} ${totalUsuario.toFixed(2)} kgCO2, ${textos[idiomaSelecionado]?.AbaixoDe} ${totalMediaGlobal.toFixed(2)} kgCO2.`;
    };

    const compartilharEmissao = (rede) => {
        const mensagem = `${textos[idiomaSelecionado]?.MensagemCompartilhar} ${total.toFixed(2)} kgCO2! 🌱💚\n\n${textos[idiomaSelecionado]?.MensagemConvite} eco-balance-online.vercel.app`;

        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=https://eco-balance-online.vercel.app`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=https://eco-balance-online.vercel.app`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(mensagem)}`,
            threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(mensagem)}`,
        };

        window.open(urls[rede], '_blank');
    };

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
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dadosGrafico}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="categoria" />
                                <YAxis label={{ value: 'kgCO2', angle: -90, position: 'insideLeft' }} />
                                <Tooltip content={renderTooltipContent} />
                                <Bar dataKey="valor" fill="#8884d8">
                                    {dadosGrafico.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>

                        <div className="texto-recomendacao">
                            <p className="pergunta">
                                {textos[idiomaSelecionado]?.TextoConclusao1} {total.toFixed(2)} kgCO2.
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

                        {total < 243.19 && (
                            <div className="texto-recomendacao">
                                <p className="pergunta">{textos[idiomaSelecionado]?.TextoConclusao2}</p>
                                <div className="compartilhar-redes">
                                    <button className="btn-rede facebook" onClick={() => compartilharEmissao('facebook')}>
                                        <FaFacebook />
                                    </button>
                                    <button className="btn-rede linkedin" onClick={() => compartilharEmissao('linkedin')}>
                                        <FaLinkedin />
                                    </button>
                                    <button className="btn-rede threads" onClick={() => compartilharEmissao('threads')}>
                                        <FaThreads />
                                    </button>
                                    <button className="btn-rede twitter" onClick={() => compartilharEmissao('twitter')}>
                                        <FaXTwitter />
                                    </button>
                                </div>
                            </div>
                        )}


                    </div>

                )}

                <div className="botoes-navegacao">
                    {etapaAtual > 0 && etapaAtual < etapasFiltradas.length - 2 && (
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
                        <button className="botao primario" onClick={handleFinalizarTeste}>{textos[idiomaSelecionado]?.TituloCalcular}</button>
                    )}
                    {etapaAtual === etapasFiltradas.length - 1 && (
                        <button className="botao primario" onClick={handleGráficosEConquistas}>{textos[idiomaSelecionado]?.meusGraficos}</button>
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