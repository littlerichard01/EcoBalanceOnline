import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import RedefinirSenha from "./pages/RedefinirSenha";
import NovaSenha from "./pages/NovaSenha";
import InfoCadastro from "./pages/InfoCadastro.js";
import SuasRotinas from "./pages/SuasRotinas.js"
import GraficosEConquistas from "./pages/GráficosEConquistas.js";
import HomeLogado from "./pages/HomeLogado.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
        <Route path="/info-cadastro" element={<InfoCadastro />} />
        <Route path="/suas-rotinas" element={<SuasRotinas/>} />
        <Route path="/graficos-conquistas" element={<GraficosEConquistas/>} />
        <Route path="/home" element={<HomeLogado/>} />
      </Routes>
    </Router> 
  );
}

export default App;
