import React, { useContext, useState, useEffect } from 'react';

export async function CalcularSeguridad() {
  try {
    const response = await fetch("http://localhost:3001/calcular-indice", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    if (data.success) {
      console.log(data.result);
      return data.result; // Devuelve el índice de seguridad
    } else {
      console.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching índice de seguridad:", error);
    return null;
  }
}


