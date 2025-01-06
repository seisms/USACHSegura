import React, { useState, useEffect } from 'react';

export async function NotificarReporte() {
    try {
        const response = await fetch("http://localhost:3001/listar/reportes_a_notificar", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
        });
    
        const data = await response.json();

        if (data.success) {
            console.log("Reportes recientes:", data.result);

            // Notificar a los usuarios del sector del reporte
            try {
                for( const reporte of data.result) {
                    console.log('Notificando reporte del sector:', reporte.rep_sector);
                    const usuarios = await fetch(`http://localhost:3001/listar/usuarios_por_sector/${reporte.rep_sector}`, {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json",
                        },
                    });

                    const usuarios_data = await usuarios.json();
                    console.log("Resultado de notificar usuarios: ", usuarios_data);

                    // En este lado se conoce los usuarios que deben ser notificados sobre el reporte
                    if(usuarios_data.success){
                        console.log('Usuarios a notificar: ', usuarios_data.result);
                        const usuariosANotificar = usuarios_data.result;
                    } else {
                        console.error(`No hay usuarios en el sector ${reporte.rep_sector}`);
                    }
                }
            } catch (error) {
                console.error("Error al listar usuarios por sector:", error);
            }

            return data.result; // Devuelve la notificación de reporte
        } else {
            console.error(data.message);
            return null;
        }
    } catch (error) {
        console.error("Error fetching notificación de reporte:", error);
        return null;
    }
}