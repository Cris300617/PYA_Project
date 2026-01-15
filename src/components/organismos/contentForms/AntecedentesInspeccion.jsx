import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function AntecedentesInspeccion({ data, setData }) {
  return (
    <Container>
      <section className="box">
  
        <DatePicker
          selected={data.fecha_ids ? new Date(data.fecha_ids) : null}
          onChange={(date) =>
            setData({
              ...data,
              fecha_ids: date,
            })
          }
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/MM/yyyy"
          isClearable
        />

        <input
          type="time"
          value={data.hora_ids || ""}
          onChange={(e) =>
            setData({
              ...data,
              hora_ids: e.target.value,
            })
          }
        />

        <input
          type="text"
          value={data.division || ""}
          onChange={(e) =>
            setData({
              ...data,
              division: e.target.value,
            })
          }
        />

        <input
          type="time"
          value={data.hora_inicio_faena || ""}
          onChange={(e) =>
            setData({
              ...data,
              hora_inicio_faena: e.target.value,
            })
          }
        />

        <input
          type="time"
          value={data.hora_termino_faena || ""}
          onChange={(e) =>
            setData({
              ...data,
              hora_termino_faena: e.target.value,
            })
          }
        />

        <input
          type="text"
          value={data.auditoria_inicio || ""}
          onChange={(e) =>
            setData({
              ...data,
              auditoria_inicio: e.target.value,
            })
          }
        />
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
`;
