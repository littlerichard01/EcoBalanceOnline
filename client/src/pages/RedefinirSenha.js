import React, { useEffect } from 'react';
import './Login.css';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const RedefinirSenha = () => {

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleInicioClick = () => {
    navigate('/');
  };
  const handleTestes = () => {
    navigate('/teste')
  }

  return (
    <div className="pagina-login">
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />



      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="header-right">



          <div className="header-links">
            <span className="navlink" onClick={handleInicioClick}>Página inicial</span>
            <span className="navlink" onClick={handleTestes}>Testes</span>
          </div>



          <button className="btn-entrar" onClick={handleLoginClick}>Entrar</button>
        </div>


      </header>

      <main className="login-container">
        <div className="vivi">
          <div className="login-box" style={{ justifyContent: 'center' }}>
            <div className="login-section">
              <h2 className="login-title">Redefinir Senha</h2>
              <p style={{ color: '#999', textAlign: 'center', marginBottom: '20px' }}>
                Digite o e-mail que você cadastrou:
              </p>

              <div className="form-group">
                <BsFillEnvelopeFill className="icon" />
                <input type="email" placeholder="E-mail" />
              </div>
              <button className="btn-enviar">Enviar</button>

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

export default RedefinirSenha;
