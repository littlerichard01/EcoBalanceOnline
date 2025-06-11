import React, { useState, useEffect } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillEnvelopeFill, BsFillLockFill, BsPersonFill } from 'react-icons/bs';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
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
    entrar: 'Entrar',
    idioma: 'Idioma',
    tema: 'Tema:',
    altoContraste: 'Alto Contraste:',
    bemVindo: 'Bem-vindo de volta!',
    esqueceuSenha: 'Esqueci minha senha',
    cadastreSe: 'Cadastre-se',
    nomeCompleto: 'Nome completo',
    email: 'E-mail',
    senha: 'Senha',
    confirmacaoSenha: 'Confirmação de senha',
    desejoLembretes: 'Desejo receber lembretes para realizar testes mensalmente.',
    cadastrar: 'Cadastrar',
    direitosReservados: '© 2025 EcoBalance — Todos os direitos reservados',
    paginaInicial: 'Página inicial',
    testes: 'Testes',
    senhaMinimo: 'A senha deve ter no mínimo 6 caracteres.',
    senhaLetras: 'A senha deve conter letras.',
    senhaNumeros: 'A senha deve conter números.',
    senhaSimbolos: 'A senha deve conter símbolos (@$!%*#?&).',
    senhaValida: 'Senha válida!',
    emailValidoTexto: 'E-mail válido!',
    emailInvalidoTexto: 'E-mail inválido. Ex: exemplo@dominio.com',
    erroConexao: 'Erro de conexão com o servidor.',
    erroLogin: 'Erro ao fazer login',
    loginSucesso: 'Login realizado com sucesso!',
    erroCadastro: 'Erro ao cadastrar',
    cadastroSucesso: 'Cadastro realizado com sucesso!',
    emailInvalido: 'Por favor, insira um e-mail válido.',
    senhaNaoCoincidem: 'As senhas não coincidem!',
    SenhaCoincidem: 'Senhas coincidem!',
    SenhaNaoCoincide: 'As senhas não coincidem',
  },
  en: {
    entrar: 'Login',
    idioma: 'Language',
    tema: 'Theme:',
    altoContraste: 'High Contrast:',
    bemVindo: 'Welcome back!',
    esqueceuSenha: 'Forgot your password',
    cadastreSe: 'Sign up',
    nomeCompleto: 'Full name',
    email: 'Email',
    senha: 'Password',
    confirmacaoSenha: 'Confirm password',
    desejoLembretes: 'I want to receive reminders to take tests monthly.',
    cadastrar: 'Sign up',
    direitosReservados: '© 2025 EcoBalance — All rights reserved',
    paginaInicial: 'Homepage',
    testes: 'Tests',
    senhaMinimo: 'Password must be at least 6 characters long.',
    senhaLetras: 'Password must contain letters.',
    senhaNumeros: 'Password must contain numbers.',
    senhaSimbolos: 'Password must contain symbols (@$!%*#?&).',
    senhaValida: 'Valid password!',
    emailValidoTexto: 'Valid email!',
    emailInvalidoTexto: 'Invalid email. Ex: example@domain.com',
    erroConexao: 'Connection error with the server.',
    erroLogin: 'Error logging in',
    loginSucesso: 'Login successful!',
    erroCadastro: 'Error during registration',
    cadastroSucesso: 'Registration successful!',
    emailInvalido: 'Please enter a valid email.',
    senhaNaoCoincidem: 'Passwords do not match!',
    SenhaCoincidem: 'Passwords match!',
    SenhaNaoCoincide: 'Passwords do not match',
  },
};

