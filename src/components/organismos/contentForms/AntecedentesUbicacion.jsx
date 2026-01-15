import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function AntecedentesUbicacion({ data, setData }) {
  return (
    <Container>
      <section className="box">

        <input
          type="text"
          placeholder="Region"
          value={data.region || ""}
          onChange={(e) =>
            setData({
              ...data,
              region: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Zona"
          value={data.zona || ""}
          onChange={(e) =>
            setData({
              ...data,
              zona: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Delegacion"
          value={data.delegacion || ""}
          onChange={(e) =>
            setData({
              ...data,
              delegacion: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Direccion"
          value={data.direccion || ""}
          onChange={(e) =>
            setData({
              ...data,
              direccion: e.target.value,
            })
          }
        />

        <input
          type="number"
          step="any"
          placeholder="Latitud"
          value={data.geo_latitud ?? ""}
          onChange={(e) =>
            setData({
              ...data,
              geo_latitud: e.target.value === ""
                ? null
                : parseFloat(e.target.value),
            })
          }
        />

        <input
          type="number"
          step="any"
          placeholder="Longitud"
          value={data.geo_longitud ?? ""}
          onChange={(e) =>
            setData({
              ...data,
              geo_longitud: e.target.value === ""
                ? null
                : parseFloat(e.target.value),
            })
          }
        />

        <input
          type="number"
          step="any"
          placeholder="Altitud"
          value={data.geo_altitud ?? ""}
          onChange={(e) =>
            setData({
              ...data,
              geo_altitud: e.target.value === ""
                ? null
                : parseFloat(e.target.value),
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

  select,
  input {
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
  }
`;
