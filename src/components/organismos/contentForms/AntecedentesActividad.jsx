import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function AntecedentesActividad({ data, setData }) {
  return (
    <Container>
      <section className="box">

        <input
          type="text"
          placeholder="Tipo de Actividad"
          value={data.tipo_actividad || ""}
          onChange={(e) =>
            setData({
              ...data,
              tipo_actividad: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Sociedad CGE"
          value={data.sociedad_cge || ""}
          onChange={(e) =>
            setData({
              ...data,
              sociedad_cge: e.target.value,
            })
          }
        />

        <select
          value={data.emergencia}
          onChange={(e) =>
            setData({
              ...data,
              emergencia: e.target.value,
            })
          }
        >
          <option value="">Seleccionar opción</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>

        <select
          value={data.ids_efectiva}
          onChange={(e) =>
            setData({
              ...data,
              ids_efectiva: e.target.value,
            })
          }
        >
          <option value="">Seleccionar opción</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>

        <input
          type="text"
          placeholder="Descripcion"
          value={data.descripcion || ""}
          onChange={(e) =>
            setData({
              ...data,
              descripcion: e.target.value,
            })
          }
        />

        <select
          value={data.ids_con_hallazgo}
          onChange={(e) =>
            setData({
              ...data,
              ids_con_hallazgo: e.target.value,
            })
          }
        >
          <option value="">Seleccionar opción</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
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
