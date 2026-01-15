import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { supabase } from "../../supabase/supabase.config"; 
import * as XLSX from 'xlsx';

export function TablaForms() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    correo: "",
    telefono: "",
    profesion: "",
  });


  useEffect(() => {
    obtenerDatos();
  }, []);

  async function obtenerDatos() {
    const { data, error } = await supabase
      .from("tablaprueba1")
      .select("*")
      .order("id", { ascending: true }); 
    if (error) {
      console.error("Error al obtener datos:", error);
    } else {
      setData(data);
    }
  }

  return (
    <div>

      <Container>
        <table>
          <thead>
            <tr>
              <th>Nº</th>
              <th>Nombre</th>
              <th>Rut</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Profesion</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.id || idx}>
                <td>{row.id || idx + 1}</td>
                <td>{row.nombre}</td>
                <td>{row.rut}</td>
                <td>{row.correo}</td>
                <td>{row.telefono}</td>
                <td>{row.profesion}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={exportarExcel}>Exportar a Excel</button>
      </Container>
    </div>
  );
}

const Container = styled.div`
    width: 100%;
    max-width: 1000px;
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid black;
    max-height: 400px;
    overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  th, td {
    color: black;
    border: 1px solid #d1d1d1; 
    padding: 12px;
    vertical-align: top;
    white-space: nowrap;       
    overflow: hidden;          
    text-overflow: ellipsis;    
  }

  th {
    background-color: #f2f4f8;
    font-weight: 600;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  tbody tr:hover {
    background-color: #f0f8ff;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(47, 143, 120, 0.5);
    border-radius: 4px;
    min-height: 30px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
`;
