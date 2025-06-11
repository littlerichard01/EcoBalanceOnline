import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import fotoHome01 from '../assets/fotoHome01.jpeg';
import fotoHome02 from '../assets/fotoHome02.jpeg';
import fotoHome03 from '../assets/fotoHome03.jpeg';
import { useNavigate } from 'react-router-dom';
import bandeiraBrasil from '../assets/bandeira-brasil.png';
import bandeiraReinoUnido from '../assets/bandeira-reinounido.png';
import folhaDireitaContrast from '../assets/folha-direitacontrast.png';
import folhaDireitaDark from '../assets/folha-direitadark.png';
import folhaEsquerdaContrast from '../assets/folha-esquerdacontrast.png';
import folhaEsquerdaDark from '../assets/folha-esquerdadark.png';

const textos = {
  pt: {
    paginaInicial: 'Página inicial',
    testes: 'Testes',
    informacoesUsuario: 'Informações de Usuário',
    suasRotinas: 'Suas Rotinas',
    graficosConquistas: 'Gráficos e Conquistas',
    sair: 'Sair',
    calcularPegada: 'Calcule sua pegada de carbono',
    questionarioPersonalizado: 'Faça um questionário personalizado e calcule com base na sua rotina.',
    calcular: 'Calcular',
    oQueEPegada: 'O Que é Pegada de Carbono?',
    textoPegada1: 'O dióxido de carbono (CO₂) é um gás formado pela combinação de carbono e oxigênio — elementos fundamentais para os ciclos naturais da vida na Terra. Ele ocorre naturalmente na atmosfera e desempenha um papel essencial em processos como a regulação da temperatura do planeta e a fotossíntese realizada pelas plantas. No entanto, a ação humana tem aumentado significativamente a concentração de CO₂ e outros gases de efeito estufa na atmosfera. Atividades como a queima de combustíveis fósseis, o desmatamento, processos industriais e o consumo excessivo de recursos intensificam esse desequilíbrio. Isso leva a uma maior retenção de radiação infravermelha e ao acúmulo de calor, intensificando o efeito estufa e contribuindo diretamente para o aquecimento global. A pegada de carbono é um indicador que quantifica a emissão total de gases de efeito estufa (GEE) associada a uma pessoa, atividade, produto, organização ou evento. Esse cálculo permite compreender o impacto ambiental das nossas ações e é uma ferramenta fundamental para identificar oportunidades de redução de emissões e promover escolhas mais sustentáveis.',
    comoFuncionaCalculo: 'Como Funciona o Cálculo?',
    textoCalculo1: 'Diversas atividades do nosso cotidiano resultam na emissão de gases de efeito estufa (GEE), em diferentes intensidades. Para o cálculo da pegada de carbono apresentado neste site, serão considerados hábitos diários e individuais que possuem maior representatividade nas emissões de dióxido de carbono (CO₂) e gases equivalentes.O cálculo é baseado nos principais aspectos do estilo de vida que impactam diretamente a emissão de GEE. São eles: \n1. Gasto de energia: o processo de produção de energia elétrica, a qual no Brasil é em maioria oriunda de hidrelétricas, resulta na emissão de gases geradores do efeito estufa. Seja na construção da usina, quanto na produção.\n2.Gasto de Gás (encanado ou GLP): tanto o gás liquefeito de petróleo (gás de botijão) quanto o gás natural encanado emitem gases poluentes durante a queima para uso doméstico, como no preparo de alimentos ou aquecimento de água.\n3. Transporte: meios de transporte como carros, motos, ônibus, metrô e até aviões contribuem de maneira variável para as emissões, dependendo do tipo de combustível, frequência de uso e distância percorrida. Por isso, os deslocamentos diários são parte fundamental da estimativa.\n4.Alimentos: os alimentos que consumimos passam por processos que envolvem produção, transporte, armazenamento, distribuição e descarte. Alguns grupos alimentares, como carnes vermelhas e laticínios, possuem uma pegada de carbono significativamente maior. Assim, levaremos em consideração a média de emissão nesse processo.Essa análise permite estimar de forma personalizada o impacto ambiental do seu estilo de vida, promovendo uma compreensão mais clara das suas emissões e identificando oportunidades reais de redução.',
    comoCalculoMinhaPegada: 'Como Calculo Minha Pegada?',
    textoComoCalcular: 'Calcular sua pegada de carbono é essencial para compreender o impacto das suas ações diárias no meio ambiente. Nosso sistema avalia hábitos do seu estilo de vida, como consumo de energia, transporte e alimentação e traduz essas informações em uma estimativa clara e personalizada das suas emissões de gases de efeito estufa. A partir desse cálculo, você poderá identificar áreas-chave para reduzir suas emissões e adotar práticas mais sustentáveis, promovendo mudanças positivas para o planeta. Clique no botão e calcule agora mesmo.',
    faq: 'FAQ',
    pergunta1: 'Por que devo calcular minha Pegada de Carbono?',
    resposta1: 'O primeiro passo para uma mudança significativa é entender nosso próprio impacto. Calcular a pegada de carbono permite enxergar como nossas ações contribuem para a crise climática que está acontecendo, e assim, tomar decisões mais conscientes para ajudar a desacelerar seus efeitos.',
    pergunta2: 'Como reduzir minha pegada?',
    resposta2: 'Após preencher seus dados, o sistema irá oferecer sugestões personalizadas com base no seu perfil. Essas dicas vão te ajudar a repensar hábitos e a reduzir gradualmente suas emissões de CO₂.',
    pergunta3: 'Como é feito o cálculo da minha emissão de carbono?',
    resposta3: 'Para saber como o cálculo de pegada de carbono é feito, ',
    cliqueAqui: 'clique aqui.',
    pergunta4: 'O que são as conquistas?',
    resposta4: 'As conquistas são prêmios simbólicos que acompanham a sua jornada de redução de emissões. Elas funcionam como incentivo, permitindo que você visualize seu progresso e compartilhe suas metas alcançadas. Seu histórico é salvo no sistema, para que você acompanhe a evolução da sua pegada ao longo do tempo.',
    pergunta5: 'Outras pessoas verão minhas estatísticas?',
    resposta5: 'Não. Os dados inseridos no EcoBalance são sigilosos e não podem ser acessados por outros usuários do sistema.',
    rodape: '© 2025 EcoBalance — Todos os direitos reservados',
    tema: 'Tema:',
    altoContraste: 'Alto Contraste:',
    idioma: 'Idioma',
  },
  en: {
    paginaInicial: 'Homepage',
    testes: 'Tests',
    informacoesUsuario: 'User Information',
    suasRotinas: 'Your Routines',
    graficosConquistas: 'Charts and Achievements',
    sair: 'Logout',
    calcularPegada: 'Calculate your carbon footprint',
    questionarioPersonalizado: 'Take a personalized questionnaire and calculate based on your routine.',
    calcular: 'Calculate',
    oQueEPegada: 'What is Carbon Footprint?',
    textoPegada1: 'Carbon dioxide (CO₂) is a gas formed by the combination of carbon and oxygen — fundamental elements for the natural cycles of life on Earth. It occurs naturally in the atmosphere and plays an essential role in processes such as regulating the planet\'s temperature and photosynthesis carried out by plants.\nHowever, human action has significantly increased the concentration of CO₂ and other greenhouse gases in the atmosphere. Activities such as burning fossil fuels, deforestation, industrial processes, and excessive consumption of resources intensify this imbalance. This leads to greater retention of infrared radiation and the accumulation of heat, intensifying the greenhouse effect and directly contributing to global warming.\nThe carbon footprint is an indicator that quantifies the total emission of greenhouse gases (GHG) associated with a person, activity, product, organization, or event. This calculation allows us to understand the environmental impact of our actions and is a fundamental tool for identifying opportunities to reduce emissions and promote more sustainable choices.',
    comoFuncionaCalculo: 'How Does the Calculation Work?',
    textoCalculo1: 'Several daily activities result in the emission of greenhouse gases (GHG) at varying intensities. For the carbon footprint calculation presented on this website, daily and individual habits with the greatest representation in emissions of carbon dioxide (CO₂) and equivalent gases will be considered.\nThe calculation is based on the main aspects of lifestyle that directly impact GHG emissions. These are:\n1.Energy consumption: the process of electricity production, which in Brazil mainly comes from hydroelectric plants, results in the emission of gases that generate the greenhouse effect. Both in the construction of the plant and in production.\n2.Gas consumption (piped or LPG): both liquefied petroleum gas (bottled gas) and piped natural gas emit polluting gases during combustion for domestic use, such as in food preparation or water heating.\n3.Transportation: means of transport such as cars, motorcycles, buses, subways, and even airplanes contribute variably to emissions, depending on the type of fuel, frequency of use, and distance traveled. Therefore, daily commutes are a fundamental part of the estimate.\n4. Food: the food we consume goes through processes involving production, transportation, storage, distribution, and disposal. Some food groups, such as red meat and dairy products, have a significantly larger carbon footprint. Thus, we will consider the average emission in this process.\n\nThis analysis allows for a personalized estimate of the environmental impact of your lifestyle, promoting a clearer understanding of your emissions and identifying real opportunities for reduction.',
    comoCalculoMinhaPegada: 'How Do I Calculate My Footprint?',
    textoComoCalcular: 'Calculating your carbon footprint is essential to understand the impact of your daily actions on the environment. Our system assesses habits of your lifestyle, such as energy consumption, transportation, and diet, and translates this information into a clear and personalized estimate of your greenhouse gas emissions. From this calculation, you will be able to identify key areas to reduce your emissions and adopt more sustainable practices, promoting positive changes for the planet. Click the button and calculate now.',
    faq: 'FAQ',
    pergunta1: 'Why should I calculate my Carbon Footprint?',
    resposta1: 'The first step towards significant change is understanding our own impact. Calculating the carbon footprint allows us to see how our actions contribute to the ongoing climate crisis, and thus, make more conscious decisions to help slow down its effects.',
    pergunta2: 'How to reduce my footprint?',
    resposta2: 'After filling in your data, the system will offer personalized suggestions based on your profile. These tips will help you rethink habits and gradually reduce your CO₂ emissions.',
    pergunta3: 'How is my carbon emission calculated?',
    resposta3: 'To find out how the carbon footprint calculation is done, ',
    cliqueAqui: 'click here.',
    pergunta4: 'What are the achievements?',
    resposta4: 'Achievements are symbolic awards that accompany your emission reduction journey. They serve as an incentive, allowing you to visualize your progress and share your achieved goals. Your history is saved in the system so that you can track the evolution of your footprint over time.',
    pergunta5: 'Will other people see my statistics?',
    resposta5: 'No. The data entered in EcoBalance is confidential and cannot be accessed by other users of the system.',
    rodape: '© 2025 EcoBalance — All rights reserved',
    tema: 'Theme:',
    altoContraste: 'High Contrast:',
    idioma: 'Language',
  },
};

