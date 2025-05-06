import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import RedefinirSenha from "./pages/RedefinirSenha";
import NovaSenha from "./pages/NovaSenha";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
      </Routes>
    </Router>
  );
}

export default App;
