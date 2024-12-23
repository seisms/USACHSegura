import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './components/InicioSesion';
import PagP from './components/PagP';
import Adminspacework from './components/Adminspacework';
import Sectores from './components/tablasAdmin/Sectores';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/pagp" element={<PagP />} />
        <Route path="/adminspacework" element={<Adminspacework />} />
        <Route path="/sectores" element={<Sectores />} />
      </Routes>
    </Router>
  );
  /*
    function maintainSector() {
      let name = prompt("Enter sector name");
      let image = prompt("Enter sector image");
      let op = prompt("Operation {c|m|d}");
  
      fetch(`http://localhost:3001/sector-maintain/${op}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, image }),
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          alert(data);
        });
    }
    useEffect(() => {
    }, []);
  
    return (
      <div>
        {<PaginaPrincipal />}
      </div>
    );*/
}
//export default InicioSesion;
export default App;
//export default PaginaPrincipal;
