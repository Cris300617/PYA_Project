import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function AntecedentesResponsableFaena({ data, setData }) {
  return (
    <Container>
      <section className="box">

        {/* Primera fila */}
        <div className="field">
          <label>RUT Responsable</label>
          <input
            type="text"
            placeholder="RUT Responsable"
            value={data.run_responsable || ""}
            onChange={(e) =>
              setData({ ...data, run_responsable: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>Nombre Responsable</label>
          <input
            type="text"
            placeholder="Nombre Responsable"
            value={data.nombre_responsable || ""}
            onChange={(e) =>
              setData({ ...data, nombre_responsable: e.target.value })
            }
          />
        </div>

        {/* Segunda fila */}
        <div className="field">
          <label>Persona Acreditada</label>
          <input
            type="text"
            placeholder="Persona Acreditada"
            value={data.acreditado || ""}
            onChange={(e) =>
              setData({ ...data, acreditado: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>Cargo Acreditado</label>
          <input
            type="text"
            placeholder="Cargo Acreditado"
            value={data.cargo_acreditado || ""}
            onChange={(e) =>
              setData({ ...data, cargo_acreditado: e.target.value })
            }
          />
        </div>

        {/* Tercera fila */}
        <div className="field">
          <label>Empresa Acreditadora</label>
          <select
            value={data.empresa_acreditadora}
            onChange={(e) =>
              setData({ ...data, empresa_acreditadora: e.target.value })
            }
          >
            <option value="">Seleccionar opción</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="field">
          <label>Fuerza de Trabajo</label>
          <select
            value={data.fuerza_de_trabajo ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                fuerza_de_trabajo:
                  e.target.value === "" ? null : parseInt(e.target.value, 10),
              })
            }
          >
            <option value="">Seleccionar opción</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
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
    max-width: 240px; 
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
`;