const Home = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  const navigate = useNavigate();


  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Estados para as funcionalidades
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

  const toggleDropdown = () => {
    setMostrarDropdown(!mostrarDropdown);
  };

  const handleInicioClick = () => {
    navigate('/home');
  };

  const handleUsuarioAcesso = () => {
    navigate('/info-cadastro');
  };

  const handleTesteLogadoClick = () => {
    navigate('/teste-logado');
  };

  const handleRotinas = () => {
    navigate('/suas-rotinas');
  };

  const handleGráficosEConquistas = () => {
    navigate('/graficos-conquistas');
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  const toggleIdiomaDropdown = () => {
    setMostrarDropdownIdioma(!mostrarDropdownIdioma);
  };

  const legends = {
    pt: [
      "Imagem 1 - Floresta vista de cima",
      "Imagem 2 - Mão simulando que está segundando vários símbolos relacionados a sustentabilidade",
      "Imagem 3 - Mão segurando folha com formato de pegada em seu conteúdo"
    ],

    en: [
      "Image 1 - Forest seen from above",
      "Image 2 - Hand simulating holding various symbols related to sustainability",
      "Image 3 - Hand holding a leaf shaped like a footprint"
    ]
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

  const [activeIndex, setActiveIndex] = useState(0);
  const images = [fotoHome01, fotoHome02, fotoHome03];

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (!usuario) {
      navigate("/login");
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length, navigate]);

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (!usuario) {
      navigate("/login");
      return;
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



  return (
    <div className={`pagina-login ${temaEscuro ? 'dark-mode' : ''} ${altoContrasteAtivo ? 'high-contrast' : ''}`}>

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
            <span className="navlink" onClick={handleTesteLogadoClick}>{textos[idiomaSelecionado]?.testes}</span>
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
        <div className="home-content">
          {/* Carrossel com bolinhas */}
          <div className="carousel-box">
            <div className="image-container">
              <img
                src={images[activeIndex]}
                alt={`Slide ${activeIndex + 1}`}
                className="carousel-image"
              />
              <span className="tooltip-text">{legends[idiomaSelecionado][activeIndex]}</span> {/* Texto sobre a imagem */}
              <div className="content-overlay">
                <div className="overlay-content-text">
                  <h1>{textos[idiomaSelecionado]?.calcularPegada}</h1>
                  <p>{textos[idiomaSelecionado]?.questionarioPersonalizado}</p>
                </div>
                <div className="overlay-content-btn">
                  <button className="overlay-button" onClick={handleTesteLogadoClick}>{textos[idiomaSelecionado]?.calcular}</button>
                </div>
              </div>
            </div>
            <div className="carousel-dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Texto explicativo */}
          <section className="info-section">
            <h2 className="login-title">{textos[idiomaSelecionado]?.oQueEPegada}</h2>
            <p>{textos[idiomaSelecionado]?.textoPegada1}</p>

            <h2 className="login-title">{textos[idiomaSelecionado]?.comoFuncionaCalculo}</h2>
            <p>{textos[idiomaSelecionado]?.textoCalculo1}</p>

            <h2 className="login-title">{textos[idiomaSelecionado]?.comoCalculoMinhaPegada}</h2>
            <p>{textos[idiomaSelecionado]?.textoComoCalcular}</p>

            <div className="btn-wrapper">
              <button className="btn-calcular" onClick={handleTesteLogadoClick}>{textos[idiomaSelecionado]?.calcular}</button>
            </div>
          </section>

          {/* FAQ */}
          <section className="info-section">
            <h2 className="login-title">{textos[idiomaSelecionado]?.faq}</h2>
            <details className="faq-item">
              <summary>{textos[idiomaSelecionado]?.pergunta1}</summary>
              <p>{textos[idiomaSelecionado]?.resposta1}</p>
            </details>
            <details className="faq-item">
              <summary>{textos[idiomaSelecionado]?.pergunta2}</summary>
              <p>{textos[idiomaSelecionado]?.resposta2}</p>
            </details>
            <details className="faq-item">
              <summary>{textos[idiomaSelecionado]?.pergunta3}</summary>
              <p>{textos[idiomaSelecionado]?.resposta3}<a style={{color: '#6e6e6e',}} href={idiomaSelecionado === 'pt' ? 'https://drive.google.com/file/d/1rubWWD99dvSLSSgZJd-fZ_V9fPF2X7La/view?usp=drive_link' : 'https://drive.google.com/file/d/1eb97rlsCiOJRbTIQfklXceAR8ys4IIBK/view?usp=drive_link'}>{textos[idiomaSelecionado]?.cliqueAqui}</a></p>            </details>
            <details className="faq-item">
              <summary>{textos[idiomaSelecionado]?.pergunta4}</summary>
              <p>{textos[idiomaSelecionado]?.resposta4}</p>
            </details>
            <details className="faq-item">
              <summary>{textos[idiomaSelecionado]?.pergunta5}</summary>
              <p>{textos[idiomaSelecionado]?.resposta5}</p>
            </details>
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>{textos[idiomaSelecionado]?.rodape}</p>
      </footer>
    </div>
  );
};

export default Home;