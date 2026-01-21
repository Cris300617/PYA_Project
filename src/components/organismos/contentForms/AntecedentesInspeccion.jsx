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

            <select
              value={data.division}
              onChange={(e) =>
                setData({
                  ...data,
                  division: e.target.value,
                })
              }
            >
              <option value="">Seleccionar opción</option>
              <option value="Seguridad y Salud">Seguridad y Salud</option>
              <option value="Calidad y Medio Ambiente">Calidad y Medio Ambiente</option>
              <option value="Linea_Roja">Linea Roja</option>
            </select>
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

            <label className="switch">
              <input
                type="checkbox"
                checked={!!data.auditoria_inicio}
                onChange={(e) =>
                  setData({
                    ...data,
                    auditoria_inicio: e.target.checked,
                  })
                }
              />
              <span className="slider" />
              <span className="switch-label">
                {data.auditoria_inicio ? "Sí" : "No"}
              </span>
            </label>
          </div>

        </section>
    </Container>
  );
}


const Container = styled.div`
  width: 100%;


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

  select {
    width: 240px;
    max-width: 208px;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    font-size: 0.9rem;
    background: #fff;
  }

  select:focus {
    outline: none;
    border-color: #15e47c;
    box-shadow: 0 0 0 2px rgba(21, 228, 124, 0.2);
  }

  .switch {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.switch input {
  display: none;
}

.slider {
  position: relative;
  width: 46px;
  height: 26px;
  background-color: #cbd5e1;
  border-radius: 999px;
  transition: background-color 0.25s ease;
}

.slider::before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  top: 3px;
  left: 3px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.25s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Cuando está activo */
.switch input:checked + .slider {
  background-color: #15e47c;
}

.switch input:checked + .slider::before {
  transform: translateX(20px);
}

.switch-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
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


