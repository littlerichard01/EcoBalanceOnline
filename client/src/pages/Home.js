import React, { useState } from 'react';
import './Login.css';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import fotoHome from '../assets/fotoHome.png';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [fotoHome, fotoHome, fotoHome];
  return (
    <div className="pagina-login">
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-right">
            <button className="toggle-theme">🌞</button>
            <button className="btn-entrar">Entrar</button>
          </div>
        </div>
      </header>

      <div className="nav-bar-home">
        <div className="nav-metade-esquerda-home">
          <span className="nav-link">Início</span>
        </div>
        <div className="nav-metade-direita-home">
          <span className="nav-link">Testes</span>
        </div>
      </div>

      <main className="login-container">
        <div className="home-content">
          {/* Carrossel com bolinhas */}
          <div className="carousel-box">
            <img src={fotoHome} alt={`Slide ${activeIndex + 1}`} className="carousel-image" />

            <div className="carousel-caption">
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
      </main>

      <footer className="footer">
        <p>© 2025 EcoBalance — Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default Home;
