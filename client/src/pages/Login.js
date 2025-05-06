import React, { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillEnvelopeFill, BsFillLockFill, BsPersonFill } from 'react-icons/bs';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  // Criação de variável para poder navegar
  const navigate = useNavigate();
  // Criar uma const nova pra cada rota, e então colocar no botão/texto para redirecionar, como feito no botão Login
  const handleLoginClick = () => {
    navigate('/login');
  };  
  const handleRecuperarClick = () => {
    navigate('/redefinir-senha')
  };

  const [nome, setNome] = useState("");

  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagemSenha, setMensagemSenha] = useState("");
  const [senhaValida, setSenhaValida] = useState(false);
  const [mensagemConfirmacao, setMensagemConfirmacao] = useState("");
  const [senhasCoincidem, setSenhasCoincidem] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const [emailCadastro, setEmailCadastro] = useState("");
  const [mensagemEmail, setMensagemEmail] = useState("");
  const [emailValido, setEmailValido] = useState(false);

  const handleCadastro = async () => {
    if (senhaCadastro !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!emailValido) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }    
  
    try {
      const resposta = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email: emailCadastro, senha: senhaCadastro })
      });
  
      const dados = await resposta.json();
  
      if (resposta.ok) {
        alert("Cadastro realizado com sucesso!");
        // Limpar os campos se quiser
      } else {
        alert(dados.error || "Erro ao cadastrar");
      }
    } catch (err) {
      alert("Erro de conexão com o servidor.");
    }
  };  

  const validarSenhaTexto = (senha) => {
    if (senha.length < 6) return "A senha deve ter no mínimo 6 caracteres.";
    if (!/[A-Za-z]/.test(senha)) return "A senha deve conter letras.";
    if (!/\d/.test(senha)) return "A senha deve conter números.";
    if (!/[@$!%*#?&]/.test(senha)) return "A senha deve conter símbolos (@$!%*#?&).";
    return "Senha válida!";
  };  

  const validarEmailTexto = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email) ? "E-mail válido!" : "E-mail inválido. Ex: exemplo@dominio.com";
  };
  

  return (
    <div className="pagina-login">
      {/* Folhas laterais */}
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

      {/* Header */}
      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-right">
            <button className="toggle-theme">🌞</button>
            <button className="btn-entrar" onClick={handleLoginClick}>Entrar</button>
          </div>
        </div>
      </header>

      {/* Nav bar */}
      <div className="nav-bar">
  <div className="nav-metade-esquerda">
    <span className="nav-link">Início</span>
  </div>
  <div className="nav-metade-direita">
    <span className="nav-link">Testes</span>
  </div>
</div>

      {/* Conteúdo Central */}
      <main className="login-container">
        <div className="login-box-wrapper">
          <div className="login-box">
            {/* Login */}
            <div className="login-section">
              <h2 className="login-title">Bem-vindo de volta!</h2>
              <div className="login-form-box">
                <div className="form-group">
                  <BsFillEnvelopeFill className="icon" />
                  <input type="email" placeholder="E-mail" />
                </div>
                <div className="form-group">
                  <BsFillLockFill className="icon" />
                  <input type="password" placeholder="Senha" />
                </div>
                <a href="#" className="forgot-password" onClick={handleRecuperarClick}>Esqueci minha senha</a>
                <button className="btn-login">Login</button>
              </div>
            </div>

            {/* Cadastro */}
            <div className="register-section">
              <div className="cadastre-header">
                <h2 className="cadastre-se-titulo">Cadastre-se</h2>
              </div>
              <div className="register-fields">
                <div className="form-group">
                  <BsPersonFill className="icon" />
                  <input type="text" placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)}/>
                </div>
                <div className="form-group">
                  <BsFillEnvelopeFill className="icon" />
                  <input type="email" placeholder="E-mail" value={emailCadastro} onChange={e => { const novoEmail = e.target.value; setEmailCadastro(novoEmail); const mensagem = validarEmailTexto(novoEmail); setMensagemEmail(mensagem); setEmailValido(mensagem === "E-mail válido!");}}/>
                </div>
                {mensagemEmail && (<small className={`mensagem-senha ${emailValido ? "sucesso" : "erro"}`}>   {mensagemEmail}  </small>)}
                <div className="form-group">
                  <BsFillLockFill className="icon" />
                  <input type="password" placeholder="Senha" value={senhaCadastro} onChange={e => { const novaSenha = e.target.value; setSenhaCadastro(novaSenha); const mensagem = validarSenhaTexto(novaSenha); setMensagemSenha(mensagem);setSenhaValida(mensagem === "Senha válida!"); }}/>
                </div>
                {mensagemSenha && (<small className={`mensagem-senha ${senhaValida ? "sucesso" : "erro"}`}>{mensagemSenha}</small>)}
                <div className="form-group">
                  <BsFillLockFill className="icon" />
                  <input type="password" placeholder="Confirmação de senha" value={confirmarSenha} onChange={e => { const confirmacao = e.target.value;setConfirmarSenha(confirmacao); const senhasIguais = confirmacao === senhaCadastro; setSenhasCoincidem(senhasIguais); setMensagemConfirmacao(senhasIguais ? "Senhas coincidem!" : "As senhas não coincidem");}}/>
                </div>
                {mensagemConfirmacao && (<small className={`mensagem-senha ${senhasCoincidem ? "sucesso" : "erro"}`}>{mensagemConfirmacao}</small>)}
                <button className="btn-cadastrar" onClick={handleCadastro}>Cadastrar</button>
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

export default Login;