const Login = () => {
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
  const handleRecuperarClick = () => {
    navigate('/redefinir-senha');
  };
  const handleInicioClick = () => {
    navigate('/');
  };
  const handleTestes = () => {
    navigate('/teste');
  };

  const [nome, setNome] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagemSenha, setMensagemSenha] = useState("");
  const [senhaValida, setSenhaValida] = useState(false);
  const [mensagemConfirmacao, setMensagemConfirmacao] = useState("");
  const [senhasCoincidem, setSenhasCoincidem] = useState(false);
  const [emailCadastro, setEmailCadastro] = useState("");
  const [mensagemEmail, setMensagemEmail] = useState("");
  const [emailValido, setEmailValido] = useState(false);
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");
  const [idLogin] = useState("");
  const [receberLembretes, setReceberLembretes] = useState(false);

  const handleCadastro = async () => {
    if (senhaCadastro !== confirmarSenha) {
      toast.warning(textos[idiomaSelecionado]?.senhasNaoCoincidem || "As senhas não coincidem!");
      return;
    }

    if (!emailValido) {
      toast.warning(textos[idiomaSelecionado]?.emailInvalido || "Por favor, insira um e-mail válido.");
      return;
    }

    const conquistasSalvas = localStorage.getItem("conquistasAnonimas");
    const conquistas = conquistasSalvas ? JSON.parse(conquistasSalvas) : [];
    console.log(conquistas)

    try {
        const resposta = await fetch("https://ecobalance-backend.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email: emailCadastro, senha: senhaCadastro, receberLembretes, conquistas, idioma: idiomaSelecionado })
      });

      localStorage.removeItem("conquistasAnonimas");

      const dados = await resposta.json();

      if (resposta.ok) {
        toast.success(textos[idiomaSelecionado]?.cadastroSucesso || "Cadastro realizado com sucesso!");

        const usuarioId = dados._id;

        const rotinaSalva = localStorage.getItem("rotinaAnonima");
        const testeSalvo = localStorage.getItem("testeAnonimo");

        console.log('dados:', dados)
        // Se existirem dados anônimos salvos
        if (rotinaSalva && testeSalvo) {
          console.log("Rotina e teste recuperados")
          const rotina = JSON.parse(rotinaSalva);
          const teste = JSON.parse(testeSalvo);

          // Associar o ID do usuário à rotina
          rotina.usuarioId = usuarioId;

          console.log('Dados: ', JSON.stringify(rotina))
          console.log('Id do usuário:', rotina.usuarioId)

          // Enviar rotina
            const respostaRotina = await fetch("https://ecobalance-backend.onrender.com/api/rotinas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rotina)
          });

          const dadosRotina = await respostaRotina.json();

          if (respostaRotina.ok) {
            const rotinaId = dadosRotina._id;

            // Associar IDs ao teste
            teste.usuario = usuarioId;
            teste.rotina = rotinaId;

            // Enviar teste
              await fetch("https://ecobalance-backend.onrender.com/api/testes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(teste)
            });

            // Remover do localStorage
            localStorage.removeItem("rotinaAnonima");
            localStorage.removeItem("testeAnonimo");
          }
        }

        // Após isso, salvar o usuário logado e redirecionar
        localStorage.setItem("usuarioLogado", JSON.stringify(dados));
        setTimeout(() => {
          navigate('/info-cadastro');
        }, 2000);
      } else {
        toast.error(dados.error || textos[idiomaSelecionado]?.erroCadastro || "Erro ao cadastrar");
      }
    } catch (err) {
      toast.error(textos[idiomaSelecionado]?.erroConexao || "Erro de conexão com o servidor.");
    }
  };

  const handleLogin = async () => {
    try {
        const resposta = await fetch("https://ecobalance-backend.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: idLogin, email: emailLogin, senha: senhaLogin }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        localStorage.removeItem('rotinaAnonima');
        localStorage.removeItem('testeAnonimo');
        // Salvar dados no localStorage
        localStorage.setItem("usuarioLogado", JSON.stringify(dados));
        toast.success(textos[idiomaSelecionado]?.loginSucesso || "Login realizado com sucesso!");
        setTimeout(() => {
          navigate('/info-cadastro');
        }, 2000);
      } else {
        toast.error(dados.error || textos[idiomaSelecionado]?.erroLogin || "Erro ao fazer login");
      }
    } catch (err) {
      toast.error(textos[idiomaSelecionado]?.erroConexao || "Erro de conexão com o servidor.");
    }
  };

  const validarSenhaTexto = (senha) => {
    if (senha.length < 6) return textos[idiomaSelecionado]?.senhaMinimo || "A senha deve ter no mínimo 6 caracteres.";
    if (!/[A-Za-z]/.test(senha)) return textos[idiomaSelecionado]?.senhaLetras || "A senha deve conter letras.";
    if (!/\d/.test(senha)) return textos[idiomaSelecionado]?.senhaNumeros || "A senha deve conter números.";
    if (!/[@$!%*#?&]/.test(senha)) return textos[idiomaSelecionado]?.senhaSimbolos || "A senha deve conter símbolos (@$!%*#?&).";
    return textos[idiomaSelecionado]?.senhaValida || "Senha válida!";
  };

  const validarEmailTexto = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email) ? textos[idiomaSelecionado]?.emailValidoTexto || "E-mail válido!" : textos[idiomaSelecionado]?.emailInvalidoTexto || "E-mail inválido. Ex: exemplo@dominio.com";
  };

  return (
    <div className={`pagina-login ${temaEscuro ? 'dark-mode' : ''} ${altoContrasteAtivo ? 'high-contrast' : ''}`}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Folhas laterais */}
      <img src={altoContrasteAtivo ? folhaEsquerdaContrast : temaEscuro ? folhaEsquerdaDark : folhaDireita} alt="Folha direita" className="folha folha-direita" />
      <img src={altoContrasteAtivo ? folhaDireitaContrast : temaEscuro ? folhaDireitaDark : folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />

      <header className="header">
        <div className="header-top">
          <img src={logo} alt={textos[idiomaSelecionado]?.logoAlt || "Logo"} className="logo" />
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
          <button className="btn-entrar" onClick={handleLoginClick}>{textos[idiomaSelecionado]?.entrar}</button>
        </div>
      </header>

      {/* Conteúdo Central */}
      <main className="login-container">
        <div className="login-box-wrapper">
          <div className="login-box">
            {/* Login */}
            <div className="login-section">
              <h2 className="login-title">{textos[idiomaSelecionado]?.bemVindo}</h2>
              <div className="login-form-box">
                <div className="form-group">
                  <BsFillEnvelopeFill className="icon" />
                  <input type="email" placeholder={textos[idiomaSelecionado]?.email} value={emailLogin} onChange={e => setEmailLogin(e.target.value)} />
                </div>
                <div className="form-group">
                  <BsFillLockFill className="icon" />
                  <input type="password" placeholder={textos[idiomaSelecionado]?.senha} value={senhaLogin} onChange={e => setSenhaLogin(e.target.value)} />
                </div>
                <p className="forgot-password" onClick={handleRecuperarClick}><u>{textos[idiomaSelecionado]?.esqueceuSenha}</u></p>
                <button className="btn-login" onClick={handleLogin}>{textos[idiomaSelecionado]?.entrar}</button>
              </div>
            </div>

            {/* Cadastro */}
            <div className="register-section">
              <div className="cadastre-header">
                <h2 className="cadastre-se-titulo">{textos[idiomaSelecionado]?.cadastreSe}</h2>
              </div>
              <div className="register-fields">
                <div className="form-group">
                  <BsPersonFill className="icon" />
                  <input type="text" placeholder={textos[idiomaSelecionado]?.nomeCompleto} value={nome} onChange={e => setNome(e.target.value)} />
                </div>
                <div className="form-group">
                  <BsFillEnvelopeFill className="icon" />
                  <input type="email" placeholder={textos[idiomaSelecionado]?.email} value={emailCadastro} onChange={e => { const novoEmail = e.target.value; setEmailCadastro(novoEmail); const mensagem = validarEmailTexto(novoEmail); setMensagemEmail(mensagem); setEmailValido(mensagem === "E-mail válido!" || mensagem === "Valid email!"); }} />
                </div>
                {mensagemEmail && (<small className={`mensagem-senha ${emailValido ? "sucesso" : "erro"}`}>  {mensagemEmail}  </small>)}
                <div className="form-group">
                  <BsFillLockFill className="icon" />
                  <input type="password" placeholder={textos[idiomaSelecionado]?.senha} value={senhaCadastro} onChange={e => { const novaSenha = e.target.value; setSenhaCadastro(novaSenha); const mensagem = validarSenhaTexto(novaSenha); setMensagemSenha(mensagem); setSenhaValida(mensagem === "Senha válida!" || mensagem === "Valid password!"); }} />
                </div>
                {mensagemSenha && (<small className={`mensagem-senha ${senhaValida ? "sucesso" : "erro"}`}>{mensagemSenha}</small>)}
                <div className="form-group">
                  <BsFillLockFill className="icon" />
                  <input type="password" placeholder={textos[idiomaSelecionado]?.confirmacaoSenha} value={confirmarSenha} onChange={e => { const confirmacao = e.target.value; setConfirmarSenha(confirmacao); const senhasIguais = confirmacao === senhaCadastro; setSenhasCoincidem(senhasIguais); setMensagemConfirmacao(senhasIguais ? textos[idiomaSelecionado]?.SenhaCoincidem : textos[idiomaSelecionado]?.SenhaNaoCoincide); }} />
                </div>
                {mensagemConfirmacao && (<small className={`mensagem-senha ${senhasCoincidem ? "sucesso" : "erro"}`}>{mensagemConfirmacao}</small>)}
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="lembreteMensal"
                    checked={receberLembretes}
                    onChange={e => setReceberLembretes(e.target.checked)}
                  />
                  <label className="form-check-label text-white" htmlFor="lembreteMensal">
                    {textos[idiomaSelecionado]?.desejoLembretes}
                  </label>
                </div>
                <button className="btn-cadastrar" onClick={handleCadastro}>{textos[idiomaSelecionado]?.cadastrar}</button>
              </div>
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

export default Login;