import styled from "styled-components";

export function AntecedentesObra({ data, setData }) {
  return (
    <Container>
      <section className="box">
        <select
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
        </select>

        {data.tipo_obra === "codigo_obra" && (
          <input
            type="text"
            placeholder="Ingrese código de obra"
            value={data.codigo_obra}
            onChange={(e) =>
              setData({
                ...data,
                codigo_obra: e.target.value,
              })
            }
          />
        )}
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

  select,
  input {
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
  }
`;
