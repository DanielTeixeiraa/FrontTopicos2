import './App.css';
import  Home  from './components/Home';
import Eventos from './components/Eventos/Eventos';
import Ingressos from './components/Ingressos/Ingresso';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/eventos" element={<Eventos/>} />
        <Route exact path="/ingressos" element={<Ingressos/>} />
      </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
