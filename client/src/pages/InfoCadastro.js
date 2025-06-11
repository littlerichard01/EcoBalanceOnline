import React, { useEffect, useState, useRef } from 'react';
import './Login.css';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import folhaEsquerda from '../assets/folha-esquerda.png'; // Importe a folha da esquerda
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PencilFill } from 'react-bootstrap-icons';
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
        sucessoAvatar: 'Avatar atualizado com sucesso!',
        selecioneAvatar: 'Selecione um Avatar',
        paginaInicial: 'Página inicial',
        testes: 'Testes',
        informacoesUsuario: 'Informações de Usuário',
        suasRotinas: 'Suas Rotinas',
        graficosConquistas: 'Gráficos e Conquistas',
        sair: 'Sair',
        alterarInformacoes: 'Alterar Informações',
        nome: 'Nome:',
        email: 'E-mail:',
        receberNotificacoes: 'Receber notificações:',
        ativado: 'Ativado',
        desativado: 'Desativado',
        novoNome: 'Novo nome',
        novoEmail: 'Novo e-mail',
        novaSenha: 'Nova Senha:',
        senhaAntiga: 'Senha Antiga:',
        desejoReceberNotificacoesEmail: 'Desejo receber notificações por e-mail',
        cancelar: 'Cancelar',
        salvar: 'Salvar',
        rodape: '© 2025 EcoBalance — Todos os direitos reservados',
        tema: 'Tema:',
        altoContraste: 'Alto Contraste:',
        idioma: 'Idioma',
        informacoesAtualizadasSucesso: 'Informações atualizadas com sucesso.',
        senhaAntigaIncorreta: 'Senha atual incorreta. Tente novamente.',
        erroAtualizarInformacoes: 'Erro ao atualizar as informações.',
        emailInvalido: 'E-mail inválido. Por favor, insira um e-mail válido.',
        senhaInvalida: 'A senha deve ter pelo menos 6 caracteres, com uma letra, um número e um caractere especial.',
        nenhumaAlteracaoFeita: 'Nenhuma alteração foi feita.',
        digiteSenhaAtualParaAlterarSenha: 'Digite sua senha atual para alterar a senha.',
    },
    en: {
        sucessoAvatar: 'Avatar updated successfully!',
        selecioneAvatar: 'Select an avatar',
        paginaInicial: 'Homepage',
        testes: 'Tests',
        informacoesUsuario: 'User Information',
        suasRotinas: 'Your Routines',
        graficosConquistas: 'Charts and Achievements',
        sair: 'Logout',
        alterarInformacoes: 'Change Information',
        nome: 'Name:',
        email: 'Email:',
        receberNotificacoes: 'Receive notifications:',
        ativado: 'Enabled',
        desativado: 'Disabled',
        novoNome: 'New name',
        novoEmail: 'New email',
        novaSenha: 'New Password:',
        senhaAntiga: 'Old Password:',
        desejoReceberNotificacoesEmail: 'I want to receive email notifications',
        cancelar: 'Cancel',
        salvar: 'Save',
        rodape: '© 2025 EcoBalance — All rights reserved',
        tema: 'Theme:',
        altoContraste: 'High Contrast:',
        idioma: 'Language',
        informacoesAtualizadasSucesso: 'Information updated successfully.',
        senhaAntigaIncorreta: 'Current password is incorrect. Please try again.',
        erroAtualizarInformacoes: 'Error updating the information.',
        emailInvalido: 'Invalid email. Please enter a valid email address.',
        senhaInvalida: 'The password must be at least 6 characters long and include a letter, a number, and a special character.',
        nenhumaAlteracaoFeita: 'No changes were made.',
        digiteSenhaAtualParaAlterarSenha: 'Enter your current password to change the password.',
    },
};

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

    // Estados para as funcionalidades de tema e idioma
    const [idiomaSelecionado, setIdiomaSelecionado] = useState(() => {
        return localStorage.getItem('language') || 'pt'; // Usa o valor salvo ou define 'pt' como padrão
    });
    const [mostrarDropdownIdioma, setMostrarDropdownIdioma] = useState(false);
    const [temaEscuro, setTemaEscuro] = useState(false);
    const [altoContrasteAtivo, setAltoContrasteAtivo] = useState(false);

    const [avatarSelecionado, setAvatarSelecionado] = useState(1);
    const [mostrarModalAvatar, setMostrarModalAvatar] = useState(false);

    const handleSelecionarAvatar = async (index) => {
        setAvatarSelecionado(index);

        try {
            const usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado"));

            const usuarioAtualizado = {
                avatarSelecionado: usuarioAtual.avatarSelecionado !== index ? index : usuarioAtual.avatarSelecionado,
            };

            console.log(avatarSelecionado);
            console.log(usuarioAtualizado);
            console.log(usuarioAtual);


                const response = await axios.put(`https://ecobalance-backend.onrender.com/api/usuarios/${usuarioAtual._id}`,
                usuarioAtualizado
            );

            if (response.status === 200) {
                // Atualiza localStorage
                localStorage.setItem("usuarioLogado", JSON.stringify({
                    ...usuarioAtual,
                    avatarSelecionado: usuarioAtualizado.avatarSelecionado
                }
                ))
            }

            toast.success(textos[idiomaSelecionado]?.sucessoAvatar);
            setMostrarModalAvatar(false);
        } catch (error) {
            toast.error("Erro ao atualizar avatar.");
        }
    };

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

    // Validação de senha (mínimo 6 caracteres, ao menos uma letra e um número e um caractere especial)
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
            toast.warning(textos[idiomaSelecionado]?.digiteSenhaAtualParaAlterarSenha || "Digite sua senha atual para alterar a senha.");
            return;
        }

        // Prepara o objeto de atualização
        const usuarioAtualizado = {
            nome: novoNome !== "" ? novoNome : usuarioAtual.nome,
            email: novoEmail !== "" ? novoEmail : usuarioAtual.email,
            receberLembretes,
        };

        // Adiciona senha e senhaAntiga se o usuário quiser atualizar a senha
        if (novaSenha) {
            usuarioAtualizado.senha = novaSenha;
            usuarioAtualizado.senhaAntiga = senhaAntiga;
        }

        // Verifica se os campos estão vazios
        if (!novoNome && !novoEmail && !novaSenha && !senhaAntiga && receberLembretes === usuario.receberLembretes) {
            toast.warning(textos[idiomaSelecionado]?.nenhumaAlteracaoFeita || "Nenhuma alteração foi feita.");
            return;
        }

        if (novoEmail && !validarEmail(novoEmail)) {
            setMensagemErroEmail(textos[idiomaSelecionado]?.emailInvalido || "E-mail inválido. Por favor, insira um e-mail válido.");
            return;
        } else {
            setMensagemErroEmail('');
        }

        if (novaSenha && !validarSenha(novaSenha)) {
            setMensagemErroSenha(textos[idiomaSelecionado]?.senhaInvalida || "A senha deve ter pelo menos 6 caracteres, com uma letra, um número e um caractere especial.");
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

                toast.success(textos[idiomaSelecionado]?.informacoesAtualizadasSucesso || "Informações atualizadas com sucesso.");
            }
        } catch (error) {
            if (error.response && error.response.data?.error === "Senha antiga incorreta") {
                toast.error(textos[idiomaSelecionado]?.senhaAntigaIncorreta || "Senha atual incorreta. Tente novamente.");
            } else {
                toast.error(textos[idiomaSelecionado]?.erroAtualizarInformacoes || "Erro ao atualizar as informações.");
            }
            console.error(error);
        }
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

    useEffect(() => {
        // Verifica se o usuário está logado
        const usuario = localStorage.getItem("usuarioLogado");
        if (!usuario) {
            navigate("/login");
            return; // evita continuar o código se não estiver logado
        }
    }, [navigate]);

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
    }, [navigate]);

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
                    <div className="login-box" >
                        <div className="login-section-alterar-informacoes">
                            <div className="info-parte-1">
                                <h2 className="login-title">{textos[idiomaSelecionado]?.informacoesUsuario}</h2>
                                <img src={`/avatars/avatar${usuario.avatarSelecionado}.png`} alt="Avatar do usuário" className="icone-avatar-info-usuario"/>
                                <PencilFill
                                    className="icone-editar"
                                    size={20}
                                    color={temaEscuro ? '#d4d4d4' : altoContrasteAtivo ? '#fff' : 'black'}
                                    onClick={() => setMostrarModalAvatar(true)}
                                />
                            </div>
                            <div className="info-parte-2">
                                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{textos[idiomaSelecionado]?.nome}</p>
                                <div className="form-group-cadastro">{usuario?.nome}</div>
                                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{textos[idiomaSelecionado]?.email}</p>
                                <div className="form-group-cadastro">{usuario?.email}</div>
                                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{textos[idiomaSelecionado]?.receberNotificacoes}</p>
                                <div className="form-group-cadastro">
                                    {receberLembretes ? textos[idiomaSelecionado]?.ativado : textos[idiomaSelecionado]?.desativado}
                                </div>
                                <button className="btn-alterar-informacoes" onClick={() => setMostrarModal(true)}>
                                    {textos[idiomaSelecionado]?.alterarInformacoes}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {mostrarModal && (
                    <div className="custom-modal-overlay">
                        <div className="custom-modal-content">
                            <h2 className="modal-title">{textos[idiomaSelecionado]?.alterarInformacoes}</h2>

                            <div className="modal-form-group">
                                <label>{textos[idiomaSelecionado]?.nome}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={novoNome}
                                    onChange={(e) => setNovoNome(e.target.value)}
                                    placeholder={textos[idiomaSelecionado]?.novoNome}
                                />
                            </div>

                            <div className="modal-form-group">
                                <label>{textos[idiomaSelecionado]?.email}</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={novoEmail}
                                    onChange={(e) => {
                                        setNovoEmail(e.target.value);
                                        setMensagemErroEmail('');
                                    }}
                                    placeholder={textos[idiomaSelecionado]?.novoEmail}
                                />
                                {mensagemErroEmail && <small className="feedback-error">{mensagemErroEmail}</small>}
                            </div>

                            <div className="modal-form-group">
                                <label>{textos[idiomaSelecionado]?.novaSenha}</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={novaSenha}
                                    onChange={(e) => {
                                        setNovaSenha(e.target.value);
                                        setMensagemErroSenha('');
                                    }}
                                    placeholder={textos[idiomaSelecionado]?.novaSenha}
                                />
                                {mensagemErroSenha && <small className="feedback-error">{mensagemErroSenha}</small>}
                            </div>

                            {novaSenha && (
                                <div className="modal-form-group">
                                    <label>{textos[idiomaSelecionado]?.senhaAntiga}</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={senhaAntiga}
                                        onChange={(e) => setSenhaAntiga(e.target.value)}
                                        placeholder={textos[idiomaSelecionado]?.senhaAntigaPlaceholder || "Digite sua senha atual"}
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
                                    {textos[idiomaSelecionado]?.desejoReceberNotificacoesEmail}
                                </label>
                            </div>

                            <div className="modal-buttons">
                                <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>
                                    {textos[idiomaSelecionado]?.cancelar}
                                </button>
                                <button className="btn btn-success" onClick={handleSalvarAlteracoes}>
                                    {textos[idiomaSelecionado]?.salvar}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Modal de seleção de avatar */}
                {mostrarModalAvatar && (
                    <div className="custom-modal-overlay">
                        <div className="custom-modal-content">
                            <h2 className="modal-title">{textos[idiomaSelecionado]?.selecioneAvatar}</h2><br></br>
                            <div className="avatar-grid">
                                {[...Array(9)].map((_, index) => {
                                    const avatarIndex = index + 1;
                                    return (
                                        <img
                                            key={avatarIndex}
                                            src={(`avatars/avatar${avatarIndex}.png`)}
                                            alt={`Avatar ${avatarIndex}`}
                                            style={{ width: "30%", objectFit: "cover", borderRadius: "50%" }}
                                            className={`avatar-option ${avatarSelecionado === avatarIndex ? 'selected' : ''}`}
                                            onClick={() => handleSelecionarAvatar(avatarIndex)}
                                        />
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                )}
            </main>

            <footer className="footer">
                <p>{textos[idiomaSelecionado]?.rodape}</p>
            </footer>
        </div>
    );
};

export default InfoCadastro;