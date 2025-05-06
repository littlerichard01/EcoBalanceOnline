import React, { useEffect, useState } from 'react';
import './Login.css';
import { BsBellFill, BsPersonFill } from 'react-icons/bs';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import folhaSidebar from '../assets/folha-esquerda.png';
import { useNavigate } from 'react-router-dom';

const GraficosEConquistas = () => {
    const navigate = useNavigate();
    const [rotinas, setRotinas] = useState([]);

    const handleInicioClick = () => {
        navigate('/');
    };

    const adicionarRotina = () => {
        const novaRotina = `Rotina ${rotinas.length + 1}`;
        setRotinas([novaRotina, ...rotinas]);
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
        const updateNavbarPosition = () => {
            const navBar = document.querySelector('.nav-bar');
            const headerHeight = document.querySelector('.header').offsetHeight;

            if (window.scrollY > headerHeight) {
                navBar.classList.add('fixed-nav');
                navBar.style.top = '0';
            } else {
                navBar.classList.remove('fixed-nav');
                navBar.style.top = `${headerHeight}px`;
            }
        };

        updateNavbarPosition();
        window.addEventListener('scroll', updateNavbarPosition);
        return () => window.removeEventListener('scroll', updateNavbarPosition);
    }, []);

    return (
        <div className="pagina-login">
            <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

            <header className="header">
                <div className="header-top">
                    <img src={logo} alt="Logo" className="logo" />
                    <div className="header-right">
                        <BsBellFill className="icone-sino" />
                        <div className="avatar-container">
                            <img src={avatar} alt="Avatar do usuário" className="icone-avatar" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="nav-bar">
                <div className="nav-metade-esquerda">
                    <span className="nav-link" onClick={handleInicioClick}>Início</span>
                </div>
                <div className="nav-metade-direita">
                    <span className="nav-link">Testes</span>
                </div>
            </div>

            <div style={{ display: 'flex' }}>
                {/* SIDEBAR */}
                <div className="sidebar">
                    <div className="profile-section">
                        <BsPersonFill className="profile-icon" />
                        <p className="user-name">Nome</p>
                    </div>
                    <div className="menu-option" onClick={() => navigate('/info-cadastro')}>
                        Informações de cadastro
                    </div>

                    <div className="menu-option" onClick={() => navigate('/suas-rotinas')}>
                        Suas rotinas
                    </div>

                    <div className="menu-option active"  onClick={() => navigate('/graficos-conquistas')}>
                        Gráficos e Conquistas
                        </div>

                    <img src={folhaSidebar} alt="Folha entre sidebar e main" className="folha folha-sidebar" />
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <main className="login-container">
                    <div className='subnav-bar'><p>Gráficos E Conquistas</p></div>

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
            </div>

            <footer className="footer">
                <p>© 2025 EcoBalance — Todos os direitos reservados</p>
            </footer>
        </div>
    );
};

export default GraficosEConquistas;
