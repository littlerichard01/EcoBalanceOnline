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

const GraficosEConquistas = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const navigate = useNavigate();

    const [mostrarDropdown, setMostrarDropdown] = useState(false);

    const dropdownRef = useRef(null);

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
        if (!usuario) {
            navigate("/login");
            return;
        }

        const buscarRotinas = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/testes/usuario/${usuario._id}`);
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
            dados.push({ categoria: 'Viagens', valor: emissaoViagens });
        }

        // Gás (natural ou botijão)
        const emissaoGas = teste.gasNatural?.emissao || teste.emissaoGas || 0;
        if (emissaoGas > 0) {
            dados.push({ categoria: 'Gás', valor: emissaoGas });
        }

        // Energia elétrica
        const emissaoEnergia = teste.energiaEletrica?.emissao || 0;
        if (emissaoEnergia > 0) {
            dados.push({ categoria: 'Energia', valor: emissaoEnergia });
        }

        // Alimentos
        const emissaoAlimentos = teste.emissaoAlimentos || 0;
        if (emissaoAlimentos > 0) {
            dados.push({ categoria: 'Alimentos', valor: emissaoAlimentos });
        }

        // Veículos (uso semanal)
        const emissaoVeiculos = teste.emissaoVeiculos || 0;
        if (emissaoVeiculos > 0) {
            dados.push({ categoria: 'Veículos', valor: emissaoVeiculos });
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
        <div className="pagina-login">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

            <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />
            <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" /> {/* Adicione a folha da esquerda */}

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

            <main className="login-container">
                <div className="info-usuario">
                    <div className="login-box">
                        <div className="login-section-GraficosEConquistas">
                            <h2 className="login-title-Graficos">Gráficos</h2>
                            <div className="scroll-container">
                                <button className="scroll-btn left" onClick={() => scrollContainer('graficos', 'left')}>&lt;</button>
                                <div className="container-grafico" id="graficos">
                                    {testes.length === 0 ? (
                                        <span style={{ padding: '20px' }}>Nenhum teste encontrado.</span>
                                    ) : (
                                        testes.map((teste, index) => (
                                            <div className="grafico-circle-wrapper" onClick={() => abrirModal(teste)} style={{ cursor: 'pointer' }}>
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
                            <h2 className="login-title-Graficos">Conquistas</h2>
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
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                <div className="modal-content" style={{ position: 'relative' }}>
                                    <button
                                        type="button"
                                        className="btn-close-custom"
                                        onClick={fecharModal}
                                        aria-label="Fechar"
                                    >
                                        &times;
                                    </button>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Detalhes do Gráfico do dia {new Date(graficoSelecionado.dataRealizacao).toLocaleDateString('pt-BR')}</h5>
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