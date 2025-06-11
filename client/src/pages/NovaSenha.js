import React, { useState, useEffect } from 'react';
import './Login.css';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { BsFillLockFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import bandeiraBrasil from '../assets/bandeira-brasil.png';
import bandeiraReinoUnido from '../assets/bandeira-reinounido.png';
import folhaDireitaContrast from '../assets/folha-direitacontrast.png';
import folhaDireitaDark from '../assets/folha-direitadark.png';
import folhaEsquerdaContrast from '../assets/folha-esquerdacontrast.png';
import folhaEsquerdaDark from '../assets/folha-esquerdadark.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const textos = {
  pt: {
    senhaMinimo: 'A senha deve ter no mínimo 6 caracteres.',
    senhaLetras: 'A senha deve conter letras.',
    senhaNumeros: 'A senha deve conter números.',
    senhaSimbolos: 'A senha deve conter símbolos (@$!%*#?&).',
    senhaValida: 'Senha válida!',
    SenhaCoincidem: 'Senhas coincidem!',
    SenhaNaoCoincide: 'As senhas não coincidem',
    entrar: 'Entrar',
    idioma: 'Idioma',
    tema: 'Tema:',
    altoContraste: 'Alto Contraste:',
    redefinirSenhaTitulo: 'Redefinir Senha',
    definaNovaSenha: 'Defina a nova senha:',
    senha: 'Senha',
    confirmeNovaSenha: 'Confirme a nova senha:',
    redefinir: 'Redefinir',
    direitosReservados: '© 2025 EcoBalance — Todos os direitos reservados',
    paginaInicial: 'Página inicial',
    testes: 'Testes',
    toastTokenInvalido: 'Token inválido ou expirado.',
    toastErroInterno: 'Erro interno ao redefinir senha.',
  },
  en: {
    senhaMinimo: 'Password must be at least 6 characters long.',
    senhaLetras: 'Password must contain letters.',
    senhaNumeros: 'Password must contain numbers.',
    senhaSimbolos: 'Password must contain symbols (@$!%*#?&).',
    senhaValida: 'Valid password!',
    SenhaCoincidem: 'Passwords match!',
    SenhaNaoCoincide: 'Passwords do not match',
    entrar: 'Login',
    idioma: 'Language',
    tema: 'Theme:',
    altoContraste: 'High Contrast:',
    redefinirSenhaTitulo: 'Reset Password',
    definaNovaSenha: 'Set new password:',
    senha: 'Password',
    confirmeNovaSenha: 'Confirm new password:',
    redefinir: 'Reset',
    direitosReservados: '© 2025 EcoBalance — All rights reserved',
    paginaInicial: 'Homepage',
    testes: 'Tests',
    toastTokenInvalido: "Invalid or expired token.",
    toastErroInterno: "Internal error while resetting password.",
  },
};

