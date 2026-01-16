import styled from "styled-components";

export function AntecedentesHallazgos({ hallazgos, setHallazgos }) {
  const agregarHallazgo = () => {
    setHallazgos([...hallazgos, { descripcion: "" }]);
  };

  const eliminarHallazgo = (index) => {
    setHallazgos(hallazgos.filter((_, i) => i !== index));
  };

  const actualizarDescripcion = (index, value) => {
    const copia = [...hallazgos];
    copia[index].descripcion = value;
    setHallazgos(copia);
  };

  return (
    <Container>
      {hallazgos.map((h, index) => (
        <div key={index} className="hallazgo">
          <label>Hallazgo #{index + 1}</label>
          <textarea
            placeholder="Describe el hallazgo"
            value={h.descripcion}
            onChange={(e) =>
              actualizarDescripcion(index, e.target.value)
            }
          />

          {hallazgos.length > 1 && (
            <button
              type="button"
              className="delete"
              onClick={() => eliminarHallazgo(index)}
            >
              Eliminar
            </button>
          )}
        </div>
      ))}

      <button type="button" className="add" onClick={agregarHallazgo}>
        ➕ Agregar hallazgo
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .hallazgo {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    font-family: inherit;
    font-size: 0.9rem;
  }

  .add {
    align-self: flex-start;
    background: #22c55e;
    color: #064e3b;
    border: none;
    padding: 8px 14px;
    border-radius: 999px;
    font-weight: 600;
    cursor: pointer;
  }

  .delete {
    align-self: flex-start;
    background: #ef4444;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.75rem;
    cursor: pointer;
  }
`;
