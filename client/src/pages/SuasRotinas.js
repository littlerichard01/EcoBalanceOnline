import React, { useEffect, useState } from 'react';
import './Login.css';
import { BsBellFill, BsPersonFill } from 'react-icons/bs';
import { TrashFill, Plus } from 'react-bootstrap-icons';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import folhaSidebar from '../assets/folha-esquerda.png';
import { useNavigate } from 'react-router-dom';

const SuasRotinas = () => {
    const navigate = useNavigate();
    const [rotinas, setRotinas] = useState([]);

    const handleInicioClick = () => {
        navigate('/');
    };

    const adicionarRotina = () => {
        const novaRotina = `Rotina ${rotinas.length + 1}`;
        setRotinas([novaRotina, ...rotinas]);
    };

    const removerRotina = (index) => {
        const novasRotinas = [...rotinas];
        novasRotinas.splice(index, 1);
        setRotinas(novasRotinas);
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
                    <div className="menu-option active"  onClick={() => navigate('/suas-rotinas')} >
                            Suas rotinas
                        </div>
                    <div className="menu-option" onClick={() => navigate('/graficos-conquistas')}>
                        Gráficos e conquistas
                    </div>
                    <img src={folhaSidebar} alt="Folha entre sidebar e main" className="folha folha-sidebar" />
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <main className="login-container">
                    <div className='subnav-bar'><p>Rotinas</p></div>

                    <div className="info-usuario">
                        <div className="login-box">
                            <div className="login-section-alterar-rotinas">
                                <h2 className="login-title-rotina">Suas Rotinas</h2>


                                {/* CÍRCULOS DE ROTINAS */}
                                <div className="container-rotinas">
                                    <div className="rotina-circle add" onClick={adicionarRotina}>
                                        <Plus size={40} />
                                    </div>
                                    {rotinas.map((rotina, index) => (
                                        <div className="rotina-circle-wrapper" key={index}>
                                            <div className="rotina-circle">
                                                {rotina}
                                            </div>
                                            <TrashFill
                                                className="icone-lixeira"
                                                size={24}
                                                onClick={() => removerRotina(index)}
                                            />
                                        </div>
                                    ))}
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

export default SuasRotinas;
