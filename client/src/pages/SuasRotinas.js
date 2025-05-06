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
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    const navigate = useNavigate();
    const [rotinas, setRotinas] = useState([]);

    const [mostrarModalFrequencia, setMostrarModalFrequencia] = useState(false);
    const [frequenciaSelecionada, setFrequenciaSelecionada] = useState('');

    const handleLogout = () => {
        localStorage.removeItem("usuarioLogado"); // Remove o usuário
        navigate("/login"); // Redireciona para a página de login
    };

    const handleInicioClick = () => {
        navigate('/home');
    };
    const handleUsuarioAcesso = () => {
        navigate('/info-cadastro')
    }

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
        // Verifica se o usuário está logado
        const usuario = localStorage.getItem("usuarioLogado");
        if (!usuario) {
            navigate("/login");
            return; // evita continuar o código se não estiver logado
        }

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

    useEffect(() => {
        const buscarFrequencia = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/usuariosBuscar/${usuario._id}`);
                const data = await response.json();
                if (response.ok && data.frequencia) {
                    setFrequenciaSelecionada(data.frequencia);
                }
            } catch (err) {
                console.error("Erro ao buscar frequência:", err);
            }
        };

        if (mostrarModalFrequencia) {
            buscarFrequencia();
        }
    }, [mostrarModalFrequencia, usuario._id]);

    return (
        <div className="pagina-login">
            <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

            <header className="header">
                <div className="header-top">
                    <img src={logo} alt="Logo" className="logo" />
                    <div className="header-right">
                        <BsBellFill className="icone-sino" onClick={() => setMostrarModalFrequencia(true)} style={{ cursor: 'pointer' }} />
                        <div className="avatar-container">
                            <img src={avatar} alt="Avatar do usuário" className="icone-avatar" onClick={handleUsuarioAcesso} />
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
                        <p className="user-name">{usuario?.nome}</p>
                    </div>
                    <div className="menu-option" onClick={() => navigate('/info-cadastro')}>
                        Informações de cadastro
                    </div>
                    <div className="menu-option active" onClick={() => navigate('/suas-rotinas')} >
                        Suas rotinas
                    </div>
                    <div className="menu-option" onClick={() => navigate('/graficos-conquistas')}>
                        Gráficos e Conquistas
                    </div>
                    <div className="menu-option" onClick={handleLogout}>Sair</div>
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
                    {mostrarModalFrequencia && (
                        <div className="custom-modal-overlay">
                            <div className="custom-modal-content">
                                <h2 className="modal-title">Frequência dos Testes</h2>

                                <div className="modal-form-group">
                                    <label>Escolha com que frequência deseja realizar seus testes:</label>
                                    <select
                                        className="form-control"
                                        value={frequenciaSelecionada}
                                        onChange={(e) => setFrequenciaSelecionada(e.target.value)}
                                    >
                                        <option value="">Selecione uma opção</option>
                                        <option value="mensalmente">Mensalmente</option>
                                        <option value="semestralmente">Semestralmente</option>
                                        <option value="anualmente">Anualmente</option>
                                    </select>
                                </div>

                                <div className="modal-buttons">
                                    <button className="btn btn-secondary" onClick={() => setMostrarModalFrequencia(false)}>Cancelar</button>
                                    <button
                                        className="btn btn-success"
                                        onClick={async () => {
                                            if (frequenciaSelecionada) {
                                                try {
                                                    const response = await fetch(`http://localhost:3001/api/usuarios/${usuario._id}/frequencia`, {
                                                        method: 'PUT',
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({ frequencia: frequenciaSelecionada })
                                                    });

                                                    const data = await response.json();

                                                    if (response.ok) {
                                                        alert(`Frequência salva: ${data.frequencia}`);
                                                        localStorage.setItem("frequenciaTestes", data.frequencia);
                                                        setMostrarModalFrequencia(false);
                                                    } else {
                                                        alert(data.error || "Erro ao salvar frequência");
                                                    }
                                                } catch (err) {
                                                    console.error(err);
                                                    alert("Erro de rede");
                                                }
                                            } else {
                                                alert("Por favor, selecione uma frequência.");
                                            }
                                        }}
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            <footer className="footer">
                <p>© 2025 EcoBalance — Todos os direitos reservados</p>
            </footer>
        </div>
    );
};

export default SuasRotinas;
