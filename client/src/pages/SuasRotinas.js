import React, { useEffect, useState, useRef } from 'react';
import './Login.css';
import { TrashFill, Plus, PencilFill } from 'react-bootstrap-icons';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import folhaEsquerda from '../assets/folha-esquerda.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bandeiraBrasil from '../assets/bandeira-brasil.png';
import bandeiraReinoUnido from '../assets/bandeira-reinounido.png';
import folhaDireitaContrast from '../assets/folha-direitacontrast.png';
import folhaDireitaDark from '../assets/folha-direitadark.png';
import folhaEsquerdaContrast from '../assets/folha-esquerdacontrast.png';
import folhaEsquerdaDark from '../assets/folha-esquerdadark.png';

const textos = {
    pt: {
        paginaInicial: 'Página inicial',
        testes: 'Testes',
        informacoesUsuario: 'Informações de Usuário',
        suasRotinas: 'Suas Rotinas',
        graficosConquistas: 'Gráficos e Conquistas',
        sair: 'Sair',
        deletarRotina: 'Deletar Rotina',
        desejaDeletar: 'Deseja mesmo deletar a rotina',
        cancelar: 'Cancelar',
        sim: 'Sim',
        rodape: '© 2025 EcoBalance — Todos os direitos reservados',
        tema: 'Tema:',
        altoContraste: 'Alto Contraste:',
        idioma: 'Idioma',
        ErroDeletar: 'Erro ao deletar rotina.',
        DeletadaSucesso: 'Rotina deletada com sucesso!',
        ErroBuscarRotinas: 'Erro ao buscar rotina.',
        RespostaInesperada: 'Resposta inesperada ao buscar rotina.',
    },
    en: {
        paginaInicial: 'Homepage',
        testes: 'Tests',
        informacoesUsuario: 'User Information',
        suasRotinas: 'Your Routines',
        graficosConquistas: 'Charts and Achievements',
        sair: 'Logout',
        deletarRotina: 'Delete Routine',
        desejaDeletar: 'Do you really want to delete the routine',
        cancelar: 'Cancel',
        sim: 'Yes',
        rodape: '© 2025 EcoBalance — All rights reserved',
        tema: 'Theme:',
        altoContraste: 'High Contrast:',
        idioma: 'Language',
        ErroDeletar: 'Error deleting routine.',
        DeletadaSucesso: 'Routine deleted successfully!',
        ErroBuscarRotinas: 'Error fetching routine.',
        RespostaInesperada: 'Unexpected response when fetching routine.',
    },
};

