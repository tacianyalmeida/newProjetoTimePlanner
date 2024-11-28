import React from 'react'
import Table from './components/Table.jsx'
import Agendamento from './components/Agendamento.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header.jsx'
import { BackgroundStyle} from './Styles/Agendamento.js';
import Footer from './components/Footer.jsx';
import { BoxFooter,TextosFooter } from './Styles/Footer.js';
import Home from './components/Home.jsx'


function App() {


  return (
    <Router>
    <BackgroundStyle>
      <Header />  {/* O Header será renderizado sobre a imagem */}
      
      <div style={{ marginTop: "100px" }}> {/* Ajusta o espaço para o conteúdo não ficar escondido atrás do Header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/horarios" element={<Table />} />
          <Route path="/agendamento" element={<Agendamento />} />
        </Routes>
      </div>
      <BoxFooter>
          <TextosFooter>&copy; {new Date().getFullYear()} TimePlanner. Todos os direitos reservados.</TextosFooter>
        </BoxFooter>
    </BackgroundStyle>
    
  </Router>
  )
}

export default App
