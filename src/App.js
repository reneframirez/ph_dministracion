import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CargaNotas from './components/CargaNotas'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/carga-notas" element={<CargaNotas />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
