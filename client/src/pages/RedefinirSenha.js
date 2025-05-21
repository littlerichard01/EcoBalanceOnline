import React, { useState, useEffect } from 'react';
import './Login.css';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import bandeiraBrasil from '../assets/bandeira-brasil.png';
import bandeiraReinoUnido from '../assets/bandeira-reinounido.png';

const textos = {
  pt: {
    entrar: 'Entrar',
    idioma: 'Idioma',
    tema: 'Tema:',
    altoContraste: 'Alto Contraste:',
    redefinirSenhaTitulo: 'Redefinir Senha',
    digiteSeuEmail: 'Digite o e-mail que você cadastrou:',
    email: 'E-mail',
    enviar: 'Enviar',
    direitosReservados: '© 2025 EcoBalance — Todos os direitos reservados',
    paginaInicial: 'Página inicial',
    testes: 'Testes',
  },
  en: {
    entrar: 'Login',
    idioma: 'Language',
    tema: 'Theme:',
    altoContraste: 'High Contrast:',
    redefinirSenhaTitulo: 'Reset Password',
    digiteSeuEmail: 'Enter the email you registered with:',
    email: 'Email',
    enviar: 'Send',
    direitosReservados: '© 2025 EcoBalance — All rights reserved',
    paginaInicial: 'Homepage',
    testes: 'Tests',
  },
};

const RedefinirSenha = () => {
  const navigate = useNavigate();
  const [idiomaSelecionado, setIdiomaSelecionado] = useState(() => {
    return localStorage.getItem('language') || 'pt'; // Usa o valor salvo ou define 'pt' como padrão
  });
  const [mostrarDropdownIdioma, setMostrarDropdownIdioma] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [altoContrasteAtivo, setAltoContrasteAtivo] = useState(false);

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
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

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
              <p style={{ color: '#999', textAlign: 'center', marginBottom: '20px' }}>
                {textos[idiomaSelecionado]?.digiteSeuEmail}
              </p>
              <div className="form-group">
                <BsFillEnvelopeFill className="icon" />
                <input type="email" placeholder={textos[idiomaSelecionado]?.email} />
              </div>
              <button className="btn-enviar">{textos[idiomaSelecionado]?.enviar}</button>
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

export default RedefinirSenha;