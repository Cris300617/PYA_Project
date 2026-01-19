import styled from "styled-components";
import { FormSection } from "../../../index";

export function AntecedentesInspeccion({ data, setData }) {
  return (
    <Container>
        <section className="grid">

          <div className="field sm">
            <label>Fecha IDS</label>
            <input
              type="date"
              value={data.fecha_ids || ""}
              onChange={(e) =>
                setData({ ...data, fecha_ids: e.target.value })
              }
            />
          </div>

          <div className="field sm">
            <label>Hora IDS</label>
            <input
              type="time"
              value={data.hora_ids || ""}
              onChange={(e) =>
                setData({ ...data, hora_ids: e.target.value })
              }
            />
          </div>

          <div className="field full">
            <label>División</label>
            <input
              type="text"
              placeholder="Ej: Distribución Norte"
              value={data.division || ""}
              onChange={(e) =>
                setData({ ...data, division: e.target.value })
              }
            />
          </div>

          <div className="field sm">
            <label>Hora inicio faena</label>
            <input
              type="time"
              value={data.hora_inicio_faena || ""}
              onChange={(e) =>
                setData({ ...data, hora_inicio_faena: e.target.value })
              }
            />
          </div>

          <div className="field sm">
            <label>Hora término faena</label>
            <input
              type="time"
              value={data.hora_termino_faena || ""}
              onChange={(e) =>
                setData({ ...data, hora_termino_faena: e.target.value })
              }
            />
          </div>

          <div className="field full">
            <label>Auditoría inicio</label>
            <input
              type="text"
              placeholder="Nombre o código auditoría"
              value={data.auditoria_inicio || ""}
              onChange={(e) =>
                setData({ ...data, auditoria_inicio: e.target.value })
              }
            />
          </div>

        </section>
    </Container>
  );
}


const Container = styled.div`
  width: 100%;

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px 20px;
    align-items: start;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field.sm input {
    max-width: 180px;
  }

  .field.md input {
    max-width: 260px;
  }

  .field.full {
    grid-column: span 2;
  }

  .field.full input {
    max-width: 100%;
  }

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
  }

  input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    font-size: 0.9rem;
    background: #fff;
    transition: border 0.2s ease, box-shadow 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: #15e47c;
    box-shadow: 0 0 0 2px rgba(21, 228, 124, 0.2);
  }

  @media (max-width: 640px) {
    .field.full {
      grid-column: span 1;
      max-width: 80%;
    }

    .field.sm input,
    .field.md input {
      max-width: 80%;
    }
  }
`;


