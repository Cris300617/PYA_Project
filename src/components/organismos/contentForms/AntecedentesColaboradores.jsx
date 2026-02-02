import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { supabase } from "../../../supabase/supabase.config";

const crearColaborador = () => ({
  id: crypto.randomUUID(),
  rut_colaborador: "",
  nombre_colaborador: "",
  cargo_colaborador: "",
  acreditado_colaborador: "",
  empresa_colaborador: "",
});

export function AntecedentesColaboradores({
  colaboradores = [],
  setColaboradores,
}) {
  const [sugerencias, setSugerencias] = useState({});
  const [cargos, setCargos] = useState({});
  const [personaSeleccionada, setPersonaSeleccionada] = useState({});
  const wrapperRef = useRef({});


  const buscarRut = async (index, valor) => {
  if (!valor || valor.trim().length < 1) {
    setSugerencias((prev) => ({ ...prev, [index]: [] }));
    return;
  }

  const palabras = valor
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  let query = supabase
    .from("colaboradores")
    .select("rut, nombre");

  palabras.forEach((p) => {
    query = query.ilike("nombre", `%${p}%`);
  });

  const { data, error } = await query.limit(50);

  if (error || !data) return;

  const unicos = Object.values(
    data.reduce((acc, cur) => {
      const key = `${cur.rut}-${cur.nombre}`;
      acc[key] = cur;
      return acc;
    }, {})
  );

  setSugerencias((prev) => ({ ...prev, [index]: unicos }));
};



useEffect(() => {
  const handleClickOutside = (e) => {
    Object.keys(wrapperRef.current).forEach((key) => {
      if (
        wrapperRef.current[key] &&
        !wrapperRef.current[key].contains(e.target)
      ) {
        setSugerencias((prev) => ({ ...prev, [key]: [] }));
      }
    });
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
}, []);


  const seleccionarPersona = async (index, persona) => {
    actualizarColaborador(index, {
      rut_colaborador: persona.rut,
      nombre_colaborador: persona.nombre,
      cargo_colaborador: "",
      acreditado_colaborador: "",
      empresa_colaborador: "",
    });

    setPersonaSeleccionada((prev) => ({ ...prev, [index]: true }));
    setSugerencias((prev) => ({ ...prev, [index]: [] }));

    const { data } = await supabase
      .from("colaboradores")
      .select("cargo")
      .eq("rut", persona.rut);

    const cargosUnicos = [...new Set(data.map((c) => c.cargo))];
    setCargos((prev) => ({ ...prev, [index]: cargosUnicos }));
  };


  const seleccionarCargo = async (index, cargo) => {
    const rut = colaboradores[index].rut_colaborador;

    const { data } = await supabase
      .from("colaboradores")
      .select("acreditado, empresa_acreditadora")
      .eq("rut", rut)
      .eq("cargo", cargo)
      .single();

    actualizarColaborador(index, {
      cargo_colaborador: cargo,
      acreditado_colaborador: data?.acreditado ? "Si" : "No",
      empresa_colaborador: data?.empresa_acreditadora || "",
    });
  };

  const actualizarColaborador = (index, cambios) => {
    setColaboradores((prev) =>
      prev.map((c, i) => (i === index ? { ...c, ...cambios } : c))
    );
  };

  const agregarColaborador = () => {
    setColaboradores((prev) => [...prev, crearColaborador()]);
  };

  const eliminarColaborador = (id) => {
    setColaboradores((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Container>
      {colaboradores.map((c, index) => (
        <Card key={c.id}>
          <Header>
            <h4>Colaborador #{index + 1}</h4>
            {colaboradores.length > 1 && (
              <button onClick={() => eliminarColaborador(c.id)}>✕</button>
            )}
          </Header>

          <Field ref={(el) => (wrapperRef.current[index] = el)}>

            <label>Nombre Colaborador</label>
            <input
              value={c.nombre_colaborador}
              placeholder="Buscar por nombre..."
              onFocus={() => buscarRut(index, c.nombre_colaborador)}
              onChange={(e) => {
                actualizarColaborador(index, {
                  nombre_colaborador: e.target.value,
                });
                setPersonaSeleccionada((prev) => ({ ...prev, [index]: false }));
                buscarRut(index, e.target.value);
              }}
            />



            {sugerencias[index]?.length > 0 && (
              <Autocomplete>
                <ul className="suggestions">
                  {sugerencias[index].map((s) => (
                  <li
                    key={s.nombre}
                    onClick={() => seleccionarPersona(index, s)}
                  >
                    <strong>{s.nombre}</strong>
                    <span>{s.rut}</span>
                  </li>
                ))}

                </ul>
                
              </Autocomplete>
            )}
          </Field>


          {personaSeleccionada[index] && (
            <Field>
              <label>Cargo</label>
              <select
                value={c.cargo_colaborador}
                onChange={(e) =>
                  seleccionarCargo(index, e.target.value)
                }
              >
                <option value="">Seleccionar cargo</option>
                {cargos[index]?.map((cargo) => (
                  <option key={cargo} value={cargo}>
                    {cargo}
                  </option>
                ))}
              </select>
            </Field>
          )}

          <Grid>
            <Field>
              <label>Rut colaborador</label>
              <input value={c.rut_colaborador} disabled />
            </Field>

            <Field>
              <label>Acreditado</label>
              <input value={c.acreditado_colaborador} disabled />
            </Field>

            <Field>
              <label>Empresa</label>
              <input value={c.empresa_colaborador} disabled />
            </Field>
          </Grid>
        </Card>
      ))}

      <AddButton onClick={agregarColaborador} type="button">
        + Agregar colaborador
      </AddButton>
    </Container>
  );
}




const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    border: none;
    background: #ef4444;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    padding: 4px 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  min-width:180px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;


const Field = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 180px;

  label {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 4px;
    color: #475569;
  }

  input{
    width: 100%;
    max-width: 160px;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
  }

  select{
    width: 100%;
    max-width: 180px;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
  }
`;

const Autocomplete = styled.ul`

  /* position: absolute;
  color: black;
  top: 64px;
  width: 100%;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  z-index: 20;
  list-style: none;
  padding: 0;
  margin: 0;

  max-height: 220px;
  overflow-y: auto; */

  .suggestions {
    color: black;
    position: absolute;
    top: 80%;
    left: 0;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
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


const AddButton = styled.button`
  align-self: flex-start;
  padding: 10px 16px;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
