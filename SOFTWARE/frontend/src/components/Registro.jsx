import { useState, useEffect } from "react";
import Cabecera from "./Cabecera";
import "./css/registro.css";

export default function Registro() {
    const [opTUsuario, setOpTUsuario] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [formData, setFormData] = useState({
        correo: "",
        telefono: "",
        contrasena: "",
        repetirContrasena: "",
        checkboxes: [],
    });

    function consultarTUsuario() {
        fetch("http://localhost:3001/listar/tusuarios", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.result)
                    const filtered = data.result.filter(item =>
                        item.tu_tnombre !== "Administrador");
                    setOpTUsuario(filtered || []);
                } else {
                    setFeedback("No hay tipos de usuario  para listar");
                }
            })
            .catch((error) => {
                console.error(error);
                setFeedback("No se pudo cargar la tabla.");
            });
    }

    useEffect(() => {
        consultarTUsuario();
    }, []);

    function control_de_registro(event) {
        event.preventDefault();

        // Validar campos vacíos
        if (
            !formData.correo ||
            !formData.telefono ||
            !formData.contrasena ||
            !formData.repetirContrasena
        ) {
            setFeedback("Por favor, complete todos los campos.");
            return;
        }

        // Validar que las contraseñas coincidan
        if (formData.contrasena !== formData.repetirContrasena) {
            setFeedback("Las contraseñas no coinciden.");
            return;
        }

        // Recopilar los checkboxes seleccionados
        const selectedCheckboxes = Array.from(
            document.querySelectorAll("input[type='checkbox']:checked")
        ).map((checkbox) => checkbox.value);

        // Preparar los datos para enviar
        const payload = {
            email: formData.correo,
            password: formData.contrasena,
            phone: formData.telefono,
            usertype: selectedCheckboxes,
        };

        console.log(payload);

        // Enviar los datos al backend
        fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                // Verificar si la respuesta es válida
                if (!response.ok) {
                    return response.json().then((data) => {
                        if (data.message.includes("duplicate key")) {
                            throw new Error("El usuario que intentó registrar ya existe")
                        } else {
                            throw new Error(data.message || "Error al registrar el usuario.");
                        }
                    });
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setFeedback("Usuario registrado con éxito.");
                    setFormData({
                        correo: "",
                        telefono: "",
                        contrasena: "",
                        repetirContrasena: "",
                        checkboxes: [],
                    }); // Limpiar formulario
                } else {
                    setFeedback(data.message || "Error al registrar el usuario.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setFeedback(error.message || "Error interno del servidor.");
            });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className="fondo-sing-in">
            <Cabecera />
            <h1>Nuevo Usuario</h1>
            <div className="fondo-form-sing-in">
                <form onSubmit={control_de_registro} className="form-sing-in">
                    <div className="form-sing-in-labelinput">
                        <label htmlFor="correo">Correo:</label>
                        <input
                            type="text"
                            name="correo"
                            value={formData.correo}
                            onChange={handleInputChange}
                            placeholder="nombre.apellido@usach.cl"
                        />
                    </div>
                    <div className="form-sing-in-labelinput">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            placeholder="+56912345678"
                        />
                    </div>
                    <div className="form-sing-in-checkbox">
                        {opTUsuario.length > 0 ? (
                            <div>
                                {opTUsuario.map((TUsuario, index) => (
                                    <div key={index} className="checkbox-item">
                                        <input
                                            id={`checkbox-${index}`}
                                            type="checkbox"
                                            value={TUsuario.tu_tid}
                                        />
                                        <label htmlFor={`checkbox-${index}`}>
                                            {TUsuario.tu_tnombre}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No se encontraron sectores frecuentados.</p>
                        )}
                    </div>
                    <div className="form-sing-in-labelinput">
                        <label htmlFor="contrasena">Contraseña:</label>
                        <input
                            type="password"
                            name="contrasena"
                            value={formData.contrasena}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-sing-in-labelinput">
                        <label htmlFor="repetirContrasena">Repetir Contraseña:</label>
                        <input
                            type="password"
                            name="repetirContrasena"
                            value={formData.repetirContrasena}
                            onChange={handleInputChange}
                        />
                    </div>
                    {feedback && <p className="feedback">{feedback}</p>}
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}
