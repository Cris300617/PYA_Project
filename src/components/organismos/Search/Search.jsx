import styled from "styled-components";
import { Icon } from "@iconify/react";

export function Search({ onSearch }) {
  return (
    <Container>
      <div className="search-wrapper">
        <Icon icon="solar:magnifer-outline" />
        <input
          type="search"
          placeholder="Buscar..."
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      <div className="filters">
        <button>
          <Icon icon="solar:calendar-outline" />
          Fecha
        </button>

        <button>
          <Icon icon="solar:filter-outline" />
          Estado
        </button>

        <button className="clear">
          <Icon icon="solar:close-circle-outline" />
        </button>
      </div>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 24px;
  background: #ffffff;
  border-radius: 14px;

  .search-wrapper {
    background:rgb(236, 238, 248);
    width: 420px;        
    max-width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border: 1px solid #00000030;
    border-radius: 50px;
    transition: border 0.3s ease;

    &:focus-within {
      border-color: #4ac8a5;
    }

    svg {
      font-size: 20px;
      color: #7a8a99;
    }

    input {
      background:rgb(236, 238, 248);
      border: none;
      outline: none;
      font-size: 15px;
      width: 100%;
    }
  }

  .filters {
    display: flex;
    gap: 10px;

    button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      border: none;
      border-radius: 50px;
      background: #f3f5f9;
      cursor: pointer;
      font-size: 14px;
      color: #34495e;
      transition: all 0.25s ease;

      svg {
        font-size: 18px;
      }

      &:hover {
        background: #e8eef4;
        color: #4ac8a5;
      }
    }

    .clear {
      background: rgba(255, 107, 107, 0.15);
      color: #ff6b6b;

      &:hover {
        background: rgba(255, 107, 107, 0.25);
      }
    }
  }
`;