const SuasRotinas = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Estados para as funcionalidades de tema e idioma
    const [idiomaSelecionado, setIdiomaSelecionado] = useState(() => {
        return localStorage.getItem('language') || 'pt'; // Usa o valor salvo ou define 'pt' como padrão
    });
    const [mostrarDropdownIdioma, setMostrarDropdownIdioma] = useState(false);
    const [temaEscuro, setTemaEscuro] = useState(false);
    const [altoContrasteAtivo, setAltoContrasteAtivo] = useState(false);

    const toggleDropdown = () => {
        setMostrarDropdown(!mostrarDropdown);
    };

    const navigate = useNavigate();
    const [rotinas, setRotinas] = useState([]);
    const [rotinaParaDeletar, setRotinaParaDeletar] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("usuarioLogado");
        navigate("/login");
    };

    const handleInicioClick = () => {
        navigate('/home');
    };

    const handleUsuarioAcesso = () => {
        navigate('/info-cadastro');
    };

    const handleCadastrarRotina = () => {
        navigate('/rotinas');
    };
    const handleTestes = () => {
        navigate('/teste-logado')
    }

    const handleRotinas = () => {
        navigate('/suas-rotinas')
    }

    const handleGráficosEConquistas = () => {
        navigate('/graficos-conquistas')
    }

    const confirmarRemocaoRotina = async () => {
        if (!rotinaParaDeletar) return;
        try {
                await fetch(`https://ecobalance-backend.onrender.com/api/rotinas/${rotinaParaDeletar}`, {
                method: 'DELETE',
            });
            toast.success(textos[idiomaSelecionado]?.DeletadaSucesso)
            setRotinas(rotinas.filter(rotina => rotina._id !== rotinaParaDeletar));
        } catch (error) {
            console.error("Erro ao deletar rotina:", error);
            toast.error(textos[idiomaSelecionado]?.ErroDeletar)
        } finally {
            setMostrarModal(false);
            setRotinaParaDeletar(null);
        }
    };

    const mostrarModalDeletar = (idRotina) => {
        setRotinaParaDeletar(idRotina);
        setMostrarModal(true);
    };

    const handleEditarRotina = (rotina) => {
        navigate('/rotinas', { state: { rotina } });
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
    }, []);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            setIdiomaSelecionado(storedLanguage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('language', idiomaSelecionado);
    }, [idiomaSelecionado]);

    useEffect(() => {
        localStorage.setItem('theme', temaEscuro ? 'dark' : 'light');
        document.body.classList.toggle('dark-mode', temaEscuro);
    }, [temaEscuro]);

    useEffect(() => {
        localStorage.setItem('highContrast', altoContrasteAtivo);
        document.body.classList.toggle('high-contrast', altoContrasteAtivo);
    }, [altoContrasteAtivo]);

    const toggleIdiomaDropdown = () => {
        setMostrarDropdownIdioma(!mostrarDropdownIdioma);
    };

    const handleIdiomaSelecionado = async (idioma) => {
        setIdiomaSelecionado(idioma);
        localStorage.setItem('language', idioma);
        setMostrarDropdownIdioma(false);

        if (usuario._id) {
            try {
                const response = await fetch(`https://ecobalance-backend.onrender.com/api/usuarios/${usuario._id}`, {
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

    useEffect((idiomaSelecionado) => {
        if (!usuario) {
            navigate("/login");
            return;
        }

        const buscarRotinas = async () => {
            try {
                const response = await fetch(`https://ecobalance-backend.onrender.com/api/rotinas/usuario/${usuario._id}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setRotinas(data);
                } else {
                    console.error("Resposta inesperada ao buscar rotinas:", data);
                    toast.warning(textos[idiomaSelecionado]?.RespostaInesperada)
                }
            } catch (err) {
                console.error("Erro ao buscar rotinas:", err);
                toast.error(textos[idiomaSelecionado]?.ErroBuscarRotinas)
            }
        };

        buscarRotinas();
    }, [usuario, navigate]);

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
        <div className={`pagina-login ${temaEscuro ? 'dark-mode' : ''} ${altoContrasteAtivo ? 'high-contrast' : ''}`}>
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

            <main className="login-container">
                <div className="info-usuario">
                    <div className="login-box">
                        <div className="login-section-alterar-rotinas">
                            <h2 className="login-title-rotina">{textos[idiomaSelecionado]?.suasRotinas}</h2>

                            <div className="container-rotinas">
                                <div className="rotina-circle add" onClick={handleCadastrarRotina}>
                                    <Plus className='plus' size={40} />
                                </div>
                                {rotinas.map((rotina, index) => (
                                    <div className="rotina-circle-wrapper" key={index}>
                                        <div className="rotina-circle">
                                            {rotina.nome || `Rotina ${index + 1}`}
                                        </div>
                                        <div className="icones-rotina-abaixo">
                                            {rotinas.length > 1 && (
                                                <TrashFill
                                                    className="icone-lixeira"
                                                    size={20}
                                                    onClick={() => mostrarModalDeletar(rotina._id)}
                                                />
                                            )}
                                            <PencilFill
                                                className="icone-editar"
                                                size={20}
                                                onClick={() => handleEditarRotina(rotina)}
                                            />
                                        </div>
                                        {mostrarModal && rotinaParaDeletar === rotina._id && (
                                            <div className="custom-modal-overlay">
                                                <div className="custom-modal-content">
                                                    <h2 className="modal-title">{textos[idiomaSelecionado]?.deletarRotina}</h2>
                                                    <div className="modal-form-group">
                                                        <label>{textos[idiomaSelecionado]?.desejaDeletar} {rotina.nome}</label>
                                                    </div>
                                                    <div className="modal-buttons">
                                                        <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>{textos[idiomaSelecionado]?.cancelar}</button>
                                                        <button className="btn btn-danger" onClick={confirmarRemocaoRotina}>{textos[idiomaSelecionado]?.sim}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <p>{textos[idiomaSelecionado]?.rodape}</p>
            </footer>
        </div>
    );
};

export default SuasRotinas;