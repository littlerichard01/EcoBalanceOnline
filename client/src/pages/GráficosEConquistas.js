import React, { useEffect } from 'react';
import './Login.css';
import { BsBellFill, BsPersonFill } from 'react-icons/bs';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import folhaEsquerda from '../assets/folha-esquerda.png'; // Importe a folha da esquerda
import { useNavigate } from 'react-router-dom';

const GraficosEConquistas = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const navigate = useNavigate();

    const handleInicioClick = () => {
        navigate('/home');
    };
    const handleUsuarioAcesso = () => {
        navigate('/info-cadastro');
    };

    const handleLogout = () => {
        localStorage.removeItem("usuarioLogado");
        navigate("/login");
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
        const usuario = localStorage.getItem("usuarioLogado");
        if (!usuario) {
            navigate("/login");
            return;
        }
    }, []);

    return (
        <div className="pagina-login">
            <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />
            <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" /> {/* Adicione a folha da esquerda */}

            <header className="header">
                <div className="header-top">
                    <img src={logo} alt="Logo" className="logo" />
                </div>

                <div className="header-right">
                    <div className="header-links">
                        <span className="navlink" onClick={handleInicioClick}>Página inicial</span>
                        <span className="navlink">Testes</span>
                    </div>
                    <img src={avatar} alt="Avatar do usuário" className="icone-avatar" onClick={handleUsuarioAcesso} />
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
                                    <div className="grafico-circle-wrapper">
                                        <div className="grafico-circle">📊</div>
                                        <span className="grafico-label">17/04/2025</span>
                                    </div>
                                    <div className="grafico-circle-wrapper">
                                        <div className="grafico-circle">📊</div>
                                        <span className="grafico-label">19/04/2025</span>
                                    </div>
                                    <div className="grafico-circle-wrapper">
                                        <div className="grafico-circle">📊</div>
                                        <span className="grafico-label">20/04/2025</span>
                                    </div>
                                    <div className="grafico-circle-wrapper">
                                        <div className="grafico-circle">📊</div>
                                        <span className="grafico-label">22/04/2025</span>
                                    </div>
                                    <div className="grafico-circle-wrapper">
                                        <div className="grafico-circle">📊</div>
                                        <span className="grafico-label">23/04/2025</span>
                                    </div>
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
            </main>

            <footer className="footer">
                <p>© 2025 EcoBalance — Todos os direitos reservados</p>
            </footer>
        </div>
    );
};

export default GraficosEConquistas;