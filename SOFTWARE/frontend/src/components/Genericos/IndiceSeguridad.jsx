import React, { useContext, useState, useEffect } from 'react';

export default function CalcularIndiceSeguridad() {
    const [indiceSeguridad, setIndiceSeguridad] = useState(null);

    function Calcular_indice_seguridad() {
        //Funcion para mostrar las filas
        fetch("http://localhost:3001/calcular-indice", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              console.log(data.result);
          }})
          .catch((error) => {
            console.error(error);
          });
      }
    

    useEffect(() => {
        Calcular_indice_seguridad();
    }, []);
}

