import styled from "styled-components";
import { FormSection } from "../../../index";

export function AntecedentesObra({ data, setData }) {
  return (
    <Container>
        <section className="box">
      <label>Documento Asociado</label>

      <div className="row">
        <select
          required
          value={data.tipo_obra}
          onChange={(e) =>
            setData({
              ...data,
              tipo_obra: e.target.value,
              codigo_obra: "",
            })
          }
        >
          <option value="">Seleccionar opción</option>
          <option value="codigo_obra">Código de Obra</option>
          <option value="permiso">Permiso Documento</option>
          <option value="otro">Otro</option>
        </select>

        {data.tipo_obra && (
          <input
            required
            type="text"
            placeholder={
              data.tipo_obra === "codigo_obra"
                ? "Ingrese código de obra"
                : data.tipo_obra === "permiso"
                ? "Ingrese permiso del documento"
                : "Ingrese descripción"
            }
            value={data.codigo_obra}
            onChange={(e) =>
              setData({
                ...data,
                codigo_obra: e.target.value,
              })
            }
          />
        )}
      </div>
    </section>
        
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

    .box {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
  }


    .row {
    display: flex;
    gap: 14px;
    align-items: center;
    width: 100%;
  }


  select {
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

  input {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    font-size: 0.9rem;
    background: #fff;
  }

  input:focus {
    outline: none;
    border-color: #15e47c;
    box-shadow: 0 0 0 2px rgba(21, 228, 124, 0.2);
  }

  p{
    color: black;
  }

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 5px;
  }

    @media (max-width: 1024px) {
      .row {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
      }

      select,
      input {
        flex: 1;
        width: 100%;
        min-width: 140px;
      }
    }


    @media (min-width: 1025px) {
  .row {
    flex-direction: row;
  }

  select {
    width: 180px; 
  }

  input {
    flex: 1;
    min-width: 0;
  }
}



`;
