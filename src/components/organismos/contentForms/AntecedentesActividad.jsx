import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

export function AntecedentesActividad({ data, setData }) {
  return (
    <Container>
      <section className="box">

        {/* Fila 1 */}
        <div className="field">
          <label>Tipo de Actividad</label>
          <input
            type="text"
            placeholder="Tipo de Actividad"
            value={data.tipo_actividad || ""}
            onChange={(e) =>
              setData({ ...data, tipo_actividad: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>Sociedad CGE</label>
          <input
            type="text"
            placeholder="Sociedad CGE"
            value={data.sociedad_cge || ""}
            onChange={(e) =>
              setData({ ...data, sociedad_cge: e.target.value })
            }
          />
        </div>

        {/* Fila 2 */}
        <div className="field">
          <label>Existe Alguna Emergencia</label>
          <select
            value={data.emergencia}
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
            value={data.ids_efectiva}
            onChange={(e) =>
              setData({ ...data, ids_efectiva: e.target.value })
            }
          >
            <option value="">¿IDS efectiva?</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Fila 3 */}
        <div className="field">
          <label>Descripcion</label>
          <input
            type="text"
            placeholder="Descripción"
            value={data.descripcion || ""}
            onChange={(e) =>
              setData({ ...data, descripcion: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>¿La IDS posee hallazgos?</label>
          <select
            value={data.ids_con_hallazgo}
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
