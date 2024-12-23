import { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import InicioSesion from "./components/InicioSesion.jsx"
>>>>>>> 9b836ff7b2fb66d4094aa46f055e4b1c807d79c6
import PaginaPrincipal from "./components/PagP.jsx"
import InicioSesion from "./components/InicioSesion.jsx"

function App() {

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
      {<PaginaPrincipal/>}
    </div>
  );
}

export default App;
