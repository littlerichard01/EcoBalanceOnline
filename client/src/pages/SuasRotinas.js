import React, { useEffect, useState, useRef } from 'react';
import './Login.css';
import { BsPersonFill } from 'react-icons/bs';
import { TrashFill, Plus, PencilFill } from 'react-bootstrap-icons';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import folhaEsquerda from '../assets/folha-esquerda.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bandeiraBrasil from '../assets/bandeira-brasil.png';
import bandeiraReinoUnido from '../assets/bandeira-reinounido.png';

const SuasRotinas = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const [idiomaSelecionado, setIdiomaSelecionado] = useState('pt');
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
            await fetch(`http://localhost:3001/api/rotinas/${rotinaParaDeletar}`, {
                method: 'DELETE',
            });
            toast.success("Rotina deletada com sucesso!")
            setRotinas(rotinas.filter(rotina => rotina._id !== rotinaParaDeletar));
        } catch (error) {
            console.error("Erro ao deletar rotina:", error);
            toast.error("Erro ao deletar rotina.")
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
        console.log("Idioma selecionado:", idioma);
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
                const response = await fetch(`http://localhost:3001/api/rotinas/usuario/${usuario._id}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setRotinas(data);
                } else {
                    console.error("Resposta inesperada ao buscar rotinas:", data);
                    toast.warning("Resposta inesperada ao buscar rotina.")
                }
            } catch (err) {
                console.error("Erro ao buscar rotinas:", err);
                toast.error("Erro ao buscar rotina.")
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
        <div className={`pagina-login ${temaEscuro ? 'dark-mode' : ''} ${altoContrasteAtivo ? 'high-contrast' : ''}`}>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

            <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />
            <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />

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

            <main className="login-container">
                <div className="info-usuario">
                    <div className="login-box">
                        <div className="login-section-alterar-rotinas">
                            <h2 className="login-title-rotina">Suas Rotinas</h2>

                            <div className="container-rotinas">
                                <div className="rotina-circle add" onClick={handleCadastrarRotina}>
                                    <Plus size={40} />
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
                                                    <h2 className="modal-title">Deletar Rotina</h2>
                                                    <div className="modal-form-group">
                                                        <label>Deseja mesmo deletar a rotina {rotina.nome}</label>
                                                    </div>
                                                    <div className="modal-buttons">
                                                        <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
                                                        <button className="btn btn-danger" onClick={confirmarRemocaoRotina}>Sim</button>
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
                <p>© 2025 EcoBalance — Todos os direitos reservados</p>
            </footer>
        </div>
    );
};

export default SuasRotinas;