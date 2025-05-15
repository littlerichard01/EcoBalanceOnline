import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import { BsBellFill, BsPersonFill } from 'react-icons/bs';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import folhaEsquerda from '../assets/folha-esquerda.png'; // Importe a folha da esquerda
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import bandeiraBrasil from '../assets/bandeira-brasil.png';
import bandeiraReinoUnido from '../assets/bandeira-reinounido.png';

const textos = {
    pt: {
        paginaInicial: 'Página inicial',
        testes: 'Testes',
        informacoesUsuario: 'Informações de Usuário',
        suasRotinas: 'Suas Rotinas',
        graficosConquistas: 'Gráficos e Conquistas',
        sair: 'Sair',
        graficos: 'Gráficos',
        nenhumTesteEncontrado: 'Nenhum teste encontrado.',
        conquistas: 'Conquistas',
        detalhesGraficoDia: 'Detalhes do Gráfico do dia',
        fechar: 'Fechar',
        tema: 'Tema:',
        altoContraste: 'Alto Contraste:',
        idioma: 'Idioma',
    },
    en: {
        paginaInicial: 'Homepage',
        testes: 'Tests',
        informacoesUsuario: 'User Information',
        suasRotinas: 'Your Routines',
        graficosConquistas: 'Charts and Achievements',
        sair: 'Logout',
        graficos: 'Charts',
        nenhumTesteEncontrado: 'No tests found.',
        conquistas: 'Achievements',
        detalhesGraficoDia: 'Chart Details for',
        fechar: 'Close',
        tema: 'Theme:',
        altoContraste: 'High Contrast:',
        idioma: 'Language',
    },
};

