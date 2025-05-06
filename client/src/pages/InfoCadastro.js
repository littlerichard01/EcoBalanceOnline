import React, { useEffect, useState } from 'react';
import './Login.css';
import { BsBellFill, BsPersonFill } from 'react-icons/bs';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import folhaSidebar from '../assets/folha-esquerda.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InfoCadastro = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    const [mostrarModal, setMostrarModal] = useState(false);
    const [novoNome, setNovoNome] = useState('');
    const [novoEmail, setNovoEmail] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [senhaAntiga, setSenhaAntiga] = useState('');

    const [mensagemErroEmail, setMensagemErroEmail] = useState('');
    const [mensagemErroSenha, setMensagemErroSenha] = useState('');

    const [mostrarModalFrequencia, setMostrarModalFrequencia] = useState(false);
    const [frequenciaSelecionada, setFrequenciaSelecionada] = useState('');

    const navigate = useNavigate();

    const handleInicioClick = () => {
        navigate('/home');
    };
    const handleUsuarioAcesso = () => {
        navigate('/info-cadastro')
    };

    const handleLogout = () => {
        localStorage.removeItem("usuarioLogado"); // Remove o usuário
        navigate("/login"); // Redireciona para a página de login
    };

    // Validação de e-mail
    const validarEmail = (email) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    };

    // Validação de senha (mínimo 6 caracteres, ao menos uma letra e um número)
    const validarSenha = (senha) => {
        if (senha.length < 6 || (!/[A-Za-z]/.test(senha)) || (!/\d/.test(senha)) || (!/[@$!%*#?&]/.test(senha))) return false;

        return true;
    };

    // Função para salvar as alterações
    const handleSalvarAlteracoes = async () => {
        const usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado"));

        if (!usuarioAtual) return;

        // Se o usuário quer trocar a senha mas não informou a antiga
        if (novaSenha && !senhaAntiga) {
            toast.warning("Digite sua senha atual para alterar a senha.");
            return;
        }

        // Prepara o objeto de atualização
        const usuarioAtualizado = {
            nome: novoNome !== "" ? novoNome : usuarioAtual.nome,
            email: novoEmail !== "" ? novoEmail : usuarioAtual.email,
        };

        // Adiciona senha e senhaAntiga se o usuário quiser atualizar a senha
        if (novaSenha) {
            usuarioAtualizado.senha = novaSenha;
            usuarioAtualizado.senhaAntiga = senhaAntiga;
        }

        // Verifica se os campos estão vazios
        if (!novoNome && !novoEmail && !novaSenha && !senhaAntiga) {
            toast.warning("Nenhuma alteração foi feita.");
            return;
        }

        if (novoEmail && !validarEmail(novoEmail)) {
            setMensagemErroEmail("E-mail inválido. Por favor, insira um e-mail válido.");
            return;
        } else {
            setMensagemErroEmail('');
        }

        if (novaSenha && !validarSenha(novaSenha)) {
            setMensagemErroSenha("A senha deve ter pelo menos 6 caracteres, com uma letra e um número.");
            return;
        } else {
            setMensagemErroSenha('');
        }

        try {
            const response = await axios.put(
                `http://localhost:3001/api/usuarios/${usuarioAtual._id}`,
                usuarioAtualizado
            );

            if (response.status === 200) {
                // Atualiza localStorage (não salva senha)
                localStorage.setItem("usuarioLogado", JSON.stringify({
                    ...usuarioAtual,
                    nome: usuarioAtualizado.nome,
                    email: usuarioAtualizado.email
                }));

                // Limpa campos e fecha modal
                setNovoNome('');
                setNovoEmail('');
                setNovaSenha('');
                setSenhaAntiga('');
                setMostrarModal(false);

                toast.success("Informações atualizadas com sucesso.");
                window.location.reload();
            }
        } catch (error) {
            if (error.response && error.response.data?.error === "Senha antiga incorreta") {
                toast.error("Senha atual incorreta. Tente novamente.");
            } else {
                toast.error("Erro ao atualizar as informações.");
            }
            console.error(error);
        }
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
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

            <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

            <header className="header">
                <div className="header-top">
                    <img src={logo} alt="Logo" className="logo" />
                    <div className="header-right">
                    <BsBellFill className="icone-sino" onClick={() => setMostrarModalFrequencia(true)} style={{ cursor: 'pointer' }} />                        <div className="avatar-container">
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
                    <div className="menu-option active" onClick={() => navigate('/info-cadastro')}>Informações de cadastro</div>
                    <div className="menu-option" onClick={() => navigate('/suas-rotinas')}>Suas rotinas</div>
                    <div className="menu-option" onClick={() => navigate('/graficos-conquistas')}>Gráficos e Conquistas</div>
                    <div className="menu-option" onClick={handleLogout}>Sair</div>
                    <img
                        src={folhaSidebar}
                        alt="Folha entre sidebar e main"
                        className="folha folha-sidebar"
                    />

                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <main
                    className="login-container"
                    style={{
                    }}
                >


                    <div className='subnav-bar'><p>Informações de Cadastro</p></div>
                    <div className="info-usuario">
                        <div className="login-box" >
                            <div className="login-section-alterar-informacoes">
                                <h2 className="login-title">Informações de Usuário</h2>
                                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Nome:</p>
                                <div className="form-group-cadastro">{usuario?.nome}</div>
                                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>E-mail:</p>
                                <div className="form-group-cadastro">{usuario?.email}</div>
                                <button className="btn-alterar-informacoes" onClick={() => setMostrarModal(true)}>
                                    Alterar Informações
                                </button>

                            </div>
                        </div>
                    </div>
                    {mostrarModal && (
                        <div className="custom-modal-overlay">
                            <div className="custom-modal-content">
                                <h2 className="modal-title">Alterar Informações</h2>

                                <div className="modal-form-group">
                                    <label>Nome:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={novoNome}
                                        onChange={(e) => setNovoNome(e.target.value)}
                                        placeholder="Novo nome"
                                    />
                                </div>

                                <div className="modal-form-group">
                                    <label>E-mail:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={novoEmail}
                                        onChange={(e) => {
                                            setNovoEmail(e.target.value);
                                            setMensagemErroEmail('');
                                        }}
                                        placeholder="Novo e-mail"
                                    />
                                    {mensagemErroEmail && <small className="feedback-error">{mensagemErroEmail}</small>}
                                </div>

                                <div className="modal-form-group">
                                    <label>Nova Senha:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={novaSenha}
                                        onChange={(e) => {
                                            setNovaSenha(e.target.value);
                                            setMensagemErroSenha('');
                                        }}
                                        placeholder="Nova senha"
                                    />
                                    {mensagemErroSenha && <small className="feedback-error">{mensagemErroSenha}</small>}
                                </div>

                                {novaSenha && (
                                    <div className="modal-form-group">
                                        <label>Senha Antiga:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={senhaAntiga}
                                            onChange={(e) => setSenhaAntiga(e.target.value)}
                                            placeholder="Digite sua senha atual"
                                        />
                                    </div>
                                )}

                                <div className="modal-buttons">
                                    <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
                                    <button className="btn btn-success" onClick={handleSalvarAlteracoes}>Salvar</button>
                                </div>
                            </div>
                        </div>
                    )}

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

export default InfoCadastro;