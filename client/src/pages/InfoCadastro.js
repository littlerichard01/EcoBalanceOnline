import React, { useEffect, useState } from 'react';
import './Login.css';
import { BsBellFill, BsPersonFill } from 'react-icons/bs';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import folhaEsquerda from '../assets/folha-esquerda.png'; // Importe a folha da esquerda
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {PencilFill } from 'react-bootstrap-icons';

const InfoCadastro = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    const [mostrarModal, setMostrarModal] = useState(false);
    const [novoNome, setNovoNome] = useState('');
    const [novoEmail, setNovoEmail] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [senhaAntiga, setSenhaAntiga] = useState('');

    const [mensagemErroEmail, setMensagemErroEmail] = useState('');
    const [mensagemErroSenha, setMensagemErroSenha] = useState('');

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
            alert("Digite sua senha atual para alterar a senha.");
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
            alert("Nenhuma alteração foi feita.");
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

                alert("Informações atualizadas com sucesso.");
                window.location.reload();
            }
        } catch (error) {
            if (error.response && error.response.data?.error === "Senha antiga incorreta") {
                alert("Senha atual incorreta. Tente novamente.");
            } else {
                alert("Erro ao atualizar as informações.");
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
                    <div className="login-box" >
                        <div className="login-section-alterar-informacoes">
                            <h2 className="login-title">Informações de Usuário</h2>
                            <img src={avatar} alt="Avatar do usuário" className="icone-avatar-info-usuario" />
                            <PencilFill
                                                    className="icone-editar"
                                                    size={20}
                                                    color="black"
                                                   // onClick={() => handle()}
                                                  />
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
            </main>

            <footer className="footer">
                <p>© 2025 EcoBalance — Todos os direitos reservados</p>
            </footer>
        </div>
    );
};

export default InfoCadastro;