const NovaSenha = () => {
  const navigate = useNavigate();
  const [idiomaSelecionado, setIdiomaSelecionado] = useState(() => {
    return localStorage.getItem('language') || 'pt'; // Usa o valor salvo ou define 'pt' como padrão
  });
  const [mostrarDropdownIdioma, setMostrarDropdownIdioma] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [altoContrasteAtivo, setAltoContrasteAtivo] = useState(false);

  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [senhasCoincidem, setSenhasCoincidem] = useState(false);
  const [mensagemConfirmacao, setMensagemConfirmacao] = useState("");
  const [mensagemSenha, setMensagemSenha] = useState("");
  const [senhaValida, setSenhaValida] = useState(false);


  const query = new URLSearchParams(window.location.search);
  const token = query.get('token');

  const handleRedefinir = async () => {
    if (senha !== confirmacao) {
      return toast.error(textos[idiomaSelecionado]?.SenhaNaoCoincide);
    }

    try {
         const response = await fetch('https://ecobalance-backend.onrender.com/api/nova-senha/nova', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, novaSenha: senha })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(textos[idiomaSelecionado]?.toastSucesso);
      } else {
        // mapeia mensagens específicas do backend
        if (data.error === "Token inválido ou expirado") {
          toast.error(textos[idiomaSelecionado]?.toastTokenInvalido);
        } else if (data.error === "Erro interno ao redefinir senha") {
          toast.error(textos[idiomaSelecionado]?.toastErroInterno);
        } else {
          toast.error(data.message || data.error);
        }
      }

    } catch (error) {
      toast.error(textos[idiomaSelecionado]?.toastErroInterno);
    }
  };

  const validarSenhaTexto = (senha) => {
    if (senha.length < 6) return textos[idiomaSelecionado]?.senhaMinimo || "A senha deve ter no mínimo 6 caracteres.";
    if (!/[A-Za-z]/.test(senha)) return textos[idiomaSelecionado]?.senhaLetras || "A senha deve conter letras.";
    if (!/\d/.test(senha)) return textos[idiomaSelecionado]?.senhaNumeros || "A senha deve conter números.";
    if (!/[@$!%*#?&]/.test(senha)) return textos[idiomaSelecionado]?.senhaSimbolos || "A senha deve conter símbolos (@$!%*#?&).";
    return textos[idiomaSelecionado]?.senhaValida || "Senha válida!";
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
    setIdiomaSelecionado(idioma);
    localStorage.setItem('language', idioma); // Salva no localStorage imediatamente
    setMostrarDropdownIdioma(false);
    console.log(`Idioma selecionado: ${idioma}`);
  };

  const toggleTema = () => {
    setTemaEscuro(!temaEscuro);
  };

  const toggleAltoContraste = () => {
    setAltoContrasteAtivo(!altoContrasteAtivo);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleInicioClick = () => {
    navigate('/');
  };
  const handleTestes = () => {
    navigate('/teste');
  };

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
          <button className="btn-entrar" onClick={handleLoginClick}>{textos[idiomaSelecionado]?.entrar}</button>
        </div>
      </header>

      <main className="login-container">
        <div className="vivi">
          <div className="login-box" style={{ justifyContent: 'center' }}>
            <div className="login-section">
              <h2 className="login-title">{textos[idiomaSelecionado]?.redefinirSenhaTitulo}</h2>
              <p style={{ color: '#999', marginRight: '80px', marginBottom: '5px' }}>{textos[idiomaSelecionado]?.definaNovaSenha}</p>
              <div className="form-group">
                <BsFillLockFill className="icon" />
                <input
                  type="password"
                  placeholder={textos[idiomaSelecionado]?.senha}
                  value={senha}
                  onChange={(e) => { const novaSenha = e.target.value; setSenha(novaSenha); const mensagem = validarSenhaTexto(novaSenha); setMensagemSenha(mensagem); setSenhaValida(mensagem === "Senha válida!" || mensagem === "Valid password!"); }}
                />
              </div><br></br>
              {mensagemSenha && (<small className={`mensagem-senha ${senhaValida ? "sucesso" : "erro"}`}>{mensagemSenha}</small>)}
              <br></br>
              <p style={{ color: '#999', marginRight: '60px', marginBottom: '5px' }}>{textos[idiomaSelecionado]?.confirmeNovaSenha}</p>
              <div className="form-group">
                <BsFillLockFill className="icon" />
                <input
                  type="password"
                  placeholder={textos[idiomaSelecionado]?.confirmeNovaSenha}
                  value={confirmacao}
                  onChange={(e) => { const confirmacaoSenha = e.target.value; setConfirmacao(confirmacaoSenha); const senhasIguais = confirmacaoSenha === senha; setSenhasCoincidem(senhasIguais); setMensagemConfirmacao(senhasIguais ? textos[idiomaSelecionado]?.SenhaCoincidem : textos[idiomaSelecionado]?.SenhaNaoCoincide); }}
                />
              </div><br></br>
              {mensagemConfirmacao && (<small className={`mensagem-senha ${senhasCoincidem ? "sucesso" : "erro"}`}>{mensagemConfirmacao}</small>)}
              <button className="btn-login" onClick={handleRedefinir}>{textos[idiomaSelecionado]?.redefinir}</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>{textos[idiomaSelecionado]?.direitosReservados}</p>
      </footer>
    </div>
  );
};

export default NovaSenha;