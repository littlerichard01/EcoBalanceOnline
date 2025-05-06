import React, { useEffect, useState, useRef } from 'react';
import './Login.css';
import { BsBellFill, BsPersonFill } from 'react-icons/bs';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import folhaEsquerda from '../assets/folha-esquerda.png'; // Importe a folha da esquerda
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PencilFill } from 'react-bootstrap-icons';
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

  const [receberLembretes, setReceberLembretes] = useState(false);

    const [mostrarDropdown, setMostrarDropdown] = useState(false);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setMostrarDropdown(!mostrarDropdown);
    };

    const navigate = useNavigate();

    const handleInicioClick = () => {
        navigate('/home');
    };

    const handleTestes = () => {
        navigate('/teste-logado')
    }

    const handleUsuarioAcesso = () => {
        navigate('/info-cadastro')
    };

    const handleRotinas = () => {
        navigate('/suas-rotinas')
    }

    const handleGráficosEConquistas = () => {
        navigate('/graficos-conquistas')
    }

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
            receberLembretes
        };

        // Adiciona senha e senhaAntiga se o usuário quiser atualizar a senha
        if (novaSenha) {
            usuarioAtualizado.senha = novaSenha;
            usuarioAtualizado.senhaAntiga = senhaAntiga;
        }

        // Verifica se os campos estão vazios
        if (!novoNome && !novoEmail && !novaSenha && !senhaAntiga && receberLembretes === usuario.receberLembretes) {
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
            setMensagemErroSenha("A senha deve ter pelo menos 6 caracteres, com uma letra, um número e um caractere especial.");
            return;
        } else {
            setMensagemErroSenha('');
        }

        try {
            const response = await axios.put(
                `https://ecobalance-backend.onrender.com/api/usuarios/${usuarioAtual._id}`,
                usuarioAtualizado
            );

            if (response.status === 200) {
                // Atualiza localStorage (não salva senha)
                localStorage.setItem("usuarioLogado", JSON.stringify({
                    ...usuarioAtual,
                    nome: usuarioAtualizado.nome,
                    email: usuarioAtualizado.email,
                    receberLembretes: usuarioAtualizado.receberLembretes
                }));

                // Limpa campos e fecha modal
                setNovoNome('');
                setNovoEmail('');
                setNovaSenha('');
                setSenhaAntiga('');
                setMostrarModal(false);

                toast.success("Informações atualizadas com sucesso.");
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

    }, []);

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
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (!usuario) {
            navigate("/login");
            return;
        }
    
        // Atualiza o estado com base nas informações armazenadas
        setReceberLembretes(usuario.receberLembretes ?? false);
    }, []);    

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
                    <div className="login-box" >
                        <div className="login-section-alterar-informacoes">
                            <div className="info-parte-1">
                                <h2 className="login-title">Informações de Usuário</h2>
                                <img src={avatar} alt="Avatar do usuário" className="icone-avatar-info-usuario" />
                                <PencilFill
                                    className="icone-editar"
                                    size={20}
                                    color="black"
                                // onClick={() => handle()}
                                />
                            </div>
                            <div className="info-parte-2">
                                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Nome:</p>
                                <div className="form-group-cadastro">{usuario?.nome}</div>
                                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>E-mail:</p>
                                <div className="form-group-cadastro">{usuario?.email}</div>
                                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Receber notificações:</p>
<div className="form-group-cadastro">
  {receberLembretes ? "Ativado" : "Desativado"}
</div>
                                <button className="btn-alterar-informacoes" onClick={() => setMostrarModal(true)}>
                                    Alterar Informações
                                </button>
                            </div>
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

<div className="modal-form-group">
  <label>
    <input
      type="checkbox"
      checked={receberLembretes}
      onChange={(e) => setReceberLembretes(e.target.checked)}
    />{' '}
    Desejo receber notificações por e-mail
  </label>
</div>

                            <div className="modal-buttons">
                                <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
                                <button className="btn btn-success" onClick={handleSalvarAlteracoes}>Salvar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="footer">
                <p>© 2025 EcoBalance — Todos os direitos reservados</p>
            </footer>
        </div>
    );
};

export default InfoCadastro;