const GraficosEConquistas = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const navigate = useNavigate();

    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Estados para as funcionalidades de tema e idioma
    const [idiomaSelecionado, setIdiomaSelecionado] = useState('pt');
    const [mostrarDropdownIdioma, setMostrarDropdownIdioma] = useState(false);
    const [temaEscuro, setTemaEscuro] = useState(false);
    const [altoContrasteAtivo, setAltoContrasteAtivo] = useState(false);

    const toggleDropdown = () => {
        setMostrarDropdown(!mostrarDropdown);
    };

    const handleInicioClick = () => {
        navigate('/home');
    };

    const handleTestes = () => {
        navigate('/teste-logado')
    }

    const handleLogout = () => {
        localStorage.removeItem("usuarioLogado");
        navigate("/login");
    };

    const handleUsuarioAcesso = () => {
        navigate('/info-cadastro')
    };

    const handleRotinas = () => {
        navigate('/suas-rotinas')
    }

    const handleGráficosEConquistas = () => {
        navigate('/graficos-conquistas')
    }

    const [testes, setTestes] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [graficoSelecionado, setGraficoSelecionado] = useState(null);

    const abrirModal = (teste) => {
        setGraficoSelecionado(teste);
        setShowModal(true);
    };

    const fecharModal = () => {
        setShowModal(false);
        setGraficoSelecionado(null);
    };

    const scrollContainer = (id, direction) => {
        const container = document.getElementById(id);
        const scrollAmount = 200;

        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
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
        if (!usuario) {
            navigate("/login");
            return;
        }

        const buscarRotinas = async () => {
            try {
                const response = await fetch(`https://ecobalance-backend.onrender.com/api/testes/usuario/${usuario._id}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setTestes(data);
                } else {
                    console.error("Resposta inesperada ao buscar testes:", data);
                    toast.warning("Resposta inesperada ao buscar testes.")
                }
            } catch (err) {
                console.error("Erro ao buscar testes:", err);
                toast.error("Erro ao buscar testes.")
            }
        };

        buscarRotinas();
    }, [usuario, navigate]);

    const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

    const getGraficoData = (teste) => {
        const dados = [];

        // Viagens
        const emissaoViagens = teste.viagem?.veiculos?.reduce((acc, v) => acc + (v.emissao || 0), 0);
        if (emissaoViagens > 0) {
            dados.push({ categoria: textos[idiomaSelecionado]?.viagens || 'Viagens', valor: emissaoViagens });
        }

        // Gás (natural ou botijão)
        const emissaoGas = teste.gasNatural?.emissao || teste.emissaoGas || 0;
        if (emissaoGas > 0) {
            dados.push({ categoria: textos[idiomaSelecionado]?.gas || 'Gás', valor: emissaoGas });
        }

        // Energia elétrica
        const emissaoEnergia = teste.energiaEletrica?.emissao || 0;
        if (emissaoEnergia > 0) {
            dados.push({ categoria: textos[idiomaSelecionado]?.energia || 'Energia', valor: emissaoEnergia });
        }

        // Alimentos
        const emissaoAlimentos = teste.emissaoAlimentos || 0;
        if (emissaoAlimentos > 0) {
            dados.push({ categoria: textos[idiomaSelecionado]?.alimentos || 'Alimentos', valor: emissaoAlimentos });
        }

        // Veículos (uso semanal)
        const emissaoVeiculos = teste.emissaoVeiculos || 0;
        if (emissaoVeiculos > 0) {
            dados.push({ categoria: textos[idiomaSelecionado]?.veiculos || 'Veículos', valor: emissaoVeiculos });
        }

        return dados;
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
            const { name, value } = payload[0];
            return (
                <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '8px' }}>
                    <strong>{`${name}: ${value.toFixed(2)} kgCO2`}</strong>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={`pagina-login ${temaEscuro ? 'dark-mode' : ''} ${altoContrasteAtivo ? 'high-contrast' : ''}`}>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

            <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />
            <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" /> {/* Adicione a folha da esquerda */}

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

            <main className="login-container">
                <div className="info-usuario">
                    <div className="login-box">
                        <div className="login-section-GraficosEConquistas">
                            <h2 className="login-title-Graficos">{textos[idiomaSelecionado]?.graficos}</h2>
                            <div className="scroll-container">
                                <button className="scroll-btn left" onClick={() => scrollContainer('graficos', 'left')}>&lt;</button>
                                <div className="container-grafico" id="graficos">
                                    {testes.length === 0 ? (
                                        <span style={{ padding: '20px' }}>{textos[idiomaSelecionado]?.nenhumTesteEncontrado}</span>
                                    ) : (
                                        testes.map((teste, index) => (
                                            <div className="grafico-circle-wrapper" onClick={() => abrirModal(teste)} style={{ cursor: 'pointer' }} key={index}>
                                                <div className="grafico-circle">
                                                    <PieChart width={80} height={80}>
                                                        <Pie
                                                            data={getGraficoData(teste)}
                                                            dataKey="valor"
                                                            nameKey="categoria"
                                                            cx="50%"
                                                            cy="50%"
                                                            outerRadius={40}
                                                            innerRadius={20}
                                                            paddingAngle={3}
                                                            isAnimationActive={false}
                                                        >
                                                            {getGraficoData(teste).map((entry, i) => (
                                                                <Cell key={`cell-${i}`} fill={cores[i % cores.length]} />
                                                            ))}
                                                        </Pie>
                                                    </PieChart>
                                                </div>
                                                <span className="grafico-label">
                                                    {new Date(teste.dataRealizacao).toLocaleDateString('pt-BR')}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <button className="scroll-btn right" onClick={() => scrollContainer('graficos', 'right')}>&gt;</button>
                            </div>
                            <h2 className="login-title-Graficos">{textos[idiomaSelecionado]?.conquistas}</h2>
                            <div className="scroll-container">
                                <button className="scroll-btn left" onClick={() => scrollContainer('conquistas', 'left')}>&lt;</button>
                                <div className="container-grafico" id="conquistas">
                                    <div className="grafico-circle">🏆</div>
                                    <div className="grafico-circle">🥇</div>
                                    <div className="grafico-circle">🎖️</div>
                                    <div className="grafico-circle">🏅</div>
                                </div>
                                <button className="scroll-btn right" onClick={() => scrollContainer('conquistas', 'right')}>&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && graficoSelecionado && (
                    <>
                        <div className="modal fade show"
                        style={{ display: 'block' }}
                            tabIndex="-1"
                            role="dialog"
                        >
                            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                <div className="modal-content" style={{ position: 'relative' }}>
                                    <button
                                        type="button"
                                        className="btn-close-custom"
                                        onClick={fecharModal}
                                        aria-label={textos[idiomaSelecionado]?.fechar}
                                    >
                                        &times;
                                    </button>
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            {textos[idiomaSelecionado]?.detalhesGraficoDia}{' '}
                                            {new Date(graficoSelecionado.dataRealizacao).toLocaleDateString('pt-BR')}
                                        </h5>
                                    </div>
                                    <div className="modal-body d-flex justify-content-center">
                                        <PieChart width={400} height={400}>
                                            <Pie
                                                data={getGraficoData(graficoSelecionado)}
                                                dataKey="valor"
                                                nameKey="categoria"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={120}
                                                fill="#8884d8"
                                                label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                                            >
                                                {getGraficoData(graficoSelecionado).map((entry, i) => (
                                                    <Cell key={`cell-${i}`} fill={cores[i % cores.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={renderTooltipContent} />
                                            <Legend />
                                        </PieChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-backdrop fade show" onClick={fecharModal}></div>
                    </>
                )}
            </main>

            <footer className="footer">
                <p>© 2025 EcoBalance — Todos os direitos reservados</p>
            </footer>
        </div>
    );
};

export default GraficosEConquistas;