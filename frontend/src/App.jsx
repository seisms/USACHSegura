import { useState, useEffect } from "react";
//import InicioSesion from "./components/InicioSesion.jsx"
import PaginaPrincipal from "./components/PagP.jsx"

function App() {
  const [users, setUsers] = useState(false);

  function getUsers() {
    fetch("http://localhost:3001")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setUsers(data);
      });
  }

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
        maintainSector();
      });
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <button>{users ? users : "There are no users"}</button>
      <br />
      <button onClick={maintainSector}> Add sector </button>
    </div>
  );
}
//export default InicioSesion;
//export default App;
export default PaginaPrincipal;
