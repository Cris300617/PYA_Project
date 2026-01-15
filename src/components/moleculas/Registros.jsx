import { useState, useEffect } from "react";
import styled from "styled-components";
import { supabase } from "../../supabase/supabase.config";

export function Registro() {

  const [data, setData] = useState(0);

useEffect(() => {
  obtenerId();
}, []);

  async function obtenerId() {
    const {count, error} = await supabase
    .from("forms")
    .select("*", {count: 'exact'});
    if (error) {
      console.error("Error al contar los datos: ", error);
    }else{
      setData(count);
    }
    
  }

return (
  <Container>
    <header className="card-header">
      <h2>Registros</h2>
      <button className="refresh" onClick={obtenerId}>
        Actualizar
      </button>
    </header>

    <div className="metric">
      <span className="metric-value">{data}</span>
      <span className="metric-label">Total de registros</span>
    </div>

    <div className="filters">
      <button>Creador</button>
      <button>Terminados</button>
    </div>
  </Container>
);

}

const Container = styled.div`
  background: linear-gradient(180deg, #f8fff2, #e9fbd6);
  border-radius: 18px;
  padding: 24px;
  min-width: 260px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);

  align-self: start;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #355f4b;
      font-weight: 700;
      margin: 0;
    }

    .refresh {
      background: transparent;
      border: none;
      font-size: 0.75rem;
      color: #2f8f78;
      cursor: pointer;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    margin: 10px 0;

    .metric-value {
      font-size: 2.8rem;
      font-weight: 800;
      color: #2f8f78;
      line-height: 1;
    }

    .metric-label {
      font-size: 0.85rem;
      color: #5f7f73;
      font-weight: 500;
    }
  }

  .filters {
    display: flex;
    gap: 10px;
    justify-content: center;

    button {
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid rgba(47, 143, 120, 0.25);
      background: #ffffff;
      color: #2f8f78;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;

      &:hover {
        background: #2f8f78;
        color: #ffffff;
      }
    }
  }
`;

