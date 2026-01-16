import styled from "styled-components";
import { FormSection } from "../../../index";

export function AntecedentesEmpresa({ data, setData }) {
  return (
    <Container>
        <section className="grid">

          <div className="field">
            <label>RUT Empresa</label>
            <input
              type="text"
              placeholder="Ej: 76.123.456-7"
              value={data.rut_empresa || ""}
              onChange={(e) =>
                setData({ ...data, rut_empresa: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label>Nombre Empresa</label>
            <input
              type="text"
              placeholder="Ej: CGE Distribución S.A."
              value={data.nombre_empresa || ""}
              onChange={(e) =>
                setData({ ...data, nombre_empresa: e.target.value })
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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px 20px;
}


  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-right: 20px;
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
`;
