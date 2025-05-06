import React from 'react';
import './Login.css';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { BsFillEnvelopeFill, BsFillLockFill, BsPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const NovaSenha = () => {

    const navigate = useNavigate();
    const handleLoginClick = () => {
      navigate('/login');
    };  

  return (
    <div className="pagina-login">
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-right">
            <button className="toggle-theme">🌞</button>
            <button className="btn-entrar" onClick={handleLoginClick}>Entrar</button>
          </div>
        </div>
      </header>

      <div className="nav-bar">
        <div className="nav-metade-esquerda">
          <span className="nav-link">Início</span>
        </div>
        <div className="nav-metade-direita">
          <span className="nav-link">Testes</span>
        </div>
      </div>

      <main className="login-container">
        <div className="vivi">
          <div className="login-box" style={{ justifyContent: 'center' }}>
            <div className="login-section">
              <h2 className="login-title">Redefinir Senha</h2>
              <p style={{ color: '#999', marginRight: '80px', marginBottom: '5px' }}>Defina a nova senha:</p>
                <div className="form-group">
                <BsFillLockFill className="icon" />
                <input type="password" placeholder="Senha" />
                </div>
                <p style={{ color: '#999', marginRight: '60px', marginBottom: '5px' }}>Confirme a nova senha:</p>
                <div className="form-group">
                <BsFillLockFill className="icon" />
                  <input type="password" placeholder="Confirmar nova senha" />
                </div>
                <button className="btn-enviar">Redefinir</button>
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

export default NovaSenha;
