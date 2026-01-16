import styled from "styled-components";

export function AntecedentesUbicacion({ data, setData }) {
  return (
    <Container>
      <section className="box">

        {/* Fila 1 */}
        <div className="field">
          <label>Región</label>
          <input
            type="text"
            placeholder="Región"
            value={data.region || ""}
            onChange={(e) =>
              setData({ ...data, region: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>Zona</label>
          <input
            type="text"
            placeholder="Zona"
            value={data.zona || ""}
            onChange={(e) =>
              setData({ ...data, zona: e.target.value })
            }
          />
        </div>

        {/* Fila 2 */}
        <div className="field">
          <label>Delegación</label>
          <input
            type="text"
            placeholder="Delegación"
            value={data.delegacion || ""}
            onChange={(e) =>
              setData({ ...data, delegacion: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>Dirección</label>
          <input
            type="text"
            placeholder="Dirección"
            value={data.direccion || ""}
            onChange={(e) =>
              setData({ ...data, direccion: e.target.value })
            }
          />
        </div>

        {/* Fila 3 */}
        <div className="field">
          <label>Latitud</label>
          <input
            type="number"
            step="any"
            placeholder="Latitud"
            value={data.geo_latitud ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                geo_latitud:
                  e.target.value === "" ? null : parseFloat(e.target.value),
              })
            }
          />
        </div>

        <div className="field">
          <label>Longitud</label>
          <input
            type="number"
            step="any"
            placeholder="Longitud"
            value={data.geo_longitud ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                geo_longitud:
                  e.target.value === "" ? null : parseFloat(e.target.value),
              })
            }
          />
        </div>

        {/* Fila 4 */}
        <div className="field">
          <label>Altitud</label>
          <input
            type="number"
            step="any"
            placeholder="Altitud"
            value={data.geo_altitud ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                geo_altitud:
                  e.target.value === "" ? null : parseFloat(e.target.value),
              })
            }
          />
        </div>

      </section>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  .box {
    display: grid;
    grid-template-columns: repeat(2, minmax(240px, 1fr)); /* 2 columnas, mínimo 240px */
    column-gap: 20px;
    row-gap: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px; /* espacio entre label y input */
  }

  input {
    width: 100%; /* ocupa toda la columna */
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

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 5px;
  }
`;
