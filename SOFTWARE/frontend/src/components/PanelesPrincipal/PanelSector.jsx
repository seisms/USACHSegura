import React, { useState, useEffect } from "react";
import Cabecera from "../Cabecera";
import Cookies from "js-cookie"

function PanelSector({ handleSelect, sector }) {

    const email = Cookies.get("username");
    const userType = Cookies.get("usertype");
    const { sec_nombre, sec_imagen, sec_seguridad } = sector;
    const [infoSector, setInfoSector] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [detalleVisible, setDetalleVisible] = useState(null);

    function InformacionSector(){
        console.log("Obteniendo informacion del sector: ", sec_nombre);
        fetch(`http://localhost:3001/info/sector/${sec_nombre}`,
            {
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
                    setInfoSector(data.result);
                } else {
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }

    const toggleDetalle = (index) => {
        setDetalleVisible(detalleVisible === index ? null : index);
    };

    useEffect(() => {
        InformacionSector()
    }, [sec_nombre])
    
    return (
        <div>
            {loading && <p>Cargando...</p>}
        </div>
    );
}

export default PanelSector;
