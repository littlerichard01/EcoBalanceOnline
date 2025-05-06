import React, { useEffect, useState } from 'react';
import './Login.css';
import { BsPersonFill } from 'react-icons/bs';
import { TrashFill, Plus, PencilFill } from 'react-bootstrap-icons';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import folhaEsquerda from '../assets/folha-esquerda.png';
import { useNavigate } from 'react-router-dom';

const SuasRotinas = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const navigate = useNavigate();
  const [rotinas, setRotinas] = useState([]);
  const [rotinaParaDeletar, setRotinaParaDeletar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  const handleInicioClick = () => {
    navigate('/home');
  };

  const handleUsuarioAcesso = () => {
    navigate('/info-cadastro');
  };

  const handleCadastrarRotina = () => {
    navigate('/rotinas');
  };

  const abrirRotina = (rotina) => {
    navigate('/rotinas', { state: { rotina } });
  };

  const confirmarRemocaoRotina = async () => {
    if (!rotinaParaDeletar) return;
    try {
      await fetch(`http://localhost:3001/api/rotinas/${rotinaParaDeletar}`, {
        method: 'DELETE',
      });
      setRotinas(rotinas.filter(rotina => rotina._id !== rotinaParaDeletar));
    } catch (error) {
      console.error("Erro ao deletar rotina:", error);
    } finally {
      setMostrarModal(false);
      setRotinaParaDeletar(null);
    }
  };

  const mostrarModalDeletar = (idRotina) => {
    setRotinaParaDeletar(idRotina);
    setMostrarModal(true);
  };

  const handleEditarRotina = (rotina) => {
    navigate('/rotinas', { state: { rotina } });
  };

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    const buscarRotinas = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/rotinas/usuario/${usuario._id}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setRotinas(data);
        } else {
          console.error("Resposta inesperada ao buscar rotinas:", data);
        }
      } catch (err) {
        console.error("Erro ao buscar rotinas:", err);
      }
    };

    buscarRotinas();
  }, [usuario, navigate]);

  return (
    <div className="pagina-login">
      <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />
      <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />

      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="header-right">
          <div className="header-links">
            <span className="navlink" onClick={handleInicioClick}>Página inicial</span>
            <span className="navlink">Testes</span>
          </div>
          <img src={avatar} alt="Avatar do usuário" className="icone-avatar" onClick={handleUsuarioAcesso} />
        </div>
      </header>

      <main className="login-container">
        <div className="info-usuario">
          <div className="login-box">
            <div className="login-section-alterar-rotinas">
              <h2 className="login-title-rotina">Suas Rotinas</h2>

              <div className="container-rotinas">
                <div className="rotina-circle add" onClick={handleCadastrarRotina}>
                  <Plus size={40} />
                </div>
                {rotinas.map((rotina, index) => (
                  <div className="rotina-circle-wrapper" key={index}>
                    <div className="rotina-circle" onClick={() => abrirRotina(rotina)}>
                      {rotina.nome || `Rotina ${index + 1}`}
                    </div>
                    <div className="icones-rotina-abaixo">
                      <TrashFill
                        className="icone-lixeira"
                        size={20}
                        onClick={() => mostrarModalDeletar(rotina._id)}
                      />
                      <PencilFill
                        className="icone-editar"
                        size={20}
                        color="black"
                        onClick={() => handleEditarRotina(rotina)}
                      />
                    </div>
                    {mostrarModal && rotinaParaDeletar === rotina._id && (
                      <div className="custom-modal-overlay">
                        <div className="custom-modal-content">
                          <h2 className="modal-title">Deletar Rotina</h2>
                          <div className="modal-form-group">
                            <label>Deseja mesmo deletar a rotina {rotina.nome}</label>
                          </div>
                          <div className="modal-buttons">
                            <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
                            <button className="btn btn-danger" onClick={confirmarRemocaoRotina}>Sim</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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

export default SuasRotinas;