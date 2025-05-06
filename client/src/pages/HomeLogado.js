import React, { useState, useEffect } from 'react';
import './Login.css';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import fotoHome01 from '../assets/fotoHome01.jpeg';
import fotoHome02 from '../assets/fotoHome02.jpeg';
import fotoHome03 from '../assets/fotoHome03.jpeg';
import { useNavigate } from 'react-router-dom';
import { BsBellFill } from 'react-icons/bs';
import avatar from '../assets/avatar.png';

const Home = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleInicioClick = () => {
    navigate('/home');
  };
  const handleUsuarioAcesso = () => {
    navigate('/info-cadastro')
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const images = [fotoHome01, fotoHome02, fotoHome03]; // Array com as imagens

  const [mostrarModalFrequencia, setMostrarModalFrequencia] = useState(false);
  const [frequenciaSelecionada, setFrequenciaSelecionada] = useState('');

  useEffect(() => {
    // Verifica se o usuário está logado
    const usuario = localStorage.getItem("usuarioLogado");
    if (!usuario) {
      navigate("/login");
      return; // evita continuar o código se não estiver logado
    }

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length); // Alterna para a próxima imagem
    }, 7000); // Tempo de 3 segundos
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [images.length]);


  useEffect(() => {
    const updateNavbarPosition = () => {
      const navBar = document.querySelector('.nav-bar-home');
      const headerHeight = document.querySelector('.header').offsetHeight;

      if (window.scrollY > headerHeight) {
        navBar.classList.add('fixed-nav');
        navBar.style.top = '0';
      } else {
        navBar.classList.remove('fixed-nav');
        navBar.style.top = `${headerHeight}px`;
      }
    };

    // Atualiza a posição da navbar ao carregar a página
    updateNavbarPosition();

    // Adiciona o evento de scroll
    window.addEventListener('scroll', updateNavbarPosition);
    return () => window.removeEventListener('scroll', updateNavbarPosition);
  }, []);

  useEffect(() => {
    const buscarFrequencia = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/usuariosBuscar/${usuario._id}`);
            const data = await response.json();
            if (response.ok && data.frequencia) {
                setFrequenciaSelecionada(data.frequencia);
            }
        } catch (err) {
            console.error("Erro ao buscar frequência:", err);
        }
    };

    if (mostrarModalFrequencia) {
        buscarFrequencia();
    }
}, [mostrarModalFrequencia, usuario._id]);

  return (
    <div className="pagina-login">
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-right">
          <BsBellFill className="icone-sino" onClick={() => setMostrarModalFrequencia(true)} style={{ cursor: 'pointer' }} />
            <div className="avatar-container">
              <img src={avatar} alt="Avatar do usuário" className="icone-avatar" onClick={handleUsuarioAcesso}/>
            </div>
          </div>
        </div>
      </header>

      <div className="nav-bar-home">
        <div className="nav-metade-esquerda-home">
          <span className="nav-link" onClick={handleInicioClick}>Início</span>
        </div>
        <div className="nav-metade-direita-home">
          <span className="nav-link">Testes</span>
        </div>
      </div>

      <main className="login-container">
        <div className="home-content">
          {/* Carrossel com bolinhas */}
          <div className="carousel-box">
            <div className="image-container">
              <img
                src={images[activeIndex]} // Renderiza a imagem atual do slider
                alt={`Slide ${activeIndex + 1}`}
                className="carousel-image"
              />
              <div className="content-overlay">
                <div className="overlay-content-text">
                  <h1>Calcule sua pegada de carbono</h1>
                  <p>Faça um questionário personalizado e calcule com base na sua rotina.</p>
                </div>
                <div className="overlay-content-btn">
                  <button className="overlay-button">Calcular</button></div>
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
            <h2 className="login-title">O Que é Pegada de Carbono?</h2>
            <p>O dióxido de carbono (CO₂) é um gás formado pela combinação de carbono e oxigênio — elementos fundamentais para os ciclos naturais da vida na Terra. Ele ocorre naturalmente na atmosfera e desempenha um papel essencial em processos como a regulação da temperatura do planeta e a fotossíntese realizada pelas plantas.
              No entanto, a ação humana tem aumentado significativamente a concentração de CO₂ e outros gases de efeito estufa na atmosfera. Atividades como a queima de combustíveis fósseis, o desmatamento, processos industriais e o consumo excessivo de recursos intensificam esse desequilíbrio. Isso leva a uma maior retenção de radiação infravermelha e ao acúmulo de calor, intensificando o efeito estufa e contribuindo diretamente para o aquecimento global.
              A pegada de carbono é um indicador que quantifica a emissão total de gases de efeito estufa (GEE) associada a uma pessoa, atividade, produto, organização ou evento. Esse cálculo permite compreender o impacto ambiental das nossas ações e é uma ferramenta fundamental para identificar oportunidades de redução de emissões e promover escolhas mais sustentáveis.
            </p>

            <h2 className="login-title">Como Funciona o Cálculo?</h2>
            <p>Diversas atividades do nosso cotidiano resultam na emissão de gases de efeito estufa (GEE), em diferentes intensidades. Para o cálculo da pegada de carbono apresentado neste site, serão considerados hábitos diários e individuais que possuem maior representatividade nas emissões de dióxido de carbono (CO₂) e gases equivalentes.
              O cálculo é baseado nos principais aspectos do estilo de vida que impactam diretamente a emissão de GEE. São eles:


              1.	Gasto de energia: o processo de produção de energia elétrica, a qual no Brasil é em maioria oriunda de hidrelétricas, resulta na emissão de gases geradores do efeito estufa. Seja na construção da usina, quanto na produção.
              2.	Gasto de Gás (encanado ou GLP): tanto o gás liquefeito de petróleo (gás de botijão) quanto o gás natural encanado emitem gases poluentes durante a queima para uso doméstico, como no preparo de alimentos ou aquecimento de água.
              3.	Transporte: meios de transporte como carros, motos, ônibus, metrô e até aviões contribuem de maneira variável para as emissões, dependendo do tipo de combustível, frequência de uso e distância percorrida. Por isso, os deslocamentos diários são parte fundamental da estimativa.
              4.	Alimentos: os alimentos que consumimos passam por processos que envolvem produção, transporte, armazenamento, distribuição e descarte. Alguns grupos alimentares, como carnes vermelhas e laticínios, possuem uma pegada de carbono significativamente maior. Assim, levaremos em consideração a média de emissão nesse processo.

              Essa análise permite estimar de forma personalizada o impacto ambiental do seu estilo de vida, promovendo uma compreensão mais clara das suas emissões e identificando oportunidades reais de redução.
            </p>

            <h2 className="login-title">Como Calculo Minha Pegada?</h2>
            <p>Calcular sua pegada de carbono é essencial para compreender o impacto das suas ações diárias no meio ambiente. Nosso sistema avalia hábitos do seu estilo de vida, como consumo de energia, transporte e alimentação e traduz essas informações em uma estimativa clara e personalizada das suas emissões de gases de efeito estufa. A partir desse cálculo, você poderá identificar áreas-chave para reduzir suas emissões e adotar práticas mais sustentáveis, promovendo mudanças positivas para o planeta. Clique no botão e calcule agora mesmo.</p>

            <div className="btn-wrapper">
              <button className="btn-calcular">Calcular</button>
            </div>
          </section>


          {/* FAQ */}
          <section className="info-section">
            <h2 className="login-title">FAQ</h2>
            <details className="faq-item">
              <summary>Por que devo calcular minha Pegada de Carbono?</summary>
              <p>O primeiro passo para uma mudança significativa é entender nosso próprio impacto. Calcular a pegada de carbono permite enxergar como nossas ações contribuem para a crise climática que está acontecendo, e assim, tomar decisões mais conscientes para ajudar a desacelerar seus efeitos.</p>
            </details>
            <details className="faq-item">
              <summary>Como reduzir minha pegada?</summary>
              <p>Após preencher seus dados, o sistema irá oferecer sugestões personalizadas com base no seu perfil. Essas dicas vão te ajudar a repensar hábitos e a reduzir gradualmente suas emissões de CO₂.</p>
            </details>
            <details className="faq-item">
              <summary>Como é feito o cálculo da minha emissão de carbono?</summary>
              <p>Para saber como o cálculo de pegada de carbono é feito, clique aqui.</p>
            </details>
            <details className="faq-item">
              <summary>O que são as conquistas?</summary>
              <p>As conquistas são prêmios simbólicos que acompanham a sua jornada de redução de emissões. Elas funcionam como incentivo, permitindo que você visualize seu progresso e compartilhe suas metas alcançadas. Seu histórico é salvo no sistema, para que você acompanhe a evolução da sua pegada ao longo do tempo.</p>
            </details>
            <details className="faq-item">
              <summary>Outras pessoas verão minhas estatísticas?</summary>
              <p>Não. Os dados inseridos no EcoBalance são sigilosos e não podem ser acessados por outros usuários do sistema.</p>
            </details>
          </section>
        </div>
        {mostrarModalFrequencia && (
                        <div className="custom-modal-overlay">
                            <div className="custom-modal-content">
                                <h2 className="modal-title">Frequência dos Testes</h2>

                                <div className="modal-form-group">
                                    <label>Escolha com que frequência deseja realizar seus testes:</label>
                                    <select
                                        className="form-control"
                                        value={frequenciaSelecionada}
                                        onChange={(e) => setFrequenciaSelecionada(e.target.value)}
                                    >
                                        <option value="">Selecione uma opção</option>
                                        <option value="mensalmente">Mensalmente</option>
                                        <option value="semestralmente">Semestralmente</option>
                                        <option value="anualmente">Anualmente</option>
                                    </select>
                                </div>

                                <div className="modal-buttons">
                                    <button className="btn btn-secondary" onClick={() => setMostrarModalFrequencia(false)}>Cancelar</button>
                                    <button
                                        className="btn btn-success"
                                        onClick={async () => {
                                            if (frequenciaSelecionada) {
                                                try {
                                                    const response = await fetch(`http://localhost:3001/api/usuarios/${usuario._id}/frequencia`, {
                                                        method: 'PUT',
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({ frequencia: frequenciaSelecionada })
                                                    });

                                                    const data = await response.json();

                                                    if (response.ok) {
                                                        alert(`Frequência salva: ${data.frequencia}`);
                                                        localStorage.setItem("frequenciaTestes", data.frequencia);
                                                        setMostrarModalFrequencia(false);
                                                    } else {
                                                        alert(data.error || "Erro ao salvar frequência");
                                                    }
                                                } catch (err) {
                                                    console.error(err);
                                                    alert("Erro de rede");
                                                }
                                            } else {
                                                alert("Por favor, selecione uma frequência.");
                                            }
                                        }}
                                    >
                                        Salvar
                                    </button>
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

export default Home;
