import { useState, useEffect } from "react";
import InicioSesion from "./components/InicioSesion.jsx"
import PaginaPrincipal from "./components/PagP.jsx"

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
  <h1> hello, world!</h1>
  );
}
export default InicioSesion;
//export default App;
//export default PaginaPrincipal;
