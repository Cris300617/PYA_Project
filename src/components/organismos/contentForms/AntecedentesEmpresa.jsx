import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { supabase } from "../../../supabase/supabase.config";

export function AntecedentesEmpresa({ data, setData }) {
  const [query, setQuery] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  const buscarEmpresas = async (valor = "") => {
    const { data, error } = await supabase
      .from("empresas_contratistas")
      .select("rut_empresa, nombre_empresa")
      .ilike("rut_empresa", `%${valor}%`)
      .order("rut_empresa")
      .limit(200);

    if (!error && data) {
      setSugerencias(data);
    }
  };

  useEffect(() => {
    if (!isFocused || empresaSeleccionada) return;
    buscarEmpresas(query);
  }, [query, isFocused, empresaSeleccionada]);

  const seleccionarEmpresa = (empresa) => {
    setEmpresaSeleccionada(true);
    setIsFocused(false);
    setQuery(empresa.rut_empresa);
    setSugerencias([]);

    setData({
      ...data,
      rut_empresa: empresa.rut_empresa,
      nombre_empresa: empresa.nombre_empresa,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsFocused(false);
        setSugerencias([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Container ref={wrapperRef}>
      <section className="grid">

        <div className="field autocomplete">
          <label>RUT Empresa</label>
          <input
            type="text"
            placeholder="Ej: 76.123.456-7"
            value={query}
            onFocus={() => {
              setIsFocused(true);
              buscarEmpresas("");
            }}
            onChange={(e) => {
              setEmpresaSeleccionada(false);
              setQuery(e.target.value);
              setData({ ...data, rut_empresa: e.target.value });
            }}
          />

          {isFocused && sugerencias.length > 0 && (
            <ul className="suggestions">
              {sugerencias.map((e) => (
                <li
                  key={e.rut_empresa}
                  onClick={() => seleccionarEmpresa(e)}
                >
                  <strong>{e.rut_empresa}</strong>
                  <span>{e.nombre_empresa}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {empresaSeleccionada && (
          <div className="field">
            <label>Nombre Empresa</label>
            <input
              type="text"
              value={data.nombre_empresa || ""}
              disabled
            />
          </div>
        )}

      </section>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px 20px;
  }

  .field {
    color: #7496e0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
  }

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
  }

  input {
    width: 100%;
    max-width: 180px;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    font-size: 0.9rem;
    background: #fff;
  }

  input:focus {
    outline: none;
    border-color: #15e47c;
    box-shadow: 0 0 0 2px rgba(21, 228, 124, 0.2);
  }

  .suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    margin-top: 4px;
    list-style: none;
    padding: 0;
    max-height: 220px;
    overflow-y: auto;
    z-index: 20;
  }

  .suggestions li {
    padding: 10px 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .suggestions li:hover {
    background: #f1f5f9;
  }

  .suggestions span {
    font-size: 0.75rem;
    color: #64748b;
  }
`;
