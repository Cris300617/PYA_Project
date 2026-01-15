import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function AntecedentesResponsableFaena({ data, setData }) {
  return (
    <Container>
      <section className="box">

        <input
          type="text"
          placeholder="RUT Responsable"
          value={data.run_responsable || ""}
          onChange={(e) =>
            setData({
              ...data,
              run_responsable: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Nombre Responsable"
          value={data.nombre_responsable || ""}
          onChange={(e) =>
            setData({
              ...data,
              nombre_responsable: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Persona Acreditada"
          value={data.acreditado || ""}
          onChange={(e) =>
            setData({
              ...data,
              acreditado: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Cargo Acreditado"
          value={data.cargo_acreditado || ""}
          onChange={(e) =>
            setData({
              ...data,
              cargo_acreditado: e.target.value,
            })
          }
        />

        <select
          value={data.empresa_acreditadora}
          onChange={(e) =>
            setData({
              ...data,
              empresa_acreditadora: e.target.value,
            })
          }
        >
          <option value="">Seleccionar opción</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>

        <select
          value={data.fuerza_de_trabajo ?? ""}
          onChange={(e) =>
            setData({
              ...data,
              fuerza_de_trabajo:
                e.target.value === ""
                  ? null
                  : parseInt(e.target.value, 10),
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

      </section>
    </Container>
  );
}

const Container = styled.div`
  .box {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  input,
  .react-datepicker-wrapper {
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
  }

  select,
  input {
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
  }
`;
