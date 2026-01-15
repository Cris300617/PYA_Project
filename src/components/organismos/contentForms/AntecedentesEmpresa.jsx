import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function AntecedentesEmpresa({ data, setData }) {
  return (
    <Container>
      <section className="box">

        <input
          type="text"
          placeholder="Rut Empresa"
          value={data.rut_empresa || ""}
          onChange={(e) =>
            setData({
              ...data,
              rut_empresa: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Nombre Empresa"
          value={data.nombre_empresa || ""}
          onChange={(e) =>
            setData({
              ...data,
              nombre_empresa: e.target.value,
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
