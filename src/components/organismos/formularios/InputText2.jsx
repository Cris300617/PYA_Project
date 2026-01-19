import styled from "styled-components";

export function InputText2({ children }) {
  return (
    <Container>
      <div className="form__group field">{children}</div>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 14px;

  .form__group {
    position: relative;
    width: 100%;
  }

  /* ===== Input base ===== */
  .form__field {
    width: 100%;
    box-sizing: border-box;

    border: 2px solid ${({ theme }) => theme.color2};
    border-radius: 14px;

    font-family: inherit;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.text};

    padding: 12px 14px;
    background: transparent;
    outline: none;

    transition: 
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &.disabled {
      color: #696969;
      background: #2d2d2d;
      border-radius: 10px;
      border: 1px dashed #656565;
    }

    &::placeholder {
      color: #94a3b8;
    }
  }

  /* ===== Focus ===== */
  .form__field:focus {
    border-color: #1cb0f6;
    box-shadow: 0 0 0 2px rgba(28, 176, 246, 0.25);
    font-weight: 600;
  }

  /* ===== Autofill ===== */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${({ theme }) => theme.text};
    transition: background-color 5000s ease-in-out 0s;
  }

  /* ===== Validaciones ===== */
  .form__field:required,
  .form__field:invalid {
    box-shadow: none;
  }



`;
