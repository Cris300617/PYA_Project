import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../supabase/supabase.config";

export function AntecedentesActividad({ data, setData }) {
  const [query, setQuery] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(false);

  const wrapperRef = useRef(null);

  const sociedadCGE = ['CGE Dx - Distribución', 'CGE Sx - Servicios', 'CGE Tx - Transmisión', 'CGE Cx - Comercializadora'];

  const buscarTipo = async (valor = "") => {
    const { data, error } = await supabase
      .from("tipo_actividad")
      .select("tipo")
      .ilike("tipo", `%${valor}%`)
      .limit(30);

    if (!error && data) {
      setSugerencias(data);
    }
  };

  useEffect(() => {
    if (!isFocused || tipoSeleccionado) return;
    buscarTipo(query);
  }, [query, isFocused, tipoSeleccionado]);

  const seleccionarTipo = (item) => {
    setQuery(item.tipo);
    setTipoSeleccionado(true);
    setIsFocused(false);
    setSugerencias([]);

    setData({
      ...data,
      tipo_actividad: item.tipo, 
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
    <Container>
      <section className="box">

        <div className="field autocomplete" ref={wrapperRef}>
          <label>Tipo de Actividad</label>

          <input
            type="text"
            placeholder="Tipo de Actividad"
            value={query}
            onFocus={() => {
              setIsFocused(true);
              buscarTipo("");
            }}
            onChange={(e) => {
              setTipoSeleccionado(false);
              setQuery(e.target.value);
              setData({ ...data, tipo_actividad: e.target.value });
            }}
          />

          {isFocused && sugerencias.length > 0 && (
            <ul className="suggestions">
              {sugerencias.map((item) => (
                <li
                  key={item.tipo}
                  onClick={() => seleccionarTipo(item)}
                >
                  {item.tipo}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="field">
          <label>Sociedad CGE</label>
          <select
            value={data.sociedad_cge || ""}
            onChange={(e) =>
              setData({ ...data, sociedad_cge: e.target.value })
            }
          >
            <option value="">Selecciona una sociedad</option>
            {sociedadCGE.map((sociedad) => (
              <option key={sociedad} value={sociedad}>
                {sociedad}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Existe Alguna Emergencia</label>
          <select
            value={data.emergencia || ""}
            onChange={(e) =>
              setData({ ...data, emergencia: e.target.value })
            }
          >
            <option value="">¿Emergencia?</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="field">
          <label>¿La IDS es Efectiva?</label>
          <select
            value={data.ids_efectiva || ""}
            onChange={(e) =>
              setData({ ...data, ids_efectiva: e.target.value })
            }
          >
            <option value="">¿IDS efectiva?</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="field">
          <label>Descripción</label>
          <input
            value={data.descripcion_actividad || ""}
            onChange={(e) =>
              setData({ ...data, descripcion_actividad: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>¿La IDS posee hallazgos?</label>
          <select
            value={data.ids_con_hallazgo || ""}
            onChange={(e) =>
              setData({ ...data, ids_con_hallazgo: e.target.value })
            }
          >
            <option value="">¿IDS con hallazgo?</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

      </section>
    </Container>
  );
}


const Container = styled.div`
  width: 100%; 

  .box {
    display: grid;
    grid-template-columns: repeat(2, minmax(240px, 1fr)); 
    column-gap: 20px;
    row-gap: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px; 
  }

  input,
  select {
    width: 100%; 
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    font-size: 0.9rem;
    background: #fff;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #15e47c;
    box-shadow: 0 0 0 2px rgba(21, 228, 124, 0.2);
  }

  select:focus {
    outline: none;
    border-color: #15e47c;
    box-shadow: 0 0 0 2px rgba(21, 228, 124, 0.2);
  }

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 5px;
  }

  .autocomplete {
    color: #555454;
    position: relative;
  }

  .suggestions {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    list-style: none;
    padding: 0;
    max-height: 220px;
    overflow-y: auto;
    z-index: 50;
  }

  .suggestions li {
    padding: 10px 12px;
    cursor: pointer;
  }

  .suggestions li:hover {
    background: #f1f5f9;
  }


  @media (max-width: 1024px) {
    .box {
      grid-template-columns: 1fr;
    }
  }


  @media (max-width: 640px) {
    .box {
      gap: 14px;
    }

    input {
      font-size: 0.85rem;
      padding: 11px 12px;
    }
  }
`;
