import { useState } from "react";
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
  const [resultados, setResultados] = useState({});

  const buscarColaborador = async (rut, index) => {
    if (!rut || rut.length < 3) {
      setResultados((prev) => ({ ...prev, [index]: [] }));
      return;
    }

    const { data, error } = await supabase
      .from("colaboradores") 
      .select("rut, nombre, cargo, acreditado, empresa_acreditadora")
      .like("rut", `%${rut}%`) 
      .limit(10);

    if (!error && data) {
      setResultados((prev) => ({
        ...prev,
        [index]: data,
      }));
    } else {
      console.error("Error buscando colaborador:", error);
    }
  };

  const seleccionarColaborador = (index, c) => {
    actualizarColaborador(index, {
      rut_colaborador: c.rut || "",
      nombre_colaborador: c.nombre || "",
      cargo_colaborador: c.cargo || "",
      acreditado_colaborador: c.acreditado ? "Si" : "No",
      empresa_colaborador: c.empresa_acreditadora || "",
    });

    setResultados((prev) => ({ ...prev, [index]: [] }));
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
              <button type="button" onClick={() => eliminarColaborador(c.id)}>
                ✕
              </button>
            )}
          </Header>

          <Field>
            <label>RUT Colaborador</label>
            <input
              value={c.rut_colaborador}
              onChange={(e) => {
                actualizarColaborador(index, {
                  rut_colaborador: e.target.value,
                });
                buscarColaborador(e.target.value, index);
              }}
              placeholder="Ej: 12.345.678-9"
            />

            {resultados[index]?.length > 0 && (
              <Autocomplete>
                {resultados[index].map((r, i) => (
                  <li key={i} onClick={() => seleccionarColaborador(index, r)}>
                    {r.rut} – {r.nombre}
                  </li>
                ))}
              </Autocomplete>
            )}
          </Field>

          <Grid>
            <Field>
              <label>Nombre</label>
              <input value={c.nombre_colaborador} disabled />
            </Field>

            <Field>
              <label>Cargo</label>
              <input value={c.cargo_colaborador} disabled />
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

      <AddButton type="button" onClick={agregarColaborador}>
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

  input {
    width: 100%;
    max-width: 160px;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
  }
`;

const Autocomplete = styled.ul`
  position: absolute;
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

  li {
    padding: 8px 10px;
    cursor: pointer;

    &:hover {
      background: #f1f5f9;
    }
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
