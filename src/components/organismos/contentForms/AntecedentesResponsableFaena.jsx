import { useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "../../../supabase/supabase.config";

export function AntecedentesResponsableFaena({ data, setData }) {
  const [query, setQuery] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(false);
  const [cargoSeleccionado, setCargoSeleccionado] = useState(false);

 
  useEffect(() => {
    if (query.length < 2 || personaSeleccionada) {
      setSugerencias([]);
      return;
    }

    const buscar = async () => {
      const { data, error } = await supabase
        .from("colaboradores")
        .select("rut, nombre")
        .ilike("nombre", `%${query}%`)
        .limit(50);

      if (!error && data) {
        const unicos = Object.values(
          data.reduce((acc, cur) => {
            acc[cur.rut] = cur;
            return acc;
          }, {})
        );
        setSugerencias(unicos);
      }
    };

    buscar();
  }, [query, personaSeleccionada]);


  const seleccionarPersona = async (persona) => {
    setPersonaSeleccionada(true);
    setQuery(persona.nombre);
    setSugerencias([]);

    setData({
      ...data,
      nombre_responsable: persona.nombre,
      run_responsable: persona.rut,
      cargo_acreditado: "",
      acreditado: "",
      empresa_acreditadora: "",
    });

    const { data: cargosData } = await supabase
      .from("colaboradores")
      .select("cargo")
      .eq("rut", persona.rut);

    const cargosUnicos = [...new Set(cargosData.map((c) => c.cargo))];
    setCargos(cargosUnicos);
  };


  const seleccionarCargo = async (cargo) => {
    setCargoSeleccionado(true);

    const { data: info } = await supabase
      .from("colaboradores")
      .select("acreditado, empresa_acreditadora")
      .eq("rut", data.run_responsable)
      .eq("cargo", cargo)
      .single();

    setData((prev) => ({
      ...prev,
      cargo_acreditado: cargo,
      acreditado: info?.acreditado ? "Si" : "No",
      empresa_acreditadora: info?.empresa_acreditadora || "",
    }));
  };

  return (
    <Container>
      <section className="box">
        <div className="field autocomplete">
          <label>Nombre Responsable</label>
          <input
            type="text"
            placeholder="Buscar responsable..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPersonaSeleccionada(false);
              setCargoSeleccionado(false);
            }}
          />

          {sugerencias.length > 0 && (
            <ul className="suggestions">
              {sugerencias.map((s) => (
                <li key={s.rut} onClick={() => seleccionarPersona(s)}>
                  <strong>{s.nombre}</strong>
                  <span>{s.rut}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {personaSeleccionada && (
          <div className="field">
            <label>Cargo Acreditado</label>
            <select
              value={data.cargo_acreditado || ""}
              onChange={(e) => seleccionarCargo(e.target.value)}
            >
              <option value="">Seleccionar cargo</option>
              {cargos.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {cargoSeleccionado && (
          <>
            <div className="field">
              <label>RUT Responsable</label>
              <input value={data.run_responsable || ""} disabled />
            </div>

            <div className="field">
              <label>Persona Acreditada</label>
              <input value={data.acreditado || ""} disabled />
            </div>

            <div className="field">
              <label>Empresa Acreditadora</label>
              <input value={data.empresa_acreditadora || ""} disabled />
            </div>

            <div className="field">
              <label>Fuerza de Trabajo</label>
              <input
                type="text"
                placeholder="Fuerza de trabajo"
                value={data.fuerza_de_trabajo || ""}
                onChange={(e) =>
                  setData({ ...data, fuerza_de_trabajo: e.target.value })
                }
              />
            </div>
          </>
        )}
      </section>
    </Container>
  );
}


const Container = styled.div`
  width: 100%;

  .box {
    display: grid;
    grid-template-columns: repeat(2, minmax(240px, 1fr));
    column-gap: 50px;
    row-gap: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
  }

  input,
  select {
    max-width: 240px;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    font-size: 0.9rem;
    
  }

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
  }

  .suggestions {
    color: black;
    position: absolute;
    top: 100%;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    width: 100%;
    max-height: 220px;
    overflow-y: auto;
    z-index: 20;
  }

  .suggestions li {
    padding: 10px 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .suggestions li:hover {
    background: #f1f5f9;
  }

  .suggestions span {
    font-size: 0.75rem;
    color: #64748b;
  }
`;
